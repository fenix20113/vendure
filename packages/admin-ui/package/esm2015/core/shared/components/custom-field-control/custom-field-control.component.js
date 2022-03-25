import { Component, Input, ViewChild, ViewContainerRef, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from '../../../data/providers/data.service';
import { CustomFieldComponentService, } from '../../../providers/custom-field-component/custom-field-component.service';
/**
 * This component renders the appropriate type of form input control based
 * on the "type" property of the provided CustomFieldConfig.
 */
export class CustomFieldControlComponent {
    constructor(dataService, customFieldComponentService) {
        this.dataService = dataService;
        this.customFieldComponentService = customFieldComponentService;
        this.compact = false;
        this.showLabel = true;
        this.readonly = false;
        this.hasCustomControl = false;
    }
    getFieldDefinition() {
        const config = Object.assign({}, this.customField);
        const id = this.customFieldComponentService.customFieldComponentExists(this.entityName, this.customField.name);
        if (id) {
            config.ui = { component: id };
        }
        switch (config.__typename) {
            case 'IntCustomFieldConfig':
                return Object.assign(Object.assign({}, config), { min: config.intMin, max: config.intMax, step: config.intStep });
            case 'FloatCustomFieldConfig':
                return Object.assign(Object.assign({}, config), { min: config.floatMin, max: config.floatMax, step: config.floatStep });
            case 'DateTimeCustomFieldConfig':
                return Object.assign(Object.assign({}, config), { min: config.datetimeMin, max: config.datetimeMax, step: config.datetimeStep });
            default:
                return Object.assign({}, config);
        }
    }
}
CustomFieldControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-custom-field-control',
                template: "<div class=\"clr-form-control\" *ngIf=\"compact\">\n    <label for=\"basic\" class=\"clr-control-label\">{{ customField | customFieldLabel }}</label>\n    <div class=\"clr-control-container\">\n        <div class=\"clr-input-wrapper\">\n            <ng-container *ngTemplateOutlet=\"inputs\"></ng-container>\n        </div>\n    </div>\n</div>\n<vdr-form-field [label]=\"customField | customFieldLabel\" [for]=\"customField.name\" *ngIf=\"!compact\">\n    <ng-container *ngTemplateOutlet=\"inputs\"></ng-container>\n</vdr-form-field>\n\n<ng-template #inputs>\n    <ng-container [formGroup]=\"formGroup\">\n        <vdr-dynamic-form-input\n            [formControlName]=\"customField.name\"\n            [readonly]=\"readonly || customField.readonly\"\n            [control]=\"formGroup.get(customField.name)\"\n            [def]=\"getFieldDefinition()\"\n        >\n        </vdr-dynamic-form-input>\n    </ng-container>\n</ng-template>\n",
                styles: [":host .toggle-switch{margin-top:0;margin-bottom:0}"]
            },] }
];
CustomFieldControlComponent.ctorParameters = () => [
    { type: DataService },
    { type: CustomFieldComponentService }
];
CustomFieldControlComponent.propDecorators = {
    entityName: [{ type: Input }],
    formGroup: [{ type: Input, args: ['customFieldsFormGroup',] }],
    customField: [{ type: Input }],
    compact: [{ type: Input }],
    showLabel: [{ type: Input }],
    readonly: [{ type: Input }],
    customComponentPlaceholder: [{ type: ViewChild, args: ['customComponentPlaceholder', { read: ViewContainerRef },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWZpZWxkLWNvbnRyb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9jdXN0b20tZmllbGQtY29udHJvbC9jdXN0b20tZmllbGQtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILFNBQVMsRUFFVCxLQUFLLEVBRUwsU0FBUyxFQUNULGdCQUFnQixHQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ25FLE9BQU8sRUFDSCwyQkFBMkIsR0FHOUIsTUFBTSwwRUFBMEUsQ0FBQztBQUVsRjs7O0dBR0c7QUFNSCxNQUFNLE9BQU8sMkJBQTJCO0lBWXBDLFlBQ1ksV0FBd0IsRUFDeEIsMkJBQXdEO1FBRHhELGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGdDQUEyQixHQUEzQiwyQkFBMkIsQ0FBNkI7UUFWM0QsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDMUIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO0lBUXRCLENBQUM7SUFFSixrQkFBa0I7UUFDZCxNQUFNLE1BQU0scUJBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FDdEIsQ0FBQztRQUNGLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQywwQkFBMEIsQ0FDbEUsSUFBSSxDQUFDLFVBQVUsRUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDeEIsQ0FBQztRQUNGLElBQUksRUFBRSxFQUFFO1lBQ0osTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQztTQUNqQztRQUNELFFBQVEsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUN2QixLQUFLLHNCQUFzQjtnQkFDdkIsdUNBQ08sTUFBTSxLQUNULEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUNsQixHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFDbEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQ3RCO1lBQ04sS0FBSyx3QkFBd0I7Z0JBQ3pCLHVDQUNPLE1BQU0sS0FDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFDcEIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQ3BCLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxJQUN4QjtZQUNOLEtBQUssMkJBQTJCO2dCQUM1Qix1Q0FDTyxNQUFNLEtBQ1QsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQ3ZCLEdBQUcsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUN2QixJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVksSUFDM0I7WUFDTjtnQkFDSSx5QkFDTyxNQUFNLEVBQ1g7U0FDVDtJQUNMLENBQUM7OztZQTVESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsczdCQUFvRDs7YUFFdkQ7OztZQWZRLFdBQVc7WUFFaEIsMkJBQTJCOzs7eUJBZTFCLEtBQUs7d0JBQ0wsS0FBSyxTQUFDLHVCQUF1QjswQkFDN0IsS0FBSztzQkFDTCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSzt5Q0FFTCxTQUFTLFNBQUMsNEJBQTRCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IElucHV0Q29tcG9uZW50Q29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudC1yZWdpc3RyeS10eXBlcyc7XG5pbXBvcnQgeyBDdXN0b21GaWVsZENvbmZpZywgQ3VzdG9tRmllbGRzRnJhZ21lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gICAgQ3VzdG9tRmllbGRDb21wb25lbnRTZXJ2aWNlLFxuICAgIEN1c3RvbUZpZWxkQ29udHJvbCxcbiAgICBDdXN0b21GaWVsZEVudGl0eU5hbWUsXG59IGZyb20gJy4uLy4uLy4uL3Byb3ZpZGVycy9jdXN0b20tZmllbGQtY29tcG9uZW50L2N1c3RvbS1maWVsZC1jb21wb25lbnQuc2VydmljZSc7XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgcmVuZGVycyB0aGUgYXBwcm9wcmlhdGUgdHlwZSBvZiBmb3JtIGlucHV0IGNvbnRyb2wgYmFzZWRcbiAqIG9uIHRoZSBcInR5cGVcIiBwcm9wZXJ0eSBvZiB0aGUgcHJvdmlkZWQgQ3VzdG9tRmllbGRDb25maWcuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWN1c3RvbS1maWVsZC1jb250cm9sJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY3VzdG9tLWZpZWxkLWNvbnRyb2wuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2N1c3RvbS1maWVsZC1jb250cm9sLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbUZpZWxkQ29udHJvbENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgZW50aXR5TmFtZTogQ3VzdG9tRmllbGRFbnRpdHlOYW1lO1xuICAgIEBJbnB1dCgnY3VzdG9tRmllbGRzRm9ybUdyb3VwJykgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG4gICAgQElucHV0KCkgY3VzdG9tRmllbGQ6IEN1c3RvbUZpZWxkc0ZyYWdtZW50O1xuICAgIEBJbnB1dCgpIGNvbXBhY3QgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaG93TGFiZWwgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5ID0gZmFsc2U7XG4gICAgaGFzQ3VzdG9tQ29udHJvbCA9IGZhbHNlO1xuICAgIEBWaWV3Q2hpbGQoJ2N1c3RvbUNvbXBvbmVudFBsYWNlaG9sZGVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gICAgcHJpdmF0ZSBjdXN0b21Db21wb25lbnRQbGFjZWhvbGRlcjogVmlld0NvbnRhaW5lclJlZjtcbiAgICBwcml2YXRlIGN1c3RvbUNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8Q3VzdG9tRmllbGRDb250cm9sPiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjdXN0b21GaWVsZENvbXBvbmVudFNlcnZpY2U6IEN1c3RvbUZpZWxkQ29tcG9uZW50U2VydmljZSxcbiAgICApIHt9XG5cbiAgICBnZXRGaWVsZERlZmluaXRpb24oKTogQ3VzdG9tRmllbGRDb25maWcgJiB7IHVpPzogSW5wdXRDb21wb25lbnRDb25maWcgfSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZzogQ3VzdG9tRmllbGRzRnJhZ21lbnQgJiB7IHVpPzogSW5wdXRDb21wb25lbnRDb25maWcgfSA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tRmllbGQsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5jdXN0b21GaWVsZENvbXBvbmVudFNlcnZpY2UuY3VzdG9tRmllbGRDb21wb25lbnRFeGlzdHMoXG4gICAgICAgICAgICB0aGlzLmVudGl0eU5hbWUsXG4gICAgICAgICAgICB0aGlzLmN1c3RvbUZpZWxkLm5hbWUsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgY29uZmlnLnVpID0geyBjb21wb25lbnQ6IGlkIH07XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChjb25maWcuX190eXBlbmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnSW50Q3VzdG9tRmllbGRDb25maWcnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgbWluOiBjb25maWcuaW50TWluLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IGNvbmZpZy5pbnRNYXgsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IGNvbmZpZy5pbnRTdGVwLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdGbG9hdEN1c3RvbUZpZWxkQ29uZmlnJzpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi5jb25maWcsXG4gICAgICAgICAgICAgICAgICAgIG1pbjogY29uZmlnLmZsb2F0TWluLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IGNvbmZpZy5mbG9hdE1heCxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogY29uZmlnLmZsb2F0U3RlcCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnRGF0ZVRpbWVDdXN0b21GaWVsZENvbmZpZyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICAgICAgICAgICAgICBtaW46IGNvbmZpZy5kYXRldGltZU1pbixcbiAgICAgICAgICAgICAgICAgICAgbWF4OiBjb25maWcuZGF0ZXRpbWVNYXgsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IGNvbmZpZy5kYXRldGltZVN0ZXAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=