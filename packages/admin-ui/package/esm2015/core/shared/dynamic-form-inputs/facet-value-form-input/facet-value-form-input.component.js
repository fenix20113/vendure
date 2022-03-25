import { ChangeDetectionStrategy, Component } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
export class FacetValueFormInputComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.isListInput = true;
    }
    ngOnInit() {
        this.facets$ = this.dataService.facet
            .getAllFacets()
            .mapSingle(data => data.facets.items)
            .pipe(shareReplay(1));
    }
}
FacetValueFormInputComponent.id = 'facet-value-form-input';
FacetValueFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-facet-value-form-input',
                template: "<vdr-facet-value-selector\n    *ngIf=\"facets$ | async as facets\"\n    [readonly]=\"readonly\"\n    [facets]=\"facets\"\n    [formControl]=\"formControl\"\n></vdr-facet-value-selector>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
FacetValueFormInputComponent.ctorParameters = () => [
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdmFsdWUtZm9ybS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9keW5hbWljLWZvcm0taW5wdXRzL2ZhY2V0LXZhbHVlLWZvcm0taW5wdXQvZmFjZXQtdmFsdWUtZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFJbEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSTdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQVFuRSxNQUFNLE9BQU8sNEJBQTRCO0lBT3JDLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTG5DLGdCQUFXLEdBQUcsSUFBSSxDQUFDO0lBS21CLENBQUM7SUFFaEQsUUFBUTtRQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO2FBQ2hDLFlBQVksRUFBRTthQUNkLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDOztBQWJlLCtCQUFFLEdBQTJCLHdCQUF3QixDQUFDOztZQVB6RSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsdU1BQXNEO2dCQUV0RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVBRLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlZmF1bHRGb3JtQ29tcG9uZW50SWQgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC10eXBlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzaGFyZVJlcGxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRm9ybUlucHV0Q29tcG9uZW50LCBJbnB1dENvbXBvbmVudENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnQtcmVnaXN0cnktdHlwZXMnO1xuaW1wb3J0IHsgRmFjZXRXaXRoVmFsdWVzIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWZhY2V0LXZhbHVlLWZvcm0taW5wdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mYWNldC12YWx1ZS1mb3JtLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9mYWNldC12YWx1ZS1mb3JtLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0VmFsdWVGb3JtSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBGb3JtSW5wdXRDb21wb25lbnQsIE9uSW5pdCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IGlkOiBEZWZhdWx0Rm9ybUNvbXBvbmVudElkID0gJ2ZhY2V0LXZhbHVlLWZvcm0taW5wdXQnO1xuICAgIHJlYWRvbmx5IGlzTGlzdElucHV0ID0gdHJ1ZTtcbiAgICByZWFkb25seTogYm9vbGVhbjtcbiAgICBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgZmFjZXRzJDogT2JzZXJ2YWJsZTxGYWNldFdpdGhWYWx1ZXMuRnJhZ21lbnRbXT47XG4gICAgY29uZmlnOiBJbnB1dENvbXBvbmVudENvbmZpZztcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZhY2V0cyQgPSB0aGlzLmRhdGFTZXJ2aWNlLmZhY2V0XG4gICAgICAgICAgICAuZ2V0QWxsRmFjZXRzKClcbiAgICAgICAgICAgIC5tYXBTaW5nbGUoZGF0YSA9PiBkYXRhLmZhY2V0cy5pdGVtcylcbiAgICAgICAgICAgIC5waXBlKHNoYXJlUmVwbGF5KDEpKTtcbiAgICB9XG59XG4iXX0=