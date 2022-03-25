import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class SelectFormInputComponent {
}
SelectFormInputComponent.id = 'select-form-input';
SelectFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-select-form-input',
                template: "<select clrSelect [formControl]=\"formControl\" [vdrDisabled]=\"readonly\">\n    <option *ngFor=\"let option of config.options\" [value]=\"option.value\">\n        {{ (option | customFieldLabel) || option.label || option.value }}\n    </option>\n</select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["select{width:100%}"]
            },] }
];
SelectFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWZvcm0taW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvZHluYW1pYy1mb3JtLWlucHV0cy9zZWxlY3QtZm9ybS1pbnB1dC9zZWxlY3QtZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFZMUUsTUFBTSxPQUFPLHdCQUF3Qjs7QUFDakIsMkJBQUUsR0FBMkIsbUJBQW1CLENBQUM7O1lBUHBFLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyw2UUFBaUQ7Z0JBRWpELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O3VCQUdJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWZhdWx0Rm9ybUNvbXBvbmVudENvbmZpZywgRGVmYXVsdEZvcm1Db21wb25lbnRJZCB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXR5cGVzJztcblxuaW1wb3J0IHsgRm9ybUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudC1yZWdpc3RyeS10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXNlbGVjdC1mb3JtLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LWZvcm0taW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NlbGVjdC1mb3JtLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdEZvcm1JbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIEZvcm1JbnB1dENvbXBvbmVudCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IGlkOiBEZWZhdWx0Rm9ybUNvbXBvbmVudElkID0gJ3NlbGVjdC1mb3JtLWlucHV0JztcbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcbiAgICBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgY29uZmlnOiBEZWZhdWx0Rm9ybUNvbXBvbmVudENvbmZpZzwnc2VsZWN0LWZvcm0taW5wdXQnPjtcbn1cbiJdfQ==