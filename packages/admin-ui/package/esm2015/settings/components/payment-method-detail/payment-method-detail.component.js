import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, configurableDefinitionToInstance, DataService, getConfigArgValue, NotificationService, Permission, ServerConfigService, toConfigurableOperationInput, } from '@vendure/admin-ui/core';
import { normalizeString } from '@vendure/common/lib/normalize-string';
import { combineLatest } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
export class PaymentMethodDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.checkers = [];
        this.handlers = [];
        this.updatePermission = [Permission.UpdateSettings, Permission.UpdatePaymentMethod];
        this.detailForm = this.formBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            description: '',
            enabled: [true, Validators.required],
            checker: {},
            handler: {},
        });
    }
    ngOnInit() {
        this.init();
        combineLatest([
            this.dataService.settings.getPaymentMethodOperations().single$,
            this.entity$.pipe(take(1)),
        ]).subscribe(([data, entity]) => {
            this.checkers = data.paymentMethodEligibilityCheckers;
            this.handlers = data.paymentMethodHandlers;
            this.changeDetector.markForCheck();
            this.selectedCheckerDefinition = data.paymentMethodEligibilityCheckers.find(c => c.code === (entity.checker && entity.checker.code));
            this.selectedHandlerDefinition = data.paymentMethodHandlers.find(c => c.code === (entity.handler && entity.handler.code));
        });
    }
    ngOnDestroy() {
        this.destroy();
    }
    updateCode(currentCode, nameValue) {
        if (!currentCode) {
            const codeControl = this.detailForm.get(['code']);
            if (codeControl && codeControl.pristine) {
                codeControl.setValue(normalizeString(nameValue, '-'));
            }
        }
    }
    configArgsIsPopulated() {
        const configArgsGroup = this.detailForm.get('configArgs');
        if (!configArgsGroup) {
            return false;
        }
        return 0 < Object.keys(configArgsGroup.controls).length;
    }
    selectChecker(checker) {
        this.selectedCheckerDefinition = checker;
        this.selectedChecker = configurableDefinitionToInstance(checker);
        const formControl = this.detailForm.get('checker');
        if (formControl) {
            formControl.clearValidators();
            formControl.updateValueAndValidity({ onlySelf: true });
            formControl.patchValue(this.selectedChecker);
        }
        this.detailForm.markAsDirty();
    }
    selectHandler(handler) {
        this.selectedHandlerDefinition = handler;
        this.selectedHandler = configurableDefinitionToInstance(handler);
        const formControl = this.detailForm.get('handler');
        if (formControl) {
            formControl.clearValidators();
            formControl.updateValueAndValidity({ onlySelf: true });
            formControl.patchValue(this.selectedHandler);
        }
        this.detailForm.markAsDirty();
    }
    removeChecker() {
        this.selectedChecker = null;
        this.detailForm.markAsDirty();
    }
    removeHandler() {
        this.selectedHandler = null;
        this.detailForm.markAsDirty();
    }
    create() {
        const selectedChecker = this.selectedChecker;
        const selectedHandler = this.selectedHandler;
        if (!selectedHandler) {
            return;
        }
        this.entity$
            .pipe(take(1), mergeMap(({ id }) => {
            const formValue = this.detailForm.value;
            const input = {
                name: formValue.name,
                code: formValue.code,
                description: formValue.description,
                enabled: formValue.enabled,
                checker: selectedChecker
                    ? toConfigurableOperationInput(selectedChecker, formValue.checker)
                    : null,
                handler: toConfigurableOperationInput(selectedHandler, formValue.handler),
            };
            return this.dataService.settings.createPaymentMethod(input);
        }))
            .subscribe(data => {
            this.notificationService.success(_('common.notify-create-success'), {
                entity: 'PaymentMethod',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createPaymentMethod.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(_('common.notify-create-error'), {
                entity: 'PaymentMethod',
            });
        });
    }
    save() {
        const selectedChecker = this.selectedChecker;
        const selectedHandler = this.selectedHandler;
        if (!selectedHandler) {
            return;
        }
        this.entity$
            .pipe(take(1), mergeMap(({ id }) => {
            const formValue = this.detailForm.value;
            const input = {
                id,
                name: formValue.name,
                code: formValue.code,
                description: formValue.description,
                enabled: formValue.enabled,
                checker: selectedChecker
                    ? toConfigurableOperationInput(selectedChecker, formValue.checker)
                    : null,
                handler: toConfigurableOperationInput(selectedHandler, formValue.handler),
            };
            return this.dataService.settings.updatePaymentMethod(input);
        }))
            .subscribe(data => {
            this.notificationService.success(_('common.notify-update-success'), {
                entity: 'PaymentMethod',
            });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
                entity: 'PaymentMethod',
            });
        });
    }
    setFormValues(paymentMethod) {
        this.detailForm.patchValue({
            name: paymentMethod.name,
            code: paymentMethod.code,
            description: paymentMethod.description,
            enabled: paymentMethod.enabled,
            checker: paymentMethod.checker || {},
            handler: paymentMethod.handler || {},
        });
        if (!this.selectedChecker) {
            this.selectedChecker = paymentMethod.checker && {
                code: paymentMethod.checker.code,
                args: paymentMethod.checker.args.map(a => (Object.assign(Object.assign({}, a), { value: getConfigArgValue(a.value) }))),
            };
        }
        if (!this.selectedHandler) {
            this.selectedHandler = paymentMethod.handler && {
                code: paymentMethod.handler.code,
                args: paymentMethod.handler.args.map(a => (Object.assign(Object.assign({}, a), { value: getConfigArgValue(a.value) }))),
            };
        }
    }
}
PaymentMethodDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-payment-method-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"payment-method-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            [disabled]=\"detailForm.pristine || detailForm.invalid\"\n            (click)=\"create()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"updatePermission\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"detailForm.pristine || detailForm.invalid || !selectedHandler\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"entity$ | async as paymentMethod\">\n    <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n        <input\n            id=\"name\"\n            type=\"text\"\n            formControlName=\"name\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n            (input)=\"updateCode(paymentMethod.code, $event.target.value)\"\n        />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'common.code' | translate\"\n        for=\"code\"\n        [readOnlyToggle]=\"updatePermission | hasPermission\"\n    >\n        <input\n            id=\"code\"\n            type=\"text\"\n            formControlName=\"code\"\n            [readonly]=\"!(updatePermission | hasPermission)\"\n        />\n    </vdr-form-field>\n    <vdr-rich-text-editor\n        formControlName=\"description\"\n        [readonly]=\"!(updatePermission | hasPermission)\"\n        [label]=\"'common.description' | translate\"\n    ></vdr-rich-text-editor>\n    <vdr-form-field [label]=\"'common.enabled' | translate\" for=\"description\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"enabled\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                formControlName=\"enabled\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n\n    <div class=\"clr-row mt4\">\n        <div class=\"clr-col\">\n            <label class=\"clr-control-label\">{{ 'settings.payment-eligibility-checker' | translate }}</label>\n            <vdr-configurable-input\n                *ngIf=\"selectedChecker && selectedCheckerDefinition\"\n                [operation]=\"selectedChecker\"\n                [operationDefinition]=\"selectedCheckerDefinition\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (remove)=\"removeChecker()\"\n                formControlName=\"checker\"\n            ></vdr-configurable-input>\n            <div *ngIf=\"!selectedChecker || !selectedCheckerDefinition\">\n                <vdr-dropdown>\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'common.select' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let checker of checkers\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"selectChecker(checker)\"\n                        >\n                            {{ checker.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n        <div class=\"clr-col\">\n            <label class=\"clr-control-label\">{{ 'settings.payment-handler' | translate }}</label>\n            <vdr-configurable-input\n                *ngIf=\"selectedHandler && selectedHandlerDefinition\"\n                [operation]=\"selectedHandler\"\n                [operationDefinition]=\"selectedHandlerDefinition\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (remove)=\"removeHandler()\"\n                formControlName=\"handler\"\n            ></vdr-configurable-input>\n            <div *ngIf=\"!selectedHandler || !selectedHandlerDefinition\">\n                <vdr-dropdown>\n                    <button class=\"btn btn-outline\" vdrDropdownTrigger>\n                        <clr-icon shape=\"plus\"></clr-icon>\n                        {{ 'common.select' | translate }}\n                    </button>\n                    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n                        <button\n                            *ngFor=\"let handler of handlers\"\n                            type=\"button\"\n                            vdrDropdownItem\n                            (click)=\"selectHandler(handler)\"\n                        >\n                            {{ handler.description }}\n                        </button>\n                    </vdr-dropdown-menu>\n                </vdr-dropdown>\n            </div>\n        </div>\n    </div>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
PaymentMethodDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1tZXRob2QtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvcGF5bWVudC1tZXRob2QtZGV0YWlsL3BheW1lbnQtbWV0aG9kLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUNILG1CQUFtQixFQUVuQixnQ0FBZ0MsRUFJaEMsV0FBVyxFQUVYLGlCQUFpQixFQUNqQixtQkFBbUIsRUFFbkIsVUFBVSxFQUNWLG1CQUFtQixFQUNuQiw0QkFBNEIsR0FFL0IsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUWhELE1BQU0sT0FBTyw0QkFDVCxTQUFRLG1CQUEyQztJQVduRCxZQUNJLE1BQWMsRUFDZCxLQUFxQixFQUNyQixtQkFBd0MsRUFDaEMsY0FBaUMsRUFDL0IsV0FBd0IsRUFDMUIsV0FBd0IsRUFDeEIsbUJBQXdDO1FBRWhELEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBTC9DLG1C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QUMsZUFBZSxHQUFHLGFBQWEsQ0FBQyxPQUFPLElBQUk7Z0JBQzVDLElBQUksRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUk7Z0JBQ2hDLElBQUksRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQ0FBTSxDQUFDLEtBQUUsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBRyxDQUFDO2FBQzNGLENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDLE9BQU8sSUFBSTtnQkFDNUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSTtnQkFDaEMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGlDQUFNLENBQUMsS0FBRSxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFHLENBQUM7YUFDM0YsQ0FBQztTQUNMO0lBQ0wsQ0FBQzs7O1lBdE5KLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyx5d0tBQXFEO2dCQUVyRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQTVCd0IsTUFBTTtZQUF0QixjQUFjO1lBZW5CLG1CQUFtQjtZQWpCVyxpQkFBaUI7WUFXL0MsV0FBVztZQVZOLFdBQVc7WUFhaEIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQge1xuICAgIEJhc2VEZXRhaWxDb21wb25lbnQsXG4gICAgQ29uZmlnQXJnRGVmaW5pdGlvbixcbiAgICBjb25maWd1cmFibGVEZWZpbml0aW9uVG9JbnN0YW5jZSxcbiAgICBDb25maWd1cmFibGVPcGVyYXRpb24sXG4gICAgQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbixcbiAgICBDcmVhdGVQYXltZW50TWV0aG9kSW5wdXQsXG4gICAgRGF0YVNlcnZpY2UsXG4gICAgZW5jb2RlQ29uZmlnQXJnVmFsdWUsXG4gICAgZ2V0Q29uZmlnQXJnVmFsdWUsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBQYXltZW50TWV0aG9kLFxuICAgIFBlcm1pc3Npb24sXG4gICAgU2VydmVyQ29uZmlnU2VydmljZSxcbiAgICB0b0NvbmZpZ3VyYWJsZU9wZXJhdGlvbklucHV0LFxuICAgIFVwZGF0ZVBheW1lbnRNZXRob2RJbnB1dCxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBub3JtYWxpemVTdHJpbmcgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL25vcm1hbGl6ZS1zdHJpbmcnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXBheW1lbnQtbWV0aG9kLWRldGFpbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BheW1lbnQtbWV0aG9kLWRldGFpbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGF5bWVudC1tZXRob2QtZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFBheW1lbnRNZXRob2REZXRhaWxDb21wb25lbnRcbiAgICBleHRlbmRzIEJhc2VEZXRhaWxDb21wb25lbnQ8UGF5bWVudE1ldGhvZC5GcmFnbWVudD5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBkZXRhaWxGb3JtOiBGb3JtR3JvdXA7XG4gICAgY2hlY2tlcnM6IENvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZmluaXRpb25bXSA9IFtdO1xuICAgIGhhbmRsZXJzOiBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uW10gPSBbXTtcbiAgICBzZWxlY3RlZENoZWNrZXI/OiBDb25maWd1cmFibGVPcGVyYXRpb24gfCBudWxsO1xuICAgIHNlbGVjdGVkQ2hlY2tlckRlZmluaXRpb24/OiBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uO1xuICAgIHNlbGVjdGVkSGFuZGxlcj86IENvbmZpZ3VyYWJsZU9wZXJhdGlvbiB8IG51bGw7XG4gICAgc2VsZWN0ZWRIYW5kbGVyRGVmaW5pdGlvbj86IENvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZmluaXRpb247XG4gICAgcmVhZG9ubHkgdXBkYXRlUGVybWlzc2lvbiA9IFtQZXJtaXNzaW9uLlVwZGF0ZVNldHRpbmdzLCBQZXJtaXNzaW9uLlVwZGF0ZVBheW1lbnRNZXRob2RdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHNlcnZlckNvbmZpZ1NlcnZpY2U6IFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcm90ZWN0ZWQgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICkge1xuICAgICAgICBzdXBlcihyb3V0ZSwgcm91dGVyLCBzZXJ2ZXJDb25maWdTZXJ2aWNlLCBkYXRhU2VydmljZSk7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgY29kZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIG5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICBlbmFibGVkOiBbdHJ1ZSwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBjaGVja2VyOiB7fSxcbiAgICAgICAgICAgIGhhbmRsZXI6IHt9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5zZXR0aW5ncy5nZXRQYXltZW50TWV0aG9kT3BlcmF0aW9ucygpLnNpbmdsZSQsXG4gICAgICAgICAgICB0aGlzLmVudGl0eSQucGlwZSh0YWtlKDEpKSxcbiAgICAgICAgXSkuc3Vic2NyaWJlKChbZGF0YSwgZW50aXR5XSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VycyA9IGRhdGEucGF5bWVudE1ldGhvZEVsaWdpYmlsaXR5Q2hlY2tlcnM7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJzID0gZGF0YS5wYXltZW50TWV0aG9kSGFuZGxlcnM7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoZWNrZXJEZWZpbml0aW9uID0gZGF0YS5wYXltZW50TWV0aG9kRWxpZ2liaWxpdHlDaGVja2Vycy5maW5kKFxuICAgICAgICAgICAgICAgIGMgPT4gYy5jb2RlID09PSAoZW50aXR5LmNoZWNrZXIgJiYgZW50aXR5LmNoZWNrZXIuY29kZSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEhhbmRsZXJEZWZpbml0aW9uID0gZGF0YS5wYXltZW50TWV0aG9kSGFuZGxlcnMuZmluZChcbiAgICAgICAgICAgICAgICBjID0+IGMuY29kZSA9PT0gKGVudGl0eS5oYW5kbGVyICYmIGVudGl0eS5oYW5kbGVyLmNvZGUpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvZGUoY3VycmVudENvZGU6IHN0cmluZywgbmFtZVZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFjdXJyZW50Q29kZSkge1xuICAgICAgICAgICAgY29uc3QgY29kZUNvbnRyb2wgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KFsnY29kZSddKTtcbiAgICAgICAgICAgIGlmIChjb2RlQ29udHJvbCAmJiBjb2RlQ29udHJvbC5wcmlzdGluZSkge1xuICAgICAgICAgICAgICAgIGNvZGVDb250cm9sLnNldFZhbHVlKG5vcm1hbGl6ZVN0cmluZyhuYW1lVmFsdWUsICctJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uZmlnQXJnc0lzUG9wdWxhdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBjb25maWdBcmdzR3JvdXAgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KCdjb25maWdBcmdzJykgYXMgRm9ybUdyb3VwIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIWNvbmZpZ0FyZ3NHcm91cCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwIDwgT2JqZWN0LmtleXMoY29uZmlnQXJnc0dyb3VwLmNvbnRyb2xzKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgc2VsZWN0Q2hlY2tlcihjaGVja2VyOiBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGVja2VyRGVmaW5pdGlvbiA9IGNoZWNrZXI7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGVja2VyID0gY29uZmlndXJhYmxlRGVmaW5pdGlvblRvSW5zdGFuY2UoY2hlY2tlcik7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sID0gdGhpcy5kZXRhaWxGb3JtLmdldCgnY2hlY2tlcicpO1xuICAgICAgICBpZiAoZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgIGZvcm1Db250cm9sLmNsZWFyVmFsaWRhdG9ycygpO1xuICAgICAgICAgICAgZm9ybUNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgICAgICAgZm9ybUNvbnRyb2wucGF0Y2hWYWx1ZSh0aGlzLnNlbGVjdGVkQ2hlY2tlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc0RpcnR5KCk7XG4gICAgfVxuXG4gICAgc2VsZWN0SGFuZGxlcihoYW5kbGVyOiBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRIYW5kbGVyRGVmaW5pdGlvbiA9IGhhbmRsZXI7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRIYW5kbGVyID0gY29uZmlndXJhYmxlRGVmaW5pdGlvblRvSW5zdGFuY2UoaGFuZGxlcik7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sID0gdGhpcy5kZXRhaWxGb3JtLmdldCgnaGFuZGxlcicpO1xuICAgICAgICBpZiAoZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgIGZvcm1Db250cm9sLmNsZWFyVmFsaWRhdG9ycygpO1xuICAgICAgICAgICAgZm9ybUNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgICAgICAgZm9ybUNvbnRyb2wucGF0Y2hWYWx1ZSh0aGlzLnNlbGVjdGVkSGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc0RpcnR5KCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2hlY2tlcigpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoZWNrZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzRGlydHkoKTtcbiAgICB9XG5cbiAgICByZW1vdmVIYW5kbGVyKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSGFuZGxlciA9IG51bGw7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cblxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRDaGVja2VyID0gdGhpcy5zZWxlY3RlZENoZWNrZXI7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSGFuZGxlciA9IHRoaXMuc2VsZWN0ZWRIYW5kbGVyO1xuICAgICAgICBpZiAoIXNlbGVjdGVkSGFuZGxlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW50aXR5JFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoeyBpZCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMuZGV0YWlsRm9ybS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXQ6IENyZWF0ZVBheW1lbnRNZXRob2RJbnB1dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGZvcm1WYWx1ZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogZm9ybVZhbHVlLmNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZm9ybVZhbHVlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZm9ybVZhbHVlLmVuYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VyOiBzZWxlY3RlZENoZWNrZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRvQ29uZmlndXJhYmxlT3BlcmF0aW9uSW5wdXQoc2VsZWN0ZWRDaGVja2VyLCBmb3JtVmFsdWUuY2hlY2tlcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiB0b0NvbmZpZ3VyYWJsZU9wZXJhdGlvbklucHV0KHNlbGVjdGVkSGFuZGxlciwgZm9ybVZhbHVlLmhhbmRsZXIpLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5zZXR0aW5ncy5jcmVhdGVQYXltZW50TWV0aG9kKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktY3JlYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnUGF5bWVudE1ldGhvZCcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8nLCBkYXRhLmNyZWF0ZVBheW1lbnRNZXRob2QuaWRdLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS1jcmVhdGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnUGF5bWVudE1ldGhvZCcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQ2hlY2tlciA9IHRoaXMuc2VsZWN0ZWRDaGVja2VyO1xuICAgICAgICBjb25zdCBzZWxlY3RlZEhhbmRsZXIgPSB0aGlzLnNlbGVjdGVkSGFuZGxlcjtcbiAgICAgICAgaWYgKCFzZWxlY3RlZEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVudGl0eSRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKHsgaWQgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtVmFsdWUgPSB0aGlzLmRldGFpbEZvcm0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0OiBVcGRhdGVQYXltZW50TWV0aG9kSW5wdXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGZvcm1WYWx1ZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogZm9ybVZhbHVlLmNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZm9ybVZhbHVlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZm9ybVZhbHVlLmVuYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VyOiBzZWxlY3RlZENoZWNrZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRvQ29uZmlndXJhYmxlT3BlcmF0aW9uSW5wdXQoc2VsZWN0ZWRDaGVja2VyLCBmb3JtVmFsdWUuY2hlY2tlcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiB0b0NvbmZpZ3VyYWJsZU9wZXJhdGlvbklucHV0KHNlbGVjdGVkSGFuZGxlciwgZm9ybVZhbHVlLmhhbmRsZXIpLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5zZXR0aW5ncy51cGRhdGVQYXltZW50TWV0aG9kKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnUGF5bWVudE1ldGhvZCcsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LXVwZGF0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdQYXltZW50TWV0aG9kJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldEZvcm1WYWx1ZXMocGF5bWVudE1ldGhvZDogUGF5bWVudE1ldGhvZC5GcmFnbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0ucGF0Y2hWYWx1ZSh7XG4gICAgICAgICAgICBuYW1lOiBwYXltZW50TWV0aG9kLm5hbWUsXG4gICAgICAgICAgICBjb2RlOiBwYXltZW50TWV0aG9kLmNvZGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcGF5bWVudE1ldGhvZC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGVuYWJsZWQ6IHBheW1lbnRNZXRob2QuZW5hYmxlZCxcbiAgICAgICAgICAgIGNoZWNrZXI6IHBheW1lbnRNZXRob2QuY2hlY2tlciB8fCB7fSxcbiAgICAgICAgICAgIGhhbmRsZXI6IHBheW1lbnRNZXRob2QuaGFuZGxlciB8fCB7fSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZENoZWNrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGVja2VyID0gcGF5bWVudE1ldGhvZC5jaGVja2VyICYmIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBwYXltZW50TWV0aG9kLmNoZWNrZXIuY29kZSxcbiAgICAgICAgICAgICAgICBhcmdzOiBwYXltZW50TWV0aG9kLmNoZWNrZXIuYXJncy5tYXAoYSA9PiAoeyAuLi5hLCB2YWx1ZTogZ2V0Q29uZmlnQXJnVmFsdWUoYS52YWx1ZSkgfSkpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWRIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSGFuZGxlciA9IHBheW1lbnRNZXRob2QuaGFuZGxlciAmJiB7XG4gICAgICAgICAgICAgICAgY29kZTogcGF5bWVudE1ldGhvZC5oYW5kbGVyLmNvZGUsXG4gICAgICAgICAgICAgICAgYXJnczogcGF5bWVudE1ldGhvZC5oYW5kbGVyLmFyZ3MubWFwKGEgPT4gKHsgLi4uYSwgdmFsdWU6IGdldENvbmZpZ0FyZ1ZhbHVlKGEudmFsdWUpIH0pKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=