import { Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionBarItem, NavMenuBadgeType, NavMenuItem, NavMenuSection, RouterLinkDefinition } from './nav-builder-types';
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
export declare function addNavMenuSection(config: NavMenuSection, before?: string): Provider;
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
export declare function addNavMenuItem(config: NavMenuItem, sectionId: string, before?: string): Provider;
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
export declare function addActionBarItem(config: ActionBarItem): Provider;
/**
 * This service is used to define the contents of configurable menus in the application.
 */
export declare class NavBuilderService {
    navMenuConfig$: Observable<NavMenuSection[]>;
    actionBarConfig$: Observable<ActionBarItem[]>;
    sectionBadges: {
        [sectionId: string]: Observable<NavMenuBadgeType>;
    };
    private initialNavMenuConfig$;
    private addedNavMenuSections;
    private addedNavMenuItems;
    private addedActionBarItems;
    constructor();
    /**
     * Used to define the initial sections and items of the main nav menu.
     */
    defineNavMenuSections(config: NavMenuSection[]): void;
    /**
     * Add a section to the main nav menu. Providing the `before` argument will
     * move the section before any existing section with the specified id. If
     * omitted (or if the id is not found) the section will be appended to the
     * existing set of sections.
     *
     * Providing the `id` of an existing section will replace that section.
     */
    addNavMenuSection(config: NavMenuSection, before?: string): void;
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
    addNavMenuItem(config: NavMenuItem, sectionId: string, before?: string): void;
    /**
     * Adds a button to the ActionBar at the top right of each list or detail view. The locationId can
     * be determined by inspecting the DOM and finding the <vdr-action-bar> element and its
     * `data-location-id` attribute.
     */
    addActionBarItem(config: ActionBarItem): void;
    getRouterLink(config: {
        routerLink?: RouterLinkDefinition;
    }, route: ActivatedRoute): string[] | null;
    private setupStreams;
}
