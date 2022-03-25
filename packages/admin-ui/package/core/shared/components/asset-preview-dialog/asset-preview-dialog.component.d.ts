import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetFragment, GetAsset, GetAssetList, UpdateAssetInput } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
import { Dialog } from '../../../providers/modal/modal.service';
declare type AssetLike = GetAssetList.Items | AssetFragment;
export declare class AssetPreviewDialogComponent implements Dialog<void>, OnInit {
    private dataService;
    constructor(dataService: DataService);
    asset: AssetLike;
    assetChanges?: UpdateAssetInput;
    resolveWith: (result?: void) => void;
    assetWithTags$: Observable<GetAsset.Asset>;
    ngOnInit(): void;
    private hasTags;
}
export {};
