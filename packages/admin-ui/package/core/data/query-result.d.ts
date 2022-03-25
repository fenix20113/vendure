import { Apollo, QueryRef } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
/**
 * This class wraps the Apollo Angular QueryRef object and exposes some getters
 * for convenience.
 */
export declare class QueryResult<T, V = Record<string, any>> {
    private queryRef;
    private apollo;
    constructor(queryRef: QueryRef<T, V>, apollo: Apollo);
    completed$: Subject<unknown>;
    private valueChanges;
    /**
     * Refetch this query whenever the active Channel changes.
     */
    refetchOnChannelChange(): this;
    /**
     * Returns an Observable which emits a single result and then completes.
     */
    get single$(): Observable<T>;
    /**
     * Returns an Observable which emits until unsubscribed.
     */
    get stream$(): Observable<T>;
    get ref(): QueryRef<T, V>;
    /**
     * Returns a single-result Observable after applying the map function.
     */
    mapSingle<R>(mapFn: (item: T) => R): Observable<R>;
    /**
     * Returns a multiple-result Observable after applying the map function.
     */
    mapStream<R>(mapFn: (item: T) => R): Observable<R>;
}
