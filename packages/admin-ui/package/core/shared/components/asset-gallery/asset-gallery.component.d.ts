import { EventEmitter, OnChanges } from '@angular/core';
import { Asset, GetAssetList } from '../../../common/generated-types';
import { ModalService } from '../../../providers/modal/modal.service';
export declare type AssetLike = GetAssetList.Items;
export declare class AssetGalleryComponent implements OnChanges {
    private modalService;
    assets: AssetLike[];
    /**
     * If true, allows multiple assets to be selected by ctrl+clicking.
     */
    multiSelect: boolean;
    canDelete: boolean;
    selectionChange: EventEmitter<({
        __typename?: "Asset" | undefined;
    } & {
        tags: ({
            __typename?: "Tag" | undefined;
        } & {
            __typename?: "Tag" | undefined;
        } & Pick<import("../../../common/generated-types").Tag, "id" | "value">)[];
    } & {
        __typename?: "Asset" | undefined;
    } & Pick<Asset, "id" | "createdAt" | "updatedAt" | "name" | "fileSize" | "mimeType" | "type" | "preview" | "source" | "width" | "height"> & {
        focalPoint?: ({
            __typename?: "Coordinate" | undefined;
        } & Pick<import("../../../common/generated-types").Coordinate, "x" | "y">) | null | undefined;
    })[]>;
    deleteAssets: EventEmitter<({
        __typename?: "Asset" | undefined;
    } & {
        tags: ({
            __typename?: "Tag" | undefined;
        } & {
            __typename?: "Tag" | undefined;
        } & Pick<import("../../../common/generated-types").Tag, "id" | "value">)[];
    } & {
        __typename?: "Asset" | undefined;
    } & Pick<Asset, "id" | "createdAt" | "updatedAt" | "name" | "fileSize" | "mimeType" | "type" | "preview" | "source" | "width" | "height"> & {
        focalPoint?: ({
            __typename?: "Coordinate" | undefined;
        } & Pick<import("../../../common/generated-types").Coordinate, "x" | "y">) | null | undefined;
    })[]>;
    selection: AssetLike[];
    constructor(modalService: ModalService);
    ngOnChanges(): void;
    toggleSelection(event: MouseEvent, asset: Asset): void;
    isSelected(asset: AssetLike): boolean;
    lastSelected(): AssetLike;
    previewAsset(asset: AssetLike): void;
    entityInfoClick(event: MouseEvent): void;
}
