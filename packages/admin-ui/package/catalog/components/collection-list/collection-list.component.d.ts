import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, GetCollectionList, ModalService, NotificationService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { RearrangeEvent } from '../collection-tree/collection-tree.component';
export declare class CollectionListComponent implements OnInit, OnDestroy {
    private dataService;
    private notificationService;
    private modalService;
    private router;
    private route;
    activeCollectionId$: Observable<string | null>;
    activeCollectionTitle$: Observable<string>;
    items$: Observable<GetCollectionList.Items[]>;
    expandAll: boolean;
    private queryResult;
    constructor(dataService: DataService, notificationService: NotificationService, modalService: ModalService, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onRearrange(event: RearrangeEvent): void;
    deleteCollection(id: string): void;
    closeContents(): void;
    private refresh;
}
