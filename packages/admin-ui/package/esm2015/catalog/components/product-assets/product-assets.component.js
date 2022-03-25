import { CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, Optional, Output, ViewChild, } from '@angular/core';
import { AssetPickerDialogComponent, AssetPreviewDialogComponent, ModalService, Permission, } from '@vendure/admin-ui/core';
import { unique } from '@vendure/common/lib/unique';
import { CollectionDetailComponent } from '../collection-detail/collection-detail.component';
/**
 * A component which displays the Assets associated with a product, and allows assets to be removed and
 * added, and for the featured asset to be set.
 *
 * Note: rather complex code for drag drop is due to a limitation of the default CDK implementation
 * which is addressed by a work-around from here: https://github.com/angular/components/issues/13372#issuecomment-483998378
 */
export class ProductAssetsComponent {
    constructor(modalService, changeDetector, viewportRuler, collectionDetailComponent) {
        this.modalService = modalService;
        this.changeDetector = changeDetector;
        this.viewportRuler = viewportRuler;
        this.collectionDetailComponent = collectionDetailComponent;
        this.compact = false;
        this.change = new EventEmitter();
        this.assets = [];
        this.updateCollectionPermissions = [Permission.UpdateCatalog, Permission.UpdateCollection];
        this.updateProductPermissions = [Permission.UpdateCatalog, Permission.UpdateProduct];
        this.dropListEnterPredicate = (drag, drop) => {
            if (drop === this.placeholder) {
                return true;
            }
            if (drop !== this.activeContainer) {
                return false;
            }
            const phElement = this.placeholder.element.nativeElement;
            const sourceElement = drag.dropContainer.element.nativeElement;
            const dropElement = drop.element.nativeElement;
            const children = dropElement.parentElement && dropElement.parentElement.children;
            const dragIndex = __indexOf(children, this.source ? phElement : sourceElement);
            const dropIndex = __indexOf(children, dropElement);
            if (!this.source) {
                this.sourceIndex = dragIndex;
                this.source = drag.dropContainer;
                phElement.style.width = sourceElement.clientWidth + 'px';
                phElement.style.height = sourceElement.clientHeight + 'px';
                if (sourceElement.parentElement) {
                    sourceElement.parentElement.removeChild(sourceElement);
                }
            }
            this.targetIndex = dropIndex;
            this.target = drop;
            phElement.style.display = '';
            if (dropElement.parentElement) {
                dropElement.parentElement.insertBefore(phElement, dropIndex > dragIndex ? dropElement.nextSibling : dropElement);
            }
            this.placeholder._dropListRef.enter(drag._dragRef, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);
            return false;
        };
    }
    set assetsSetter(val) {
        // create a new non-readonly array of assets
        this.assets = val.slice();
    }
    get updatePermissions() {
        if (this.collectionDetailComponent) {
            return this.updateCollectionPermissions;
        }
        else {
            return this.updateProductPermissions;
        }
    }
    ngAfterViewInit() {
        const phElement = this.placeholder.element.nativeElement;
        phElement.style.display = 'none';
        if (phElement.parentElement) {
            phElement.parentElement.removeChild(phElement);
        }
    }
    selectAssets() {
        this.modalService
            .fromComponent(AssetPickerDialogComponent, {
            size: 'xl',
        })
            .subscribe(result => {
            if (result && result.length) {
                this.assets = unique(this.assets.concat(result), 'id');
                if (!this.featuredAsset) {
                    this.featuredAsset = result[0];
                }
                this.emitChangeEvent(this.assets, this.featuredAsset);
                this.changeDetector.markForCheck();
            }
        });
    }
    setAsFeatured(asset) {
        this.featuredAsset = asset;
        this.emitChangeEvent(this.assets, asset);
    }
    isFeatured(asset) {
        return !!this.featuredAsset && this.featuredAsset.id === asset.id;
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
    removeAsset(asset) {
        this.assets = this.assets.filter(a => a.id !== asset.id);
        if (this.featuredAsset && this.featuredAsset.id === asset.id) {
            this.featuredAsset = this.assets.length > 0 ? this.assets[0] : undefined;
        }
        this.emitChangeEvent(this.assets, this.featuredAsset);
    }
    emitChangeEvent(assets, featuredAsset) {
        this.change.emit({
            assets,
            featuredAsset,
        });
    }
    dragMoved(e) {
        const point = this.getPointerPositionOnPage(e.event);
        this.listGroup._items.forEach(dropList => {
            if (__isInsideDropListClientRect(dropList, point.x, point.y)) {
                this.activeContainer = dropList;
                return;
            }
        });
    }
    dropListDropped() {
        if (!this.target || !this.source) {
            return;
        }
        const phElement = this.placeholder.element.nativeElement;
        // tslint:disable-next-line:no-non-null-assertion
        const parent = phElement.parentElement;
        phElement.style.display = 'none';
        parent.removeChild(phElement);
        parent.appendChild(phElement);
        parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);
        this.target = null;
        this.source = null;
        if (this.sourceIndex !== this.targetIndex) {
            moveItemInArray(this.assets, this.sourceIndex, this.targetIndex);
            this.emitChangeEvent(this.assets, this.featuredAsset);
        }
    }
    /** Determines the point of the page that was touched by the user. */
    getPointerPositionOnPage(event) {
        // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
        const point = __isTouchEvent(event) ? event.touches[0] || event.changedTouches[0] : event;
        const scrollPosition = this.viewportRuler.getViewportScrollPosition();
        return {
            x: point.pageX - scrollPosition.left,
            y: point.pageY - scrollPosition.top,
        };
    }
}
ProductAssetsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-assets',
                template: "<div class=\"card\" *ngIf=\"!compact; else compactView\">\n    <div class=\"card-img\">\n        <div class=\"featured-asset\">\n            <img\n                *ngIf=\"featuredAsset\"\n                [src]=\"featuredAsset | assetPreview:'small'\"\n                (click)=\"previewAsset(featuredAsset)\"\n            />\n            <div class=\"placeholder\" *ngIf=\"!featuredAsset\" (click)=\"selectAssets()\">\n                <clr-icon shape=\"image\" size=\"128\"></clr-icon>\n                <div>{{ 'catalog.no-featured-asset' | translate }}</div>\n            </div>\n        </div>\n    </div>\n    <div class=\"card-block\"><ng-container *ngTemplateOutlet=\"assetList\"></ng-container></div>\n    <div class=\"card-footer\" *vdrIfPermissions=\"updatePermissions\">\n        <button class=\"btn\" (click)=\"selectAssets()\">\n            <clr-icon shape=\"attachment\"></clr-icon>\n            {{ 'asset.add-asset' | translate }}\n        </button>\n    </div>\n</div>\n\n<ng-template #compactView>\n    <div class=\"featured-asset compact\">\n        <img\n            *ngIf=\"featuredAsset\"\n            [src]=\"featuredAsset | assetPreview:'thumb'\"\n            (click)=\"previewAsset(featuredAsset)\"\n        />\n\n        <div class=\"placeholder\" *ngIf=\"!featuredAsset\" (click)=\"selectAssets()\"><clr-icon shape=\"image\" size=\"150\"></clr-icon></div>\n    </div>\n    <ng-container *ngTemplateOutlet=\"assetList\"></ng-container>\n    <button\n        *vdrIfPermissions=\"updatePermissions\"\n        class=\"compact-select btn btn-icon btn-sm btn-block\"\n        [title]=\"'asset.add-asset' | translate\"\n        (click)=\"selectAssets()\"\n    >\n        <clr-icon shape=\"attachment\"></clr-icon>\n        {{ 'asset.add-asset' | translate }}\n    </button>\n</ng-template>\n\n<ng-template #assetList>\n    <div class=\"all-assets\" [class.compact]=\"compact\" cdkDropListGroup #dlg>\n        <div\n            cdkDropList\n            #dl\n            [cdkDropListDisabled]=\"!(updatePermissions | hasPermission)\"\n            [cdkDropListEnterPredicate]=\"dropListEnterPredicate\"\n            (cdkDropListDropped)=\"dropListDropped()\"\n        ></div>\n        <div\n            *ngFor=\"let asset of assets\"\n            cdkDropList\n            [cdkDropListDisabled]=\"!(updatePermissions | hasPermission)\"\n            [cdkDropListEnterPredicate]=\"dropListEnterPredicate\"\n            (cdkDropListDropped)=\"dropListDropped()\"\n        >\n            <vdr-dropdown cdkDrag (cdkDragMoved)=\"dragMoved($event)\">\n                <div\n                    class=\"asset-thumb\"\n                    vdrDropdownTrigger\n                    [class.featured]=\"isFeatured(asset)\"\n                    [title]=\"\"\n                    tabindex=\"0\"\n                >\n                    <img [src]=\"asset | assetPreview:'tiny'\" />\n                </div>\n                <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                    <button type=\"button\" vdrDropdownItem (click)=\"previewAsset(asset)\">\n                        {{ 'asset.preview' | translate }}\n                    </button>\n                    <button\n                        type=\"button\"\n                        [disabled]=\"isFeatured(asset) || !(updatePermissions | hasPermission)\"\n                        vdrDropdownItem\n                        (click)=\"setAsFeatured(asset)\"\n                    >\n                        {{ 'asset.set-as-featured-asset' | translate }}\n                    </button>\n                    <div class=\"dropdown-divider\"></div>\n                    <button\n                        type=\"button\"\n                        class=\"remove-asset\"\n                        vdrDropdownItem\n                        [disabled]=\"!(updatePermissions | hasPermission)\"\n                        (click)=\"removeAsset(asset)\"\n                    >\n                        {{ 'asset.remove-asset' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </div>\n    </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{width:340px;display:block}:host.compact{width:162px}.placeholder{text-align:center;color:var(--color-grey-300)}.featured-asset{text-align:center;background:var(--color-component-bg-200);padding:6px;cursor:pointer}.featured-asset.compact{width:100%;min-height:40px;position:relative;padding:6px}.featured-asset .compact-select{position:absolute;bottom:6px;right:6px;margin:0}.all-assets{display:flex;flex-wrap:wrap}.all-assets .asset-thumb{margin:3px;padding:0;border:2px solid var(--color-component-border-100);cursor:pointer}.all-assets .asset-thumb.featured{border-color:var(--color-primary-500)}.all-assets .remove-asset{color:var(--color-warning-500)}.all-assets.compact .asset-thumb{margin:1px;border-width:1px}.cdk-drag-preview{display:flex;align-items:center;justify-content:center;width:50px;background-color:var(--color-component-bg-100);opacity:.9;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:.8;width:60px;height:50px}.cdk-drag-placeholder .asset-thumb{background-color:var(--color-component-bg-300);height:100%;width:54px}.cdk-drag-placeholder img{display:none}.all-assets.compact .cdk-drag-placeholder,.all-assets.compact .cdk-drag-placeholder .asset-thumb{width:50px}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.example-box:last-child{border:none}.all-assets.cdk-drop-list-dragging vdr-dropdown:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"]
            },] }
];
ProductAssetsComponent.ctorParameters = () => [
    { type: ModalService },
    { type: ChangeDetectorRef },
    { type: ViewportRuler },
    { type: CollectionDetailComponent, decorators: [{ type: Optional }] }
];
ProductAssetsComponent.propDecorators = {
    assetsSetter: [{ type: Input, args: ['assets',] }],
    featuredAsset: [{ type: Input }],
    compact: [{ type: HostBinding, args: ['class.compact',] }, { type: Input }],
    change: [{ type: Output }],
    listGroup: [{ type: ViewChild, args: ['dlg', { static: false, read: CdkDropListGroup },] }],
    placeholder: [{ type: ViewChild, args: ['dl', { static: false, read: CdkDropList },] }]
};
function __indexOf(collection, node) {
    if (!collection) {
        return -1;
    }
    return Array.prototype.indexOf.call(collection, node);
}
/** Determines whether an event is a touch event. */
function __isTouchEvent(event) {
    return event.type.startsWith('touch');
}
function __isInsideDropListClientRect(dropList, x, y) {
    const { top, bottom, left, right } = dropList.element.nativeElement.getBoundingClientRect();
    return y >= top && y <= bottom && x >= left && x <= right;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1hc3NldHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jYXRhbG9nL3NyYy9jb21wb25lbnRzL3Byb2R1Y3QtYXNzZXRzL3Byb2R1Y3QtYXNzZXRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXdCLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFFSCwwQkFBMEIsRUFDMUIsMkJBQTJCLEVBQzNCLFlBQVksRUFDWixVQUFVLEdBQ2IsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFcEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFPN0Y7Ozs7OztHQU1HO0FBT0gsTUFBTSxPQUFPLHNCQUFzQjtJQWdDL0IsWUFDWSxZQUEwQixFQUMxQixjQUFpQyxFQUNqQyxhQUE0QixFQUNoQix5QkFBcUQ7UUFIakUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ2hCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBNEI7UUE1QjdFLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDTixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWUsQ0FBQztRQVU1QyxXQUFNLEdBQVksRUFBRSxDQUFDO1FBRVgsZ0NBQTJC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RCxPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUVELG9EQUFvRDtBQUNwRCxTQUFTLGNBQWMsQ0FBQyxLQUE4QjtJQUNsRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFFRCxTQUFTLDRCQUE0QixDQUFDLFFBQXFCLEVBQUUsQ0FBUyxFQUFFLENBQVM7SUFDN0UsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDNUYsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDO0FBQzlELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtEcmFnLCBDZGtEcmFnTW92ZSwgQ2RrRHJvcExpc3QsIENka0Ryb3BMaXN0R3JvdXAsIG1vdmVJdGVtSW5BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBc3NldCxcbiAgICBBc3NldFBpY2tlckRpYWxvZ0NvbXBvbmVudCxcbiAgICBBc3NldFByZXZpZXdEaWFsb2dDb21wb25lbnQsXG4gICAgTW9kYWxTZXJ2aWNlLFxuICAgIFBlcm1pc3Npb24sXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgdW5pcXVlIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi91bmlxdWUnO1xuXG5pbXBvcnQgeyBDb2xsZWN0aW9uRGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi4vY29sbGVjdGlvbi1kZXRhaWwvY29sbGVjdGlvbi1kZXRhaWwuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBBc3NldENoYW5nZSB7XG4gICAgYXNzZXRzOiBBc3NldFtdO1xuICAgIGZlYXR1cmVkQXNzZXQ6IEFzc2V0IHwgdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIEEgY29tcG9uZW50IHdoaWNoIGRpc3BsYXlzIHRoZSBBc3NldHMgYXNzb2NpYXRlZCB3aXRoIGEgcHJvZHVjdCwgYW5kIGFsbG93cyBhc3NldHMgdG8gYmUgcmVtb3ZlZCBhbmRcbiAqIGFkZGVkLCBhbmQgZm9yIHRoZSBmZWF0dXJlZCBhc3NldCB0byBiZSBzZXQuXG4gKlxuICogTm90ZTogcmF0aGVyIGNvbXBsZXggY29kZSBmb3IgZHJhZyBkcm9wIGlzIGR1ZSB0byBhIGxpbWl0YXRpb24gb2YgdGhlIGRlZmF1bHQgQ0RLIGltcGxlbWVudGF0aW9uXG4gKiB3aGljaCBpcyBhZGRyZXNzZWQgYnkgYSB3b3JrLWFyb3VuZCBmcm9tIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvaXNzdWVzLzEzMzcyI2lzc3VlY29tbWVudC00ODM5OTgzNzhcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcHJvZHVjdC1hc3NldHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcm9kdWN0LWFzc2V0cy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvZHVjdC1hc3NldHMuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdEFzc2V0c0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAgIEBJbnB1dCgnYXNzZXRzJykgc2V0IGFzc2V0c1NldHRlcih2YWw6IEFzc2V0W10pIHtcbiAgICAgICAgLy8gY3JlYXRlIGEgbmV3IG5vbi1yZWFkb25seSBhcnJheSBvZiBhc3NldHNcbiAgICAgICAgdGhpcy5hc3NldHMgPSB2YWwuc2xpY2UoKTtcbiAgICB9XG4gICAgQElucHV0KCkgZmVhdHVyZWRBc3NldDogQXNzZXQgfCB1bmRlZmluZWQ7XG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jb21wYWN0JylcbiAgICBASW5wdXQoKVxuICAgIGNvbXBhY3QgPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxBc3NldENoYW5nZT4oKTtcbiAgICBAVmlld0NoaWxkKCdkbGcnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IENka0Ryb3BMaXN0R3JvdXAgfSkgbGlzdEdyb3VwOiBDZGtEcm9wTGlzdEdyb3VwPENka0Ryb3BMaXN0PjtcbiAgICBAVmlld0NoaWxkKCdkbCcsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogQ2RrRHJvcExpc3QgfSkgcGxhY2Vob2xkZXI6IENka0Ryb3BMaXN0O1xuXG4gICAgcHVibGljIHRhcmdldDogQ2RrRHJvcExpc3QgfCBudWxsO1xuICAgIHB1YmxpYyB0YXJnZXRJbmRleDogbnVtYmVyO1xuICAgIHB1YmxpYyBzb3VyY2U6IENka0Ryb3BMaXN0IHwgbnVsbDtcbiAgICBwdWJsaWMgc291cmNlSW5kZXg6IG51bWJlcjtcbiAgICBwdWJsaWMgZHJhZ0luZGV4OiBudW1iZXI7XG4gICAgcHVibGljIGFjdGl2ZUNvbnRhaW5lcjtcbiAgICBwdWJsaWMgYXNzZXRzOiBBc3NldFtdID0gW107XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHVwZGF0ZUNvbGxlY3Rpb25QZXJtaXNzaW9ucyA9IFtQZXJtaXNzaW9uLlVwZGF0ZUNhdGFsb2csIFBlcm1pc3Npb24uVXBkYXRlQ29sbGVjdGlvbl07XG4gICAgcHJpdmF0ZSByZWFkb25seSB1cGRhdGVQcm9kdWN0UGVybWlzc2lvbnMgPSBbUGVybWlzc2lvbi5VcGRhdGVDYXRhbG9nLCBQZXJtaXNzaW9uLlVwZGF0ZVByb2R1Y3RdO1xuXG4gICAgZ2V0IHVwZGF0ZVBlcm1pc3Npb25zKCk6IFBlcm1pc3Npb25bXSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxlY3Rpb25EZXRhaWxDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUNvbGxlY3Rpb25QZXJtaXNzaW9ucztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVByb2R1Y3RQZXJtaXNzaW9ucztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSB2aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGNvbGxlY3Rpb25EZXRhaWxDb21wb25lbnQ/OiBDb2xsZWN0aW9uRGV0YWlsQ29tcG9uZW50LFxuICAgICkge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgY29uc3QgcGhFbGVtZW50ID0gdGhpcy5wbGFjZWhvbGRlci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgcGhFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGlmIChwaEVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgcGhFbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQocGhFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEFzc2V0cygpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5mcm9tQ29tcG9uZW50KEFzc2V0UGlja2VyRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgc2l6ZTogJ3hsJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXNzZXRzID0gdW5pcXVlKHRoaXMuYXNzZXRzLmNvbmNhdChyZXN1bHQpLCAnaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZlYXR1cmVkQXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmVhdHVyZWRBc3NldCA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudCh0aGlzLmFzc2V0cywgdGhpcy5mZWF0dXJlZEFzc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRBc0ZlYXR1cmVkKGFzc2V0OiBBc3NldCkge1xuICAgICAgICB0aGlzLmZlYXR1cmVkQXNzZXQgPSBhc3NldDtcbiAgICAgICAgdGhpcy5lbWl0Q2hhbmdlRXZlbnQodGhpcy5hc3NldHMsIGFzc2V0KTtcbiAgICB9XG5cbiAgICBpc0ZlYXR1cmVkKGFzc2V0OiBBc3NldCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmZlYXR1cmVkQXNzZXQgJiYgdGhpcy5mZWF0dXJlZEFzc2V0LmlkID09PSBhc3NldC5pZDtcbiAgICB9XG5cbiAgICBwcmV2aWV3QXNzZXQoYXNzZXQ6IEFzc2V0KSB7XG4gICAgICAgIHRoaXMubW9kYWxTZXJ2aWNlXG4gICAgICAgICAgICAuZnJvbUNvbXBvbmVudChBc3NldFByZXZpZXdEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBzaXplOiAneGwnLFxuICAgICAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxvY2FsczogeyBhc3NldCB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICByZW1vdmVBc3NldChhc3NldDogQXNzZXQpIHtcbiAgICAgICAgdGhpcy5hc3NldHMgPSB0aGlzLmFzc2V0cy5maWx0ZXIoYSA9PiBhLmlkICE9PSBhc3NldC5pZCk7XG4gICAgICAgIGlmICh0aGlzLmZlYXR1cmVkQXNzZXQgJiYgdGhpcy5mZWF0dXJlZEFzc2V0LmlkID09PSBhc3NldC5pZCkge1xuICAgICAgICAgICAgdGhpcy5mZWF0dXJlZEFzc2V0ID0gdGhpcy5hc3NldHMubGVuZ3RoID4gMCA/IHRoaXMuYXNzZXRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdENoYW5nZUV2ZW50KHRoaXMuYXNzZXRzLCB0aGlzLmZlYXR1cmVkQXNzZXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW1pdENoYW5nZUV2ZW50KGFzc2V0czogQXNzZXRbXSwgZmVhdHVyZWRBc3NldDogQXNzZXQgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBhc3NldHMsXG4gICAgICAgICAgICBmZWF0dXJlZEFzc2V0LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkcmFnTW92ZWQoZTogQ2RrRHJhZ01vdmUpIHtcbiAgICAgICAgY29uc3QgcG9pbnQgPSB0aGlzLmdldFBvaW50ZXJQb3NpdGlvbk9uUGFnZShlLmV2ZW50KTtcblxuICAgICAgICB0aGlzLmxpc3RHcm91cC5faXRlbXMuZm9yRWFjaChkcm9wTGlzdCA9PiB7XG4gICAgICAgICAgICBpZiAoX19pc0luc2lkZURyb3BMaXN0Q2xpZW50UmVjdChkcm9wTGlzdCwgcG9pbnQueCwgcG9pbnQueSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUNvbnRhaW5lciA9IGRyb3BMaXN0O1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZHJvcExpc3REcm9wcGVkKCkge1xuICAgICAgICBpZiAoIXRoaXMudGFyZ2V0IHx8ICF0aGlzLnNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGhFbGVtZW50ID0gdGhpcy5wbGFjZWhvbGRlci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgY29uc3QgcGFyZW50ID0gcGhFbGVtZW50LnBhcmVudEVsZW1lbnQhO1xuXG4gICAgICAgIHBoRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChwaEVsZW1lbnQpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQocGhFbGVtZW50KTtcbiAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLnNvdXJjZS5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHBhcmVudC5jaGlsZHJlblt0aGlzLnNvdXJjZUluZGV4XSk7XG5cbiAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc291cmNlSW5kZXggIT09IHRoaXMudGFyZ2V0SW5kZXgpIHtcbiAgICAgICAgICAgIG1vdmVJdGVtSW5BcnJheSh0aGlzLmFzc2V0cywgdGhpcy5zb3VyY2VJbmRleCwgdGhpcy50YXJnZXRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2VFdmVudCh0aGlzLmFzc2V0cywgdGhpcy5mZWF0dXJlZEFzc2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyb3BMaXN0RW50ZXJQcmVkaWNhdGUgPSAoZHJhZzogQ2RrRHJhZywgZHJvcDogQ2RrRHJvcExpc3QpID0+IHtcbiAgICAgICAgaWYgKGRyb3AgPT09IHRoaXMucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkcm9wICE9PSB0aGlzLmFjdGl2ZUNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGhFbGVtZW50ID0gdGhpcy5wbGFjZWhvbGRlci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHNvdXJjZUVsZW1lbnQgPSBkcmFnLmRyb3BDb250YWluZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBkcm9wRWxlbWVudCA9IGRyb3AuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGRyb3BFbGVtZW50LnBhcmVudEVsZW1lbnQgJiYgZHJvcEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlbjtcblxuICAgICAgICBjb25zdCBkcmFnSW5kZXggPSBfX2luZGV4T2YoY2hpbGRyZW4sIHRoaXMuc291cmNlID8gcGhFbGVtZW50IDogc291cmNlRWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGRyb3BJbmRleCA9IF9faW5kZXhPZihjaGlsZHJlbiwgZHJvcEVsZW1lbnQpO1xuXG4gICAgICAgIGlmICghdGhpcy5zb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMuc291cmNlSW5kZXggPSBkcmFnSW5kZXg7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZSA9IGRyYWcuZHJvcENvbnRhaW5lcjtcblxuICAgICAgICAgICAgcGhFbGVtZW50LnN0eWxlLndpZHRoID0gc291cmNlRWxlbWVudC5jbGllbnRXaWR0aCArICdweCc7XG4gICAgICAgICAgICBwaEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gc291cmNlRWxlbWVudC5jbGllbnRIZWlnaHQgKyAncHgnO1xuXG4gICAgICAgICAgICBpZiAoc291cmNlRWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgc291cmNlRWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHNvdXJjZUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YXJnZXRJbmRleCA9IGRyb3BJbmRleDtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBkcm9wO1xuXG4gICAgICAgIHBoRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIGlmIChkcm9wRWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBkcm9wRWxlbWVudC5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShcbiAgICAgICAgICAgICAgICBwaEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgZHJvcEluZGV4ID4gZHJhZ0luZGV4ID8gZHJvcEVsZW1lbnQubmV4dFNpYmxpbmcgOiBkcm9wRWxlbWVudCxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyLl9kcm9wTGlzdFJlZi5lbnRlcihcbiAgICAgICAgICAgIGRyYWcuX2RyYWdSZWYsXG4gICAgICAgICAgICBkcmFnLmVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0LFxuICAgICAgICAgICAgZHJhZy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKiBEZXRlcm1pbmVzIHRoZSBwb2ludCBvZiB0aGUgcGFnZSB0aGF0IHdhcyB0b3VjaGVkIGJ5IHRoZSB1c2VyLiAqL1xuICAgIGdldFBvaW50ZXJQb3NpdGlvbk9uUGFnZShldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpIHtcbiAgICAgICAgLy8gYHRvdWNoZXNgIHdpbGwgYmUgZW1wdHkgZm9yIHN0YXJ0L2VuZCBldmVudHMgc28gd2UgaGF2ZSB0byBmYWxsIGJhY2sgdG8gYGNoYW5nZWRUb3VjaGVzYC5cbiAgICAgICAgY29uc3QgcG9pbnQgPSBfX2lzVG91Y2hFdmVudChldmVudCkgPyBldmVudC50b3VjaGVzWzBdIHx8IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdIDogZXZlbnQ7XG4gICAgICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gdGhpcy52aWV3cG9ydFJ1bGVyLmdldFZpZXdwb3J0U2Nyb2xsUG9zaXRpb24oKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcG9pbnQucGFnZVggLSBzY3JvbGxQb3NpdGlvbi5sZWZ0LFxuICAgICAgICAgICAgeTogcG9pbnQucGFnZVkgLSBzY3JvbGxQb3NpdGlvbi50b3AsXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfX2luZGV4T2YoY29sbGVjdGlvbjogSFRNTENvbGxlY3Rpb24gfCBudWxsLCBub2RlOiBIVE1MRWxlbWVudCkge1xuICAgIGlmICghY29sbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGNvbGxlY3Rpb24sIG5vZGUpO1xufVxuXG4vKiogRGV0ZXJtaW5lcyB3aGV0aGVyIGFuIGV2ZW50IGlzIGEgdG91Y2ggZXZlbnQuICovXG5mdW5jdGlvbiBfX2lzVG91Y2hFdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiBldmVudCBpcyBUb3VjaEV2ZW50IHtcbiAgICByZXR1cm4gZXZlbnQudHlwZS5zdGFydHNXaXRoKCd0b3VjaCcpO1xufVxuXG5mdW5jdGlvbiBfX2lzSW5zaWRlRHJvcExpc3RDbGllbnRSZWN0KGRyb3BMaXN0OiBDZGtEcm9wTGlzdCwgeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICBjb25zdCB7IHRvcCwgYm90dG9tLCBsZWZ0LCByaWdodCB9ID0gZHJvcExpc3QuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiB5ID49IHRvcCAmJiB5IDw9IGJvdHRvbSAmJiB4ID49IGxlZnQgJiYgeCA8PSByaWdodDtcbn1cbiJdfQ==