import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, Permission } from '@vendure/admin-ui/core';
import { CurrencyCode, } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ServerConfigService } from '@vendure/admin-ui/core';
import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';
import { map, mergeMap, take } from 'rxjs/operators';
export class ChannelDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.serverConfigService = serverConfigService;
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.currencyCodes = Object.values(CurrencyCode);
        this.updatePermission = [Permission.SuperAdmin, Permission.UpdateChannel, Permission.CreateChannel];
        this.customFields = this.getCustomFieldConfig('Channel');
        this.detailForm = this.formBuilder.group({
            code: ['', Validators.required],
            token: ['', Validators.required],
            pricesIncludeTax: [false],
            currencyCode: [''],
            defaultShippingZoneId: ['', Validators.required],
            defaultLanguageCode: [],
            defaultTaxZoneId: ['', Validators.required],
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
    }
    ngOnInit() {
        this.init();
        this.zones$ = this.dataService.settings.getZones().mapSingle(data => data.zones);
        this.availableLanguageCodes$ = this.serverConfigService.getAvailableLanguages();
    }
    ngOnDestroy() {
        this.destroy();
    }
    customFieldIsSet(name) {
        return !!this.detailForm.get(['customFields', name]);
    }
    saveButtonEnabled() {
        return this.detailForm.dirty && this.detailForm.valid;
    }
    create() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        const input = {
            code: formValue.code,
            token: formValue.token,
            defaultLanguageCode: formValue.defaultLanguageCode,
            pricesIncludeTax: formValue.pricesIncludeTax,
            currencyCode: formValue.currencyCode,
            defaultShippingZoneId: formValue.defaultShippingZoneId,
            defaultTaxZoneId: formValue.defaultTaxZoneId,
            customFields: formValue.customFields,
        };
        this.dataService.settings
            .createChannel(input)
            .pipe(mergeMap(({ createChannel }) => this.dataService.auth.currentUser().single$.pipe(map(({ me }) => ({
            me,
            createChannel,
        })))), mergeMap(({ me, createChannel }) => 
        // tslint:disable-next-line:no-non-null-assertion
        this.dataService.client.updateUserChannels(me.channels).pipe(map(() => createChannel))))
            .subscribe(data => {
            switch (data.__typename) {
                case 'Channel':
                    this.notificationService.success(_('common.notify-create-success'), {
                        entity: 'Channel',
                    });
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.router.navigate(['../', data.id], { relativeTo: this.route });
                    break;
                case 'LanguageNotAvailableError':
                    this.notificationService.error(data.message);
                    break;
            }
        });
    }
    save() {
        if (!this.detailForm.dirty) {
            return;
        }
        const formValue = this.detailForm.value;
        this.entity$
            .pipe(take(1), mergeMap(channel => {
            const input = {
                id: channel.id,
                code: formValue.code,
                pricesIncludeTax: formValue.pricesIncludeTax,
                currencyCode: formValue.currencyCode,
                defaultShippingZoneId: formValue.defaultShippingZoneId,
                defaultLanguageCode: formValue.defaultLanguageCode,
                defaultTaxZoneId: formValue.defaultTaxZoneId,
                customFields: formValue.customFields,
            };
            return this.dataService.settings.updateChannel(input);
        }))
            .subscribe(({ updateChannel }) => {
            switch (updateChannel.__typename) {
                case 'Channel':
                    this.notificationService.success(_('common.notify-update-success'), {
                        entity: 'Channel',
                    });
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    break;
                case 'LanguageNotAvailableError':
                    this.notificationService.error(updateChannel.message);
            }
        });
    }
    /**
     * Update the form values when the entity changes.
     */
    setFormValues(entity, languageCode) {
        this.detailForm.patchValue({
            code: entity.code,
            token: entity.token || this.generateToken(),
            pricesIncludeTax: entity.pricesIncludeTax,
            currencyCode: entity.currencyCode,
            defaultShippingZoneId: entity.defaultShippingZone ? entity.defaultShippingZone.id : '',
            defaultLanguageCode: entity.defaultLanguageCode,
            defaultTaxZoneId: entity.defaultTaxZone ? entity.defaultTaxZone.id : '',
        });
        if (this.customFields.length) {
            const customFieldsGroup = this.detailForm.get('customFields');
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = entity.customFields[key];
                const control = customFieldsGroup.get(key);
                if (control) {
                    control.patchValue(value);
                }
            }
        }
        if (entity.code === DEFAULT_CHANNEL_CODE) {
            const codeControl = this.detailForm.get('code');
            if (codeControl) {
                codeControl.disable();
            }
        }
    }
    generateToken() {
        const randomString = () => Math.random().toString(36).substr(3, 10);
        return `${randomString()}${randomString()}`;
    }
}
ChannelDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-channel-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"channel-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!saveButtonEnabled()\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                *vdrIfPermissions=\"['SuperAdmin', 'UpdateChannel']\"\n                [disabled]=\"!saveButtonEnabled()\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\">\n    <vdr-form-field [label]=\"'common.code' | translate\" for=\"code\">\n        <input id=\"code\" type=\"text\" [readonly]=\"!(updatePermission | hasPermission)\" formControlName=\"code\" />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.channel-token' | translate\" for=\"token\">\n        <input id=\"token\" type=\"text\" [readonly]=\"!(updatePermission | hasPermission)\" formControlName=\"token\" />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.currency' | translate\" for=\"defaultTaxZoneId\">\n        <select\n            clrSelect\n            name=\"currencyCode\"\n            formControlName=\"currencyCode\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let code of currencyCodes\" [value]=\"code\">{{ code | localeCurrencyName }}</option>\n        </select>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'common.default-language' | translate\" for=\"defaultLanguage\">\n        <select\n            clrSelect\n            name=\"defaultLanguageCode\"\n            formControlName=\"defaultLanguageCode\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let languageCode of availableLanguageCodes$ | async\" [value]=\"languageCode\">\n                {{ 'lang.' + languageCode | translate }} ({{ languageCode | uppercase }})\n            </option>\n        </select>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.prices-include-tax' | translate\" for=\"pricesIncludeTax\">\n        <clr-toggle-wrapper>\n            <input\n                type=\"checkbox\"\n                clrToggle\n                id=\"pricesIncludeTax\"\n                formControlName=\"pricesIncludeTax\"\n                [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n            />\n        </clr-toggle-wrapper>\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'settings.default-tax-zone' | translate\" for=\"defaultTaxZoneId\">\n        <select\n            clrSelect\n            name=\"defaultTaxZoneId\"\n            formControlName=\"defaultTaxZoneId\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let zone of zones$ | async\" [value]=\"zone.id\">{{ zone.name }}</option>\n        </select>\n    </vdr-form-field>\n    <clr-alert\n        *ngIf=\"detailForm.value.code && !detailForm.value.defaultTaxZoneId\"\n        clrAlertType=\"danger\"\n        [clrAlertClosable]=\"false\"\n    >\n        <clr-alert-item>\n            <span class=\"alert-text\">\n                {{ 'error.no-default-tax-zone-set' | translate }}\n            </span>\n        </clr-alert-item>\n    </clr-alert>\n\n    <vdr-form-field [label]=\"'settings.default-shipping-zone' | translate\" for=\"defaultShippingZoneId\">\n        <select\n            clrSelect\n            name=\"defaultShippingZoneId\"\n            formControlName=\"defaultShippingZoneId\"\n            [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n        >\n            <option *ngFor=\"let zone of zones$ | async\" [value]=\"zone.id\">{{ zone.name }}</option>\n        </select>\n    </vdr-form-field>\n    <clr-alert\n        *ngIf=\"detailForm.value.code && !detailForm.value.defaultShippingZoneId\"\n        clrAlertType=\"warning\"\n        [clrAlertClosable]=\"false\"\n    >\n        <clr-alert-item>\n            <span class=\"alert-text\">\n                {{ 'error.no-default-shipping-zone-set' | translate }}\n            </span>\n        </clr-alert-item>\n    </clr-alert>\n\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <ng-container *ngFor=\"let customField of customFields\">\n            <vdr-custom-field-control\n                *ngIf=\"customFieldIsSet(customField.name)\"\n                entityName=\"Channel\"\n                [customFieldsFormGroup]=\"detailForm.get('customFields')\"\n                [customField]=\"customField\"\n            ></vdr-custom-field-control>\n        </ng-container>\n    </section>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["clr-alert{max-width:30rem;margin-bottom:12px}"]
            },] }
];
ChannelDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9zZXR0aW5ncy9zcmMvY29tcG9uZW50cy9jaGFubmVsLWRldGFpbC9jaGFubmVsLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFxQixVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RixPQUFPLEVBR0gsWUFBWSxHQUlmLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRTVFLE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBT3JELE1BQU0sT0FBTyxzQkFDVCxTQUFRLG1CQUFxQztJQVM3QyxZQUNJLE1BQWMsRUFDZCxLQUFxQixFQUNYLG1CQUF3QyxFQUMxQyxjQUFpQyxFQUMvQixXQUF3QixFQUMxQixXQUF3QixFQUN4QixtQkFBd0M7UUFFaEQsS0FBSyxDQUFDLEtBQUss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LElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3RDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLE1BQU0sS0FBSyxHQUFJLE1BQWMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0I7YUFDSjtTQUNKO1FBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLG9CQUFvQixFQUFFO1lBQ3RDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hELElBQUksV0FBVyxFQUFFO2dCQUNiLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUN6QjtTQUNKO0lBQ0wsQ0FBQztJQUVPLGFBQWE7UUFDakIsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLE9BQU8sR0FBRyxZQUFZLEVBQUUsR0FBRyxZQUFZLEVBQUUsRUFBRSxDQUFDO0lBQ2hELENBQUM7OztZQXBMSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsc2lLQUE4QztnQkFFOUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUF2QndCLE1BQU07WUFBdEIsY0FBYztZQWNkLG1CQUFtQjtZQWhCTSxpQkFBaUI7WUFlMUMsV0FBVztZQWRYLFdBQVc7WUFhWCxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7IEJhc2VEZXRhaWxDb21wb25lbnQsIEN1c3RvbUZpZWxkQ29uZmlnLCBQZXJtaXNzaW9uIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQge1xuICAgIENoYW5uZWwsXG4gICAgQ3JlYXRlQ2hhbm5lbElucHV0LFxuICAgIEN1cnJlbmN5Q29kZSxcbiAgICBHZXRab25lcyxcbiAgICBMYW5ndWFnZUNvZGUsXG4gICAgVXBkYXRlQ2hhbm5lbElucHV0LFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IGdldERlZmF1bHRVaUxhbmd1YWdlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgU2VydmVyQ29uZmlnU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgREVGQVVMVF9DSEFOTkVMX0NPREUgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC1jb25zdGFudHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWNoYW5uZWwtZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2hhbm5lbC1kZXRhaWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NoYW5uZWwtZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENoYW5uZWxEZXRhaWxDb21wb25lbnRcbiAgICBleHRlbmRzIEJhc2VEZXRhaWxDb21wb25lbnQ8Q2hhbm5lbC5GcmFnbWVudD5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBjdXN0b21GaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnW107XG4gICAgem9uZXMkOiBPYnNlcnZhYmxlPEdldFpvbmVzLlpvbmVzW10+O1xuICAgIGRldGFpbEZvcm06IEZvcm1Hcm91cDtcbiAgICBjdXJyZW5jeUNvZGVzID0gT2JqZWN0LnZhbHVlcyhDdXJyZW5jeUNvZGUpO1xuICAgIGF2YWlsYWJsZUxhbmd1YWdlQ29kZXMkOiBPYnNlcnZhYmxlPExhbmd1YWdlQ29kZVtdPjtcbiAgICByZWFkb25seSB1cGRhdGVQZXJtaXNzaW9uID0gW1Blcm1pc3Npb24uU3VwZXJBZG1pbiwgUGVybWlzc2lvbi5VcGRhdGVDaGFubmVsLCBQZXJtaXNzaW9uLkNyZWF0ZUNoYW5uZWxdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByb3RlY3RlZCBzZXJ2ZXJDb25maWdTZXJ2aWNlOiBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgc3VwZXIocm91dGUsIHJvdXRlciwgc2VydmVyQ29uZmlnU2VydmljZSwgZGF0YVNlcnZpY2UpO1xuICAgICAgICB0aGlzLmN1c3RvbUZpZWxkcyA9IHRoaXMuZ2V0Q3VzdG9tRmllbGRDb25maWcoJ0NoYW5uZWwnKTtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICBjb2RlOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgdG9rZW46IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBwcmljZXNJbmNsdWRlVGF4OiBbZmFsc2VdLFxuICAgICAgICAgICAgY3VycmVuY3lDb2RlOiBbJyddLFxuICAgICAgICAgICAgZGVmYXVsdFNoaXBwaW5nWm9uZUlkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgZGVmYXVsdExhbmd1YWdlQ29kZTogW10sXG4gICAgICAgICAgICBkZWZhdWx0VGF4Wm9uZUlkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgY3VzdG9tRmllbGRzOiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKFxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tRmllbGRzLnJlZHVjZSgoaGFzaCwgZmllbGQpID0+ICh7IC4uLmhhc2gsIFtmaWVsZC5uYW1lXTogJycgfSksIHt9KSxcbiAgICAgICAgICAgICksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgdGhpcy56b25lcyQgPSB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzLmdldFpvbmVzKCkubWFwU2luZ2xlKGRhdGEgPT4gZGF0YS56b25lcyk7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlTGFuZ3VhZ2VDb2RlcyQgPSB0aGlzLnNlcnZlckNvbmZpZ1NlcnZpY2UuZ2V0QXZhaWxhYmxlTGFuZ3VhZ2VzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIGN1c3RvbUZpZWxkSXNTZXQobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZGV0YWlsRm9ybS5nZXQoWydjdXN0b21GaWVsZHMnLCBuYW1lXSk7XG4gICAgfVxuXG4gICAgc2F2ZUJ1dHRvbkVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRldGFpbEZvcm0uZGlydHkgJiYgdGhpcy5kZXRhaWxGb3JtLnZhbGlkO1xuICAgIH1cblxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRldGFpbEZvcm0uZGlydHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmb3JtVmFsdWUgPSB0aGlzLmRldGFpbEZvcm0udmFsdWU7XG4gICAgICAgIGNvbnN0IGlucHV0OiBDcmVhdGVDaGFubmVsSW5wdXQgPSB7XG4gICAgICAgICAgICBjb2RlOiBmb3JtVmFsdWUuY29kZSxcbiAgICAgICAgICAgIHRva2VuOiBmb3JtVmFsdWUudG9rZW4sXG4gICAgICAgICAgICBkZWZhdWx0TGFuZ3VhZ2VDb2RlOiBmb3JtVmFsdWUuZGVmYXVsdExhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgIHByaWNlc0luY2x1ZGVUYXg6IGZvcm1WYWx1ZS5wcmljZXNJbmNsdWRlVGF4LFxuICAgICAgICAgICAgY3VycmVuY3lDb2RlOiBmb3JtVmFsdWUuY3VycmVuY3lDb2RlLFxuICAgICAgICAgICAgZGVmYXVsdFNoaXBwaW5nWm9uZUlkOiBmb3JtVmFsdWUuZGVmYXVsdFNoaXBwaW5nWm9uZUlkLFxuICAgICAgICAgICAgZGVmYXVsdFRheFpvbmVJZDogZm9ybVZhbHVlLmRlZmF1bHRUYXhab25lSWQsXG4gICAgICAgICAgICBjdXN0b21GaWVsZHM6IGZvcm1WYWx1ZS5jdXN0b21GaWVsZHMsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3NcbiAgICAgICAgICAgIC5jcmVhdGVDaGFubmVsKGlucHV0KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKHsgY3JlYXRlQ2hhbm5lbCB9KSA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmF1dGguY3VycmVudFVzZXIoKS5zaW5nbGUkLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAoKHsgbWUgfSkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVDaGFubmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKHsgbWUsIGNyZWF0ZUNoYW5uZWwgfSkgPT5cbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudC51cGRhdGVVc2VyQ2hhbm5lbHMobWUhLmNoYW5uZWxzKS5waXBlKG1hcCgoKSA9PiBjcmVhdGVDaGFubmVsKSksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhLl9fdHlwZW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQ2hhbm5lbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LWNyZWF0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdDaGFubmVsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8nLCBkYXRhLmlkXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0xhbmd1YWdlTm90QXZhaWxhYmxlRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKGRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZGV0YWlsRm9ybS5kaXJ0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHRoaXMuZGV0YWlsRm9ybS52YWx1ZTtcbiAgICAgICAgdGhpcy5lbnRpdHkkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKGNoYW5uZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjaGFubmVsLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogZm9ybVZhbHVlLmNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZXNJbmNsdWRlVGF4OiBmb3JtVmFsdWUucHJpY2VzSW5jbHVkZVRheCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5Q29kZTogZm9ybVZhbHVlLmN1cnJlbmN5Q29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTaGlwcGluZ1pvbmVJZDogZm9ybVZhbHVlLmRlZmF1bHRTaGlwcGluZ1pvbmVJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRMYW5ndWFnZUNvZGU6IGZvcm1WYWx1ZS5kZWZhdWx0TGFuZ3VhZ2VDb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRheFpvbmVJZDogZm9ybVZhbHVlLmRlZmF1bHRUYXhab25lSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21GaWVsZHM6IGZvcm1WYWx1ZS5jdXN0b21GaWVsZHMsXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgVXBkYXRlQ2hhbm5lbElucHV0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5zZXR0aW5ncy51cGRhdGVDaGFubmVsKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHsgdXBkYXRlQ2hhbm5lbCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh1cGRhdGVDaGFubmVsLl9fdHlwZW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQ2hhbm5lbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LXVwZGF0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdDaGFubmVsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0xhbmd1YWdlTm90QXZhaWxhYmxlRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKHVwZGF0ZUNoYW5uZWwubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBmb3JtIHZhbHVlcyB3aGVuIHRoZSBlbnRpdHkgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc2V0Rm9ybVZhbHVlcyhlbnRpdHk6IENoYW5uZWwuRnJhZ21lbnQsIGxhbmd1YWdlQ29kZTogTGFuZ3VhZ2VDb2RlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5wYXRjaFZhbHVlKHtcbiAgICAgICAgICAgIGNvZGU6IGVudGl0eS5jb2RlLFxuICAgICAgICAgICAgdG9rZW46IGVudGl0eS50b2tlbiB8fCB0aGlzLmdlbmVyYXRlVG9rZW4oKSxcbiAgICAgICAgICAgIHByaWNlc0luY2x1ZGVUYXg6IGVudGl0eS5wcmljZXNJbmNsdWRlVGF4LFxuICAgICAgICAgICAgY3VycmVuY3lDb2RlOiBlbnRpdHkuY3VycmVuY3lDb2RlLFxuICAgICAgICAgICAgZGVmYXVsdFNoaXBwaW5nWm9uZUlkOiBlbnRpdHkuZGVmYXVsdFNoaXBwaW5nWm9uZSA/IGVudGl0eS5kZWZhdWx0U2hpcHBpbmdab25lLmlkIDogJycsXG4gICAgICAgICAgICBkZWZhdWx0TGFuZ3VhZ2VDb2RlOiBlbnRpdHkuZGVmYXVsdExhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgIGRlZmF1bHRUYXhab25lSWQ6IGVudGl0eS5kZWZhdWx0VGF4Wm9uZSA/IGVudGl0eS5kZWZhdWx0VGF4Wm9uZS5pZCA6ICcnLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tRmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgY3VzdG9tRmllbGRzR3JvdXAgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KCdjdXN0b21GaWVsZHMnKSBhcyBGb3JtR3JvdXA7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGREZWYgb2YgdGhpcy5jdXN0b21GaWVsZHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBmaWVsZERlZi5uYW1lO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gKGVudGl0eSBhcyBhbnkpLmN1c3RvbUZpZWxkc1trZXldO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSBjdXN0b21GaWVsZHNHcm91cC5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoY29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sLnBhdGNoVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZW50aXR5LmNvZGUgPT09IERFRkFVTFRfQ0hBTk5FTF9DT0RFKSB7XG4gICAgICAgICAgICBjb25zdCBjb2RlQ29udHJvbCA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ2NvZGUnKTtcbiAgICAgICAgICAgIGlmIChjb2RlQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIGNvZGVDb250cm9sLmRpc2FibGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVUb2tlbigpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCByYW5kb21TdHJpbmcgPSAoKSA9PiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMywgMTApO1xuICAgICAgICByZXR1cm4gYCR7cmFuZG9tU3RyaW5nKCl9JHtyYW5kb21TdHJpbmcoKX1gO1xuICAgIH1cbn1cbiJdfQ==