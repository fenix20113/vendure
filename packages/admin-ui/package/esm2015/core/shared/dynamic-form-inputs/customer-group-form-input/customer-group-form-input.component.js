import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
export class CustomerGroupFormInputComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    ngOnInit() {
        this.customerGroups$ = this.dataService.customer
            .getCustomerGroupList({
            take: 1000,
        })
            .mapSingle(res => res.customerGroups.items)
            .pipe(startWith([]));
    }
    selectGroup(group) {
        this.formControl.setValue(group.id);
    }
}
CustomerGroupFormInputComponent.id = 'customer-group-form-input';
CustomerGroupFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-group-form-input',
                template: "<ng-select\n    [items]=\"customerGroups$ | async\"\n    appendTo=\"body\"\n    [addTag]=\"false\"\n    [multiple]=\"false\"\n    bindValue=\"id\"\n    [clearable]=\"true\"\n    [searchable]=\"false\"\n    [ngModel]=\"formControl.value\"\n    (change)=\"selectGroup($event)\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <vdr-chip [colorFrom]=\"item.id\">{{ item.name }}</vdr-chip>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <vdr-chip [colorFrom]=\"item.id\">{{ item.name }}</vdr-chip>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CustomerGroupFormInputComponent.ctorParameters = () => [
    { type: DataService }
];
CustomerGroupFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZ3JvdXAtZm9ybS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9keW5hbWljLWZvcm0taW5wdXRzL2N1c3RvbWVyLWdyb3VwLWZvcm0taW5wdXQvY3VzdG9tZXItZ3JvdXAtZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFJbEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSTNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQVFuRSxNQUFNLE9BQU8sK0JBQStCO0lBT3hDLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUcsQ0FBQztJQUVoRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7YUFDM0Msb0JBQW9CLENBQUM7WUFDbEIsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO2FBQ0QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7YUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBOEI7UUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O0FBbkJlLGtDQUFFLEdBQTJCLDJCQUEyQixDQUFDOztZQVA1RSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLCtCQUErQjtnQkFDekMsK2xCQUF5RDtnQkFFekQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFQUSxXQUFXOzs7dUJBVWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVmYXVsdEZvcm1Db21wb25lbnRDb25maWcsIERlZmF1bHRGb3JtQ29tcG9uZW50SWQgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC10eXBlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEZvcm1JbnB1dENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnQtcmVnaXN0cnktdHlwZXMnO1xuaW1wb3J0IHsgR2V0Q3VzdG9tZXJHcm91cHMgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItY3VzdG9tZXItZ3JvdXAtZm9ybS1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2N1c3RvbWVyLWdyb3VwLWZvcm0taW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2N1c3RvbWVyLWdyb3VwLWZvcm0taW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJHcm91cEZvcm1JbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIEZvcm1JbnB1dENvbXBvbmVudCwgT25Jbml0IHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgaWQ6IERlZmF1bHRGb3JtQ29tcG9uZW50SWQgPSAnY3VzdG9tZXItZ3JvdXAtZm9ybS1pbnB1dCc7XG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG4gICAgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIGN1c3RvbWVyR3JvdXBzJDogT2JzZXJ2YWJsZTxHZXRDdXN0b21lckdyb3Vwcy5JdGVtc1tdPjtcbiAgICBjb25maWc6IERlZmF1bHRGb3JtQ29tcG9uZW50Q29uZmlnPCdjdXN0b21lci1ncm91cC1mb3JtLWlucHV0Jz47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmN1c3RvbWVyR3JvdXBzJCA9IHRoaXMuZGF0YVNlcnZpY2UuY3VzdG9tZXJcbiAgICAgICAgICAgIC5nZXRDdXN0b21lckdyb3VwTGlzdCh7XG4gICAgICAgICAgICAgICAgdGFrZTogMTAwMCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAubWFwU2luZ2xlKHJlcyA9PiByZXMuY3VzdG9tZXJHcm91cHMuaXRlbXMpXG4gICAgICAgICAgICAucGlwZShzdGFydFdpdGgoW10pKTtcbiAgICB9XG5cbiAgICBzZWxlY3RHcm91cChncm91cDogR2V0Q3VzdG9tZXJHcm91cHMuSXRlbXMpIHtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZShncm91cC5pZCk7XG4gICAgfVxufVxuIl19