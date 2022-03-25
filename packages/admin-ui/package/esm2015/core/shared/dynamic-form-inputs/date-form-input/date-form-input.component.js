import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class DateFormInputComponent {
}
DateFormInputComponent.id = 'date-form-input';
DateFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-date-form-input',
                template: "<vdr-datetime-picker\n    [formControl]=\"formControl\"\n    [min]=\"config?.min\"\n    [max]=\"config?.max\"\n    [yearRange]=\"config?.yearRange\"\n    [readonly]=\"readonly\"\n>\n</vdr-datetime-picker>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
DateFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1mb3JtLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2R5bmFtaWMtZm9ybS1pbnB1dHMvZGF0ZS1mb3JtLWlucHV0L2RhdGUtZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFZMUUsTUFBTSxPQUFPLHNCQUFzQjs7QUFDZix5QkFBRSxHQUEyQixpQkFBaUIsQ0FBQzs7WUFQbEUsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLDBOQUErQztnQkFFL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7dUJBR0ksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlZmF1bHRGb3JtQ29tcG9uZW50Q29uZmlnLCBEZWZhdWx0Rm9ybUNvbXBvbmVudElkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdHlwZXMnO1xuXG5pbXBvcnQgeyBGb3JtSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZGF0ZS1mb3JtLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGF0ZS1mb3JtLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9kYXRlLWZvcm0taW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZUZvcm1JbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIEZvcm1JbnB1dENvbXBvbmVudCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IGlkOiBEZWZhdWx0Rm9ybUNvbXBvbmVudElkID0gJ2RhdGUtZm9ybS1pbnB1dCc7XG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG4gICAgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIGNvbmZpZzogRGVmYXVsdEZvcm1Db21wb25lbnRDb25maWc8J2RhdGUtZm9ybS1pbnB1dCc+O1xufVxuIl19