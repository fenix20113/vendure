export interface PubSubOptions {
    /**
     * @description
     * Number of jobs that can be inflight at the same time.
     */
    concurrency?: number;
    /**
     * @description
     * This is the mapping of Vendure queue names to PubSub Topics and Subscriptions
     * For each queue a topic and subscription is required to exist.
     * First item - topic name
     * Second item - subscription name
     * Third item - ackDeadline for subscriber, by default Google use dynamic value. If left
     *     unset the initial value will be 10 seconds, but it will evolve into the
     *     99th percentile time it takes to acknowledge a message
     */
    queueNamePubSubPair?: Map<string, [string, string, number?]>;
}
