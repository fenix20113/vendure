import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { createUpdatedTranslatable } from '@vendure/admin-ui/core';
import { normalizeString } from '@vendure/common/lib/normalize-string';
export class UpdateProductOptionDialogComponent {
    constructor() {
        this.updateVariantName = true;
        this.codeInputTouched = false;
    }
    ngOnInit() {
        var _a;
        const currentTranslation = this.productOption.translations.find(t => t.languageCode === this.activeLanguage);
        this.name = (_a = currentTranslation === null || currentTranslation === void 0 ? void 0 : currentTranslation.name) !== null && _a !== void 0 ? _a : '';
        this.code = this.productOption.code;
        this.customFieldsForm = new FormGroup({});
        if (this.customFields) {
            const cfCurrentTranslation = (currentTranslation && currentTranslation.customFields) || {};
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = fieldDef.type === 'localeString'
                    ? cfCurrentTranslation[key]
                    : this.productOption.customFields[key];
                this.customFieldsForm.addControl(fieldDef.name, new FormControl(value));
            }
        }
    }
    update() {
        const result = createUpdatedTranslatable({
            translatable: this.productOption,
            languageCode: this.activeLanguage,
            updatedFields: {
                code: this.code,
                name: this.name,
                customFields: this.customFieldsForm.value,
            },
            customFieldConfig: this.customFields,
            defaultTranslation: {
                languageCode: this.activeLanguage,
                name: '',
            },
        });
        this.resolveWith(Object.assign(Object.assign({}, result), { autoUpdate: this.updateVariantName }));
    }
    cancel() {
        this.resolveWith();
    }
    updateCode(nameValue) {
        if (!this.codeInputTouched && !this.productOption.code) {
            this.code = normalizeString(nameValue, '-');
        }
    }
}
UpdateProductOptionDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-update-product-option-dialog',
                template: "<ng-template vdrDialogTitle>{{ 'catalog.update-product-option' | translate }}</ng-template>\n<vdr-form-field [label]=\"'catalog.option-name' | translate\" for=\"name\">\n    <input\n        id=\"name\"\n        type=\"text\"\n        #nameInput=\"ngModel\"\n        [(ngModel)]=\"name\"\n        required\n        (input)=\"updateCode($event.target.value)\"\n    />\n</vdr-form-field>\n<vdr-form-field [label]=\"'common.code' | translate\" for=\"code\">\n    <input id=\"code\" type=\"text\" #codeInput=\"ngModel\" required [(ngModel)]=\"code\" pattern=\"[a-z0-9_-]+\" />\n</vdr-form-field>\n<clr-checkbox-wrapper>\n    <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"updateVariantName\" />\n    <label>{{ 'catalog.auto-update-option-variant-name' | translate }}</label>\n</clr-checkbox-wrapper>\n<section *ngIf=\"customFields.length\">\n    <label>{{ 'common.custom-fields' | translate }}</label>\n    <ng-container *ngFor=\"let customField of customFields\">\n        <vdr-custom-field-control\n            *ngIf=\"customFieldsForm.get(customField.name)\"\n            entityName=\"ProductOption\"\n            [customFieldsFormGroup]=\"customFieldsForm\"\n            [customField]=\"customField\"\n            [readonly]=\"!(['UpdateCatalog', 'UpdateProduct'] | hasPermission)\"\n        ></vdr-custom-field-control>\n    </ng-container>\n</section>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"update()\"\n        [disabled]=\"\n            nameInput.invalid ||\n            codeInput.invalid ||\n            (nameInput.pristine && codeInput.pristine && customFieldsForm.pristine)\n        \"\n        class=\"btn btn-primary\"\n    >\n        {{ 'catalog.update-product-option' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXByb2R1Y3Qtb3B0aW9uLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NhdGFsb2cvc3JjL2NvbXBvbmVudHMvdXBkYXRlLXByb2R1Y3Qtb3B0aW9uLWRpYWxvZy91cGRhdGUtcHJvZHVjdC1vcHRpb24tZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPeEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBUXZFLE1BQU0sT0FBTyxrQ0FBa0M7SUFOL0M7UUFTSSxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFPekIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO0lBb0Q3QixDQUFDO0lBakRHLFFBQVE7O1FBQ0osTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQzNELENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsY0FBYyxDQUM5QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksU0FBRyxrQkFBa0IsYUFBbEIsa0JBQWtCLHVCQUFsQixrQkFBa0IsQ0FBRSxJQUFJLG1DQUFJLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsTUFBTSxvQkFBb0IsR0FDdEIsQ0FBQyxrQkFBa0IsSUFBSyxrQkFBMEIsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFM0UsS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUN0QyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUMxQixNQUFNLEtBQUssR0FDUCxRQUFRLENBQUMsSUFBSSxLQUFLLGNBQWM7b0JBQzVCLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUM7b0JBQzNCLENBQUMsQ0FBRSxJQUFJLENBQUMsYUFBcUIsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzNFO1NBQ0o7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sTUFBTSxHQUFHLHlCQUF5QixDQUFDO1lBQ3JDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNoQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDakMsYUFBYSxFQUFFO2dCQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsWUFBWSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO2FBQzVDO1lBQ0QsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDcEMsa0JBQWtCLEVBQUU7Z0JBQ2hCLFlBQVksRUFBRSxJQUFJLENBQUMsY0FBYztnQkFDakMsSUFBSSxFQUFFLEVBQUU7YUFDWDtTQUNKLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLGlDQUFNLE1BQU0sS0FBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixJQUFHLENBQUM7SUFDeEUsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELFVBQVUsQ0FBQyxTQUFpQjtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDcEQsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQy9DO0lBQ0wsQ0FBQzs7O1lBbkVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0NBQWtDO2dCQUM1QywyMkRBQTREO2dCQUU1RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICAgIEN1c3RvbUZpZWxkQ29uZmlnLFxuICAgIExhbmd1YWdlQ29kZSxcbiAgICBQcm9kdWN0VmFyaWFudCxcbiAgICBVcGRhdGVQcm9kdWN0T3B0aW9uSW5wdXQsXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgY3JlYXRlVXBkYXRlZFRyYW5zbGF0YWJsZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgRGlhbG9nIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBub3JtYWxpemVTdHJpbmcgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL25vcm1hbGl6ZS1zdHJpbmcnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci11cGRhdGUtcHJvZHVjdC1vcHRpb24tZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdXBkYXRlLXByb2R1Y3Qtb3B0aW9uLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdXBkYXRlLXByb2R1Y3Qtb3B0aW9uLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBVcGRhdGVQcm9kdWN0T3B0aW9uRGlhbG9nQ29tcG9uZW50XG4gICAgaW1wbGVtZW50cyBEaWFsb2c8VXBkYXRlUHJvZHVjdE9wdGlvbklucHV0ICYgeyBhdXRvVXBkYXRlOiBib29sZWFuIH0+LCBPbkluaXQge1xuICAgIHJlc29sdmVXaXRoOiAocmVzdWx0PzogVXBkYXRlUHJvZHVjdE9wdGlvbklucHV0ICYgeyBhdXRvVXBkYXRlOiBib29sZWFuIH0pID0+IHZvaWQ7XG4gICAgdXBkYXRlVmFyaWFudE5hbWUgPSB0cnVlO1xuICAgIC8vIFByb3ZpZGVkIGJ5IGNhbGxlclxuICAgIHByb2R1Y3RPcHRpb246IFByb2R1Y3RWYXJpYW50Lk9wdGlvbnM7XG4gICAgYWN0aXZlTGFuZ3VhZ2U6IExhbmd1YWdlQ29kZTtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgY29kZTogc3RyaW5nO1xuICAgIGN1c3RvbUZpZWxkczogQ3VzdG9tRmllbGRDb25maWdbXTtcbiAgICBjb2RlSW5wdXRUb3VjaGVkID0gZmFsc2U7XG4gICAgY3VzdG9tRmllbGRzRm9ybTogRm9ybUdyb3VwO1xuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUcmFuc2xhdGlvbiA9IHRoaXMucHJvZHVjdE9wdGlvbi50cmFuc2xhdGlvbnMuZmluZChcbiAgICAgICAgICAgIHQgPT4gdC5sYW5ndWFnZUNvZGUgPT09IHRoaXMuYWN0aXZlTGFuZ3VhZ2UsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubmFtZSA9IGN1cnJlbnRUcmFuc2xhdGlvbj8ubmFtZSA/PyAnJztcbiAgICAgICAgdGhpcy5jb2RlID0gdGhpcy5wcm9kdWN0T3B0aW9uLmNvZGU7XG4gICAgICAgIHRoaXMuY3VzdG9tRmllbGRzRm9ybSA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgICAgICBpZiAodGhpcy5jdXN0b21GaWVsZHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNmQ3VycmVudFRyYW5zbGF0aW9uID1cbiAgICAgICAgICAgICAgICAoY3VycmVudFRyYW5zbGF0aW9uICYmIChjdXJyZW50VHJhbnNsYXRpb24gYXMgYW55KS5jdXN0b21GaWVsZHMpIHx8IHt9O1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkRGVmIG9mIHRoaXMuY3VzdG9tRmllbGRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZmllbGREZWYubmFtZTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRGVmLnR5cGUgPT09ICdsb2NhbGVTdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGNmQ3VycmVudFRyYW5zbGF0aW9uW2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogKHRoaXMucHJvZHVjdE9wdGlvbiBhcyBhbnkpLmN1c3RvbUZpZWxkc1trZXldO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tRmllbGRzRm9ybS5hZGRDb250cm9sKGZpZWxkRGVmLm5hbWUsIG5ldyBGb3JtQ29udHJvbCh2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjcmVhdGVVcGRhdGVkVHJhbnNsYXRhYmxlKHtcbiAgICAgICAgICAgIHRyYW5zbGF0YWJsZTogdGhpcy5wcm9kdWN0T3B0aW9uLFxuICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlOiB0aGlzLmFjdGl2ZUxhbmd1YWdlLFxuICAgICAgICAgICAgdXBkYXRlZEZpZWxkczoge1xuICAgICAgICAgICAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgY3VzdG9tRmllbGRzOiB0aGlzLmN1c3RvbUZpZWxkc0Zvcm0udmFsdWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3VzdG9tRmllbGRDb25maWc6IHRoaXMuY3VzdG9tRmllbGRzLFxuICAgICAgICAgICAgZGVmYXVsdFRyYW5zbGF0aW9uOiB7XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlOiB0aGlzLmFjdGl2ZUxhbmd1YWdlLFxuICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVzb2x2ZVdpdGgoeyAuLi5yZXN1bHQsIGF1dG9VcGRhdGU6IHRoaXMudXBkYXRlVmFyaWFudE5hbWUgfSk7XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLnJlc29sdmVXaXRoKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29kZShuYW1lVmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuY29kZUlucHV0VG91Y2hlZCAmJiAhdGhpcy5wcm9kdWN0T3B0aW9uLmNvZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY29kZSA9IG5vcm1hbGl6ZVN0cmluZyhuYW1lVmFsdWUsICctJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=