import { CdkDrag, CdkDragMove, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Asset, ModalService, Permission } from '@vendure/admin-ui/core';
import { CollectionDetailComponent } from '../collection-detail/collection-detail.component';
export interface AssetChange {
    assets: Asset[];
    featuredAsset: Asset | undefined;
}
/**
 * A component which displays the Assets associated with a product, and allows assets to be removed and
 * added, and for the featured asset to be set.
 *
 * Note: rather complex code for drag drop is due to a limitation of the default CDK implementation
 * which is addressed by a work-around from here: https://github.com/angular/components/issues/13372#issuecomment-483998378
 */
export declare class ProductAssetsComponent implements AfterViewInit {
    private modalService;
    private changeDetector;
    private viewportRuler;
    private collectionDetailComponent?;
    set assetsSetter(val: Asset[]);
    featuredAsset: Asset | undefined;
    compact: boolean;
    change: EventEmitter<AssetChange>;
    listGroup: CdkDropListGroup<CdkDropList>;
    placeholder: CdkDropList;
    target: CdkDropList | null;
    targetIndex: number;
    source: CdkDropList | null;
    sourceIndex: number;
    dragIndex: number;
    activeContainer: any;
    assets: Asset[];
    private readonly updateCollectionPermissions;
    private readonly updateProductPermissions;
    get updatePermissions(): Permission[];
    constructor(modalService: ModalService, changeDetector: ChangeDetectorRef, viewportRuler: ViewportRuler, collectionDetailComponent?: CollectionDetailComponent | undefined);
    ngAfterViewInit(): void;
    selectAssets(): void;
    setAsFeatured(asset: Asset): void;
    isFeatured(asset: Asset): boolean;
    previewAsset(asset: Asset): void;
    removeAsset(asset: Asset): void;
    private emitChangeEvent;
    dragMoved(e: CdkDragMove): void;
    dropListDropped(): void;
    dropListEnterPredicate: (drag: CdkDrag, drop: CdkDropList) => boolean;
    /** Determines the point of the page that was touched by the user. */
    getPointerPositionOnPage(event: MouseEvent | TouchEvent): {
        x: number;
        y: number;
    };
}
