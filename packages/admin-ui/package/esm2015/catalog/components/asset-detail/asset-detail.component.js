import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, } from '@vendure/admin-ui/core';
import { DataService, NotificationService, ServerConfigService } from '@vendure/admin-ui/core';
export class AssetDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, notificationService, dataService, formBuilder) {
        super(route, router, serverConfigService, dataService);
        this.notificationService = notificationService;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.detailForm = new FormGroup({});
        this.customFields = this.getCustomFieldConfig('Asset');
    }
    ngOnInit() {
        this.detailForm = new FormGroup({
            name: new FormControl(''),
            tags: new FormControl([]),
            customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
        });
        this.init();
    }
    ngOnDestroy() {
        this.destroy();
    }
    onAssetChange(event) {
        var _a, _b;
        (_a = this.detailForm.get('name')) === null || _a === void 0 ? void 0 : _a.setValue(event.name);
        (_b = this.detailForm.get('tags')) === null || _b === void 0 ? void 0 : _b.setValue(event.tags);
        this.detailForm.markAsDirty();
    }
    save() {
        this.dataService.product
            .updateAsset({
            id: this.id,
            name: this.detailForm.value.name,
            tags: this.detailForm.value.tags,
            customFields: this.detailForm.value.customFields,
        })
            .subscribe(() => {
            this.notificationService.success(_('common.notify-update-success'), { entity: 'Asset' });
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
                entity: 'Asset',
            });
        });
    }
    setFormValues(entity, languageCode) {
        var _a, _b;
        (_a = this.detailForm.get('name')) === null || _a === void 0 ? void 0 : _a.setValue(entity.name);
        (_b = this.detailForm.get('tags')) === null || _b === void 0 ? void 0 : _b.setValue(entity.tags);
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
    }
}
AssetDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"asset-detail\"></vdr-action-bar-items>\n        <button\n            *vdrIfPermissions=\"['UpdateCatalog', 'UpdateAsset']\"\n            class=\"btn btn-primary\"\n            (click)=\"save()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.update' | translate }}\n        </button>\n    </vdr-ab-right>\n</vdr-action-bar>\n<vdr-asset-preview\n    [asset]=\"entity$ | async\"\n    [editable]=\"true\"\n    [customFields]=\"customFields\"\n    [customFieldsForm]=\"detailForm.get('customFields')\"\n    (assetChange)=\"onAssetChange($event)\"\n></vdr-asset-preview>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;flex-direction:column;height:100%}"]
            },] }
];
AssetDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: NotificationService },
    { type: DataService },
    { type: FormBuilder }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9hc3NldC1kZXRhaWwvYXNzZXQtZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUVILG1CQUFtQixHQUl0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVEvRixNQUFNLE9BQU8sb0JBQXFCLFNBQVEsbUJBQW1DO0lBSXpFLFlBQ0ksTUFBYyxFQUNkLEtBQXFCLEVBQ3JCLG1CQUF3QyxFQUNoQyxtQkFBd0MsRUFDdEMsV0FBd0IsRUFDMUIsV0FBd0I7UUFFaEMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFKL0Msd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN0QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVRwQyxlQUFVLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFZM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FB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QzdCO2FBQ0o7U0FDSjtJQUNMLENBQUM7OztZQTlFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsaTBCQUE0QztnQkFFNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFoQndCLE1BQU07WUFBdEIsY0FBYztZQVNvQixtQkFBbUI7WUFBeEMsbUJBQW1CO1lBQWhDLFdBQVc7WUFWWCxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQge1xuICAgIEFzc2V0LFxuICAgIEJhc2VEZXRhaWxDb21wb25lbnQsXG4gICAgQ3VzdG9tRmllbGRDb25maWcsXG4gICAgR2V0QXNzZXQsXG4gICAgTGFuZ3VhZ2VDb2RlLFxufSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlLCBOb3RpZmljYXRpb25TZXJ2aWNlLCBTZXJ2ZXJDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWFzc2V0LWRldGFpbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Fzc2V0LWRldGFpbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXNzZXQtZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFzc2V0RGV0YWlsQ29tcG9uZW50IGV4dGVuZHMgQmFzZURldGFpbENvbXBvbmVudDxHZXRBc3NldC5Bc3NldD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgZGV0YWlsRm9ybSA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgIGN1c3RvbUZpZWxkczogQ3VzdG9tRmllbGRDb25maWdbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBzZXJ2ZXJDb25maWdTZXJ2aWNlOiBTZXJ2ZXJDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICkge1xuICAgICAgICBzdXBlcihyb3V0ZSwgcm91dGVyLCBzZXJ2ZXJDb25maWdTZXJ2aWNlLCBkYXRhU2VydmljZSk7XG4gICAgICAgIHRoaXMuY3VzdG9tRmllbGRzID0gdGhpcy5nZXRDdXN0b21GaWVsZENvbmZpZygnQXNzZXQnKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAgICAgICBuYW1lOiBuZXcgRm9ybUNvbnRyb2woJycpLFxuICAgICAgICAgICAgdGFnczogbmV3IEZvcm1Db250cm9sKFtdKSxcbiAgICAgICAgICAgIGN1c3RvbUZpZWxkczogdGhpcy5mb3JtQnVpbGRlci5ncm91cChcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUZpZWxkcy5yZWR1Y2UoKGhhc2gsIGZpZWxkKSA9PiAoeyAuLi5oYXNoLCBbZmllbGQubmFtZV06ICcnIH0pLCB7fSksXG4gICAgICAgICAgICApLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIG9uQXNzZXRDaGFuZ2UoZXZlbnQ6IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyB0YWdzOiBzdHJpbmdbXSB9KSB7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5nZXQoJ25hbWUnKT8uc2V0VmFsdWUoZXZlbnQubmFtZSk7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5nZXQoJ3RhZ3MnKT8uc2V0VmFsdWUoZXZlbnQudGFncyk7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgLnVwZGF0ZUFzc2V0KHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmRldGFpbEZvcm0udmFsdWUubmFtZSxcbiAgICAgICAgICAgICAgICB0YWdzOiB0aGlzLmRldGFpbEZvcm0udmFsdWUudGFncyxcbiAgICAgICAgICAgICAgICBjdXN0b21GaWVsZHM6IHRoaXMuZGV0YWlsRm9ybS52YWx1ZS5jdXN0b21GaWVsZHMsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLXN1Y2Nlc3MnKSwgeyBlbnRpdHk6ICdBc3NldCcgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtZXJyb3InKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQXNzZXQnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0Rm9ybVZhbHVlcyhlbnRpdHk6IEdldEFzc2V0LkFzc2V0LCBsYW5ndWFnZUNvZGU6IExhbmd1YWdlQ29kZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0uZ2V0KCduYW1lJyk/LnNldFZhbHVlKGVudGl0eS5uYW1lKTtcbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLmdldCgndGFncycpPy5zZXRWYWx1ZShlbnRpdHkudGFncyk7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbUZpZWxkc0dyb3VwID0gdGhpcy5kZXRhaWxGb3JtLmdldCgnY3VzdG9tRmllbGRzJykgYXMgRm9ybUdyb3VwO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkRGVmIG9mIHRoaXMuY3VzdG9tRmllbGRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZmllbGREZWYubmFtZTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IChlbnRpdHkgYXMgYW55KS5jdXN0b21GaWVsZHNba2V5XTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gY3VzdG9tRmllbGRzR3JvdXAuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbC5wYXRjaFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=