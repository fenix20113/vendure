import { OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../../data/providers/data.service';
export declare type BreadcrumbString = string;
export interface BreadcrumbLabelLinkPair {
    label: string;
    link: any[];
}
export declare type BreadcrumbValue = BreadcrumbString | BreadcrumbLabelLinkPair | BreadcrumbLabelLinkPair[];
export declare type BreadcrumbFunction = (data: Data, params: Params, dataService: DataService) => BreadcrumbValue | Observable<BreadcrumbValue>;
export declare type BreadcrumbDefinition = BreadcrumbValue | BreadcrumbFunction | Observable<BreadcrumbValue>;
/**
 * A breadcrumbs component which reads the route config and any route that has a `data.breadcrumb` property will
 * be displayed in the breadcrumb trail.
 *
 * The `breadcrumb` property can be a string or a function. If a function, it will be passed the route's `data`
 * object (which will include all resolved keys) and any route params, and should return a BreadcrumbValue.
 *
 * See the test config to get an idea of allowable configs for breadcrumbs.
 */
export declare class BreadcrumbComponent implements OnDestroy {
    private router;
    private route;
    private dataService;
    breadcrumbs$: Observable<Array<{
        link: string | any[];
        label: string;
    }>>;
    private destroy$;
    constructor(router: Router, route: ActivatedRoute, dataService: DataService);
    ngOnDestroy(): void;
    private generateBreadcrumbs;
    /**
     * Walks the route definition tree to assemble an array from which the breadcrumbs can be derived.
     */
    private assembleBreadcrumbParts;
    /**
     * Accounts for relative routes in the link array, i.e. arrays whose first element is either:
     * * `./`   - this appends the rest of the link segments to the current active route
     * * `../`  - this removes the last segment of the current active route, and appends the link segments
     *            to the parent route.
     */
    private normalizeRelativeLinks;
}
