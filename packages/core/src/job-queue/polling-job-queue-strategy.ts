import { ID } from '@vendure/common/lib/shared-types';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { Logger } from '../config/logger/vendure-logger';

import { Job } from './job';
import { JobData } from './types';

class ActiveQueue<Data extends JobData<Data> = {}> {
    private timer: any;
    private running = false;
    private activeJobs: Array<Job<Data>> = [];

    private errorNotifier$ = new Subject<[string, string]>();
    private subscription: Subscription;

    constructor(
        private readonly queueName: string,
        private readonly process: (job: Job<Data>) => Promise<any>,
        private readonly jobQueueStrategy: PollingJobQueueStrategy,
    ) {
        this.subscription = this.errorNotifier$.pipe(throttleTime(3000)).subscribe(([message, stack]) => {
            Logger.error(message);
            Logger.debug(stack);
        });
    }

    start() {
        Logger.debug(`Starting JobQueue "${this.queueName}"`);
        this.running = true;
        const runNextJobs = async () => {
            try {
                const runningJobsCount = this.activeJobs.length;
                for (let i = runningJobsCount; i < this.jobQueueStrategy.concurrency; i++) {
                    const nextJob = await this.jobQueueStrategy.next(this.queueName);
                    if (nextJob) {
                        this.activeJobs.push(nextJob);
                        await this.jobQueueStrategy.update(nextJob);
                        nextJob.on('progress', job => this.jobQueueStrategy.update(job));
                        this.process(nextJob)
                            .then(result => {
                                nextJob.complete(result);
                                return this.onFailOrComplete(nextJob);
                            })
                            .catch(err => {
                                nextJob.fail(err);
                                return this.onFailOrComplete(nextJob);
                            });
                    }
                }
            } catch (e) {
                this.errorNotifier$.next([
                    `Job queue "${this.queueName}" encountered an error (set log level to Debug for trace): ${e.message}`,
                    e.stack,
                ]);
            }
            if (this.running) {
                this.timer = setTimeout(runNextJobs, this.jobQueueStrategy.pollInterval);
            }
        };

        runNextJobs();
    }

    stop(): Promise<void> {
        this.running = false;
        clearTimeout(this.timer);

        const start = +new Date();
        // Wait for 2 seconds to allow running jobs to complete
        const maxTimeout = 2000;
        return new Promise(resolve => {
            const pollActiveJobs = async () => {
                const timedOut = +new Date() - start > maxTimeout;
                if (this.activeJobs.length === 0 || timedOut) {
                    // if there are any incomplete jobs after the 2 second
                    // wait period, set them back to "pending" so they can
                    // be re-run on next bootstrap.
                    for (const job of this.activeJobs) {
                        job.defer();
                        await this.jobQueueStrategy.update(job);
                    }
                    resolve();
                } else {
                    setTimeout(pollActiveJobs, 50);
                }
            };
            pollActiveJobs();
        });
    }

    private async onFailOrComplete(job: Job<Data>) {
        await this.jobQueueStrategy.update(job);
        this.removeJobFromActive(job);
    }

    private removeJobFromActive(job: Job<Data>) {
        const index = this.activeJobs.indexOf(job);
        this.activeJobs.splice(index, 1);
    }
}

export abstract class PollingJobQueueStrategy {
    private activeQueues = new Map<string, ActiveQueue<any>>();

    constructor(public concurrency: number = 1, public pollInterval: number = 200) {}

    start<Data extends JobData<Data> = {}>(
        queueName: string,
        process: (job: Job<Data>) => Promise<any>,
    ): void {
        if (this.activeQueues.has(queueName)) {
            return;
        }
        const active = new ActiveQueue<Data>(queueName, process, this);
        active.start();
        this.activeQueues.set(queueName, active);
    }

    async stop(queueName: string) {
        const active = this.activeQueues.get(queueName);
        if (!active) {
            return;
        }
        await active.stop();
        this.activeQueues.delete(queueName);
    }

    async cancelJob(jobId: ID): Promise<Job | undefined> {
        const job = await this.findOne(jobId);
        if (job) {
            job.cancel();
            await this.update(job);
            return job;
        }
    }

    /**
     * @description
     * Should return the next job in the given queue. The implementation is
     * responsible for returning the correct job according to the time of
     * creation.
     */
    abstract next(queueName: string): Promise<Job | undefined>;

    /**
     * @description
     * Update the job details in the store.
     */
    abstract update(job: Job): Promise<void>;

    /**
     * @description
     * Returns a job by its id.
     */
    abstract findOne(id: ID): Promise<Job | undefined>;
}