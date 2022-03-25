import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService, JobQueueService, ModalService, NotificationService, SearchProducts } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class ProductListComponent extends BaseListComponent<SearchProducts.Query, SearchProducts.Items, SearchProducts.Variables> implements OnInit {
    private dataService;
    private modalService;
    private notificationService;
    private jobQueueService;
    searchTerm: string;
    facetValueIds: string[];
    groupByProduct: boolean;
    facetValues$: Observable<SearchProducts.FacetValues[]>;
    private productSearchInput;
    constructor(dataService: DataService, modalService: ModalService, notificationService: NotificationService, jobQueueService: JobQueueService, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    setSearchTerm(term: string): void;
    setFacetValueIds(ids: string[]): void;
    rebuildSearchIndex(): void;
    deleteProduct(productId: string): void;
}
