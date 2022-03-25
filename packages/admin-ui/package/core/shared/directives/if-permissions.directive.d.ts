import { ChangeDetectorRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from '../../common/generated-types';
import { DataService } from '../../data/providers/data.service';
import { IfDirectiveBase } from './if-directive-base';
/**
 * Conditionally shows/hides templates based on the current active user having the specified permission.
 * Based on the ngIf source. Also support "else" templates:
 *
 * @example
 * ```html
 * <button *vdrIfPermissions="'DeleteCatalog'; else unauthorized">Delete Product</button>
 * <ng-template #unauthorized>Not allowed!</ng-template>
 * ```
 *
 * The permission can be a single string, or an array. If an array is passed, then _all_ of the permissions
 * must match (logical AND)
 */
export declare class IfPermissionsDirective extends IfDirectiveBase<Array<Permission[] | null>> {
    private dataService;
    private changeDetectorRef;
    private permissionToCheck;
    constructor(_viewContainer: ViewContainerRef, templateRef: TemplateRef<any>, dataService: DataService, changeDetectorRef: ChangeDetectorRef);
    /**
     * The permission to check to determine whether to show the template.
     */
    set vdrIfPermissions(permission: string | string[] | null);
    /**
     * A template to show if the current user does not have the specified permission.
     */
    set vdrIfPermissionsElse(templateRef: TemplateRef<any> | null);
}
