import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GetAsset, RelationCustomFieldConfig } from '../../../../common/generated-types';
import { DataService } from '../../../../data/providers/data.service';
import { ModalService } from '../../../../providers/modal/modal.service';
export declare class RelationAssetInputComponent implements OnInit {
    private modalService;
    private dataService;
    readonly: boolean;
    parentFormControl: FormControl;
    config: RelationCustomFieldConfig;
    asset$: Observable<GetAsset.Asset | undefined>;
    constructor(modalService: ModalService, dataService: DataService);
    ngOnInit(): void;
    selectAsset(): void;
    remove(): void;
    previewAsset(asset: GetAsset.Asset): void;
}
