import { Message, PubSub, Subscription, Topic } from '@google-cloud/pubsub';
import { JobState } from '@vendure/common/lib/generated-types';
import { ID, Injector, Job, JobData, JobQueueStrategy, Logger } from '@vendure/core';

import { PUB_SUB_OPTIONS } from './constants';
import { PubSubOptions } from './options';

export class PubSubJobQueueStrategy implements JobQueueStrategy {
    private concurrency: number;
    private queueNamePubSubPair: Map<string, [string, string]>;
    private pubSubClient: PubSub;
    private topics = new Map<string, Topic>();
    private subscriptions = new Map<string, Subscription>();

    init(injector: Injector) {
        this.pubSubClient = injector.get(PubSub);
        const options = injector.get<PubSubOptions>(PUB_SUB_OPTIONS);
        this.concurrency = options.concurrency ?? 1;
        this.queueNamePubSubPair = options.queueNamePubSubPair ?? new Map();
    }

    destroy() {
        for (const subscriptions of this.subscriptions.values()) {
            subscriptions.removeAllListeners('message');
        }
    }

    async add(job: Job): Promise<Job> {
        await this.topic(job.queueName).publish(Buffer.from(JSON.stringify(job.data)));

        return job;
    }

    start<Data extends JobData<Data> = {}>(queueName: string, process: (job: Job<Data>) => Promise<any>) {
        const subscription = this.pubSubClient.subscription(queueName);

        subscription.on('message', (message: Message) => {
            Logger.info(`Received message: ${message.id}`);
            Logger.info(`\tData: ${message.data}`);
            Logger.info(`\tAttributes: ${message.attributes}`);

            const job = new Job<Data>({
                id: message.id,
                queueName,
                data: JSON.parse(message.data.toString()),
                attempts: message.deliveryAttempt,
                state: JobState.RUNNING,
                startedAt: new Date(),
                createdAt: message.publishTime,
            });

            process(job)
                .then(() => {
                    message.ack();
                })
                .catch(err => {
                    message.nack();
                });
        });
    }

    stop(queueName: string) {
        this.subscription(queueName).removeAllListeners('message');
        return Promise.resolve();
    }

    topic(queueName: string): Topic {
        let topic = this.topics.get(queueName);
        if (topic) {
            return topic;
        }

        const pair = this.queueNamePubSubPair.get(queueName);
        if (!pair) {
            throw new Error(`Topic name not set for queue: ${queueName}`);
        }

        const [topicName, subscriptionName] = pair;
        topic = this.pubSubClient.topic(topicName);
        this.topics.set(queueName, topic);

        return topic;
    }

    subscription(queueName: string): Subscription {
        let subscription = this.subscriptions.get(queueName);
        if (subscription) {
            return subscription;
        }

        const pair = this.queueNamePubSubPair.get(queueName);
        if (!pair) {
            throw new Error(`Subscription name not set for queue: ${queueName}`);
        }

        const [topicName, subscriptionName] = pair;
        subscription = this.topic(queueName).subscription(subscriptionName, {
            flowControl: {
                maxMessages: this.concurrency,
            },
        });
        this.subscriptions.set(queueName, subscription);

        return subscription;
    }
}
