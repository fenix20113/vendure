"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionalConnection = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const request_context_1 = require("../../api/common/request-context");
const constants_1 = require("../../common/constants");
const errors_1 = require("../../common/error/errors");
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
let TransactionalConnection = class TransactionalConnection {
    constructor(connection) {
        this.connection = connection;
    }
    /**
     * @description
     * The plain TypeORM Connection object. Should be used carefully as any operations
     * performed with this connection will not be performed within any outer
     * transactions.
     */
    get rawConnection() {
        return this.connection;
    }
    getRepository(ctxOrTarget, maybeTarget) {
        var _a;
        if (ctxOrTarget instanceof request_context_1.RequestContext) {
            const transactionManager = this.getTransactionManager(ctxOrTarget);
            if (transactionManager && maybeTarget && !((_a = transactionManager.queryRunner) === null || _a === void 0 ? void 0 : _a.isReleased)) {
                return transactionManager.getRepository(maybeTarget);
            }
            else {
                // tslint:disable-next-line:no-non-null-assertion
                return typeorm_2.getRepository(maybeTarget);
            }
        }
        else {
            // tslint:disable-next-line:no-non-null-assertion
            return typeorm_2.getRepository(ctxOrTarget !== null && ctxOrTarget !== void 0 ? ctxOrTarget : maybeTarget);
        }
    }
    /**
     * @description
     * Manually start a transaction if one is not already in progress. This method should be used in
     * conjunction with the `'manual'` mode of the {@link Transaction} decorator.
     */
    async startTransaction(ctx) {
        var _a;
        const transactionManager = this.getTransactionManager(ctx);
        if (((_a = transactionManager === null || transactionManager === void 0 ? void 0 : transactionManager.queryRunner) === null || _a === void 0 ? void 0 : _a.isTransactionActive) === false) {
            await transactionManager.queryRunner.startTransaction();
        }
    }
    /**
     * @description
     * Manually commits any open transaction. Should be very rarely needed, since the {@link Transaction} decorator
     * and the internal TransactionInterceptor take care of this automatically. Use-cases include situations
     * in which the worker thread needs to access changes made in the current transaction, or when using the
     * Transaction decorator in manual mode.
     */
    async commitOpenTransaction(ctx) {
        var _a;
        const transactionManager = this.getTransactionManager(ctx);
        if ((_a = transactionManager === null || transactionManager === void 0 ? void 0 : transactionManager.queryRunner) === null || _a === void 0 ? void 0 : _a.isTransactionActive) {
            await transactionManager.queryRunner.commitTransaction();
        }
    }
    /**
     * @description
     * Manually rolls back any open transaction. Should be very rarely needed, since the {@link Transaction} decorator
     * and the internal TransactionInterceptor take care of this automatically. Use-cases include when using the
     * Transaction decorator in manual mode.
     */
    async rollBackTransaction(ctx) {
        var _a;
        const transactionManager = this.getTransactionManager(ctx);
        if ((_a = transactionManager === null || transactionManager === void 0 ? void 0 : transactionManager.queryRunner) === null || _a === void 0 ? void 0 : _a.isTransactionActive) {
            await transactionManager.queryRunner.rollbackTransaction();
        }
    }
    /**
     * @description
     * Finds an entity of the given type by ID, or throws an `EntityNotFoundError` if none
     * is found.
     */
    async getEntityOrThrow(ctx, entityType, id, options = {}) {
        let entity;
        if (options.channelId != null) {
            const { channelId } = options, optionsWithoutChannelId = __rest(options, ["channelId"]);
            entity = await this.findOneInChannel(ctx, entityType, id, options.channelId, optionsWithoutChannelId);
        }
        else {
            entity = await this.getRepository(ctx, entityType).findOne(id, options);
        }
        if (!entity ||
            (entity.hasOwnProperty('deletedAt') && entity.deletedAt !== null)) {
            throw new errors_1.EntityNotFoundError(entityType.name, id);
        }
        return entity;
    }
    /**
     * @description
     * Like the TypeOrm `Repository.findOne()` method, but limits the results to
     * the given Channel.
     */
    findOneInChannel(ctx, entity, id, channelId, options = {}) {
        const qb = this.getRepository(ctx, entity).createQueryBuilder('entity');
        typeorm_2.FindOptionsUtils.applyFindManyOptionsOrConditionsToQueryBuilder(qb, options);
        if (options.loadEagerRelations !== false) {
            // tslint:disable-next-line:no-non-null-assertion
            typeorm_2.FindOptionsUtils.joinEagerRelations(qb, qb.alias, qb.expressionMap.mainAlias.metadata);
        }
        return qb
            .leftJoin('entity.channels', 'channel')
            .andWhere('entity.id = :id', { id })
            .andWhere('channel.id = :channelId', { channelId })
            .getOne();
    }
    /**
     * @description
     * Like the TypeOrm `Repository.findByIds()` method, but limits the results to
     * the given Channel.
     */
    findByIdsInChannel(ctx, entity, ids, channelId, options) {
        // the syntax described in https://github.com/typeorm/typeorm/issues/1239#issuecomment-366955628
        // breaks if the array is empty
        if (ids.length === 0) {
            return Promise.resolve([]);
        }
        const qb = this.getRepository(ctx, entity).createQueryBuilder('entity');
        typeorm_2.FindOptionsUtils.applyFindManyOptionsOrConditionsToQueryBuilder(qb, options);
        if (options.loadEagerRelations !== false) {
            // tslint:disable-next-line:no-non-null-assertion
            typeorm_2.FindOptionsUtils.joinEagerRelations(qb, qb.alias, qb.expressionMap.mainAlias.metadata);
        }
        return qb
            .leftJoin('entity.channels', 'channel')
            .andWhere('entity.id IN (:...ids)', { ids })
            .andWhere('channel.id = :channelId', { channelId })
            .getMany();
    }
    getTransactionManager(ctx) {
        return ctx[constants_1.TRANSACTION_MANAGER_KEY];
    }
};
TransactionalConnection = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectConnection()),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], TransactionalConnection);
exports.TransactionalConnection = TransactionalConnection;
//# sourceMappingURL=transactional-connection.js.map