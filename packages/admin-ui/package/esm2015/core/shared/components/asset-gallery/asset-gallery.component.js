import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../../providers/modal/modal.service';
import { AssetPreviewDialogComponent } from '../asset-preview-dialog/asset-preview-dialog.component';
export class AssetGalleryComponent {
    constructor(modalService) {
        this.modalService = modalService;
        /**
         * If true, allows multiple assets to be selected by ctrl+clicking.
         */
        this.multiSelect = false;
        this.canDelete = false;
        this.selectionChange = new EventEmitter();
        this.deleteAssets = new EventEmitter();
        this.selection = [];
    }
    ngOnChanges() {
        if (this.assets) {
            for (const asset of this.selection) {
                // Update and selected assets with any changes
                const match = this.assets.find(a => a.id === asset.id);
                if (match) {
                    Object.assign(asset, match);
                }
            }
        }
    }
    toggleSelection(event, asset) {
        const index = this.selection.findIndex(a => a.id === asset.id);
        if (this.multiSelect && event.shiftKey && 1 <= this.selection.length) {
            const lastSelection = this.selection[this.selection.length - 1];
            const lastSelectionIndex = this.assets.findIndex(a => a.id === lastSelection.id);
            const currentIndex = this.assets.findIndex(a => a.id === asset.id);
            const start = currentIndex < lastSelectionIndex ? currentIndex : lastSelectionIndex;
            const end = currentIndex > lastSelectionIndex ? currentIndex + 1 : lastSelectionIndex;
            this.selection.push(...this.assets.slice(start, end).filter(a => !this.selection.find(s => s.id === a.id)));
        }
        else if (index === -1) {
            if (this.multiSelect && (event.ctrlKey || event.shiftKey)) {
                this.selection.push(asset);
            }
            else {
                this.selection = [asset];
            }
        }
        else {
            if (this.multiSelect && event.ctrlKey) {
                this.selection.splice(index, 1);
            }
            else if (1 < this.selection.length) {
                this.selection = [asset];
            }
            else {
                this.selection.splice(index, 1);
            }
        }
        // Make the selection mutable
        this.selection = this.selection.map(x => (Object.assign({}, x)));
        this.selectionChange.emit(this.selection);
    }
    isSelected(asset) {
        return !!this.selection.find(a => a.id === asset.id);
    }
    lastSelected() {
        return this.selection[this.selection.length - 1];
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
    entityInfoClick(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
AssetGalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-gallery',
                template: "<div class=\"gallery\">\n    <div\n        class=\"card\"\n        *ngFor=\"let asset of assets\"\n        (click)=\"toggleSelection($event, asset)\"\n        [class.selected]=\"isSelected(asset)\"\n    >\n        <div class=\"card-img\">\n            <div class=\"selected-checkbox\"><clr-icon shape=\"check-circle\" size=\"32\"></clr-icon></div>\n            <img [src]=\"asset | assetPreview: 'thumb'\" />\n        </div>\n        <div class=\"detail\">\n            <vdr-entity-info\n                [entity]=\"asset\"\n                [small]=\"true\"\n                (click)=\"entityInfoClick($event)\"\n            ></vdr-entity-info>\n            <span [title]=\"asset.name\">{{ asset.name }}</span>\n        </div>\n    </div>\n</div>\n<div class=\"info-bar\">\n    <div class=\"card\">\n        <div class=\"card-img\">\n            <div class=\"placeholder\" *ngIf=\"selection.length === 0\">\n                <clr-icon shape=\"image\" size=\"128\"></clr-icon>\n                <div>{{ 'catalog.no-selection' | translate }}</div>\n            </div>\n            <img\n                class=\"preview\"\n                *ngIf=\"selection.length >= 1\"\n                [src]=\"lastSelected().preview + '?preset=medium'\"\n            />\n        </div>\n        <div class=\"card-block details\" *ngIf=\"selection.length >= 1\">\n            <div class=\"name\">{{ lastSelected().name }}</div>\n            <div>{{ 'asset.original-asset-size' | translate }}: {{ lastSelected().fileSize | filesize }}</div>\n\n            <ng-container *ngIf=\"selection.length === 1\">\n                <vdr-chip *ngFor=\"let tag of lastSelected().tags\" [colorFrom]=\"tag.value\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ tag.value }}</vdr-chip>\n                <div>\n                    <button (click)=\"previewAsset(lastSelected())\" class=\"btn btn-link\">\n                        <clr-icon shape=\"eye\"></clr-icon> {{ 'asset.preview' | translate }}\n                    </button>\n                </div>\n                <div>\n                    <a [routerLink]=\"['./', lastSelected().id]\" class=\"btn btn-link\">\n                        <clr-icon shape=\"pencil\"></clr-icon> {{ 'common.edit' | translate }}\n                    </a>\n                </div>\n            </ng-container>\n            <div *ngIf=\"canDelete\">\n                <button (click)=\"deleteAssets.emit(selection)\" class=\"btn btn-link\">\n                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon> {{ 'common.delete' | translate }}\n                </button>\n            </div>\n        </div>\n    </div>\n    <div class=\"card stack\" [class.visible]=\"selection.length > 1\"></div>\n    <div class=\"selection-count\" [class.visible]=\"selection.length > 1\">\n        {{ 'asset.assets-selected-count' | translate: { count: selection.length } }}\n        <ul>\n            <li *ngFor=\"let asset of selection\">{{ asset.name }}</li>\n        </ul>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;overflow:hidden}.gallery{flex:1;display:grid;grid-template-columns:repeat(auto-fill,150px);grid-template-rows:repeat(auto-fill,180px);grid-gap:10px 20px;overflow-y:auto;padding-left:12px;padding-top:12px;padding-bottom:12px}.gallery .card:hover{box-shadow:0 .125rem 0 0 var(--color-primary-500);border:1px solid var(--color-primary-500)}.card{margin-top:0;position:relative}.selected-checkbox{opacity:0;position:absolute;color:var(--color-success-500);background-color:#fff;border-radius:50%;top:-12px;left:-12px;box-shadow:0 5px 5px -4px rgba(0,0,0,.75);transition:opacity .1s}.card.selected{box-shadow:0 .125rem 0 0 var(--color-primary-500);border:1px solid var(--color-primary-500)}.card.selected .selected-checkbox{opacity:1}.detail{font-size:12px;margin:3px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.detail vdr-entity-info{height:16px}.info-bar{width:25%;padding:0 6px;overflow-y:auto}.info-bar .card{z-index:1}.info-bar .stack{z-index:0;opacity:0;transform:perspective(500px) translateZ(0) translateY(-16px);height:16px;transition:transform .3s,opacity 0s .3s;background-color:#fff}.info-bar .stack.visible{opacity:1;transform:perspective(500px) translateZ(-44px) translateY(0);background-color:var(--color-component-bg-100);transition:transform .3s,color .3s}.info-bar .selection-count{opacity:0;position:relative;text-align:center;visibility:hidden;transition:opacity .3s,visibility 0s .3s}.info-bar .selection-count.visible{opacity:1;visibility:visible;transition:opacity .3s,visibility 0s}.info-bar .selection-count ul{text-align:left;list-style-type:none;margin-left:12px}.info-bar .selection-count ul li{font-size:12px}.info-bar .placeholder{text-align:center;color:var(--color-grey-300)}.info-bar .preview img{max-width:100%}.info-bar .details{font-size:12px;word-break:break-all}.info-bar .name{line-height:14px;font-weight:700}"]
            },] }
];
AssetGalleryComponent.ctorParameters = () => [
    { type: ModalService }
];
AssetGalleryComponent.propDecorators = {
    assets: [{ type: Input }],
    multiSelect: [{ type: Input }],
    canDelete: [{ type: Input }],
    selectionChange: [{ type: Output }],
    deleteAssets: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2Fzc2V0LWdhbGxlcnkvYXNzZXQtZ2FsbGVyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFVckcsTUFBTSxPQUFPLHFCQUFxQjtJQVk5QixZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQVY5Qzs7V0FFRztRQUNNLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDakIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBZSxDQUFDO1FBQ2xELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQWUsQ0FBQztRQUV6RCxjQUFTLEdBQWdCLEVBQUUsQ0FBQztJQUVxQixDQUFDO0lBRWxELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2hDLDhDQUE4QztnQkFDOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxLQUFLLEVBQUU7b0JBQ1AsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7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SSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELFlBQVk7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFnQjtRQUN6QixJQUFJLENBQUMsWUFBWTthQUNaLGFBQWEsQ0FBQywyQkFBMkIsRUFBRTtZQUN4QyxJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFO1NBQ3BCLENBQUM7YUFDRCxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQWlCO1FBQzdCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7O1lBcEZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3Qiw0N0ZBQTZDO2dCQUU3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVZRLFlBQVk7OztxQkFZaEIsS0FBSzswQkFJTCxLQUFLO3dCQUNMLEtBQUs7OEJBQ0wsTUFBTTsyQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQXNzZXQsIEdldEFzc2V0TGlzdCB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgTW9kYWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vcHJvdmlkZXJzL21vZGFsL21vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXNzZXRQcmV2aWV3RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vYXNzZXQtcHJldmlldy1kaWFsb2cvYXNzZXQtcHJldmlldy1kaWFsb2cuY29tcG9uZW50JztcblxuZXhwb3J0IHR5cGUgQXNzZXRMaWtlID0gR2V0QXNzZXRMaXN0Lkl0ZW1zO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1hc3NldC1nYWxsZXJ5JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXNzZXQtZ2FsbGVyeS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXNzZXQtZ2FsbGVyeS5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBc3NldEdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIGFzc2V0czogQXNzZXRMaWtlW107XG4gICAgLyoqXG4gICAgICogSWYgdHJ1ZSwgYWxsb3dzIG11bHRpcGxlIGFzc2V0cyB0byBiZSBzZWxlY3RlZCBieSBjdHJsK2NsaWNraW5nLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIG11bHRpU2VsZWN0ID0gZmFsc2U7XG4gICAgQElucHV0KCkgY2FuRGVsZXRlID0gZmFsc2U7XG4gICAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8QXNzZXRMaWtlW10+KCk7XG4gICAgQE91dHB1dCgpIGRlbGV0ZUFzc2V0cyA9IG5ldyBFdmVudEVtaXR0ZXI8QXNzZXRMaWtlW10+KCk7XG5cbiAgICBzZWxlY3Rpb246IEFzc2V0TGlrZVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmFzc2V0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBhc3NldCBvZiB0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBhbmQgc2VsZWN0ZWQgYXNzZXRzIHdpdGggYW55IGNoYW5nZXNcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IHRoaXMuYXNzZXRzLmZpbmQoYSA9PiBhLmlkID09PSBhc3NldC5pZCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYXNzZXQsIG1hdGNoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVTZWxlY3Rpb24oZXZlbnQ6IE1vdXNlRXZlbnQsIGFzc2V0OiBBc3NldCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZWN0aW9uLmZpbmRJbmRleChhID0+IGEuaWQgPT09IGFzc2V0LmlkKTtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlTZWxlY3QgJiYgZXZlbnQuc2hpZnRLZXkgJiYgMSA8PSB0aGlzLnNlbGVjdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblt0aGlzLnNlbGVjdGlvbi5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWxlY3Rpb25JbmRleCA9IHRoaXMuYXNzZXRzLmZpbmRJbmRleChhID0+IGEuaWQgPT09IGxhc3RTZWxlY3Rpb24uaWQpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5hc3NldHMuZmluZEluZGV4KGEgPT4gYS5pZCA9PT0gYXNzZXQuaWQpO1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBjdXJyZW50SW5kZXggPCBsYXN0U2VsZWN0aW9uSW5kZXggPyBjdXJyZW50SW5kZXggOiBsYXN0U2VsZWN0aW9uSW5kZXg7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSBjdXJyZW50SW5kZXggPiBsYXN0U2VsZWN0aW9uSW5kZXggPyBjdXJyZW50SW5kZXggKyAxIDogbGFzdFNlbGVjdGlvbkluZGV4O1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24ucHVzaChcbiAgICAgICAgICAgICAgICAuLi50aGlzLmFzc2V0cy5zbGljZShzdGFydCwgZW5kKS5maWx0ZXIoYSA9PiAhdGhpcy5zZWxlY3Rpb24uZmluZChzID0+IHMuaWQgPT09IGEuaWQpKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aVNlbGVjdCAmJiAoZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5wdXNoKGFzc2V0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbYXNzZXRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlTZWxlY3QgJiYgZXZlbnQuY3RybEtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKDEgPCB0aGlzLnNlbGVjdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFthc3NldF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWFrZSB0aGUgc2VsZWN0aW9uIG11dGFibGVcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5tYXAoeCA9PiAoeyAuLi54IH0pKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChhc3NldDogQXNzZXRMaWtlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuc2VsZWN0aW9uLmZpbmQoYSA9PiBhLmlkID09PSBhc3NldC5pZCk7XG4gICAgfVxuXG4gICAgbGFzdFNlbGVjdGVkKCk6IEFzc2V0TGlrZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblt0aGlzLnNlbGVjdGlvbi5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICBwcmV2aWV3QXNzZXQoYXNzZXQ6IEFzc2V0TGlrZSkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmZyb21Db21wb25lbnQoQXNzZXRQcmV2aWV3RGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgc2l6ZTogJ3hsJyxcbiAgICAgICAgICAgICAgICBjbG9zYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsb2NhbHM6IHsgYXNzZXQgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgZW50aXR5SW5mb0NsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn1cbiJdfQ==