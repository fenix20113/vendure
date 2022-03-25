import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { DataService } from '../../../../data/providers/data.service';
import { ModalService } from '../../../../providers/modal/modal.service';
import { AssetPickerDialogComponent } from '../../../components/asset-picker-dialog/asset-picker-dialog.component';
import { AssetPreviewDialogComponent } from '../../../components/asset-preview-dialog/asset-preview-dialog.component';
export class RelationAssetInputComponent {
    constructor(modalService, dataService) {
        this.modalService = modalService;
        this.dataService = dataService;
    }
    ngOnInit() {
        this.asset$ = this.parentFormControl.valueChanges.pipe(startWith(this.parentFormControl.value), map(asset => asset === null || asset === void 0 ? void 0 : asset.id), distinctUntilChanged(), switchMap(id => {
            if (id) {
                return this.dataService.product.getAsset(id).mapStream(data => data.asset || undefined);
            }
            else {
                return of(undefined);
            }
        }));
    }
    selectAsset() {
        this.modalService
            .fromComponent(AssetPickerDialogComponent, {
            size: 'xl',
            locals: {
                multiSelect: false,
            },
        })
            .subscribe(result => {
            if (result && result.length) {
                this.parentFormControl.setValue(result[0]);
                this.parentFormControl.markAsDirty();
            }
        });
    }
    remove() {
        this.parentFormControl.setValue(null);
        this.parentFormControl.markAsDirty();
    }
    previewAsset(asset) {
        this.modalService
            .fromComponent(AssetPreviewDialogComponent, {
            size: 'xl',
            closable: true,
            locals: { asset },
        })
            .subscribe();
    }
}
RelationAssetInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-asset-input',
                template: "<vdr-relation-card\n    (select)=\"selectAsset()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"image\"\n    [entity]=\"asset$ | async\"\n    [selectLabel]=\"'asset.select-asset' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    <ng-template vdrRelationCardPreview let-asset=\"entity\">\n        <img\n            class=\"preview\"\n            [title]=\"'asset.preview' | translate\"\n            [src]=\"asset | assetPreview: 'tiny'\"\n            (click)=\"previewAsset(asset)\"\n        />\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-asset=\"entity\">\n        <div class=\"name\" [title]=\"asset.name\">\n            {{ asset.name }}\n        </div>\n    </ng-template>\n</vdr-relation-card>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".preview{cursor:pointer}.detail{flex:1}.detail,.name{overflow:hidden}.name{white-space:nowrap;text-overflow:ellipsis}"]
            },] }
];
RelationAssetInputComponent.ctorParameters = () => [
    { type: ModalService },
    { type: DataService }
];
RelationAssetInputComponent.propDecorators = {
    readonly: [{ type: Input }],
    parentFormControl: [{ type: Input }],
    config: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpb24tYXNzZXQtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvZHluYW1pYy1mb3JtLWlucHV0cy9yZWxhdGlvbi1mb3JtLWlucHV0L2Fzc2V0L3JlbGF0aW9uLWFzc2V0LWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdqRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHVFQUF1RSxDQUFDO0FBQ25ILE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHlFQUF5RSxDQUFDO0FBUXRILE1BQU0sT0FBTywyQkFBMkI7SUFNcEMsWUFBb0IsWUFBMEIsRUFBVSxXQUF3QjtRQUE1RCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUcsQ0FBQztJQUVwRixRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDbEQsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFDdkMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLEVBQUUsQ0FBQyxFQUN2QixvQkFBb0IsRUFBRSxFQUN0QixTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDWCxJQUFJLEVBQUUsRUFBRTtnQkFDSixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxDQUFDO2FBQzNGO2lCQUFNO2dCQUNILE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFlBQVk7YUFDWixhQUFhLENBQUMsMEJBQTBCLEVBQUU7WUFDdkMsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLEtBQUs7YUFDckI7U0FDSixDQUFDO2FBQ0QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN4QztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQXFCO1FBQzlCLElBQUksQ0FBQyxZQUFZO2FBQ1osYUFBYSxDQUFDLDJCQUEyQixFQUFFO1lBQ3hDLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLElBQUk7WUFDZCxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUU7U0FDcEIsQ0FBQzthQUNELFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7OztZQTFESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsa3dCQUFvRDtnQkFFcEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFUUSxZQUFZO1lBRFosV0FBVzs7O3VCQVlmLEtBQUs7Z0NBQ0wsS0FBSztxQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEdldEFzc2V0LCBSZWxhdGlvbkN1c3RvbUZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RhbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9wcm92aWRlcnMvbW9kYWwvbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBBc3NldFBpY2tlckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYXNzZXQtcGlja2VyLWRpYWxvZy9hc3NldC1waWNrZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc3NldFByZXZpZXdEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2Fzc2V0LXByZXZpZXctZGlhbG9nL2Fzc2V0LXByZXZpZXctZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXJlbGF0aW9uLWFzc2V0LWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcmVsYXRpb24tYXNzZXQtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3JlbGF0aW9uLWFzc2V0LWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFJlbGF0aW9uQXNzZXRJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcGFyZW50Rm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIEBJbnB1dCgpIGNvbmZpZzogUmVsYXRpb25DdXN0b21GaWVsZENvbmZpZztcbiAgICBhc3NldCQ6IE9ic2VydmFibGU8R2V0QXNzZXQuQXNzZXQgfCB1bmRlZmluZWQ+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSwgcHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5hc3NldCQgPSB0aGlzLnBhcmVudEZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKHRoaXMucGFyZW50Rm9ybUNvbnRyb2wudmFsdWUpLFxuICAgICAgICAgICAgbWFwKGFzc2V0ID0+IGFzc2V0Py5pZCksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKGlkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdC5nZXRBc3NldChpZCkubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS5hc3NldCB8fCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHNlbGVjdEFzc2V0KCkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmZyb21Db21wb25lbnQoQXNzZXRQaWNrZXJEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBzaXplOiAneGwnLFxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICBtdWx0aVNlbGVjdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Rm9ybUNvbnRyb2wuc2V0VmFsdWUocmVzdWx0WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRGb3JtQ29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgdGhpcy5wYXJlbnRGb3JtQ29udHJvbC5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgdGhpcy5wYXJlbnRGb3JtQ29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cblxuICAgIHByZXZpZXdBc3NldChhc3NldDogR2V0QXNzZXQuQXNzZXQpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5mcm9tQ29tcG9uZW50KEFzc2V0UHJldmlld0RpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIHNpemU6ICd4bCcsXG4gICAgICAgICAgICAgICAgY2xvc2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgbG9jYWxzOiB7IGFzc2V0IH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbn1cbiJdfQ==