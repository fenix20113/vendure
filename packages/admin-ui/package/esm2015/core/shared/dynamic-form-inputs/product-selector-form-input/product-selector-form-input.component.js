import { ChangeDetectionStrategy, Component } from '@angular/core';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { forkJoin, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
export class ProductSelectorFormInputComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.isListInput = true;
    }
    ngOnInit() {
        this.formControl.setValidators([
            control => {
                if (!control.value || !control.value.length) {
                    return {
                        atLeastOne: { length: control.value.length },
                    };
                }
                return null;
            },
        ]);
        this.selection$ = this.formControl.valueChanges.pipe(startWith(this.formControl.value), switchMap(value => {
            if (Array.isArray(value) && 0 < value.length) {
                return forkJoin(value.map(id => this.dataService.product
                    .getProductVariant(id)
                    .mapSingle(data => data.productVariant)));
            }
            return of([]);
        }), map(variants => variants.filter(notNullOrUndefined)));
    }
    addProductVariant(product) {
        const value = this.formControl.value;
        this.formControl.setValue([...new Set([...value, product.productVariantId])]);
    }
    removeProductVariant(id) {
        const value = this.formControl.value;
        this.formControl.setValue(value.filter(_id => _id !== id));
    }
}
ProductSelectorFormInputComponent.id = 'product-selector-form-input';
ProductSelectorFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-selector-form-input',
                template: "<ul class=\"list-unstyled\">\n    <li *ngFor=\"let variant of selection$ | async\" class=\"variant\">\n        <div class=\"thumb\">\n            <img [src]=\"variant.product.featuredAsset | assetPreview: 32\" />\n        </div>\n        <div class=\"detail\">\n            <div>{{ variant.name }}</div>\n            <div class=\"sku\">{{ variant.sku }}</div>\n        </div>\n        <div class=\"flex-spacer\"></div>\n        <button\n            class=\"btn btn-link btn-sm btn-warning\"\n            (click)=\"removeProductVariant(variant.id)\"\n            [title]=\"'common.remove-item-from-list' | translate\"\n        >\n            <clr-icon shape=\"times\"></clr-icon>\n        </button>\n    </li>\n</ul>\n<vdr-product-selector (productSelected)=\"addProductVariant($event)\"></vdr-product-selector>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".variant{margin-bottom:6px;display:flex;align-items:center;transition:background-color .2s}.variant:hover{background-color:var(--color-component-bg-200)}.thumb{margin-right:6px}.sku{color:var(--color-grey-400);font-size:smaller;line-height:1em}"]
            },] }
];
ProductSelectorFormInputComponent.ctorParameters = () => [
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1zZWxlY3Rvci1mb3JtLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2R5bmFtaWMtZm9ybS1pbnB1dHMvcHJvZHVjdC1zZWxlY3Rvci1mb3JtLWlucHV0L3Byb2R1Y3Qtc2VsZWN0b3ItZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUczRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsUUFBUSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUkzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFRbkUsTUFBTSxPQUFPLGlDQUFpQztJQVExQyxZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQU5uQyxnQkFBVyxHQUFHLElBQUksQ0FBQztJQU1tQixDQUFDO0lBRWhELFFBQVE7UUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztZQUMzQixPQUFPLENBQUMsRUFBRTtnQkFDTixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUN6QyxPQUFPO3dCQUNILFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtxQkFDL0MsQ0FBQztpQkFDTDtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ2hELFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUNqQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDZCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQzFDLE9BQU8sUUFBUSxDQUNYLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FDWCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87cUJBQ25CLGlCQUFpQixDQUFDLEVBQUUsQ0FBQztxQkFDckIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUM5QyxDQUNKLENBQUM7YUFDTDtZQUNELE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxFQUNGLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUN2RCxDQUFDO0lBQ04sQ0FBQztJQUVELGlCQUFpQixDQUFDLE9BQW9DO1FBQ2xELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBaUIsQ0FBQztRQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsb0JBQW9CLENBQUMsRUFBVTtRQUMzQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQWlCLENBQUM7UUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7O0FBL0NlLG9DQUFFLEdBQTJCLDZCQUE2QixDQUFDOztZQVA5RSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlDQUFpQztnQkFDM0Msd3pCQUEyRDtnQkFFM0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFQUSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlZmF1bHRGb3JtQ29tcG9uZW50SWQgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC10eXBlcyc7XG5pbXBvcnQgeyBub3ROdWxsT3JVbmRlZmluZWQgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC11dGlscyc7XG5pbXBvcnQgeyBmb3JrSm9pbiwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEZvcm1JbnB1dENvbXBvbmVudCwgSW5wdXRDb21wb25lbnRDb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcbmltcG9ydCB7IEdldFByb2R1Y3RWYXJpYW50LCBQcm9kdWN0U2VsZWN0b3JTZWFyY2ggfSBmcm9tICcuLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcHJvZHVjdC1zZWxlY3Rvci1mb3JtLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvZHVjdC1zZWxlY3Rvci1mb3JtLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9kdWN0LXNlbGVjdG9yLWZvcm0taW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdFNlbGVjdG9yRm9ybUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgRm9ybUlucHV0Q29tcG9uZW50LCBPbkluaXQge1xuICAgIHN0YXRpYyByZWFkb25seSBpZDogRGVmYXVsdEZvcm1Db21wb25lbnRJZCA9ICdwcm9kdWN0LXNlbGVjdG9yLWZvcm0taW5wdXQnO1xuICAgIHJlYWRvbmx5IGlzTGlzdElucHV0ID0gdHJ1ZTtcbiAgICByZWFkb25seTogYm9vbGVhbjtcbiAgICBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgY29uZmlnOiBJbnB1dENvbXBvbmVudENvbmZpZztcbiAgICBzZWxlY3Rpb24kOiBPYnNlcnZhYmxlPEdldFByb2R1Y3RWYXJpYW50LlByb2R1Y3RWYXJpYW50W10+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWxpZGF0b3JzKFtcbiAgICAgICAgICAgIGNvbnRyb2wgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghY29udHJvbC52YWx1ZSB8fCAhY29udHJvbC52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0TGVhc3RPbmU6IHsgbGVuZ3RoOiBjb250cm9sLnZhbHVlLmxlbmd0aCB9LFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uJCA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICBzdGFydFdpdGgodGhpcy5mb3JtQ29udHJvbC52YWx1ZSksXG4gICAgICAgICAgICBzd2l0Y2hNYXAodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiAwIDwgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JrSm9pbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLm1hcChpZCA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0UHJvZHVjdFZhcmlhbnQoaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXBTaW5nbGUoZGF0YSA9PiBkYXRhLnByb2R1Y3RWYXJpYW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcCh2YXJpYW50cyA9PiB2YXJpYW50cy5maWx0ZXIobm90TnVsbE9yVW5kZWZpbmVkKSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYWRkUHJvZHVjdFZhcmlhbnQocHJvZHVjdDogUHJvZHVjdFNlbGVjdG9yU2VhcmNoLkl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZSBhcyBzdHJpbmdbXTtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZShbLi4ubmV3IFNldChbLi4udmFsdWUsIHByb2R1Y3QucHJvZHVjdFZhcmlhbnRJZF0pXSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlUHJvZHVjdFZhcmlhbnQoaWQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgYXMgc3RyaW5nW107XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsdWUuZmlsdGVyKF9pZCA9PiBfaWQgIT09IGlkKSk7XG4gICAgfVxufVxuIl19