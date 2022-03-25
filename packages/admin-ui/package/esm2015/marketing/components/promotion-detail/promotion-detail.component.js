import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, DataService, encodeConfigArgValue, getConfigArgValue, getDefaultConfigArgValue, NotificationService, ServerConfigService, } from '@vendure/admin-ui/core';
import { mergeMap, take } from 'rxjs/operators';
export class PromotionDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.conditions = [];
        this.actions = [];
        this.allConditions = [];
        this.allActions = [];
        this.detailForm = this.formBuilder.group({
            name: ['', Validators.required],
            enabled: true,
            couponCode: null,
            perCustomerUsageLimit: null,
            startsAt: null,
            endsAt: null,
            conditions: this.formBuilder.array([]),
            actions: this.formBuilder.array([]),
        });
    }
    ngOnInit() {
        this.init();
        this.promotion$ = this.entity$;
        this.dataService.promotion.getPromotionActionsAndConditions().single$.subscribe(data => {
            this.allActions = data.promotionActions;
            this.allConditions = data.promotionConditions;
            this.changeDetector.markForCheck();
        });
    }
    ngOnDestroy() {
        this.destroy();
    }
    getAvailableConditions() {
        return this.allConditions.filter(o => !this.conditions.find(c => c.code === o.code));
    }
    getConditionDefinition(condition) {
        return this.allConditions.find(c => c.code === condition.code);
    }
    getAvailableActions() {
        return this.allActions.filter(o => !this.actions.find(a => a.code === o.code));
    }
    getActionDefinition(action) {
        return this.allActions.find(c => c.code === action.code);
    }
    saveButtonEnabled() {
        return (this.detailForm.dirty &&
            this.detailForm.valid &&
            (this.conditions.length !== 0 || this.detailForm.value.couponCode) &&
            this.actions.length !== 0);
    }
    addCondition(condition) {
        this.addOperation('conditions', condition);
        this.detailForm.markAsDirty();
    }
    addAction(action) {
        this.addOperation('actions', action);
        this.detailForm.markAsDirty();
    }
    removeCondition(condition) {
        this.removeOperation('conditions', condition);
        this.detailForm.markAsDirty();
    }
    removeAction(action) {
        this.removeOperation('actions', action);
        this.detailForm.markAsDirty();
    }
    formArrayOf(key) {
        return this.detailForm.get(key);
    }
    create() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        const input = {
            name: formValue.name,
            enabled: true,
            couponCode: formValue.couponCode,
            perCustomerUsageLimit: formValue.perCustomerUsageLimit,
            startsAt: formValue.startsAt,
            endsAt: formValue.endsAt,
            conditions: this.mapOperationsToInputs(this.conditions, formValue.conditions),
            actions: this.mapOperationsToInputs(this.actions, formValue.actions),
        };
        this.dataService.promotion.createPromotion(input).subscribe(({ createPromotion }) => {
            switch (createPromotion.__typename) {
                case 'Promotion':
                    this.notificationService.success(_('common.notify-create-success'), {
                        entity: 'Promotion',
                    });
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.router.navigate(['../', createPromotion.id], { relativeTo: this.route });
                    break;
                case 'MissingConditionsError':
                    this.notificationService.error(createPromotion.message);
                    break;
            }
        }, err => {
            this.notificationService.error(_('common.notify-create-error'), {
                entity: 'Promotion',
            });
        });
    }
    save() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        this.promotion$
            .pipe(take(1), mergeMap(promotion => {
            const input = {
                id: promotion.id,
                name: formValue.name,
                enabled: formValue.enabled,
                couponCode: formValue.couponCode,
                perCustomerUsageLimit: formValue.perCustomerUsageLimit,
                startsAt: formValue.startsAt,
                endsAt: formValue.endsAt,
                conditions: this.mapOperationsToInputs(this.conditions, formValue.conditions),
                actions: this.mapOperationsToInputs(this.actions, formValue.actions),
            };
            return this.dataService.promotion.updatePromotion(input);
        }))
            .subscribe(data => {
            this.notificationService.success(_('common.notify-update-success'), {
                entity: 'Promotion',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
                entity: 'Promotion',
            });
        });
    }
    /**
     * Update the form values when the entity changes.
     */
    setFormValues(entity, languageCode) {
        this.detailForm.patchValue({
            name: entity.name,
            enabled: entity.enabled,
            couponCode: entity.couponCode,
            perCustomerUsageLimit: entity.perCustomerUsageLimit,
            startsAt: entity.startsAt,
            endsAt: entity.endsAt,
        });
        entity.conditions.forEach(o => {
            this.addOperation('conditions', o);
        });
        entity.actions.forEach(o => this.addOperation('actions', o));
    }
    /**
     * Maps an array of conditions or actions to the input format expected by the GraphQL API.
     */
    mapOperationsToInputs(operations, formValueOperations) {
        return operations.map((o, i) => {
            return {
                code: o.code,
                arguments: Object.values(formValueOperations[i].args).map((value, j) => ({
                    name: o.args[j].name,
                    value: encodeConfigArgValue(value),
                })),
            };
        });
    }
    /**
     * Adds a new condition or action to the promotion.
     */
    addOperation(key, operation) {
        const operationsArray = this.formArrayOf(key);
        const collection = key === 'conditions' ? this.conditions : this.actions;
        const index = operationsArray.value.findIndex(o => o.code === operation.code);
        if (index === -1) {
            const argsHash = operation.args.reduce((output, arg) => {
                var _a;
                return (Object.assign(Object.assign({}, output), { [arg.name]: (_a = getConfigArgValue(arg.value)) !== null && _a !== void 0 ? _a : this.getDefaultArgValue(key, operation, arg.name) }));
            }, {});
            operationsArray.push(this.formBuilder.control({
                code: operation.code,
                args: argsHash,
            }));
            collection.push({
                code: operation.code,
                args: operation.args.map(a => ({ name: a.name, value: getConfigArgValue(a.value) })),
            });
        }
    }
    getDefaultArgValue(key, operation, argName) {
        const def = key === 'conditions'
            ? this.allConditions.find(c => c.code === operation.code)
            : this.allActions.find(a => a.code === operation.code);
        if (def) {
            const argDef = def.args.find(a => a.name === argName);
            if (argDef) {
                return getDefaultConfigArgValue(argDef);
            }
        }
        throw new Error(`Could not determine default value for "argName"`);
    }
    /**
     * Removes a condition or action from the promotion.
     */
    removeOperation(key, operation) {
        const operationsArray = this.formArrayOf(key);
        const collection = key === 'conditions' ? this.conditions : this.actions;
        const index = operationsArray.value.findIndex(o => o.code === operation.code);
        if (index !== -1) {
            operationsArray.removeAt(index);
            collection.splice(index, 1);
        }
    }
}
PromotionDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-promotion-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"flex clr-align-items-center\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <clr-toggle-wrapper *vdrIfPermissions=\"'UpdatePromotion'\">\n                <input type=\"checkbox\" clrToggle name=\"enabled\" [formControl]=\"detailForm.get(['enabled'])\" />\n                <label>{{ 'common.enabled' | translate }}</label>\n            </clr-toggle-wrapper>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"promotion-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!saveButtonEnabled()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                *vdrIfPermissions=\"'UpdatePromotion'\"\n                [disabled]=\"!saveButtonEnabled()\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n            type=\"text\"\n            formControlName=\"name\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'marketing.starts-at' | translate\" for=\"startsAt\">\n        <vdr-datetime-picker formControlName=\"startsAt\"></vdr-datetime-picker>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'marketing.ends-at' | translate\" for=\"endsAt\">\n        <vdr-datetime-picker formControlName=\"endsAt\"></vdr-datetime-picker>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'marketing.coupon-code' | translate\" for=\"couponCode\">\n        <input\n            id=\"couponCode\"\n            [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n            type=\"text\"\n            formControlName=\"couponCode\"\n        />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'marketing.per-customer-limit' | translate\" for=\"perCustomerUsageLimit\">\n        <input\n            id=\"perCustomerUsageLimit\"\n            [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n            type=\"number\"\n            min=\"1\"\n            max=\"999\"\n            formControlName=\"perCustomerUsageLimit\"\n        />\n    </vdr-form-field>\n\n    <div class=\"clr-row\">\n        <div class=\"clr-col\" formArrayName=\"conditions\">\n            <label class=\"clr-control-label\">{{ 'marketing.conditions' | translate }}</label>\n            <ng-container *ngFor=\"let condition of conditions; index as i\">\n                <vdr-configurable-input\n                    (remove)=\"removeCondition($event)\"\n                    [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n                    [operation]=\"condition\"\n                    [operationDefinition]=\"getConditionDefinition(condition)\"\n                    [formControlName]=\"i\"\n                ></vdr-configurable-input>\n            </ng-container>\n\n            <div>\n                <vdr-dropdown *vdrIfPermissions=\"'UpdatePromotion'\">\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'marketing.add-condition' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let condition of getAvailableConditions()\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"addCondition(condition)\"\n                        >\n                            {{ condition.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n        <div class=\"clr-col\" formArrayName=\"actions\">\n            <label class=\"clr-control-label\">{{ 'marketing.actions' | translate }}</label>\n            <vdr-configurable-input\n                *ngFor=\"let action of actions; index as i\"\n                (remove)=\"removeAction($event)\"\n                [operation]=\"action\"\n                [readonly]=\"!('UpdatePromotion' | hasPermission)\"\n                [operationDefinition]=\"getActionDefinition(action)\"\n                [formControlName]=\"i\"\n            ></vdr-configurable-input>\n            <div>\n                <vdr-dropdown *vdrIfPermissions=\"'UpdatePromotion'\">\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'marketing.add-action' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let action of getAvailableActions()\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"addAction(action)\"\n                        >\n                            {{ action.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n    </div>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
PromotionDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbW90aW9uLWRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL21hcmtldGluZy9zcmMvY29tcG9uZW50cy9wcm9tb3Rpb24tZGV0YWlsL3Byb21vdGlvbi1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBYSxXQUFXLEVBQWEsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFDSCxtQkFBbUIsRUFLbkIsV0FBVyxFQUNYLG9CQUFvQixFQUNwQixpQkFBaUIsRUFDakIsd0JBQXdCLEVBRXhCLG1CQUFtQixFQUVuQixtQkFBbUIsR0FFdEIsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUWhELE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxtQkFBdUM7SUFVakYsWUFDSSxNQUFjLEVBQ2QsS0FBcUIsRUFDckIsbUJBQXdDLEVBQ2hDLGNBQWlDLEVBQy9CLFdBQXdCLEVBQzFCLFdBQXdCLEVBQ3hCLG1CQUF3QztRQUVoRCxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUwvQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDL0IsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtR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ZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsTUFBTSxVQUFVLEdBQUcsR0FBRyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN6RSxNQUFNLEtBQUssR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlFLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2QsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7OztZQWpSSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsdW5MQUFnRDtnQkFFaEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUExQndCLE1BQU07WUFBdEIsY0FBYztZQWVuQixtQkFBbUI7WUFqQlcsaUJBQWlCO1lBVS9DLFdBQVc7WUFUSyxXQUFXO1lBYzNCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUFycmF5LCBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQge1xuICAgIEJhc2VEZXRhaWxDb21wb25lbnQsXG4gICAgQ29uZmlndXJhYmxlT3BlcmF0aW9uLFxuICAgIENvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZmluaXRpb24sXG4gICAgQ29uZmlndXJhYmxlT3BlcmF0aW9uSW5wdXQsXG4gICAgQ3JlYXRlUHJvbW90aW9uSW5wdXQsXG4gICAgRGF0YVNlcnZpY2UsXG4gICAgZW5jb2RlQ29uZmlnQXJnVmFsdWUsXG4gICAgZ2V0Q29uZmlnQXJnVmFsdWUsXG4gICAgZ2V0RGVmYXVsdENvbmZpZ0FyZ1ZhbHVlLFxuICAgIExhbmd1YWdlQ29kZSxcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIFByb21vdGlvbixcbiAgICBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgIFVwZGF0ZVByb21vdGlvbklucHV0LFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1wcm9tb3Rpb24tZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvbW90aW9uLWRldGFpbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvbW90aW9uLWRldGFpbC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9tb3Rpb25EZXRhaWxDb21wb25lbnQgZXh0ZW5kcyBCYXNlRGV0YWlsQ29tcG9uZW50PFByb21vdGlvbi5GcmFnbWVudD5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBwcm9tb3Rpb24kOiBPYnNlcnZhYmxlPFByb21vdGlvbi5GcmFnbWVudD47XG4gICAgZGV0YWlsRm9ybTogRm9ybUdyb3VwO1xuICAgIGNvbmRpdGlvbnM6IENvbmZpZ3VyYWJsZU9wZXJhdGlvbltdID0gW107XG4gICAgYWN0aW9uczogQ29uZmlndXJhYmxlT3BlcmF0aW9uW10gPSBbXTtcblxuICAgIHByaXZhdGUgYWxsQ29uZGl0aW9uczogQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbltdID0gW107XG4gICAgcHJpdmF0ZSBhbGxBY3Rpb25zOiBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBzZXJ2ZXJDb25maWdTZXJ2aWNlOiBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIocm91dGUsIHJvdXRlciwgc2VydmVyQ29uZmlnU2VydmljZSwgZGF0YVNlcnZpY2UpO1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIG5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgY291cG9uQ29kZTogbnVsbCxcbiAgICAgICAgICAgIHBlckN1c3RvbWVyVXNhZ2VMaW1pdDogbnVsbCxcbiAgICAgICAgICAgIHN0YXJ0c0F0OiBudWxsLFxuICAgICAgICAgICAgZW5kc0F0OiBudWxsLFxuICAgICAgICAgICAgY29uZGl0aW9uczogdGhpcy5mb3JtQnVpbGRlci5hcnJheShbXSksXG4gICAgICAgICAgICBhY3Rpb25zOiB0aGlzLmZvcm1CdWlsZGVyLmFycmF5KFtdKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB0aGlzLnByb21vdGlvbiQgPSB0aGlzLmVudGl0eSQ7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UucHJvbW90aW9uLmdldFByb21vdGlvbkFjdGlvbnNBbmRDb25kaXRpb25zKCkuc2luZ2xlJC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFsbEFjdGlvbnMgPSBkYXRhLnByb21vdGlvbkFjdGlvbnM7XG4gICAgICAgICAgICB0aGlzLmFsbENvbmRpdGlvbnMgPSBkYXRhLnByb21vdGlvbkNvbmRpdGlvbnM7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgZ2V0QXZhaWxhYmxlQ29uZGl0aW9ucygpOiBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGxDb25kaXRpb25zLmZpbHRlcihvID0+ICF0aGlzLmNvbmRpdGlvbnMuZmluZChjID0+IGMuY29kZSA9PT0gby5jb2RlKSk7XG4gICAgfVxuXG4gICAgZ2V0Q29uZGl0aW9uRGVmaW5pdGlvbihjb25kaXRpb246IENvbmZpZ3VyYWJsZU9wZXJhdGlvbik6IENvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZmluaXRpb24gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGxDb25kaXRpb25zLmZpbmQoYyA9PiBjLmNvZGUgPT09IGNvbmRpdGlvbi5jb2RlKTtcbiAgICB9XG5cbiAgICBnZXRBdmFpbGFibGVBY3Rpb25zKCk6IENvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZmluaXRpb25bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbEFjdGlvbnMuZmlsdGVyKG8gPT4gIXRoaXMuYWN0aW9ucy5maW5kKGEgPT4gYS5jb2RlID09PSBvLmNvZGUpKTtcbiAgICB9XG5cbiAgICBnZXRBY3Rpb25EZWZpbml0aW9uKGFjdGlvbjogQ29uZmlndXJhYmxlT3BlcmF0aW9uKTogQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbEFjdGlvbnMuZmluZChjID0+IGMuY29kZSA9PT0gYWN0aW9uLmNvZGUpO1xuICAgIH1cblxuICAgIHNhdmVCdXR0b25FbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLmRpcnR5ICYmXG4gICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0udmFsaWQgJiZcbiAgICAgICAgICAgICh0aGlzLmNvbmRpdGlvbnMubGVuZ3RoICE9PSAwIHx8IHRoaXMuZGV0YWlsRm9ybS52YWx1ZS5jb3Vwb25Db2RlKSAmJlxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGFkZENvbmRpdGlvbihjb25kaXRpb246IENvbmZpZ3VyYWJsZU9wZXJhdGlvbikge1xuICAgICAgICB0aGlzLmFkZE9wZXJhdGlvbignY29uZGl0aW9ucycsIGNvbmRpdGlvbik7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cblxuICAgIGFkZEFjdGlvbihhY3Rpb246IENvbmZpZ3VyYWJsZU9wZXJhdGlvbikge1xuICAgICAgICB0aGlzLmFkZE9wZXJhdGlvbignYWN0aW9ucycsIGFjdGlvbik7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cblxuICAgIHJlbW92ZUNvbmRpdGlvbihjb25kaXRpb246IENvbmZpZ3VyYWJsZU9wZXJhdGlvbikge1xuICAgICAgICB0aGlzLnJlbW92ZU9wZXJhdGlvbignY29uZGl0aW9ucycsIGNvbmRpdGlvbik7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cblxuICAgIHJlbW92ZUFjdGlvbihhY3Rpb246IENvbmZpZ3VyYWJsZU9wZXJhdGlvbikge1xuICAgICAgICB0aGlzLnJlbW92ZU9wZXJhdGlvbignYWN0aW9ucycsIGFjdGlvbik7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cblxuICAgIGZvcm1BcnJheU9mKGtleTogJ2NvbmRpdGlvbnMnIHwgJ2FjdGlvbnMnKTogRm9ybUFycmF5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGV0YWlsRm9ybS5nZXQoa2V5KSBhcyBGb3JtQXJyYXk7XG4gICAgfVxuXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV0YWlsRm9ybS5kaXJ0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMuZGV0YWlsRm9ybS52YWx1ZTtcbiAgICAgICAgY29uc3QgaW5wdXQ6IENyZWF0ZVByb21vdGlvbklucHV0ID0ge1xuICAgICAgICAgICAgbmFtZTogZm9ybVZhbHVlLm5hbWUsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgY291cG9uQ29kZTogZm9ybVZhbHVlLmNvdXBvbkNvZGUsXG4gICAgICAgICAgICBwZXJDdXN0b21lclVzYWdlTGltaXQ6IGZvcm1WYWx1ZS5wZXJDdXN0b21lclVzYWdlTGltaXQsXG4gICAgICAgICAgICBzdGFydHNBdDogZm9ybVZhbHVlLnN0YXJ0c0F0LFxuICAgICAgICAgICAgZW5kc0F0OiBmb3JtVmFsdWUuZW5kc0F0LFxuICAgICAgICAgICAgY29uZGl0aW9uczogdGhpcy5tYXBPcGVyYXRpb25zVG9JbnB1dHModGhpcy5jb25kaXRpb25zLCBmb3JtVmFsdWUuY29uZGl0aW9ucyksXG4gICAgICAgICAgICBhY3Rpb25zOiB0aGlzLm1hcE9wZXJhdGlvbnNUb0lucHV0cyh0aGlzLmFjdGlvbnMsIGZvcm1WYWx1ZS5hY3Rpb25zKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5wcm9tb3Rpb24uY3JlYXRlUHJvbW90aW9uKGlucHV0KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoeyBjcmVhdGVQcm9tb3Rpb24gfSkgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoY3JlYXRlUHJvbW90aW9uLl9fdHlwZW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUHJvbW90aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktY3JlYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1Byb21vdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNQcmlzdGluZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4vJywgY3JlYXRlUHJvbW90aW9uLmlkXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ01pc3NpbmdDb25kaXRpb25zRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKGNyZWF0ZVByb21vdGlvbi5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LWNyZWF0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1Byb21vdGlvbicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5kZXRhaWxGb3JtLmRpcnR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gdGhpcy5kZXRhaWxGb3JtLnZhbHVlO1xuICAgICAgICB0aGlzLnByb21vdGlvbiRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAocHJvbW90aW9uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXQ6IFVwZGF0ZVByb21vdGlvbklucHV0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHByb21vdGlvbi5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGZvcm1WYWx1ZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZm9ybVZhbHVlLmVuYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3Vwb25Db2RlOiBmb3JtVmFsdWUuY291cG9uQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlckN1c3RvbWVyVXNhZ2VMaW1pdDogZm9ybVZhbHVlLnBlckN1c3RvbWVyVXNhZ2VMaW1pdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0c0F0OiBmb3JtVmFsdWUuc3RhcnRzQXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRzQXQ6IGZvcm1WYWx1ZS5lbmRzQXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kaXRpb25zOiB0aGlzLm1hcE9wZXJhdGlvbnNUb0lucHV0cyh0aGlzLmNvbmRpdGlvbnMsIGZvcm1WYWx1ZS5jb25kaXRpb25zKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IHRoaXMubWFwT3BlcmF0aW9uc1RvSW5wdXRzKHRoaXMuYWN0aW9ucywgZm9ybVZhbHVlLmFjdGlvbnMpLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5wcm9tb3Rpb24udXBkYXRlUHJvbW90aW9uKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnUHJvbW90aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNQcmlzdGluZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ1Byb21vdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgZm9ybSB2YWx1ZXMgd2hlbiB0aGUgZW50aXR5IGNoYW5nZXMuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHNldEZvcm1WYWx1ZXMoZW50aXR5OiBQcm9tb3Rpb24uRnJhZ21lbnQsIGxhbmd1YWdlQ29kZTogTGFuZ3VhZ2VDb2RlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5wYXRjaFZhbHVlKHtcbiAgICAgICAgICAgIG5hbWU6IGVudGl0eS5uYW1lLFxuICAgICAgICAgICAgZW5hYmxlZDogZW50aXR5LmVuYWJsZWQsXG4gICAgICAgICAgICBjb3Vwb25Db2RlOiBlbnRpdHkuY291cG9uQ29kZSxcbiAgICAgICAgICAgIHBlckN1c3RvbWVyVXNhZ2VMaW1pdDogZW50aXR5LnBlckN1c3RvbWVyVXNhZ2VMaW1pdCxcbiAgICAgICAgICAgIHN0YXJ0c0F0OiBlbnRpdHkuc3RhcnRzQXQsXG4gICAgICAgICAgICBlbmRzQXQ6IGVudGl0eS5lbmRzQXQsXG4gICAgICAgIH0pO1xuICAgICAgICBlbnRpdHkuY29uZGl0aW9ucy5mb3JFYWNoKG8gPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRPcGVyYXRpb24oJ2NvbmRpdGlvbnMnLCBvKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVudGl0eS5hY3Rpb25zLmZvckVhY2gobyA9PiB0aGlzLmFkZE9wZXJhdGlvbignYWN0aW9ucycsIG8pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGFuIGFycmF5IG9mIGNvbmRpdGlvbnMgb3IgYWN0aW9ucyB0byB0aGUgaW5wdXQgZm9ybWF0IGV4cGVjdGVkIGJ5IHRoZSBHcmFwaFFMIEFQSS5cbiAgICAgKi9cbiAgICBwcml2YXRlIG1hcE9wZXJhdGlvbnNUb0lucHV0cyhcbiAgICAgICAgb3BlcmF0aW9uczogQ29uZmlndXJhYmxlT3BlcmF0aW9uW10sXG4gICAgICAgIGZvcm1WYWx1ZU9wZXJhdGlvbnM6IGFueSxcbiAgICApOiBDb25maWd1cmFibGVPcGVyYXRpb25JbnB1dFtdIHtcbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbnMubWFwKChvLCBpKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvZGU6IG8uY29kZSxcbiAgICAgICAgICAgICAgICBhcmd1bWVudHM6IE9iamVjdC52YWx1ZXM8YW55Pihmb3JtVmFsdWVPcGVyYXRpb25zW2ldLmFyZ3MpLm1hcCgodmFsdWUsIGopID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG8uYXJnc1tqXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZW5jb2RlQ29uZmlnQXJnVmFsdWUodmFsdWUpLFxuICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBuZXcgY29uZGl0aW9uIG9yIGFjdGlvbiB0byB0aGUgcHJvbW90aW9uLlxuICAgICAqL1xuICAgIHByaXZhdGUgYWRkT3BlcmF0aW9uKGtleTogJ2NvbmRpdGlvbnMnIHwgJ2FjdGlvbnMnLCBvcGVyYXRpb246IENvbmZpZ3VyYWJsZU9wZXJhdGlvbikge1xuICAgICAgICBjb25zdCBvcGVyYXRpb25zQXJyYXkgPSB0aGlzLmZvcm1BcnJheU9mKGtleSk7XG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBrZXkgPT09ICdjb25kaXRpb25zJyA/IHRoaXMuY29uZGl0aW9ucyA6IHRoaXMuYWN0aW9ucztcbiAgICAgICAgY29uc3QgaW5kZXggPSBvcGVyYXRpb25zQXJyYXkudmFsdWUuZmluZEluZGV4KG8gPT4gby5jb2RlID09PSBvcGVyYXRpb24uY29kZSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3NIYXNoID0gb3BlcmF0aW9uLmFyZ3MucmVkdWNlKFxuICAgICAgICAgICAgICAgIChvdXRwdXQsIGFyZykgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4ub3V0cHV0LFxuICAgICAgICAgICAgICAgICAgICBbYXJnLm5hbWVdOlxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0Q29uZmlnQXJnVmFsdWUoYXJnLnZhbHVlKSA/PyB0aGlzLmdldERlZmF1bHRBcmdWYWx1ZShrZXksIG9wZXJhdGlvbiwgYXJnLm5hbWUpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG9wZXJhdGlvbnNBcnJheS5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbCh7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IG9wZXJhdGlvbi5jb2RlLFxuICAgICAgICAgICAgICAgICAgICBhcmdzOiBhcmdzSGFzaCxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvZGU6IG9wZXJhdGlvbi5jb2RlLFxuICAgICAgICAgICAgICAgIGFyZ3M6IG9wZXJhdGlvbi5hcmdzLm1hcChhID0+ICh7IG5hbWU6IGEubmFtZSwgdmFsdWU6IGdldENvbmZpZ0FyZ1ZhbHVlKGEudmFsdWUpIH0pKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0QXJnVmFsdWUoXG4gICAgICAgIGtleTogJ2NvbmRpdGlvbnMnIHwgJ2FjdGlvbnMnLFxuICAgICAgICBvcGVyYXRpb246IENvbmZpZ3VyYWJsZU9wZXJhdGlvbixcbiAgICAgICAgYXJnTmFtZTogc3RyaW5nLFxuICAgICkge1xuICAgICAgICBjb25zdCBkZWYgPVxuICAgICAgICAgICAga2V5ID09PSAnY29uZGl0aW9ucydcbiAgICAgICAgICAgICAgICA/IHRoaXMuYWxsQ29uZGl0aW9ucy5maW5kKGMgPT4gYy5jb2RlID09PSBvcGVyYXRpb24uY29kZSlcbiAgICAgICAgICAgICAgICA6IHRoaXMuYWxsQWN0aW9ucy5maW5kKGEgPT4gYS5jb2RlID09PSBvcGVyYXRpb24uY29kZSk7XG4gICAgICAgIGlmIChkZWYpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ0RlZiA9IGRlZi5hcmdzLmZpbmQoYSA9PiBhLm5hbWUgPT09IGFyZ05hbWUpO1xuICAgICAgICAgICAgaWYgKGFyZ0RlZikge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXREZWZhdWx0Q29uZmlnQXJnVmFsdWUoYXJnRGVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBkZXRlcm1pbmUgZGVmYXVsdCB2YWx1ZSBmb3IgXCJhcmdOYW1lXCJgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgY29uZGl0aW9uIG9yIGFjdGlvbiBmcm9tIHRoZSBwcm9tb3Rpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmVPcGVyYXRpb24oa2V5OiAnY29uZGl0aW9ucycgfCAnYWN0aW9ucycsIG9wZXJhdGlvbjogQ29uZmlndXJhYmxlT3BlcmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IG9wZXJhdGlvbnNBcnJheSA9IHRoaXMuZm9ybUFycmF5T2Yoa2V5KTtcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbiA9IGtleSA9PT0gJ2NvbmRpdGlvbnMnID8gdGhpcy5jb25kaXRpb25zIDogdGhpcy5hY3Rpb25zO1xuICAgICAgICBjb25zdCBpbmRleCA9IG9wZXJhdGlvbnNBcnJheS52YWx1ZS5maW5kSW5kZXgobyA9PiBvLmNvZGUgPT09IG9wZXJhdGlvbi5jb2RlKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgb3BlcmF0aW9uc0FycmF5LnJlbW92ZUF0KGluZGV4KTtcbiAgICAgICAgICAgIGNvbGxlY3Rpb24uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==