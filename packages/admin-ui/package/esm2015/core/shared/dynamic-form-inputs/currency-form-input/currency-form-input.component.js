import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DataService } from '../../../data/providers/data.service';
export class CurrencyFormInputComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.currencyCode$ = this.dataService.settings
            .getActiveChannel()
            .mapStream(data => data.activeChannel.currencyCode);
    }
}
CurrencyFormInputComponent.id = 'currency-form-input';
CurrencyFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-currency-form-input',
                template: "<vdr-currency-input\n    [formControl]=\"formControl\"\n    [readonly]=\"readonly\"\n    [currencyCode]=\"currencyCode$ | async\"\n></vdr-currency-input>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CurrencyFormInputComponent.ctorParameters = () => [
    { type: DataService }
];
CurrencyFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktZm9ybS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9keW5hbWljLWZvcm0taW5wdXRzL2N1cnJlbmN5LWZvcm0taW5wdXQvY3VycmVuY3ktZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBUW5FLE1BQU0sT0FBTywwQkFBMEI7SUFPbkMsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7YUFDekMsZ0JBQWdCLEVBQUU7YUFDbEIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1RCxDQUFDOztBQVZlLDZCQUFFLEdBQTJCLHFCQUFxQixDQUFDOztZQVB0RSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsdUtBQW1EO2dCQUVuRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVBRLFdBQVc7Ozt1QkFVZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVmYXVsdEZvcm1Db21wb25lbnRDb25maWcsIERlZmF1bHRGb3JtQ29tcG9uZW50SWQgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC10eXBlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEZvcm1JbnB1dENvbXBvbmVudCwgSW5wdXRDb21wb25lbnRDb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcbmltcG9ydCB7IEN1cnJlbmN5Q29kZSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1jdXJyZW5jeS1mb3JtLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY3VycmVuY3ktZm9ybS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY3VycmVuY3ktZm9ybS1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDdXJyZW5jeUZvcm1JbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIEZvcm1JbnB1dENvbXBvbmVudCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IGlkOiBEZWZhdWx0Rm9ybUNvbXBvbmVudElkID0gJ2N1cnJlbmN5LWZvcm0taW5wdXQnO1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuICAgIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBjdXJyZW5jeUNvZGUkOiBPYnNlcnZhYmxlPEN1cnJlbmN5Q29kZT47XG4gICAgY29uZmlnOiBEZWZhdWx0Rm9ybUNvbXBvbmVudENvbmZpZzwnY3VycmVuY3ktZm9ybS1pbnB1dCc+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5jdXJyZW5jeUNvZGUkID0gdGhpcy5kYXRhU2VydmljZS5zZXR0aW5nc1xuICAgICAgICAgICAgLmdldEFjdGl2ZUNoYW5uZWwoKVxuICAgICAgICAgICAgLm1hcFN0cmVhbShkYXRhID0+IGRhdGEuYWN0aXZlQ2hhbm5lbC5jdXJyZW5jeUNvZGUpO1xuICAgIH1cbn1cbiJdfQ==