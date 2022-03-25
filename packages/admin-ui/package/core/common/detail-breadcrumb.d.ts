import { Observable } from 'rxjs';
import { BreadcrumbValue } from '../components/breadcrumb/breadcrumb.component';
/**
 * Creates an observable of breadcrumb links for use in the route config of a detail route.
 */
export declare function detailBreadcrumb<T>(options: {
    entity: Observable<T>;
    id: string;
    breadcrumbKey: string;
    getName: (entity: T) => string;
    route: string;
}): Observable<BreadcrumbValue>;
