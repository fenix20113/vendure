import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HealthCheckService } from '@vendure/admin-ui/core';
export class HealthCheckComponent {
    constructor(healthCheckService) {
        this.healthCheckService = healthCheckService;
    }
}
HealthCheckComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-health-check',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"system-status-header\" *ngIf=\"healthCheckService.status$ | async as status\">\n            <div class=\"status-icon\">\n                <clr-icon\n                    [attr.shape]=\"status === 'ok' ? 'check-circle' : 'exclamation-circle'\"\n                    [ngClass]=\"{ 'is-success': status === 'ok', 'is-danger': status !== 'ok' }\"\n                    size=\"48\"\n                ></clr-icon>\n            </div>\n            <div class=\"status-detail\">\n                <ng-container *ngIf=\"status === 'ok'; else error\">\n                    {{ 'system.health-all-systems-up' | translate }}\n                </ng-container>\n                <ng-template #error>\n                    {{ 'system.health-error' | translate }}\n                </ng-template>\n                <div class=\"last-checked\">\n                    {{ 'system.health-last-checked' | translate }}:\n                    {{ healthCheckService.lastCheck$ | async | localeDate: 'mediumTime' }}\n                </div>\n            </div>\n        </div>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"system-status\"></vdr-action-bar-items>\n        <button class=\"btn btn-secondary\" (click)=\"healthCheckService.refresh()\">\n            <clr-icon shape=\"refresh\"></clr-icon> {{ 'system.health-refresh' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<table class=\"table\">\n    <thead>\n        <tr>\n            <th class=\"left\">\n                {{ 'common.name' | translate }}\n            </th>\n            <th class=\"left\">\n                {{ 'system.health-status' | translate }}\n            </th>\n            <th class=\"left\">\n                {{ 'system.health-message' | translate }}\n            </th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let row of healthCheckService.details$ | async\">\n            <td class=\"align-middle left\">{{ row.key }}</td>\n            <td class=\"align-middle left\">\n                <vdr-chip [colorType]=\"row.result.status === 'up' ? 'success' : 'error'\">\n                    <ng-container *ngIf=\"row.result.status === 'up'; else down\">\n                        <clr-icon shape=\"check-circle\"></clr-icon>\n                        {{ 'system.health-status-up' | translate }}\n                    </ng-container>\n                    <ng-template #down>\n                        <clr-icon shape=\"exclamation-circle\"></clr-icon>\n                        {{ 'system.health-status-down' | translate }}\n                    </ng-template>\n                </vdr-chip>\n            </td>\n            <td class=\"align-middle left\">{{ row.result.message }}</td>\n        </tr>\n    </tbody>\n</table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".system-status-header{display:flex;justify-content:space-between;align-items:flex-start}.system-status-header .status-detail{font-weight:700}.system-status-header .last-checked{font-weight:400;color:var(--color-grey-500)}"]
            },] }
];
HealthCheckComponent.ctorParameters = () => [
    { type: HealthCheckService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhbHRoLWNoZWNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc3lzdGVtL3NyYy9jb21wb25lbnRzL2hlYWx0aC1jaGVjay9oZWFsdGgtY2hlY2suY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRNUQsTUFBTSxPQUFPLG9CQUFvQjtJQUM3QixZQUFtQixrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtJQUFHLENBQUM7OztZQVBoRSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsNHZGQUE0QztnQkFFNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFQUSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIZWFsdGhDaGVja1NlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItaGVhbHRoLWNoZWNrJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaGVhbHRoLWNoZWNrLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9oZWFsdGgtY2hlY2suY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgSGVhbHRoQ2hlY2tDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBoZWFsdGhDaGVja1NlcnZpY2U6IEhlYWx0aENoZWNrU2VydmljZSkge31cbn1cbiJdfQ==