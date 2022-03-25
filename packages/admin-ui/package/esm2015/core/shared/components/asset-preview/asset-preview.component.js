import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
import { ModalService } from '../../../providers/modal/modal.service';
import { NotificationService } from '../../../providers/notification/notification.service';
import { ManageTagsDialogComponent } from '../manage-tags-dialog/manage-tags-dialog.component';
export class AssetPreviewComponent {
    constructor(formBuilder, dataService, notificationService, changeDetector, modalService) {
        this.formBuilder = formBuilder;
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.changeDetector = changeDetector;
        this.modalService = modalService;
        this.editable = false;
        this.customFields = [];
        this.assetChange = new EventEmitter();
        this.editClick = new EventEmitter();
        this.size = 'medium';
        this.width = 0;
        this.height = 0;
        this.centered = true;
        this.settingFocalPoint = false;
    }
    get fpx() {
        return this.asset.focalPoint ? this.asset.focalPoint.x : null;
    }
    get fpy() {
        return this.asset.focalPoint ? this.asset.focalPoint.y : null;
    }
    ngOnInit() {
        var _a;
        const { focalPoint } = this.asset;
        this.form = this.formBuilder.group({
            name: [this.asset.name],
            tags: [(_a = this.asset.tags) === null || _a === void 0 ? void 0 : _a.map(t => t.value)],
        });
        this.subscription = this.form.valueChanges.subscribe(value => {
            this.assetChange.emit({
                id: this.asset.id,
                name: value.name,
                tags: value.tags,
            });
        });
        this.subscription.add(fromEvent(window, 'resize')
            .pipe(debounceTime(50))
            .subscribe(() => {
            this.updateDimensions();
            this.changeDetector.markForCheck();
        }));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    customFieldIsSet(name) {
        var _a;
        return !!((_a = this.customFieldsForm) === null || _a === void 0 ? void 0 : _a.get([name]));
    }
    getSourceFileName() {
        const parts = this.asset.source.split('/');
        return parts[parts.length - 1];
    }
    onImageLoad() {
        this.updateDimensions();
        this.changeDetector.markForCheck();
    }
    updateDimensions() {
        const img = this.imageElementRef.nativeElement;
        const container = this.previewDivRef.nativeElement;
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const constrainToContainer = this.settingFocalPoint;
        if (constrainToContainer) {
            const controlsMarginPx = 48 * 2;
            const availableHeight = containerHeight - controlsMarginPx;
            const availableWidth = containerWidth;
            const hRatio = imgHeight / availableHeight;
            const wRatio = imgWidth / availableWidth;
            const imageExceedsAvailableDimensions = 1 < hRatio || 1 < wRatio;
            if (imageExceedsAvailableDimensions) {
                const factor = hRatio < wRatio ? wRatio : hRatio;
                this.width = Math.round(imgWidth / factor);
                this.height = Math.round(imgHeight / factor);
                this.centered = true;
                return;
            }
        }
        this.width = imgWidth;
        this.height = imgHeight;
        this.centered = imgWidth <= containerWidth && imgHeight <= containerHeight;
    }
    setFocalPointStart() {
        this.sizePriorToSettingFocalPoint = this.size;
        this.size = 'medium';
        this.settingFocalPoint = true;
        this.lastFocalPoint = this.asset.focalPoint || { x: 0.5, y: 0.5 };
        this.updateDimensions();
    }
    removeFocalPoint() {
        this.dataService.product
            .updateAsset({
            id: this.asset.id,
            focalPoint: null,
        })
            .subscribe(() => {
            this.notificationService.success(_('asset.update-focal-point-success'));
            this.asset = Object.assign(Object.assign({}, this.asset), { focalPoint: null });
            this.changeDetector.markForCheck();
        }, () => this.notificationService.error(_('asset.update-focal-point-error')));
    }
    onFocalPointChange(point) {
        this.lastFocalPoint = point;
    }
    setFocalPointCancel() {
        this.settingFocalPoint = false;
        this.lastFocalPoint = undefined;
        this.size = this.sizePriorToSettingFocalPoint;
    }
    setFocalPointEnd() {
        this.settingFocalPoint = false;
        this.size = this.sizePriorToSettingFocalPoint;
        if (this.lastFocalPoint) {
            const { x, y } = this.lastFocalPoint;
            this.lastFocalPoint = undefined;
            this.dataService.product
                .updateAsset({
                id: this.asset.id,
                focalPoint: { x, y },
            })
                .subscribe(() => {
                this.notificationService.success(_('asset.update-focal-point-success'));
                this.asset = Object.assign(Object.assign({}, this.asset), { focalPoint: { x, y } });
                this.changeDetector.markForCheck();
            }, () => this.notificationService.error(_('asset.update-focal-point-error')));
        }
    }
    manageTags() {
        this.modalService
            .fromComponent(ManageTagsDialogComponent, {
            size: 'sm',
        })
            .subscribe(result => {
            if (result) {
                this.notificationService.success(_('common.notify-updated-tags-success'));
            }
        });
    }
}
AssetPreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-preview',
                template: "<div class=\"preview-image\" #previewDiv [class.centered]=\"centered\">\n    <div class=\"image-wrapper\">\n        <vdr-focal-point-control\n            [width]=\"width\"\n            [height]=\"height\"\n            [fpx]=\"fpx\"\n            [fpy]=\"fpy\"\n            [editable]=\"settingFocalPoint\"\n            (focalPointChange)=\"onFocalPointChange($event)\"\n        >\n            <img\n                class=\"asset-image\"\n                [src]=\"asset | assetPreview: size\"\n                #imageElement\n                (load)=\"onImageLoad()\"\n            />\n        </vdr-focal-point-control>\n        <div class=\"focal-point-info\" *ngIf=\"settingFocalPoint\">\n            <button class=\"icon-button\" (click)=\"setFocalPointCancel()\">\n                <clr-icon shape=\"times\"></clr-icon>\n            </button>\n            <button class=\"btn btn-primary btn-sm\" (click)=\"setFocalPointEnd()\" [disabled]=\"!lastFocalPoint\">\n                <clr-icon shape=\"crosshairs\"></clr-icon>\n                {{ 'asset.set-focal-point' | translate }}\n            </button>\n        </div>\n    </div>\n</div>\n\n<div class=\"controls\" [class.fade]=\"settingFocalPoint\">\n    <form [formGroup]=\"form\">\n        <clr-input-container class=\"name-input\" *ngIf=\"editable\">\n            <label>{{ 'common.name' | translate }}</label>\n            <input\n                clrInput\n                type=\"text\"\n                formControlName=\"name\"\n                [readonly]=\"!(['UpdateCatalog', 'UpdateAsset'] | hasPermission) || settingFocalPoint\"\n            />\n        </clr-input-container>\n\n        <vdr-labeled-data [label]=\"'common.name' | translate\" *ngIf=\"!editable\">\n            <span class=\"elide\">\n                {{ asset.name }}\n            </span>\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.source-file' | translate\">\n            <a [href]=\"asset.source\" [title]=\"asset.source\" target=\"_blank\" class=\"elide source-link\">{{\n                getSourceFileName()\n            }}</a>\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.original-asset-size' | translate\">\n            {{ asset.fileSize | filesize }}\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.dimensions' | translate\">\n            {{ asset.width }} x {{ asset.height }}\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.focal-point' | translate\">\n            <span *ngIf=\"fpx\"\n                ><clr-icon shape=\"crosshairs\"></clr-icon> x: {{ fpx | number: '1.2-2' }}, y:\n                {{ fpy | number: '1.2-2' }}</span\n            >\n            <span *ngIf=\"!fpx\">{{ 'common.not-set' | translate }}</span>\n            <br />\n            <button\n                class=\"btn btn-secondary-outline btn-sm\"\n                [disabled]=\"settingFocalPoint\"\n                (click)=\"setFocalPointStart()\"\n            >\n                <ng-container *ngIf=\"!fpx\">{{ 'asset.set-focal-point' | translate }}</ng-container>\n                <ng-container *ngIf=\"fpx\">{{ 'asset.update-focal-point' | translate }}</ng-container>\n            </button>\n            <button\n                class=\"btn btn-warning-outline btn-sm\"\n                [disabled]=\"settingFocalPoint\"\n                *ngIf=\"!!fpx\"\n                (click)=\"removeFocalPoint()\"\n            >\n                {{ 'asset.unset-focal-point' | translate }}\n            </button>\n        </vdr-labeled-data>\n        <vdr-labeled-data [label]=\"'common.tags' | translate\">\n            <ng-container *ngIf=\"editable\">\n                <vdr-tag-selector formControlName=\"tags\"></vdr-tag-selector>\n                <button class=\"btn btn-link btn-sm\" (click)=\"manageTags()\">\n                    <clr-icon shape=\"tags\"></clr-icon>\n                    {{ 'common.manage-tags' | translate }}\n                </button>\n            </ng-container>\n            <div *ngIf=\"!editable\">\n                <vdr-chip *ngFor=\"let tag of asset.tags\" [colorFrom]=\"tag.value\">\n                    <clr-icon shape=\"tag\" class=\"mr2\"></clr-icon>\n                    {{ tag.value }}</vdr-chip\n                >\n            </div>\n        </vdr-labeled-data>\n    </form>\n    <section *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <ng-container *ngFor=\"let customField of customFields\">\n            <vdr-custom-field-control\n                *ngIf=\"customFieldIsSet(customField.name)\"\n                entityName=\"Asset\"\n                [compact]=\"true\"\n                [customFieldsFormGroup]=\"customFieldsForm\"\n                [customField]=\"customField\"\n            ></vdr-custom-field-control>\n        </ng-container>\n    </section>\n    <div class=\"flex-spacer\"></div>\n    <div class=\"preview-select\">\n        <clr-select-container>\n            <label>{{ 'asset.preview' | translate }}</label>\n            <select clrSelect name=\"options\" [(ngModel)]=\"size\" [disabled]=\"settingFocalPoint\">\n                <option value=\"tiny\">tiny</option>\n                <option value=\"thumb\">thumb</option>\n                <option value=\"small\">small</option>\n                <option value=\"medium\">medium</option>\n                <option value=\"large\">large</option>\n                <option value=\"\">full size</option>\n            </select>\n        </clr-select-container>\n        <div class=\"asset-detail\">{{ width }} x {{ height }}</div>\n    </div>\n    <a\n        *ngIf=\"!editable\"\n        class=\"btn btn-link btn-sm\"\n        [routerLink]=\"['/catalog', 'assets', asset.id]\"\n        (click)=\"editClick.emit()\"\n    >\n        <clr-icon shape=\"edit\"></clr-icon> {{ 'common.edit' | translate }}\n    </a>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;height:100%}.preview-image{width:100%;height:100%;min-height:60vh;overflow:auto;text-align:center;box-shadow:inset 0 0 5px 0 rgba(0,0,0,.1);background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACuoAAArqAVDM774AAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAAAK0lEQVQ4T2P4jwP8xgFGNSADqDwGIF0DlMYAUH0YYFQDMoDKYwASNfz/DwB/JvcficphowAAAABJRU5ErkJggg==\");flex:1}.preview-image.centered{display:flex;align-items:center;justify-content:center}.preview-image vdr-focal-point-control{position:relative;box-shadow:0 0 10px -3px rgba(0,0,0,.15)}.preview-image .image-wrapper{position:relative}.preview-image .asset-image{width:100%}.preview-image .focal-point-info{position:absolute;display:flex;right:0}.controls{display:flex;flex-direction:column;margin-left:12px;min-width:15vw;max-width:25vw;transition:opacity .3s}.controls.fade{opacity:.5}.controls .name-input{margin-bottom:24px}.controls ::ng-deep .clr-control-container,.controls ::ng-deep .clr-control-container .clr-input{width:100%}.controls .elide{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;display:block}.controls .source-link{direction:rtl}.controls .preview-select{display:flex;align-items:center;margin-bottom:12px}.controls .preview-select clr-select-container{margin-right:12px}"]
            },] }
];
AssetPreviewComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: DataService },
    { type: NotificationService },
    { type: ChangeDetectorRef },
    { type: ModalService }
];
AssetPreviewComponent.propDecorators = {
    asset: [{ type: Input }],
    editable: [{ type: Input }],
    customFields: [{ type: Input }],
    customFieldsForm: [{ type: Input }],
    assetChange: [{ type: Output }],
    editClick: [{ type: Output }],
    imageElementRef: [{ type: ViewChild, args: ['imageElement', { static: true },] }],
    previewDivRef: [{ type: ViewChild, args: ['previewDiv', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtcHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2Fzc2V0LXByZXZpZXcvYXNzZXQtcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFFM0YsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFXL0YsTUFBTSxPQUFPLHFCQUFxQjtJQXFCOUIsWUFDWSxXQUF3QixFQUN4QixXQUF3QixFQUN4QixtQkFBd0MsRUFDeEMsY0FBaUMsRUFDakMsWUFBMEI7UUFKMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDakMsaUJBQVksR0FBWixZQUFZLENBQWM7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Q0wsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMsWUFBWTthQUNaLGFBQWEsQ0FBQyx5QkFBeUIsRUFBRTtZQUN0QyxJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7YUFDRCxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxDQUFDO2FBQzdFO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDOzs7WUF2TEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLG94TEFBNkM7Z0JBRTdDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBcEJRLFdBQVc7WUFNWCxXQUFXO1lBRVgsbUJBQW1CO1lBbEJ4QixpQkFBaUI7WUFpQlosWUFBWTs7O29CQWVoQixLQUFLO3VCQUNMLEtBQUs7MkJBQ0wsS0FBSzsrQkFDTCxLQUFLOzBCQUNMLE1BQU07d0JBQ04sTUFBTTs4QkFVTixTQUFTLFNBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs0QkFDMUMsU0FBUyxTQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IG1hcmtlciBhcyBfIH0gZnJvbSAnQGJpZXNiamVyZy9uZ3gtdHJhbnNsYXRlLWV4dHJhY3QtbWFya2VyJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEN1c3RvbUZpZWxkQ29uZmlnLCBHZXRBc3NldCwgR2V0QXNzZXRMaXN0LCBVcGRhdGVBc3NldElucHV0IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RhbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9wcm92aWRlcnMvbW9kYWwvbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vcHJvdmlkZXJzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL2ZvY2FsLXBvaW50LWNvbnRyb2wvZm9jYWwtcG9pbnQtY29udHJvbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFuYWdlVGFnc0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL21hbmFnZS10YWdzLWRpYWxvZy9tYW5hZ2UtdGFncy1kaWFsb2cuY29tcG9uZW50JztcblxuZXhwb3J0IHR5cGUgUHJldmlld1ByZXNldCA9ICd0aW55JyB8ICd0aHVtYicgfCAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnIHwgJyc7XG50eXBlIEFzc2V0TGlrZSA9IEdldEFzc2V0TGlzdC5JdGVtcyB8IEdldEFzc2V0LkFzc2V0O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1hc3NldC1wcmV2aWV3JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXNzZXQtcHJldmlldy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXNzZXQtcHJldmlldy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBc3NldFByZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgYXNzZXQ6IEFzc2V0TGlrZTtcbiAgICBASW5wdXQoKSBlZGl0YWJsZSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGN1c3RvbUZpZWxkczogQ3VzdG9tRmllbGRDb25maWdbXSA9IFtdO1xuICAgIEBJbnB1dCgpIGN1c3RvbUZpZWxkc0Zvcm06IEZvcm1Hcm91cCB8IHVuZGVmaW5lZDtcbiAgICBAT3V0cHV0KCkgYXNzZXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE9taXQ8VXBkYXRlQXNzZXRJbnB1dCwgJ2ZvY2FsUG9pbnQnPj4oKTtcbiAgICBAT3V0cHV0KCkgZWRpdENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgc2l6ZTogUHJldmlld1ByZXNldCA9ICdtZWRpdW0nO1xuICAgIHdpZHRoID0gMDtcbiAgICBoZWlnaHQgPSAwO1xuICAgIGNlbnRlcmVkID0gdHJ1ZTtcbiAgICBzZXR0aW5nRm9jYWxQb2ludCA9IGZhbHNlO1xuICAgIGxhc3RGb2NhbFBvaW50PzogUG9pbnQ7XG4gICAgQFZpZXdDaGlsZCgnaW1hZ2VFbGVtZW50JywgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSBpbWFnZUVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEltYWdlRWxlbWVudD47XG4gICAgQFZpZXdDaGlsZCgncHJldmlld0RpdicsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgcHJldmlld0RpdlJlZjogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIHNpemVQcmlvclRvU2V0dGluZ0ZvY2FsUG9pbnQ6IFByZXZpZXdQcmVzZXQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlLFxuICAgICkge31cblxuICAgIGdldCBmcHgoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmFzc2V0LmZvY2FsUG9pbnQgPyB0aGlzLmFzc2V0LmZvY2FsUG9pbnQueCA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IGZweSgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXNzZXQuZm9jYWxQb2ludCA/IHRoaXMuYXNzZXQuZm9jYWxQb2ludC55IDogbnVsbDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgeyBmb2NhbFBvaW50IH0gPSB0aGlzLmFzc2V0O1xuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIG5hbWU6IFt0aGlzLmFzc2V0Lm5hbWVdLFxuICAgICAgICAgICAgdGFnczogW3RoaXMuYXNzZXQudGFncz8ubWFwKHQgPT4gdC52YWx1ZSldLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFzc2V0Q2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmFzc2V0LmlkLFxuICAgICAgICAgICAgICAgIG5hbWU6IHZhbHVlLm5hbWUsXG4gICAgICAgICAgICAgICAgdGFnczogdmFsdWUudGFncyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICAgICAgICBmcm9tRXZlbnQod2luZG93LCAncmVzaXplJylcbiAgICAgICAgICAgICAgICAucGlwZShkZWJvdW5jZVRpbWUoNTApKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURpbWVuc2lvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3VzdG9tRmllbGRJc1NldChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5jdXN0b21GaWVsZHNGb3JtPy5nZXQoW25hbWVdKTtcbiAgICB9XG5cbiAgICBnZXRTb3VyY2VGaWxlTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwYXJ0cyA9IHRoaXMuYXNzZXQuc291cmNlLnNwbGl0KCcvJyk7XG4gICAgICAgIHJldHVybiBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICBvbkltYWdlTG9hZCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGltZW5zaW9ucygpIHtcbiAgICAgICAgY29uc3QgaW1nID0gdGhpcy5pbWFnZUVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5wcmV2aWV3RGl2UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGltZ1dpZHRoID0gaW1nLm5hdHVyYWxXaWR0aDtcbiAgICAgICAgY29uc3QgaW1nSGVpZ2h0ID0gaW1nLm5hdHVyYWxIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gY29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgICAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGNvbnN0IGNvbnN0cmFpblRvQ29udGFpbmVyID0gdGhpcy5zZXR0aW5nRm9jYWxQb2ludDtcbiAgICAgICAgaWYgKGNvbnN0cmFpblRvQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBjb25zdCBjb250cm9sc01hcmdpblB4ID0gNDggKiAyO1xuICAgICAgICAgICAgY29uc3QgYXZhaWxhYmxlSGVpZ2h0ID0gY29udGFpbmVySGVpZ2h0IC0gY29udHJvbHNNYXJnaW5QeDtcbiAgICAgICAgICAgIGNvbnN0IGF2YWlsYWJsZVdpZHRoID0gY29udGFpbmVyV2lkdGg7XG4gICAgICAgICAgICBjb25zdCBoUmF0aW8gPSBpbWdIZWlnaHQgLyBhdmFpbGFibGVIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCB3UmF0aW8gPSBpbWdXaWR0aCAvIGF2YWlsYWJsZVdpZHRoO1xuXG4gICAgICAgICAgICBjb25zdCBpbWFnZUV4Y2VlZHNBdmFpbGFibGVEaW1lbnNpb25zID0gMSA8IGhSYXRpbyB8fCAxIDwgd1JhdGlvO1xuICAgICAgICAgICAgaWYgKGltYWdlRXhjZWVkc0F2YWlsYWJsZURpbWVuc2lvbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmYWN0b3IgPSBoUmF0aW8gPCB3UmF0aW8gPyB3UmF0aW8gOiBoUmF0aW87XG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IE1hdGgucm91bmQoaW1nV2lkdGggLyBmYWN0b3IpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gTWF0aC5yb3VuZChpbWdIZWlnaHQgLyBmYWN0b3IpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2VudGVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLndpZHRoID0gaW1nV2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaW1nSGVpZ2h0O1xuICAgICAgICB0aGlzLmNlbnRlcmVkID0gaW1nV2lkdGggPD0gY29udGFpbmVyV2lkdGggJiYgaW1nSGVpZ2h0IDw9IGNvbnRhaW5lckhlaWdodDtcbiAgICB9XG5cbiAgICBzZXRGb2NhbFBvaW50U3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc2l6ZVByaW9yVG9TZXR0aW5nRm9jYWxQb2ludCA9IHRoaXMuc2l6ZTtcbiAgICAgICAgdGhpcy5zaXplID0gJ21lZGl1bSc7XG4gICAgICAgIHRoaXMuc2V0dGluZ0ZvY2FsUG9pbnQgPSB0cnVlO1xuICAgICAgICB0aGlzLmxhc3RGb2NhbFBvaW50ID0gdGhpcy5hc3NldC5mb2NhbFBvaW50IHx8IHsgeDogMC41LCB5OiAwLjUgfTtcbiAgICAgICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlRm9jYWxQb2ludCgpIHtcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0XG4gICAgICAgICAgICAudXBkYXRlQXNzZXQoe1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmFzc2V0LmlkLFxuICAgICAgICAgICAgICAgIGZvY2FsUG9pbnQ6IG51bGwsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2Fzc2V0LnVwZGF0ZS1mb2NhbC1wb2ludC1zdWNjZXNzJykpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFzc2V0ID0geyAuLi50aGlzLmFzc2V0LCBmb2NhbFBvaW50OiBudWxsIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnYXNzZXQudXBkYXRlLWZvY2FsLXBvaW50LWVycm9yJykpLFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBvbkZvY2FsUG9pbnRDaGFuZ2UocG9pbnQ6IFBvaW50KSB7XG4gICAgICAgIHRoaXMubGFzdEZvY2FsUG9pbnQgPSBwb2ludDtcbiAgICB9XG5cbiAgICBzZXRGb2NhbFBvaW50Q2FuY2VsKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdGb2NhbFBvaW50ID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGFzdEZvY2FsUG9pbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuc2l6ZVByaW9yVG9TZXR0aW5nRm9jYWxQb2ludDtcbiAgICB9XG5cbiAgICBzZXRGb2NhbFBvaW50RW5kKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdGb2NhbFBvaW50ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuc2l6ZVByaW9yVG9TZXR0aW5nRm9jYWxQb2ludDtcbiAgICAgICAgaWYgKHRoaXMubGFzdEZvY2FsUG9pbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5sYXN0Rm9jYWxQb2ludDtcbiAgICAgICAgICAgIHRoaXMubGFzdEZvY2FsUG9pbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLnByb2R1Y3RcbiAgICAgICAgICAgICAgICAudXBkYXRlQXNzZXQoe1xuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5hc3NldC5pZCxcbiAgICAgICAgICAgICAgICAgICAgZm9jYWxQb2ludDogeyB4LCB5IH0sXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdhc3NldC51cGRhdGUtZm9jYWwtcG9pbnQtc3VjY2VzcycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXNzZXQgPSB7IC4uLnRoaXMuYXNzZXQsIGZvY2FsUG9pbnQ6IHsgeCwgeSB9IH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnYXNzZXQudXBkYXRlLWZvY2FsLXBvaW50LWVycm9yJykpLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYW5hZ2VUYWdzKCkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmZyb21Db21wb25lbnQoTWFuYWdlVGFnc0RpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIHNpemU6ICdzbScsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS11cGRhdGVkLXRhZ3Mtc3VjY2VzcycpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=