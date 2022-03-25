import { APP_INITIALIZER, Injectable } from '@angular/core';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Permission } from '../../common/generated-types';
import * as i0 from "@angular/core";
/**
 * @description
 * Add a section to the main nav menu. Providing the `before` argument will
 * move the section before any existing section with the specified id. If
 * omitted (or if the id is not found) the section will be appended to the
 * existing set of sections.
 * This should be used in the NgModule `providers` array of your ui extension module.
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   providers: [
 *     addNavMenuSection({
 *       id: 'reviews',
 *       label: 'Product Reviews',
 *       routerLink: ['/extensions/reviews'],
 *       icon: 'star',
 *     },
 *     'settings'),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 */
export function addNavMenuSection(config, before) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (navBuilderService) => () => {
            navBuilderService.addNavMenuSection(config, before);
        },
        deps: [NavBuilderService],
    };
}
/**
 * @description
 * Add a menu item to an existing section specified by `sectionId`. The id of the section
 * can be found by inspecting the DOM and finding the `data-section-id` attribute.
 * Providing the `before` argument will move the item before any existing item with the specified id.
 * If omitted (or if the name is not found) the item will be appended to the
 * end of the section.
 *
 * This should be used in the NgModule `providers` array of your ui extension module.
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   providers: [
 *     addNavMenuItem({
 *       id: 'reports',
 *       label: 'Reports',
 *       items: [{
 *           // ...
 *       }],
 *     },
 *     'marketing'),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 */
export function addNavMenuItem(config, sectionId, before) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (navBuilderService) => () => {
            navBuilderService.addNavMenuItem(config, sectionId, before);
        },
        deps: [NavBuilderService],
    };
}
/**
 * @description
 * Adds a button to the ActionBar at the top right of each list or detail view. The locationId can
 * be determined by inspecting the DOM and finding the <vdr-action-bar> element and its
 * `data-location-id` attribute.
 *
 * This should be used in the NgModule `providers` array of your ui extension module.
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   providers: [
 *     addActionBarItem({
 *      id: 'print-invoice'
 *      label: 'Print Invoice',
 *      locationId: 'order-detail',
 *      routerLink: ['/extensions/invoicing'],
 *     }),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 */
export function addActionBarItem(config) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (navBuilderService) => () => {
            navBuilderService.addActionBarItem(config);
        },
        deps: [NavBuilderService],
    };
}
/**
 * This service is used to define the contents of configurable menus in the application.
 */
export class NavBuilderService {
    constructor() {
        this.sectionBadges = {};
        this.initialNavMenuConfig$ = new BehaviorSubject([]);
        this.addedNavMenuSections = [];
        this.addedNavMenuItems = [];
        this.addedActionBarItems = [];
        this.setupStreams();
    }
    /**
     * Used to define the initial sections and items of the main nav menu.
     */
    defineNavMenuSections(config) {
        this.initialNavMenuConfig$.next(config);
    }
    /**
     * Add a section to the main nav menu. Providing the `before` argument will
     * move the section before any existing section with the specified id. If
     * omitted (or if the id is not found) the section will be appended to the
     * existing set of sections.
     *
     * Providing the `id` of an existing section will replace that section.
     */
    addNavMenuSection(config, before) {
        this.addedNavMenuSections.push({ config, before });
    }
    /**
     * Add a menu item to an existing section specified by `sectionId`. The id of the section
     * can be found by inspecting the DOM and finding the `data-section-id` attribute.
     * Providing the `before` argument will move the item before any existing item with the specified id.
     * If omitted (or if the name is not found) the item will be appended to the
     * end of the section.
     *
     * Providing the `id` of an existing item in that section will replace
     * that item.
     */
    addNavMenuItem(config, sectionId, before) {
        this.addedNavMenuItems.push({ config, sectionId, before });
    }
    /**
     * Adds a button to the ActionBar at the top right of each list or detail view. The locationId can
     * be determined by inspecting the DOM and finding the <vdr-action-bar> element and its
     * `data-location-id` attribute.
     */
    addActionBarItem(config) {
        this.addedActionBarItems.push(Object.assign({ requiresPermission: Permission.Authenticated }, config));
    }
    getRouterLink(config, route) {
        if (typeof config.routerLink === 'function') {
            return config.routerLink(route);
        }
        if (Array.isArray(config.routerLink)) {
            return config.routerLink;
        }
        return null;
    }
    setupStreams() {
        const sectionAdditions$ = of(this.addedNavMenuSections);
        const itemAdditions$ = of(this.addedNavMenuItems);
        const combinedConfig$ = combineLatest(this.initialNavMenuConfig$, sectionAdditions$).pipe(map(([initialConfig, additions]) => {
            for (const { config, before } of additions) {
                if (!config.requiresPermission) {
                    config.requiresPermission = Permission.Authenticated;
                }
                const existingIndex = initialConfig.findIndex(c => c.id === config.id);
                if (-1 < existingIndex) {
                    initialConfig[existingIndex] = config;
                }
                const beforeIndex = initialConfig.findIndex(c => c.id === before);
                if (-1 < beforeIndex) {
                    if (-1 < existingIndex) {
                        initialConfig.splice(existingIndex, 1);
                    }
                    initialConfig.splice(beforeIndex, 0, config);
                }
                else if (existingIndex === -1) {
                    initialConfig.push(config);
                }
            }
            return initialConfig;
        }), shareReplay(1));
        this.navMenuConfig$ = combineLatest(combinedConfig$, itemAdditions$).pipe(map(([sections, additionalItems]) => {
            for (const item of additionalItems) {
                const section = sections.find(s => s.id === item.sectionId);
                if (!section) {
                    // tslint:disable-next-line:no-console
                    console.error(`Could not add menu item "${item.config.id}", section "${item.sectionId}" does not exist`);
                }
                else {
                    const { config, sectionId, before } = item;
                    const existingIndex = section.items.findIndex(i => i.id === config.id);
                    if (-1 < existingIndex) {
                        section.items[existingIndex] = config;
                    }
                    const beforeIndex = section.items.findIndex(i => i.id === before);
                    if (-1 < beforeIndex) {
                        if (-1 < existingIndex) {
                            section.items.splice(existingIndex, 1);
                        }
                        section.items.splice(beforeIndex, 0, config);
                    }
                    else if (existingIndex === -1) {
                        section.items.push(config);
                    }
                }
            }
            // Aggregate any badges defined for the nav items in each section
            for (const section of sections) {
                const itemBadgeStatuses = section.items
                    .map(i => i.statusBadge)
                    .filter(notNullOrUndefined);
                this.sectionBadges[section.id] = combineLatest(itemBadgeStatuses).pipe(map(badges => {
                    const propagatingBadges = badges.filter(b => b.propagateToSection);
                    if (propagatingBadges.length === 0) {
                        return 'none';
                    }
                    const statuses = propagatingBadges.map(b => b.type);
                    if (statuses.includes('error')) {
                        return 'error';
                    }
                    else if (statuses.includes('warning')) {
                        return 'warning';
                    }
                    else if (statuses.includes('info')) {
                        return 'info';
                    }
                    else {
                        return 'none';
                    }
                }));
            }
            return sections;
        }));
        this.actionBarConfig$ = of(this.addedActionBarItems);
    }
}
NavBuilderService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NavBuilderService_Factory() { return new NavBuilderService(); }, token: NavBuilderService, providedIn: "root" });
NavBuilderService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
NavBuilderService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LWJ1aWxkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvcHJvdmlkZXJzL25hdi1idWlsZGVyL25hdi1idWlsZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFFdEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQVUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE1BQXNCLEVBQUUsTUFBZTtJQUNyRSxPQUFPO1FBQ0gsT0FBTyxFQUFFLGVBQWU7UUFDeEIsS0FBSyxFQUFFLElBQUk7UUFDWCxVQUFVLEVBQUUsQ0FBQyxpQkFBb0MsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQ3ZELGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUM7S0FDNUIsQ0FBQztBQUNOLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsTUFBTSxVQUFVLGNBQWMsQ0FBQyxNQUFtQixFQUFFLFNBQWlCLEVBQUUsTUFBZTtJQUNsRixPQUFPO1FBQ0gsT0FBTyxFQUFFLGVBQWU7UUFDeEIsS0FBSyxFQUFFLElBQUk7UUFDWCxVQUFVLEVBQUUsQ0FBQyxpQkFBb0MsRUFB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Q0FBQztRQUVGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDekQsQ0FBQzs7OztZQWxLSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUFBfSU5JVElBTElaRVIsIEluamVjdGFibGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBub3ROdWxsT3JVbmRlZmluZWQgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC11dGlscyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHNoYXJlUmVwbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBQZXJtaXNzaW9uIH0gZnJvbSAnLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5cbmltcG9ydCB7XG4gICAgQWN0aW9uQmFySXRlbSxcbiAgICBOYXZNZW51QmFkZ2VUeXBlLFxuICAgIE5hdk1lbnVJdGVtLFxuICAgIE5hdk1lbnVTZWN0aW9uLFxuICAgIFJvdXRlckxpbmtEZWZpbml0aW9uLFxufSBmcm9tICcuL25hdi1idWlsZGVyLXR5cGVzJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFkZCBhIHNlY3Rpb24gdG8gdGhlIG1haW4gbmF2IG1lbnUuIFByb3ZpZGluZyB0aGUgYGJlZm9yZWAgYXJndW1lbnQgd2lsbFxuICogbW92ZSB0aGUgc2VjdGlvbiBiZWZvcmUgYW55IGV4aXN0aW5nIHNlY3Rpb24gd2l0aCB0aGUgc3BlY2lmaWVkIGlkLiBJZlxuICogb21pdHRlZCAob3IgaWYgdGhlIGlkIGlzIG5vdCBmb3VuZCkgdGhlIHNlY3Rpb24gd2lsbCBiZSBhcHBlbmRlZCB0byB0aGVcbiAqIGV4aXN0aW5nIHNldCBvZiBzZWN0aW9ucy5cbiAqIFRoaXMgc2hvdWxkIGJlIHVzZWQgaW4gdGhlIE5nTW9kdWxlIGBwcm92aWRlcnNgIGFycmF5IG9mIHlvdXIgdWkgZXh0ZW5zaW9uIG1vZHVsZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgVHlwZVNjcmlwdFxuICogXFxATmdNb2R1bGUoe1xuICogICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlXSxcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAgYWRkTmF2TWVudVNlY3Rpb24oe1xuICogICAgICAgaWQ6ICdyZXZpZXdzJyxcbiAqICAgICAgIGxhYmVsOiAnUHJvZHVjdCBSZXZpZXdzJyxcbiAqICAgICAgIHJvdXRlckxpbms6IFsnL2V4dGVuc2lvbnMvcmV2aWV3cyddLFxuICogICAgICAgaWNvbjogJ3N0YXInLFxuICogICAgIH0sXG4gKiAgICAgJ3NldHRpbmdzJyksXG4gKiAgIF0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIE15VWlFeHRlbnNpb25Nb2R1bGUge31cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkTmF2TWVudVNlY3Rpb24oY29uZmlnOiBOYXZNZW51U2VjdGlvbiwgYmVmb3JlPzogc3RyaW5nKTogUHJvdmlkZXIge1xuICAgIHJldHVybiB7XG4gICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIHVzZUZhY3Rvcnk6IChuYXZCdWlsZGVyU2VydmljZTogTmF2QnVpbGRlclNlcnZpY2UpID0+ICgpID0+IHtcbiAgICAgICAgICAgIG5hdkJ1aWxkZXJTZXJ2aWNlLmFkZE5hdk1lbnVTZWN0aW9uKGNvbmZpZywgYmVmb3JlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVwczogW05hdkJ1aWxkZXJTZXJ2aWNlXSxcbiAgICB9O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQWRkIGEgbWVudSBpdGVtIHRvIGFuIGV4aXN0aW5nIHNlY3Rpb24gc3BlY2lmaWVkIGJ5IGBzZWN0aW9uSWRgLiBUaGUgaWQgb2YgdGhlIHNlY3Rpb25cbiAqIGNhbiBiZSBmb3VuZCBieSBpbnNwZWN0aW5nIHRoZSBET00gYW5kIGZpbmRpbmcgdGhlIGBkYXRhLXNlY3Rpb24taWRgIGF0dHJpYnV0ZS5cbiAqIFByb3ZpZGluZyB0aGUgYGJlZm9yZWAgYXJndW1lbnQgd2lsbCBtb3ZlIHRoZSBpdGVtIGJlZm9yZSBhbnkgZXhpc3RpbmcgaXRlbSB3aXRoIHRoZSBzcGVjaWZpZWQgaWQuXG4gKiBJZiBvbWl0dGVkIChvciBpZiB0aGUgbmFtZSBpcyBub3QgZm91bmQpIHRoZSBpdGVtIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlXG4gKiBlbmQgb2YgdGhlIHNlY3Rpb24uXG4gKlxuICogVGhpcyBzaG91bGQgYmUgdXNlZCBpbiB0aGUgTmdNb2R1bGUgYHByb3ZpZGVyc2AgYXJyYXkgb2YgeW91ciB1aSBleHRlbnNpb24gbW9kdWxlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBUeXBlU2NyaXB0XG4gKiBcXEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtTaGFyZWRNb2R1bGVdLFxuICogICBwcm92aWRlcnM6IFtcbiAqICAgICBhZGROYXZNZW51SXRlbSh7XG4gKiAgICAgICBpZDogJ3JlcG9ydHMnLFxuICogICAgICAgbGFiZWw6ICdSZXBvcnRzJyxcbiAqICAgICAgIGl0ZW1zOiBbe1xuICogICAgICAgICAgIC8vIC4uLlxuICogICAgICAgfV0sXG4gKiAgICAgfSxcbiAqICAgICAnbWFya2V0aW5nJyksXG4gKiAgIF0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIE15VWlFeHRlbnNpb25Nb2R1bGUge31cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkTmF2TWVudUl0ZW0oY29uZmlnOiBOYXZNZW51SXRlbSwgc2VjdGlvbklkOiBzdHJpbmcsIGJlZm9yZT86IHN0cmluZyk6IFByb3ZpZGVyIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB1c2VGYWN0b3J5OiAobmF2QnVpbGRlclNlcnZpY2U6IE5hdkJ1aWxkZXJTZXJ2aWNlKSA9PiAoKSA9PiB7XG4gICAgICAgICAgICBuYXZCdWlsZGVyU2VydmljZS5hZGROYXZNZW51SXRlbShjb25maWcsIHNlY3Rpb25JZCwgYmVmb3JlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVwczogW05hdkJ1aWxkZXJTZXJ2aWNlXSxcbiAgICB9O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQWRkcyBhIGJ1dHRvbiB0byB0aGUgQWN0aW9uQmFyIGF0IHRoZSB0b3AgcmlnaHQgb2YgZWFjaCBsaXN0IG9yIGRldGFpbCB2aWV3LiBUaGUgbG9jYXRpb25JZCBjYW5cbiAqIGJlIGRldGVybWluZWQgYnkgaW5zcGVjdGluZyB0aGUgRE9NIGFuZCBmaW5kaW5nIHRoZSA8dmRyLWFjdGlvbi1iYXI+IGVsZW1lbnQgYW5kIGl0c1xuICogYGRhdGEtbG9jYXRpb24taWRgIGF0dHJpYnV0ZS5cbiAqXG4gKiBUaGlzIHNob3VsZCBiZSB1c2VkIGluIHRoZSBOZ01vZHVsZSBgcHJvdmlkZXJzYCBhcnJheSBvZiB5b3VyIHVpIGV4dGVuc2lvbiBtb2R1bGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFR5cGVTY3JpcHRcbiAqIFxcQE5nTW9kdWxlKHtcbiAqICAgaW1wb3J0czogW1NoYXJlZE1vZHVsZV0sXG4gKiAgIHByb3ZpZGVyczogW1xuICogICAgIGFkZEFjdGlvbkJhckl0ZW0oe1xuICogICAgICBpZDogJ3ByaW50LWludm9pY2UnXG4gKiAgICAgIGxhYmVsOiAnUHJpbnQgSW52b2ljZScsXG4gKiAgICAgIGxvY2F0aW9uSWQ6ICdvcmRlci1kZXRhaWwnLFxuICogICAgICByb3V0ZXJMaW5rOiBbJy9leHRlbnNpb25zL2ludm9pY2luZyddLFxuICogICAgIH0pLFxuICogICBdLFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBNeVVpRXh0ZW5zaW9uTW9kdWxlIHt9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEFjdGlvbkJhckl0ZW0oY29uZmlnOiBBY3Rpb25CYXJJdGVtKTogUHJvdmlkZXIge1xuICAgIHJldHVybiB7XG4gICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIHVzZUZhY3Rvcnk6IChuYXZCdWlsZGVyU2VydmljZTogTmF2QnVpbGRlclNlcnZpY2UpID0+ICgpID0+IHtcbiAgICAgICAgICAgIG5hdkJ1aWxkZXJTZXJ2aWNlLmFkZEFjdGlvbkJhckl0ZW0oY29uZmlnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVwczogW05hdkJ1aWxkZXJTZXJ2aWNlXSxcbiAgICB9O1xufVxuXG4vKipcbiAqIFRoaXMgc2VydmljZSBpcyB1c2VkIHRvIGRlZmluZSB0aGUgY29udGVudHMgb2YgY29uZmlndXJhYmxlIG1lbnVzIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTmF2QnVpbGRlclNlcnZpY2Uge1xuICAgIG5hdk1lbnVDb25maWckOiBPYnNlcnZhYmxlPE5hdk1lbnVTZWN0aW9uW10+O1xuICAgIGFjdGlvbkJhckNvbmZpZyQ6IE9ic2VydmFibGU8QWN0aW9uQmFySXRlbVtdPjtcbiAgICBzZWN0aW9uQmFkZ2VzOiB7IFtzZWN0aW9uSWQ6IHN0cmluZ106IE9ic2VydmFibGU8TmF2TWVudUJhZGdlVHlwZT4gfSA9IHt9O1xuXG4gICAgcHJpdmF0ZSBpbml0aWFsTmF2TWVudUNvbmZpZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE5hdk1lbnVTZWN0aW9uW10+KFtdKTtcbiAgICBwcml2YXRlIGFkZGVkTmF2TWVudVNlY3Rpb25zOiBBcnJheTx7IGNvbmZpZzogTmF2TWVudVNlY3Rpb247IGJlZm9yZT86IHN0cmluZyB9PiA9IFtdO1xuICAgIHByaXZhdGUgYWRkZWROYXZNZW51SXRlbXM6IEFycmF5PHtcbiAgICAgICAgY29uZmlnOiBOYXZNZW51SXRlbTtcbiAgICAgICAgc2VjdGlvbklkOiBzdHJpbmc7XG4gICAgICAgIGJlZm9yZT86IHN0cmluZztcbiAgICB9PiA9IFtdO1xuICAgIHByaXZhdGUgYWRkZWRBY3Rpb25CYXJJdGVtczogQWN0aW9uQmFySXRlbVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zZXR1cFN0cmVhbXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGRlZmluZSB0aGUgaW5pdGlhbCBzZWN0aW9ucyBhbmQgaXRlbXMgb2YgdGhlIG1haW4gbmF2IG1lbnUuXG4gICAgICovXG4gICAgZGVmaW5lTmF2TWVudVNlY3Rpb25zKGNvbmZpZzogTmF2TWVudVNlY3Rpb25bXSkge1xuICAgICAgICB0aGlzLmluaXRpYWxOYXZNZW51Q29uZmlnJC5uZXh0KGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgc2VjdGlvbiB0byB0aGUgbWFpbiBuYXYgbWVudS4gUHJvdmlkaW5nIHRoZSBgYmVmb3JlYCBhcmd1bWVudCB3aWxsXG4gICAgICogbW92ZSB0aGUgc2VjdGlvbiBiZWZvcmUgYW55IGV4aXN0aW5nIHNlY3Rpb24gd2l0aCB0aGUgc3BlY2lmaWVkIGlkLiBJZlxuICAgICAqIG9taXR0ZWQgKG9yIGlmIHRoZSBpZCBpcyBub3QgZm91bmQpIHRoZSBzZWN0aW9uIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlXG4gICAgICogZXhpc3Rpbmcgc2V0IG9mIHNlY3Rpb25zLlxuICAgICAqXG4gICAgICogUHJvdmlkaW5nIHRoZSBgaWRgIG9mIGFuIGV4aXN0aW5nIHNlY3Rpb24gd2lsbCByZXBsYWNlIHRoYXQgc2VjdGlvbi5cbiAgICAgKi9cbiAgICBhZGROYXZNZW51U2VjdGlvbihjb25maWc6IE5hdk1lbnVTZWN0aW9uLCBiZWZvcmU/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hZGRlZE5hdk1lbnVTZWN0aW9ucy5wdXNoKHsgY29uZmlnLCBiZWZvcmUgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgbWVudSBpdGVtIHRvIGFuIGV4aXN0aW5nIHNlY3Rpb24gc3BlY2lmaWVkIGJ5IGBzZWN0aW9uSWRgLiBUaGUgaWQgb2YgdGhlIHNlY3Rpb25cbiAgICAgKiBjYW4gYmUgZm91bmQgYnkgaW5zcGVjdGluZyB0aGUgRE9NIGFuZCBmaW5kaW5nIHRoZSBgZGF0YS1zZWN0aW9uLWlkYCBhdHRyaWJ1dGUuXG4gICAgICogUHJvdmlkaW5nIHRoZSBgYmVmb3JlYCBhcmd1bWVudCB3aWxsIG1vdmUgdGhlIGl0ZW0gYmVmb3JlIGFueSBleGlzdGluZyBpdGVtIHdpdGggdGhlIHNwZWNpZmllZCBpZC5cbiAgICAgKiBJZiBvbWl0dGVkIChvciBpZiB0aGUgbmFtZSBpcyBub3QgZm91bmQpIHRoZSBpdGVtIHdpbGwgYmUgYXBwZW5kZWQgdG8gdGhlXG4gICAgICogZW5kIG9mIHRoZSBzZWN0aW9uLlxuICAgICAqXG4gICAgICogUHJvdmlkaW5nIHRoZSBgaWRgIG9mIGFuIGV4aXN0aW5nIGl0ZW0gaW4gdGhhdCBzZWN0aW9uIHdpbGwgcmVwbGFjZVxuICAgICAqIHRoYXQgaXRlbS5cbiAgICAgKi9cbiAgICBhZGROYXZNZW51SXRlbShjb25maWc6IE5hdk1lbnVJdGVtLCBzZWN0aW9uSWQ6IHN0cmluZywgYmVmb3JlPzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYWRkZWROYXZNZW51SXRlbXMucHVzaCh7IGNvbmZpZywgc2VjdGlvbklkLCBiZWZvcmUgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGJ1dHRvbiB0byB0aGUgQWN0aW9uQmFyIGF0IHRoZSB0b3AgcmlnaHQgb2YgZWFjaCBsaXN0IG9yIGRldGFpbCB2aWV3LiBUaGUgbG9jYXRpb25JZCBjYW5cbiAgICAgKiBiZSBkZXRlcm1pbmVkIGJ5IGluc3BlY3RpbmcgdGhlIERPTSBhbmQgZmluZGluZyB0aGUgPHZkci1hY3Rpb24tYmFyPiBlbGVtZW50IGFuZCBpdHNcbiAgICAgKiBgZGF0YS1sb2NhdGlvbi1pZGAgYXR0cmlidXRlLlxuICAgICAqL1xuICAgIGFkZEFjdGlvbkJhckl0ZW0oY29uZmlnOiBBY3Rpb25CYXJJdGVtKSB7XG4gICAgICAgIHRoaXMuYWRkZWRBY3Rpb25CYXJJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIHJlcXVpcmVzUGVybWlzc2lvbjogUGVybWlzc2lvbi5BdXRoZW50aWNhdGVkLFxuICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRSb3V0ZXJMaW5rKGNvbmZpZzogeyByb3V0ZXJMaW5rPzogUm91dGVyTGlua0RlZmluaXRpb24gfSwgcm91dGU6IEFjdGl2YXRlZFJvdXRlKTogc3RyaW5nW10gfCBudWxsIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcucm91dGVyTGluayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5yb3V0ZXJMaW5rKHJvdXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcucm91dGVyTGluaykpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25maWcucm91dGVyTGluaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwU3RyZWFtcygpIHtcbiAgICAgICAgY29uc3Qgc2VjdGlvbkFkZGl0aW9ucyQgPSBvZih0aGlzLmFkZGVkTmF2TWVudVNlY3Rpb25zKTtcbiAgICAgICAgY29uc3QgaXRlbUFkZGl0aW9ucyQgPSBvZih0aGlzLmFkZGVkTmF2TWVudUl0ZW1zKTtcblxuICAgICAgICBjb25zdCBjb21iaW5lZENvbmZpZyQgPSBjb21iaW5lTGF0ZXN0KHRoaXMuaW5pdGlhbE5hdk1lbnVDb25maWckLCBzZWN0aW9uQWRkaXRpb25zJCkucGlwZShcbiAgICAgICAgICAgIG1hcCgoW2luaXRpYWxDb25maWcsIGFkZGl0aW9uc10pID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHsgY29uZmlnLCBiZWZvcmUgfSBvZiBhZGRpdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb25maWcucmVxdWlyZXNQZXJtaXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcucmVxdWlyZXNQZXJtaXNzaW9uID0gUGVybWlzc2lvbi5BdXRoZW50aWNhdGVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nSW5kZXggPSBpbml0aWFsQ29uZmlnLmZpbmRJbmRleChjID0+IGMuaWQgPT09IGNvbmZpZy5pZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgtMSA8IGV4aXN0aW5nSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxDb25maWdbZXhpc3RpbmdJbmRleF0gPSBjb25maWc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmVmb3JlSW5kZXggPSBpbml0aWFsQ29uZmlnLmZpbmRJbmRleChjID0+IGMuaWQgPT09IGJlZm9yZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgtMSA8IGJlZm9yZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoLTEgPCBleGlzdGluZ0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbENvbmZpZy5zcGxpY2UoZXhpc3RpbmdJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsQ29uZmlnLnNwbGljZShiZWZvcmVJbmRleCwgMCwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChleGlzdGluZ0luZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbENvbmZpZy5wdXNoKGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxDb25maWc7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMubmF2TWVudUNvbmZpZyQgPSBjb21iaW5lTGF0ZXN0KGNvbWJpbmVkQ29uZmlnJCwgaXRlbUFkZGl0aW9ucyQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKFtzZWN0aW9ucywgYWRkaXRpb25hbEl0ZW1zXSkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBhZGRpdGlvbmFsSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHNlY3Rpb25zLmZpbmQocyA9PiBzLmlkID09PSBpdGVtLnNlY3Rpb25JZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYENvdWxkIG5vdCBhZGQgbWVudSBpdGVtIFwiJHtpdGVtLmNvbmZpZy5pZH1cIiwgc2VjdGlvbiBcIiR7aXRlbS5zZWN0aW9uSWR9XCIgZG9lcyBub3QgZXhpc3RgLFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgY29uZmlnLCBzZWN0aW9uSWQsIGJlZm9yZSB9ID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nSW5kZXggPSBzZWN0aW9uLml0ZW1zLmZpbmRJbmRleChpID0+IGkuaWQgPT09IGNvbmZpZy5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoLTEgPCBleGlzdGluZ0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbi5pdGVtc1tleGlzdGluZ0luZGV4XSA9IGNvbmZpZztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJlZm9yZUluZGV4ID0gc2VjdGlvbi5pdGVtcy5maW5kSW5kZXgoaSA9PiBpLmlkID09PSBiZWZvcmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC0xIDwgYmVmb3JlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoLTEgPCBleGlzdGluZ0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb24uaXRlbXMuc3BsaWNlKGV4aXN0aW5nSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uLml0ZW1zLnNwbGljZShiZWZvcmVJbmRleCwgMCwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXhpc3RpbmdJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uLml0ZW1zLnB1c2goY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEFnZ3JlZ2F0ZSBhbnkgYmFkZ2VzIGRlZmluZWQgZm9yIHRoZSBuYXYgaXRlbXMgaW4gZWFjaCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzZWN0aW9uIG9mIHNlY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1CYWRnZVN0YXR1c2VzID0gc2VjdGlvbi5pdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChpID0+IGkuc3RhdHVzQmFkZ2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKG5vdE51bGxPclVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VjdGlvbkJhZGdlc1tzZWN0aW9uLmlkXSA9IGNvbWJpbmVMYXRlc3QoaXRlbUJhZGdlU3RhdHVzZXMpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAoYmFkZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9wYWdhdGluZ0JhZGdlcyA9IGJhZGdlcy5maWx0ZXIoYiA9PiBiLnByb3BhZ2F0ZVRvU2VjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BhZ2F0aW5nQmFkZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNlcyA9IHByb3BhZ2F0aW5nQmFkZ2VzLm1hcChiID0+IGIudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1c2VzLmluY2x1ZGVzKCdlcnJvcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnZXJyb3InO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzZXMuaW5jbHVkZXMoJ3dhcm5pbmcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3dhcm5pbmcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzZXMuaW5jbHVkZXMoJ2luZm8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2luZm8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25zO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hY3Rpb25CYXJDb25maWckID0gb2YodGhpcy5hZGRlZEFjdGlvbkJhckl0ZW1zKTtcbiAgICB9XG59XG4iXX0=