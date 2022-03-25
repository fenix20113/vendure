import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { DataService } from '../../../../data/providers/data.service';
import { ModalService } from '../../../../providers/modal/modal.service';
import { RelationSelectorDialogComponent } from '../relation-selector-dialog/relation-selector-dialog.component';
export class RelationProductVariantInputComponent {
    constructor(modalService, dataService) {
        this.modalService = modalService;
        this.dataService = dataService;
        this.searchControl = new FormControl('');
        this.searchTerm$ = new Subject();
    }
    ngOnInit() {
        this.productVariant$ = this.parentFormControl.valueChanges.pipe(startWith(this.parentFormControl.value), map(variant => variant === null || variant === void 0 ? void 0 : variant.id), distinctUntilChanged(), switchMap(id => {
            if (id) {
                return this.dataService.product
                    .getProductVariant(id)
                    .mapStream(data => data.productVariant || undefined);
            }
            else {
                return of(undefined);
            }
        }));
        this.results$ = this.searchTerm$.pipe(debounceTime(200), switchMap(term => {
            return this.dataService.product
                .getProductVariants(Object.assign(Object.assign({}, (term
                ? {
                    filter: {
                        name: {
                            contains: term,
                        },
                    },
                }
                : {})), { take: 10 }))
                .mapSingle(data => data.productVariants.items);
        }));
    }
    selectProductVariant() {
        this.modalService
            .fromComponent(RelationSelectorDialogComponent, {
            size: 'md',
            closable: true,
            locals: {
                title: _('catalog.select-product-variant'),
                selectorTemplate: this.template,
            },
        })
            .subscribe(result => {
            if (result) {
                this.parentFormControl.setValue(result);
                this.parentFormControl.markAsDirty();
            }
        });
    }
    remove() {
        this.parentFormControl.setValue(null);
        this.parentFormControl.markAsDirty();
    }
}
RelationProductVariantInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-product-variant-input',
                template: "<vdr-relation-card\n    (select)=\"selectProductVariant()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"library\"\n    [entity]=\"productVariant$ | async\"\n    [selectLabel]=\"'catalog.select-product-variant' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    <ng-template vdrRelationCardPreview let-variant=\"entity\">\n        <img\n            *ngIf=\"variant.featuredAsset || variant.product.featuredAsset as asset; else placeholder\"\n            [src]=\"asset | assetPreview: 'tiny'\"\n        />\n        <ng-template #placeholder>\n            <div class=\"placeholder\" *ngIf=\"!variant.featuredAsset\">\n                <clr-icon shape=\"image\" size=\"50\"></clr-icon>\n            </div>\n        </ng-template>\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-variant=\"entity\">\n        <a [routerLink]=\"['/catalog/products', variant.product.id, { tab: 'variants' }]\">{{ variant.name }}</a>\n        <div class=\"\">{{ variant.sku }}</div>\n    </ng-template>\n</vdr-relation-card>\n\n<ng-template #selector let-select=\"select\">\n    <ng-select [items]=\"results$ | async\" [typeahead]=\"searchTerm$\" appendTo=\"body\" (change)=\"select($event)\">\n        <ng-template ng-option-tmp let-item=\"item\">\n            <img\n                *ngIf=\"item.featuredAsset || item.product.featuredAsset as asset\"\n                [src]=\"asset | assetPreview: 32\"\n            />\n            {{ item.name }}\n        </ng-template>\n    </ng-select>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".placeholder{color:var(--color-grey-300)}"]
            },] }
];
RelationProductVariantInputComponent.ctorParameters = () => [
    { type: ModalService },
    { type: DataService }
];
RelationProductVariantInputComponent.propDecorators = {
    readonly: [{ type: Input }],
    parentFormControl: [{ type: Input }],
    config: [{ type: Input }],
    template: [{ type: ViewChild, args: ['selector',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpb24tcHJvZHVjdC12YXJpYW50LWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2R5bmFtaWMtZm9ybS1pbnB1dHMvcmVsYXRpb24tZm9ybS1pbnB1dC9wcm9kdWN0LXZhcmlhbnQvcmVsYXRpb24tcHJvZHVjdC12YXJpYW50LWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU8vRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBUWpILE1BQU0sT0FBTyxvQ0FBb0M7SUFZN0MsWUFBb0IsWUFBMEIsRUFBVSxXQUF3QjtRQUE1RCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTGhGLGtCQUFhLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO0lBSStDLENBQUM7SUFFcEYsUUFBUTtRQUNKLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQzNELFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQ3ZDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxFQUFFLENBQUMsRUFDM0Isb0JBQW9CLEVBQUUsRUFDdEIsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ1gsSUFBSSxFQUFFLEVBQUU7Z0JBQ0osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87cUJBQzFCLGlCQUFpQixDQUFDLEVBQUUsQ0FBQztxQkFDckIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxTQUFTLENBQUMsQ0FBQzthQUM1RDtpQkFBTTtnQkFDSCxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN4QjtRQUNMLENBQUMsQ0FBQyxDQUNMLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUNqQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNiLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPO2lCQUMxQixrQkFBa0IsaUNBQ1osQ0FBQyxJQUFJO2dCQUNKLENBQUMsQ0FBQztvQkFDSSxNQUFNLEVBQUU7d0JBQ0osSUFBSSxFQUFFOzRCQUNGLFFBQVEsRUFBRSxJQUFJO3lCQUNqQjtxQkFDSjtpQkFDSjtnQkFDSCxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQ1QsSUFBSSxFQUFFLEVBQUUsSUFDVjtpQkFDRCxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsb0JBQW9CO1FBQ2hCLElBQUksQ0FBQyxZQUFZO2FBQ1osYUFBYSxDQUFDLCtCQUErQixFQUFFO1lBQzVDLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQztnQkFDMUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDbEM7U0FDSixDQUFDO2FBQ0QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hCLElBQUksTUFBTSxFQUFFO2dCQUNSLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN4QztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDOzs7WUE5RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQ0FBb0M7Z0JBQzlDLDhnREFBOEQ7Z0JBRTlELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBUlEsWUFBWTtZQURaLFdBQVc7Ozt1QkFXZixLQUFLO2dDQUNMLEtBQUs7cUJBQ0wsS0FBSzt1QkFFTCxTQUFTLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gICAgR2V0UHJvZHVjdFZhcmlhbnQsXG4gICAgR2V0UHJvZHVjdFZhcmlhbnRMaXN0LFxuICAgIFJlbGF0aW9uQ3VzdG9tRmllbGRDb25maWcsXG59IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kYWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcHJvdmlkZXJzL21vZGFsL21vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVsYXRpb25TZWxlY3RvckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL3JlbGF0aW9uLXNlbGVjdG9yLWRpYWxvZy9yZWxhdGlvbi1zZWxlY3Rvci1kaWFsb2cuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcmVsYXRpb24tcHJvZHVjdC12YXJpYW50LWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcmVsYXRpb24tcHJvZHVjdC12YXJpYW50LWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9yZWxhdGlvbi1wcm9kdWN0LXZhcmlhbnQtaW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUmVsYXRpb25Qcm9kdWN0VmFyaWFudElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwYXJlbnRGb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgQElucHV0KCkgY29uZmlnOiBSZWxhdGlvbkN1c3RvbUZpZWxkQ29uZmlnO1xuXG4gICAgQFZpZXdDaGlsZCgnc2VsZWN0b3InKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHNlYXJjaENvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICAgIHNlYXJjaFRlcm0kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIHJlc3VsdHMkOiBPYnNlcnZhYmxlPEdldFByb2R1Y3RWYXJpYW50TGlzdC5JdGVtc1tdPjtcbiAgICBwcm9kdWN0VmFyaWFudCQ6IE9ic2VydmFibGU8R2V0UHJvZHVjdFZhcmlhbnQuUHJvZHVjdFZhcmlhbnQgfCB1bmRlZmluZWQ+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSwgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wcm9kdWN0VmFyaWFudCQgPSB0aGlzLnBhcmVudEZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKHRoaXMucGFyZW50Rm9ybUNvbnRyb2wudmFsdWUpLFxuICAgICAgICAgICAgbWFwKHZhcmlhbnQgPT4gdmFyaWFudD8uaWQpLFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcChpZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRQcm9kdWN0VmFyaWFudChpZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLnByb2R1Y3RWYXJpYW50IHx8IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5yZXN1bHRzJCA9IHRoaXMuc2VhcmNoVGVybSQucGlwZShcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgyMDApLFxuICAgICAgICAgICAgc3dpdGNoTWFwKHRlcm0gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAgICAgLmdldFByb2R1Y3RWYXJpYW50cyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4odGVybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluczogdGVybSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDoge30pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFrZTogMTAsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5tYXBTaW5nbGUoZGF0YSA9PiBkYXRhLnByb2R1Y3RWYXJpYW50cy5pdGVtcyk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZWxlY3RQcm9kdWN0VmFyaWFudCgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5mcm9tQ29tcG9uZW50KFJlbGF0aW9uU2VsZWN0b3JEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBzaXplOiAnbWQnLFxuICAgICAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXygnY2F0YWxvZy5zZWxlY3QtcHJvZHVjdC12YXJpYW50JyksXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yVGVtcGxhdGU6IHRoaXMudGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEZvcm1Db250cm9sLnNldFZhbHVlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Rm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHRoaXMucGFyZW50Rm9ybUNvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgICAgIHRoaXMucGFyZW50Rm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICB9XG59XG4iXX0=