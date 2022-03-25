import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ModalService } from '@vendure/admin-ui/core';
import { CUSTOMER_ROLE_CODE, SUPER_ADMIN_ROLE_CODE } from '@vendure/common/lib/shared-constants';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
export class RoleListComponent extends BaseListComponent {
    constructor(modalService, notificationService, dataService, router, route) {
        super(router, route);
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.dataService = dataService;
        this.initialLimit = 3;
        this.displayLimit = {};
        super.setQueryFn((...args) => this.dataService.administrator.getRoles(...args), data => data.roles);
    }
    ngOnInit() {
        super.ngOnInit();
        this.visibleRoles$ = this.items$.pipe(map(roles => roles.filter(role => role.code !== CUSTOMER_ROLE_CODE)));
    }
    toggleDisplayLimit(role) {
        if (this.displayLimit[role.id] === role.permissions.length) {
            this.displayLimit[role.id] = this.initialLimit;
        }
        else {
            this.displayLimit[role.id] = role.permissions.length;
        }
    }
    isDefaultRole(role) {
        return role.code === SUPER_ADMIN_ROLE_CODE || role.code === CUSTOMER_ROLE_CODE;
    }
    deleteRole(id) {
        this.modalService
            .dialog({
            title: _('settings.confirm-delete-role'),
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => (response ? this.dataService.administrator.deleteRole(id) : EMPTY)))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'Role',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'Role',
            });
        });
    }
}
RoleListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-role-list',
                template: "<vdr-action-bar>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"role-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" [routerLink]=\"['./create']\" *vdrIfPermissions=\"'CreateAdministrator'\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'settings.create-new-role' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<vdr-data-table\n    [items]=\"visibleRoles$ | async\"\n    [itemsPerPage]=\"itemsPerPage$ | async\"\n    [totalItems]=\"totalItems$ | async\"\n    [currentPage]=\"currentPage$ | async\"\n    (pageChange)=\"setPageNumber($event)\"\n    (itemsPerPageChange)=\"setItemsPerPage($event)\"\n>\n    <vdr-dt-column>{{ 'common.description' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.channel' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'settings.permissions' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-role=\"item\">\n        <td class=\"left align-middle\">{{ role.description }}</td>\n        <td class=\"left align-middle\"><span *ngIf=\"!isDefaultRole(role)\">{{ role.code }}</span></td>\n        <td class=\"left align-middle\">\n            <ng-container *ngIf=\"!isDefaultRole(role)\">\n                <vdr-chip *ngFor=\"let channel of role.channels\">\n                    <vdr-channel-badge [channelCode]=\"channel.code\"></vdr-channel-badge>\n                    {{ channel.code | channelCodeToLabel | translate }}\n                </vdr-chip>\n            </ng-container>\n        </td>\n        <td class=\"left align-middle\">\n            <ng-container *ngIf=\"!isDefaultRole(role); else defaultRole\">\n                <vdr-chip *ngFor=\"let permission of role.permissions |  slice: 0:displayLimit[role.id] || 3\">{{ permission }}</vdr-chip>\n                <button\n                    class=\"btn btn-sm btn-secondary btn-icon\"\n                    *ngIf=\"role.permissions.length > initialLimit\"\n                    (click)=\"toggleDisplayLimit(role)\"\n                >\n                    <ng-container *ngIf=\"(displayLimit[role.id] || 0) < role.permissions.length; else collapse\">\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ role.permissions.length - initialLimit }}\n                    </ng-container>\n                    <ng-template #collapse>\n                        <clr-icon shape=\"minus\"></clr-icon>\n                    </ng-template>\n                </button>\n            </ng-container>\n            <ng-template #defaultRole>\n                <span class=\"default-role-label\">{{ 'settings.default-role-label' | translate }}</span>\n            </ng-template>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-table-row-action\n                *ngIf=\"!isDefaultRole(role)\"\n                iconShape=\"edit\"\n                [label]=\"'common.edit' | translate\"\n                [linkTo]=\"['./', role.id]\"\n            ></vdr-table-row-action>\n        </td>\n        <td class=\"right align-middle\">\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger [disabled]=\"isDefaultRole(role)\">\n                    {{ 'common.actions' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button\n                        type=\"button\"\n                        class=\"delete-button\"\n                        (click)=\"deleteRole(role.id)\"\n                        [disabled]=\"!('SuperAdmin' | hasPermission)\"\n                        vdrDropdownItem\n                    >\n                        <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                        {{ 'common.delete' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".default-role-label{color:var(--color-grey-400)}"]
            },] }
];
RoleListComponent.ctorParameters = () => [
    { type: ModalService },
    { type: NotificationService },
    { type: DataService },
    { type: Router },
    { type: ActivatedRoute }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvcm9sZS1saXN0L3JvbGUtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNqRyxPQUFPLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRaEQsTUFBTSxPQUFPLGlCQUFrQixTQUFRLGlCQUFpRDtJQUtwRixZQUNZLFlBQTBCLEVBQzFCLG1CQUF3QyxFQUN4QyxXQUF3QixFQUNoQyxNQUFjLEVBQ2QsS0FBcUI7UUFFckIsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQU5iLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFQM0IsaUJBQVks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bnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQgeyBCYXNlTGlzdENvbXBvbmVudCB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgR2V0Um9sZXMsIFJvbGUgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBNb2RhbFNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IENVU1RPTUVSX1JPTEVfQ09ERSwgU1VQRVJfQURNSU5fUk9MRV9DT0RFIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtY29uc3RhbnRzJztcbmltcG9ydCB7IEVNUFRZLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcm9sZS1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcm9sZS1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9yb2xlLWxpc3QuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUm9sZUxpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlTGlzdENvbXBvbmVudDxHZXRSb2xlcy5RdWVyeSwgR2V0Um9sZXMuSXRlbXM+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICByZWFkb25seSBpbml0aWFsTGltaXQgPSAzO1xuICAgIGRpc3BsYXlMaW1pdDogeyBbaWQ6IHN0cmluZ106IG51bWJlciB9ID0ge307XG4gICAgdmlzaWJsZVJvbGVzJDogT2JzZXJ2YWJsZTxHZXRSb2xlcy5JdGVtc1tdPjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICkge1xuICAgICAgICBzdXBlcihyb3V0ZXIsIHJvdXRlKTtcbiAgICAgICAgc3VwZXIuc2V0UXVlcnlGbihcbiAgICAgICAgICAgICguLi5hcmdzOiBhbnlbXSkgPT4gdGhpcy5kYXRhU2VydmljZS5hZG1pbmlzdHJhdG9yLmdldFJvbGVzKC4uLmFyZ3MpLFxuICAgICAgICAgICAgZGF0YSA9PiBkYXRhLnJvbGVzLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICB0aGlzLnZpc2libGVSb2xlcyQgPSB0aGlzLml0ZW1zJC5waXBlKFxuICAgICAgICAgICAgbWFwKHJvbGVzID0+IHJvbGVzLmZpbHRlcihyb2xlID0+IHJvbGUuY29kZSAhPT0gQ1VTVE9NRVJfUk9MRV9DT0RFKSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRGlzcGxheUxpbWl0KHJvbGU6IEdldFJvbGVzLkl0ZW1zKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlMaW1pdFtyb2xlLmlkXSA9PT0gcm9sZS5wZXJtaXNzaW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUxpbWl0W3JvbGUuaWRdID0gdGhpcy5pbml0aWFsTGltaXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlMaW1pdFtyb2xlLmlkXSA9IHJvbGUucGVybWlzc2lvbnMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNEZWZhdWx0Um9sZShyb2xlOiBSb2xlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiByb2xlLmNvZGUgPT09IFNVUEVSX0FETUlOX1JPTEVfQ09ERSB8fCByb2xlLmNvZGUgPT09IENVU1RPTUVSX1JPTEVfQ09ERTtcbiAgICB9XG5cbiAgICBkZWxldGVSb2xlKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5kaWFsb2coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBfKCdzZXR0aW5ncy5jb25maXJtLWRlbGV0ZS1yb2xlJyksXG4gICAgICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZWNvbmRhcnknLCBsYWJlbDogXygnY29tbW9uLmNhbmNlbCcpIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ2RhbmdlcicsIGxhYmVsOiBfKCdjb21tb24uZGVsZXRlJyksIHJldHVyblZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShzd2l0Y2hNYXAocmVzcG9uc2UgPT4gKHJlc3BvbnNlID8gdGhpcy5kYXRhU2VydmljZS5hZG1pbmlzdHJhdG9yLmRlbGV0ZVJvbGUoaWQpIDogRU1QVFkpKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LWRlbGV0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1JvbGUnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS1kZWxldGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnUm9sZScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==