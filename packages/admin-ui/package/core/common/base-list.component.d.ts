import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, QueryParamsHandling, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { QueryResult } from '../data/query-result';
export declare type ListQueryFn<R> = (take: number, skip: number, ...args: any[]) => QueryResult<R, any>;
export declare type MappingFn<T, R> = (result: R) => {
    items: T[];
    totalItems: number;
};
export declare type OnPageChangeFn<V> = (skip: number, take: number) => V;
/**
 * This is a base class which implements the logic required to fetch and manipulate
 * a list of data from a query which returns a PaginatedList type.
 */
export declare class BaseListComponent<ResultType, ItemType, VariableType = any> implements OnInit, OnDestroy {
    protected router: Router;
    protected route: ActivatedRoute;
    result$: Observable<ResultType>;
    items$: Observable<ItemType[]>;
    totalItems$: Observable<number>;
    itemsPerPage$: Observable<number>;
    currentPage$: Observable<number>;
    protected destroy$: Subject<void>;
    private listQuery;
    private listQueryFn;
    private mappingFn;
    private onPageChangeFn;
    private refresh$;
    private defaults;
    constructor(router: Router, route: ActivatedRoute);
    /**
     * Sets the fetch function for the list being implemented.
     */
    setQueryFn(listQueryFn: ListQueryFn<ResultType>, mappingFn: MappingFn<ItemType, ResultType>, onPageChangeFn?: OnPageChangeFn<VariableType>, defaults?: {
        take: number;
        skip: number;
    }): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    setPageNumber(page: number): void;
    setItemsPerPage(perPage: number): void;
    /**
     * Re-fetch the current page
     */
    refresh(): void;
    protected setQueryParam(hash: {
        [key: string]: any;
    }, options?: {
        replaceUrl?: boolean;
        queryParamsHandling?: QueryParamsHandling;
    }): any;
    protected setQueryParam(key: string, value: any, options?: {
        replaceUrl?: boolean;
        queryParamsHandling?: QueryParamsHandling;
    }): any;
}
