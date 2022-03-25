"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlJobQueueStrategy = void 0;
const generated_types_1 = require("@vendure/common/lib/generated-types");
const typeorm_1 = require("typeorm");
const job_queue_1 = require("../../job-queue");
const polling_job_queue_strategy_1 = require("../../job-queue/polling-job-queue-strategy");
const service_1 = require("../../service");
const list_query_builder_1 = require("../../service/helpers/list-query-builder/list-query-builder");
const job_record_entity_1 = require("./job-record.entity");
/**
 * @description
 * A {@link JobQueueStrategy} which uses the configured SQL database to persist jobs in the queue.
 * This strategy is used by the {@link DefaultJobQueuePlugin}.
 *
 * @docsCategory JobQueue
 */
class SqlJobQueueStrategy extends polling_job_queue_strategy_1.PollingJobQueueStrategy {
    init(injector) {
        this.connection = injector.get(service_1.TransactionalConnection).rawConnection;
        this.listQueryBuilder = injector.get(list_query_builder_1.ListQueryBuilder);
        super.init(injector);
    }
    destroy() {
        this.connection = undefined;
        super.destroy();
    }
    async add(job) {
        if (!this.connectionAvailable(this.connection)) {
            throw new Error('Connection not available');
        }
        const newRecord = this.toRecord(job);
        const record = await this.connection.getRepository(job_record_entity_1.JobRecord).save(newRecord);
        return this.fromRecord(record);
    }
    async next(queueName) {
        if (!this.connectionAvailable(this.connection)) {
            throw new Error('Connection not available');
        }
        const connection = this.connection;
        const connectionType = this.connection.options.type;
        const isSQLite = connectionType === 'sqlite' || connectionType === 'sqljs' || connectionType === 'better-sqlite3';
        return new Promise(async (resolve, reject) => {
            if (isSQLite) {
                // SQLite driver does not support concurrent transactions. See https://github.com/typeorm/typeorm/issues/1884
                const result = await this.getNextAndSetAsRunning(connection.manager, queueName, false);
                resolve(result);
            }
            else {
                // Selecting the next job is wrapped in a transaction so that we can
                // set a lock on that row and immediately update the status to "RUNNING".
                // This prevents multiple worker processes from taking the same job when
                // running concurrent workers.
                connection.transaction(async (transactionManager) => {
                    const result = await this.getNextAndSetAsRunning(transactionManager, queueName, true);
                    resolve(result);
                });
            }
        });
    }
    async getNextAndSetAsRunning(manager, queueName, setLock, waitingJobIds = []) {
        const qb = manager
            .getRepository(job_record_entity_1.JobRecord)
            .createQueryBuilder('record')
            .where('record.queueName = :queueName', { queueName })
            .andWhere(new typeorm_1.Brackets(qb1 => {
            qb1.where('record.state = :pending', {
                pending: generated_types_1.JobState.PENDING,
            }).orWhere('record.state = :retrying', { retrying: generated_types_1.JobState.RETRYING });
        }))
            .orderBy('record.createdAt', 'ASC');
        if (waitingJobIds.length) {
            qb.andWhere('record.id NOT IN (:...waitingJobIds)', { waitingJobIds });
        }
        if (setLock) {
            qb.setLock('pessimistic_write');
        }
        const record = await qb.getOne();
        if (record) {
            const job = this.fromRecord(record);
            if (record.state === generated_types_1.JobState.RETRYING && typeof this.backOffStrategy === 'function') {
                const msSinceLastFailure = Date.now() - +record.updatedAt;
                const backOffDelayMs = this.backOffStrategy(queueName, record.attempts, job);
                if (msSinceLastFailure < backOffDelayMs) {
                    return await this.getNextAndSetAsRunning(manager, queueName, setLock, [
                        ...waitingJobIds,
                        record.id,
                    ]);
                }
            }
            job.start();
            record.state = generated_types_1.JobState.RUNNING;
            await manager.getRepository(job_record_entity_1.JobRecord).save(record, { reload: false });
            return job;
        }
        else {
            return;
        }
    }
    async update(job) {
        if (!this.connectionAvailable(this.connection)) {
            throw new Error('Connection not available');
        }
        await this.connection
            .getRepository(job_record_entity_1.JobRecord)
            .createQueryBuilder('job')
            .update()
            .set(this.toRecord(job))
            .where('id = :id', { id: job.id })
            .andWhere('settledAt IS NULL')
            .execute();
    }
    async findMany(options) {
        if (!this.connectionAvailable(this.connection)) {
            throw new Error('Connection not available');
        }
        return this.listQueryBuilder
            .build(job_record_entity_1.JobRecord, options)
            .getManyAndCount()
            .then(([items, totalItems]) => ({
            items: items.map(this.fromRecord),
            totalItems,
        }));
    }
    async findOne(id) {
        if (!this.connectionAvailable(this.connection)) {
            throw new Error('Connection not available');
        }
        const record = await this.connection.getRepository(job_record_entity_1.JobRecord).findOne(id);
        if (record) {
            return this.fromRecord(record);
        }
    }
    async findManyById(ids) {
        if (!this.connectionAvailable(this.connection)) {
            throw new Error('Connection not available');
        }
        return this.connection
            .getRepository(job_record_entity_1.JobRecord)
            .findByIds(ids)
            .then(records => records.map(this.fromRecord));
    }
    async removeSettledJobs(queueNames = [], olderThan) {
        if (!this.connectionAvailable(this.connection)) {
            throw new Error('Connection not available');
        }
        const findOptions = Object.assign(Object.assign({}, (0 < queueNames.length ? { queueName: typeorm_1.In(queueNames) } : {})), { isSettled: true, settledAt: typeorm_1.LessThan(olderThan || new Date()) });
        const toDelete = await this.connection.getRepository(job_record_entity_1.JobRecord).find({ where: findOptions });
        const deleteCount = await this.connection.getRepository(job_record_entity_1.JobRecord).count({ where: findOptions });
        await this.connection.getRepository(job_record_entity_1.JobRecord).delete(findOptions);
        return deleteCount;
    }
    connectionAvailable(connection) {
        return !!this.connection && this.connection.isConnected;
    }
    toRecord(job) {
        return new job_record_entity_1.JobRecord({
            id: job.id || undefined,
            queueName: job.queueName,
            data: job.data,
            state: job.state,
            progress: job.progress,
            result: job.result,
            error: job.error,
            startedAt: job.startedAt,
            settledAt: job.settledAt,
            isSettled: job.isSettled,
            retries: job.retries,
            attempts: job.attempts,
        });
    }
    fromRecord(jobRecord) {
        return new job_queue_1.Job(jobRecord);
    }
}
exports.SqlJobQueueStrategy = SqlJobQueueStrategy;
//# sourceMappingURL=sql-job-queue-strategy.js.map