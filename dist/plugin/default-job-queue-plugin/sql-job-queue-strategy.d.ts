import { JobListOptions } from '@vendure/common/lib/generated-types';
import { ID, PaginatedList } from '@vendure/common/lib/shared-types';
import { Injector } from '../../common/injector';
import { InspectableJobQueueStrategy } from '../../config';
import { Job, JobData } from '../../job-queue';
import { PollingJobQueueStrategy } from '../../job-queue/polling-job-queue-strategy';
/**
 * @description
 * A {@link JobQueueStrategy} which uses the configured SQL database to persist jobs in the queue.
 * This strategy is used by the {@link DefaultJobQueuePlugin}.
 *
 * @docsCategory JobQueue
 */
export declare class SqlJobQueueStrategy extends PollingJobQueueStrategy implements InspectableJobQueueStrategy {
    private connection;
    private listQueryBuilder;
    init(injector: Injector): void;
    destroy(): void;
    add<Data extends JobData<Data> = {}>(job: Job<Data>): Promise<Job<Data>>;
    next(queueName: string): Promise<Job | undefined>;
    private getNextAndSetAsRunning;
    update(job: Job<any>): Promise<void>;
    findMany(options?: JobListOptions): Promise<PaginatedList<Job>>;
    findOne(id: ID): Promise<Job | undefined>;
    findManyById(ids: ID[]): Promise<Job[]>;
    removeSettledJobs(queueNames?: string[], olderThan?: Date): Promise<number>;
    private connectionAvailable;
    private toRecord;
    private fromRecord;
}
