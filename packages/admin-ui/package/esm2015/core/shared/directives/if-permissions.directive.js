import { ChangeDetectorRef, Directive, Input, TemplateRef, ViewContainerRef, } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
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
export class IfPermissionsDirective extends IfDirectiveBase {
    constructor(_viewContainer, templateRef, dataService, changeDetectorRef) {
        super(_viewContainer, templateRef, permissions => {
            if (permissions == null) {
                return of(true);
            }
            else if (!permissions) {
                return of(false);
            }
            return this.dataService.client
                .userStatus()
                .mapStream(({ userStatus }) => {
                for (const permission of permissions) {
                    if (userStatus.permissions.includes(permission)) {
                        return true;
                    }
                }
                return false;
            })
                .pipe(tap(() => this.changeDetectorRef.markForCheck()));
        });
        this.dataService = dataService;
        this.changeDetectorRef = changeDetectorRef;
        this.permissionToCheck = ['__initial_value__'];
    }
    /**
     * The permission to check to determine whether to show the template.
     */
    set vdrIfPermissions(permission) {
        this.permissionToCheck =
            (permission && (Array.isArray(permission) ? permission : [permission])) || null;
        this.updateArgs$.next([this.permissionToCheck]);
    }
    /**
     * A template to show if the current user does not have the specified permission.
     */
    set vdrIfPermissionsElse(templateRef) {
        this.setElseTemplate(templateRef);
        this.updateArgs$.next([this.permissionToCheck]);
    }
}
IfPermissionsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrIfPermissions]',
            },] }
];
IfPermissionsDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef },
    { type: DataService },
    { type: ChangeDetectorRef }
];
IfPermissionsDirective.propDecorators = {
    vdrIfPermissions: [{ type: Input }],
    vdrIfPermissionsElse: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtcGVybWlzc2lvbnMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvZGlyZWN0aXZlcy9pZi1wZXJtaXNzaW9ucy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILGlCQUFpQixFQUNqQixTQUFTLEVBRVQsS0FBSyxFQUNMLFdBQVcsRUFDWCxnQkFBZ0IsR0FDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRWhFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RDs7Ozs7Ozs7Ozs7O0dBWUc7QUFJSCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsZUFBMkM7SUFHbkYsWUFDSSxjQUFnQyxFQUNoQyxXQUE2QixFQUNyQixXQUF3QixFQUN4QixpQkFBb0M7UUFFNUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLEVBQUU7WUFDN0MsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO2dCQUNyQixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQjtpQkFBTSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNyQixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQjtZQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO2lCQUN6QixVQUFVLEVBQUU7aUJBQ1osU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO2dCQUMxQixLQUFLLE1BQU0sVUFBVSxJQUFJLFdBQVcsRUFBRTtvQkFDbEMsSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDN0MsT0FBTyxJQUFJLENBQUM7cUJBQ2Y7aUJBQ0o7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUMsQ0FBQztRQXBCSyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBTnhDLHNCQUFpQixHQUFvQixDQUFDLG1CQUFtQixDQUFDLENBQUM7SUEwQm5FLENBQUM7SUFFRDs7T0FFRztJQUNILElBQ0ksZ0JBQWdCLENBQUMsVUFBb0M7UUFDckQsSUFBSSxDQUFDLGlCQUFpQjtZQUNsQixDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO1FBQ3BGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUNJLG9CQUFvQixDQUFDLFdBQW9DO1FBQ3pELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7OztZQWpESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjthQUNqQzs7O1lBekJHLGdCQUFnQjtZQURoQixXQUFXO1lBT04sV0FBVztZQVhoQixpQkFBaUI7OzsrQkErRGhCLEtBQUs7bUNBVUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVtYmVkZGVkVmlld1JlZixcbiAgICBJbnB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFBlcm1pc3Npb24gfSBmcm9tICcuLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgSWZEaXJlY3RpdmVCYXNlIH0gZnJvbSAnLi9pZi1kaXJlY3RpdmUtYmFzZSc7XG5cbi8qKlxuICogQ29uZGl0aW9uYWxseSBzaG93cy9oaWRlcyB0ZW1wbGF0ZXMgYmFzZWQgb24gdGhlIGN1cnJlbnQgYWN0aXZlIHVzZXIgaGF2aW5nIHRoZSBzcGVjaWZpZWQgcGVybWlzc2lvbi5cbiAqIEJhc2VkIG9uIHRoZSBuZ0lmIHNvdXJjZS4gQWxzbyBzdXBwb3J0IFwiZWxzZVwiIHRlbXBsYXRlczpcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGJ1dHRvbiAqdmRySWZQZXJtaXNzaW9ucz1cIidEZWxldGVDYXRhbG9nJzsgZWxzZSB1bmF1dGhvcml6ZWRcIj5EZWxldGUgUHJvZHVjdDwvYnV0dG9uPlxuICogPG5nLXRlbXBsYXRlICN1bmF1dGhvcml6ZWQ+Tm90IGFsbG93ZWQhPC9uZy10ZW1wbGF0ZT5cbiAqIGBgYFxuICpcbiAqIFRoZSBwZXJtaXNzaW9uIGNhbiBiZSBhIHNpbmdsZSBzdHJpbmcsIG9yIGFuIGFycmF5LiBJZiBhbiBhcnJheSBpcyBwYXNzZWQsIHRoZW4gX2FsbF8gb2YgdGhlIHBlcm1pc3Npb25zXG4gKiBtdXN0IG1hdGNoIChsb2dpY2FsIEFORClcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdmRySWZQZXJtaXNzaW9uc10nLFxufSlcbmV4cG9ydCBjbGFzcyBJZlBlcm1pc3Npb25zRGlyZWN0aXZlIGV4dGVuZHMgSWZEaXJlY3RpdmVCYXNlPEFycmF5PFBlcm1pc3Npb25bXSB8IG51bGw+PiB7XG4gICAgcHJpdmF0ZSBwZXJtaXNzaW9uVG9DaGVjazogc3RyaW5nW10gfCBudWxsID0gWydfX2luaXRpYWxfdmFsdWVfXyddO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIF92aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICAgICAgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICkge1xuICAgICAgICBzdXBlcihfdmlld0NvbnRhaW5lciwgdGVtcGxhdGVSZWYsIHBlcm1pc3Npb25zID0+IHtcbiAgICAgICAgICAgIGlmIChwZXJtaXNzaW9ucyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghcGVybWlzc2lvbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50XG4gICAgICAgICAgICAgICAgLnVzZXJTdGF0dXMoKVxuICAgICAgICAgICAgICAgIC5tYXBTdHJlYW0oKHsgdXNlclN0YXR1cyB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGVybWlzc2lvbiBvZiBwZXJtaXNzaW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJTdGF0dXMucGVybWlzc2lvbnMuaW5jbHVkZXMocGVybWlzc2lvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAucGlwZSh0YXAoKCkgPT4gdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcGVybWlzc2lvbiB0byBjaGVjayB0byBkZXRlcm1pbmUgd2hldGhlciB0byBzaG93IHRoZSB0ZW1wbGF0ZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCB2ZHJJZlBlcm1pc3Npb25zKHBlcm1pc3Npb246IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVsbCkge1xuICAgICAgICB0aGlzLnBlcm1pc3Npb25Ub0NoZWNrID1cbiAgICAgICAgICAgIChwZXJtaXNzaW9uICYmIChBcnJheS5pc0FycmF5KHBlcm1pc3Npb24pID8gcGVybWlzc2lvbiA6IFtwZXJtaXNzaW9uXSkpIHx8IG51bGw7XG4gICAgICAgIHRoaXMudXBkYXRlQXJncyQubmV4dChbdGhpcy5wZXJtaXNzaW9uVG9DaGVjayBhcyBQZXJtaXNzaW9uW11dKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIHRlbXBsYXRlIHRvIHNob3cgaWYgdGhlIGN1cnJlbnQgdXNlciBkb2VzIG5vdCBoYXZlIHRoZSBzcGVjaWZpZWQgcGVybWlzc2lvbi5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCB2ZHJJZlBlcm1pc3Npb25zRWxzZSh0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PiB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5zZXRFbHNlVGVtcGxhdGUodGVtcGxhdGVSZWYpO1xuICAgICAgICB0aGlzLnVwZGF0ZUFyZ3MkLm5leHQoW3RoaXMucGVybWlzc2lvblRvQ2hlY2sgYXMgUGVybWlzc2lvbltdXSk7XG4gICAgfVxufVxuIl19