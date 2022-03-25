import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { BehaviorSubject, Observable } from 'rxjs';
import { Asset, GetAssetList, TagFragment } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
import { Dialog } from '../../../providers/modal/modal.service';
import { NotificationService } from '../../../providers/notification/notification.service';
/**
 * A dialog which allows the creation and selection of assets.
 */
export declare class AssetPickerDialogComponent implements OnInit, AfterViewInit, OnDestroy, Dialog<Asset[]> {
    private dataService;
    private notificationService;
    assets$: Observable<GetAssetList.Items[]>;
    allTags$: Observable<TagFragment[]>;
    paginationConfig: PaginationInstance;
    private assetSearchInputComponent;
    multiSelect: boolean;
    initialTags: string[];
    resolveWith: (result?: Asset[]) => void;
    selection: Asset[];
    searchTerm$: BehaviorSubject<string | undefined>;
    filterByTags$: BehaviorSubject<TagFragment[] | undefined>;
    uploading: boolean;
    private listQuery;
    private destroy$;
    constructor(dataService: DataService, notificationService: NotificationService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    pageChange(page: number): void;
    itemsPerPageChange(itemsPerPage: number): void;
    cancel(): void;
    select(): void;
    createAssets(files: File[]): void;
    private fetchPage;
}
