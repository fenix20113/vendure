import { OnModuleDestroy } from '@nestjs/common';
import { Type } from '@vendure/common/lib/shared-types';
import { Observable } from 'rxjs';
import { VendureEvent } from './vendure-event';
/**
 * @description
 * The EventBus is used to globally publish events which can then be subscribed to.
 *
 * @docsCategory events
 * */
export declare class EventBus implements OnModuleDestroy {
    private eventStream;
    private destroy$;
    /**
     * @description
     * Publish an event which any subscribers can react to.
     */
    publish<T extends VendureEvent>(event: T): void;
    /**
     * @description
     * Returns an RxJS Observable stream of events of the given type.
     */
    ofType<T extends VendureEvent>(type: Type<T>): Observable<T>;
    /** @internal */
    onModuleDestroy(): any;
    /**
     * If the Event includes a RequestContext property, we need to:
     *
     * 1) Set it as a copy of the original
     * 2) Remove the TRANSACTION_MANAGER_KEY from that copy
     *
     * The TRANSACTION_MANAGER_KEY is used to track transactions across calls
     * (this is why we always pass the `ctx` object to get TransactionalConnection.getRepository() method).
     * However, allowing a transaction to continue in an async event subscriber function _will_ cause
     * very confusing issues (see https://github.com/vendure-ecommerce/vendure/issues/520), which is why
     * we simply remove the reference to the transaction manager from the context object altogether.
     */
    private prepareRequestContext;
}
