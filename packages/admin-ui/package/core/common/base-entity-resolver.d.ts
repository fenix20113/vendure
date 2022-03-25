import { ActivatedRouteSnapshot, Resolve, ResolveData, Router, RouterStateSnapshot } from '@angular/router';
import { Type } from '@vendure/common/lib/shared-types';
import { Observable } from 'rxjs';
export interface EntityResolveData<R> extends ResolveData {
    entity: Type<BaseEntityResolver<R>>;
}
export declare function createResolveData<T extends BaseEntityResolver<R>, R>(resolver: Type<T>): EntityResolveData<R>;
/**
 * A base resolver for an entity detail route. Resolves to an observable of the given entity, or a "blank"
 * version if the route id equals "create".
 */
export declare class BaseEntityResolver<T> implements Resolve<Observable<T>> {
    protected router: Router;
    private readonly emptyEntity;
    private entityStream;
    constructor(router: Router, emptyEntity: T, entityStream: (id: string) => Observable<T | null | undefined>);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<T>>;
}
