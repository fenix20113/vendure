import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Permission, ProductWithVariants } from '@vendure/admin-ui/core';
import { SelectedAssets } from '../product-detail/product-detail.component';
export declare class ProductVariantsTableComponent implements OnInit, OnDestroy {
    private changeDetector;
    formArray: FormArray;
    variants: ProductWithVariants.Variants[];
    channelPriceIncludesTax: boolean;
    optionGroups: ProductWithVariants.OptionGroups[];
    pendingAssetChanges: {
        [variantId: string]: SelectedAssets;
    };
    formGroupMap: Map<string, FormGroup>;
    readonly updatePermission: Permission[];
    private subscription;
    constructor(changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    getFeaturedAsset(variant: ProductWithVariants.Variants): ({
        __typename?: "Asset" | undefined;
    } & {
        __typename?: "Asset" | undefined;
    } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Asset, "id" | "createdAt" | "updatedAt" | "name" | "fileSize" | "mimeType" | "type" | "preview" | "source" | "width" | "height"> & {
        focalPoint?: ({
            __typename?: "Coordinate" | undefined;
        } & Pick<import("../../../../../../package/core/vendure-admin-ui-core").Coordinate, "x" | "y">) | null | undefined;
    }) | null | undefined;
    optionGroupName(optionGroupId: string): string | undefined;
    private buildFormGroupMap;
}
