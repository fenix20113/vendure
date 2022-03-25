import { ID, Type } from '@vendure/common/lib/shared-types';
import { Connection, EntitySchema, FindOneOptions, ObjectType, Repository } from 'typeorm';
import { RequestContext } from '../../api/common/request-context';
import { ChannelAware } from '../../common/types/common-types';
import { VendureEntity } from '../../entity/base/base.entity';
/**
 * @docsCategory data-access
 */
export interface FindEntityOptions extends FindOneOptions {
    channelId?: ID;
}
/**
 * @description
 * The TransactionalConnection is a wrapper around the TypeORM `Connection` object which works in conjunction
 * with the {@link Transaction} decorator to implement per-request transactions. All services which access the
 * database should use this class rather than the raw TypeORM connection, to ensure that db changes can be
 * easily wrapped in transactions when required.
 *
 * The service layer does not need to know about the scope of a transaction, as this is covered at the
 * API by the use of the `Transaction` decorator.
 *
 * @docsCategory data-access
 */
export declare class TransactionalConnection {
    private connection;
    constructor(connection: Connection);
    /**
     * @description
     * The plain TypeORM Connection object. Should be used carefully as any operations
     * performed with this connection will not be performed within any outer
     * transactions.
     */
    get rawConnection(): Connection;
    /**
     * @description
     * Returns a TypeORM repository. Note that when no RequestContext is supplied, the repository will not
     * be aware of any existing transaction. Therefore calling this method without supplying a RequestContext
     * is discouraged without a deliberate reason.
     */
    getRepository<Entity>(target: ObjectType<Entity> | EntitySchema<Entity> | string): Repository<Entity>;
    /**
     * @description
     * Returns a TypeORM repository which is bound to any existing transactions. It is recommended to _always_ pass
     * the RequestContext argument when possible, otherwise the queries will be executed outside of any
     * ongoing transactions which have been started by the {@link Transaction} decorator.
     */
    getRepository<Entity>(ctx: RequestContext | undefined, target: ObjectType<Entity> | EntitySchema<Entity> | string): Repository<Entity>;
    /**
     * @description
     * Manually start a transaction if one is not already in progress. This method should be used in
     * conjunction with the `'manual'` mode of the {@link Transaction} decorator.
     */
    startTransaction(ctx: RequestContext): Promise<void>;
    /**
     * @description
     * Manually commits any open transaction. Should be very rarely needed, since the {@link Transaction} decorator
     * and the internal TransactionInterceptor take care of this automatically. Use-cases include situations
     * in which the worker thread needs to access changes made in the current transaction, or when using the
     * Transaction decorator in manual mode.
     */
    commitOpenTransaction(ctx: RequestContext): Promise<void>;
    /**
     * @description
     * Manually rolls back any open transaction. Should be very rarely needed, since the {@link Transaction} decorator
     * and the internal TransactionInterceptor take care of this automatically. Use-cases include when using the
     * Transaction decorator in manual mode.
     */
    rollBackTransaction(ctx: RequestContext): Promise<void>;
    /**
     * @description
     * Finds an entity of the given type by ID, or throws an `EntityNotFoundError` if none
     * is found.
     */
    getEntityOrThrow<T extends VendureEntity>(ctx: RequestContext, entityType: Type<T>, id: ID, options?: FindEntityOptions): Promise<T>;
    /**
     * @description
     * Like the TypeOrm `Repository.findOne()` method, but limits the results to
     * the given Channel.
     */
    findOneInChannel<T extends ChannelAware & VendureEntity>(ctx: RequestContext, entity: Type<T>, id: ID, channelId: ID, options?: FindOneOptions): Promise<T | undefined>;
    /**
     * @description
     * Like the TypeOrm `Repository.findByIds()` method, but limits the results to
     * the given Channel.
     */
    findByIdsInChannel<T extends ChannelAware | VendureEntity>(ctx: RequestContext, entity: Type<T>, ids: ID[], channelId: ID, options: FindOneOptions): Promise<T[]>;
    private getTransactionManager;
}
