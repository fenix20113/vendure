import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class NumberFormInputComponent {
}
NumberFormInputComponent.id = 'number-form-input';
NumberFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-number-form-input',
                template: "<vdr-affixed-input [suffix]=\"config?.suffix\" [prefix]=\"config?.prefix\">\n    <input\n        type=\"number\"\n        [readonly]=\"readonly\"\n        [min]=\"config?.min\"\n        [max]=\"config?.max\"\n        [step]=\"config?.step\"\n        [formControl]=\"formControl\"\n    />\n</vdr-affixed-input>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
NumberFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLWZvcm0taW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvZHluYW1pYy1mb3JtLWlucHV0cy9udW1iZXItZm9ybS1pbnB1dC9udW1iZXItZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFZMUUsTUFBTSxPQUFPLHdCQUF3Qjs7QUFDakIsMkJBQUUsR0FBMkIsbUJBQW1CLENBQUM7O1lBUHBFLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxtVUFBaUQ7Z0JBRWpELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O3VCQUdJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWZhdWx0Rm9ybUNvbXBvbmVudENvbmZpZywgRGVmYXVsdEZvcm1Db21wb25lbnRJZCB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXR5cGVzJztcblxuaW1wb3J0IHsgRm9ybUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudC1yZWdpc3RyeS10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLW51bWJlci1mb3JtLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbnVtYmVyLWZvcm0taW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL251bWJlci1mb3JtLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE51bWJlckZvcm1JbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIEZvcm1JbnB1dENvbXBvbmVudCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IGlkOiBEZWZhdWx0Rm9ybUNvbXBvbmVudElkID0gJ251bWJlci1mb3JtLWlucHV0JztcbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcbiAgICBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgY29uZmlnOiBEZWZhdWx0Rm9ybUNvbXBvbmVudENvbmZpZzwnbnVtYmVyLWZvcm0taW5wdXQnPjtcbn1cbiJdfQ==