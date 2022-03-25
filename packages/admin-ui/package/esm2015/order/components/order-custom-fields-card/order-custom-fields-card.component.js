import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
export class OrderCustomFieldsCardComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.customFieldsConfig = [];
        this.customFieldValues = {};
        this.updateClick = new EventEmitter();
        this.editable = false;
    }
    ngOnInit() {
        this.customFieldForm = this.formBuilder.group({});
        for (const field of this.customFieldsConfig) {
            this.customFieldForm.addControl(field.name, this.formBuilder.control(this.customFieldValues[field.name]));
        }
    }
    onUpdateClick() {
        this.updateClick.emit(this.customFieldForm.value);
        this.customFieldForm.markAsPristine();
        this.editable = false;
    }
}
OrderCustomFieldsCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-custom-fields-card',
                template: "<div class=\"card\" *ngIf=\"customFieldsConfig.length\">\n    <div class=\"card-header\">\n        {{ 'common.custom-fields' | translate }}\n    </div>\n    <div class=\"card-block\">\n        <div class=\"card-text custom-field-form\" [class.editable]=\"editable\">\n            <ng-container *ngFor=\"let customField of customFieldsConfig\">\n                <vdr-custom-field-control\n                    entityName=\"Order\"\n                    [customFieldsFormGroup]=\"customFieldForm\"\n                    [compact]=\"true\"\n                    [readonly]=\"customField.readonly || !editable\"\n                    [customField]=\"customField\"\n                ></vdr-custom-field-control>\n            </ng-container>\n        </div>\n    </div>\n    <div class=\"card-footer\">\n        <button class=\"btn btn-sm btn-secondary\" (click)=\"editable = true\" *ngIf=\"!editable\">\n            <clr-icon shape=\"pencil\"></clr-icon>\n            {{ 'common.edit' | translate }}\n        </button>\n        <button\n            class=\"btn btn-sm btn-primary\"\n            (click)=\"onUpdateClick()\"\n            *ngIf=\"editable\"\n            [disabled]=\"customFieldForm.pristine || customFieldForm.invalid\"\n        >\n            <clr-icon shape=\"check\"></clr-icon>\n            {{ 'common.update' | translate }}\n        </button>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["vdr-custom-field-control{margin-bottom:6px;display:block}.custom-field-form ::ng-deep .clr-control-label{color:var(--color-grey-400)}.custom-field-form.editable ::ng-deep .clr-control-label{color:inherit}"]
            },] }
];
OrderCustomFieldsCardComponent.ctorParameters = () => [
    { type: FormBuilder }
];
OrderCustomFieldsCardComponent.propDecorators = {
    customFieldsConfig: [{ type: Input }],
    customFieldValues: [{ type: Input }],
    updateClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY3VzdG9tLWZpZWxkcy1jYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvb3JkZXIvc3JjL2NvbXBvbmVudHMvb3JkZXItY3VzdG9tLWZpZWxkcy1jYXJkL29yZGVyLWN1c3RvbS1maWVsZHMtY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsV0FBVyxFQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFTeEQsTUFBTSxPQUFPLDhCQUE4QjtJQU12QyxZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUxuQyx1QkFBa0IsR0FBd0IsRUFBRSxDQUFDO1FBQzdDLHNCQUFpQixHQUE0QixFQUFFLENBQUM7UUFDL0MsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRWhELGFBQVEsR0FBRyxLQUFLLENBQUM7SUFDOEIsQ0FBQztJQUVoRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRCxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FDM0IsS0FBSyxDQUFDLElBQUksRUFDVixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQy9ELENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxhQUFhO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7OztZQTVCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMseTJDQUF3RDtnQkFFeEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFSUSxXQUFXOzs7aUNBVWYsS0FBSztnQ0FDTCxLQUFLOzBCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEN1c3RvbUZpZWxkQ29uZmlnIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLW9yZGVyLWN1c3RvbS1maWVsZHMtY2FyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL29yZGVyLWN1c3RvbS1maWVsZHMtY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vb3JkZXItY3VzdG9tLWZpZWxkcy1jYXJkLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyQ3VzdG9tRmllbGRzQ2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgY3VzdG9tRmllbGRzQ29uZmlnOiBDdXN0b21GaWVsZENvbmZpZ1tdID0gW107XG4gICAgQElucHV0KCkgY3VzdG9tRmllbGRWYWx1ZXM6IHsgW25hbWU6IHN0cmluZ106IGFueSB9ID0ge307XG4gICAgQE91dHB1dCgpIHVwZGF0ZUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgY3VzdG9tRmllbGRGb3JtOiBGb3JtR3JvdXA7XG4gICAgZWRpdGFibGUgPSBmYWxzZTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmN1c3RvbUZpZWxkRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe30pO1xuICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIHRoaXMuY3VzdG9tRmllbGRzQ29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbUZpZWxkRm9ybS5hZGRDb250cm9sKFxuICAgICAgICAgICAgICAgIGZpZWxkLm5hbWUsXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQnVpbGRlci5jb250cm9sKHRoaXMuY3VzdG9tRmllbGRWYWx1ZXNbZmllbGQubmFtZV0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVXBkYXRlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMudXBkYXRlQ2xpY2suZW1pdCh0aGlzLmN1c3RvbUZpZWxkRm9ybS52YWx1ZSk7XG4gICAgICAgIHRoaXMuY3VzdG9tRmllbGRGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSBmYWxzZTtcbiAgICB9XG59XG4iXX0=