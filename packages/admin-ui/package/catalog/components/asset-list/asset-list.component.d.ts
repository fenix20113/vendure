import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset, BaseListComponent, DataService, GetAssetList, ModalService, NotificationService, TagFragment } from '@vendure/admin-ui/core';
import { PaginationInstance } from 'ngx-pagination';
import { BehaviorSubject, Observable } from 'rxjs';
export declare class AssetListComponent extends BaseListComponent<GetAssetList.Query, GetAssetList.Items, GetAssetList.Variables> implements OnInit {
    private notificationService;
    private modalService;
    private dataService;
    searchTerm$: BehaviorSubject<string | undefined>;
    filterByTags$: BehaviorSubject<TagFragment[] | undefined>;
    uploading: boolean;
    allTags$: Observable<TagFragment[]>;
    paginationConfig$: Observable<PaginationInstance>;
    constructor(notificationService: NotificationService, modalService: ModalService, dataService: DataService, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    filesSelected(files: File[]): void;
    deleteAssets(assets: Asset[]): void;
    private showModalAndDelete;
}
