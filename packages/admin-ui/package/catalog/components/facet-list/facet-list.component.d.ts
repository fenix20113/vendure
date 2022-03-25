import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from '@vendure/admin-ui/core';
import { GetFacetList } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ModalService } from '@vendure/admin-ui/core';
export declare class FacetListComponent extends BaseListComponent<GetFacetList.Query, GetFacetList.Items> {
    private dataService;
    private modalService;
    private notificationService;
    readonly initialLimit = 3;
    displayLimit: {
        [id: string]: number;
    };
    constructor(dataService: DataService, modalService: ModalService, notificationService: NotificationService, router: Router, route: ActivatedRoute);
    toggleDisplayLimit(facet: GetFacetList.Items): void;
    deleteFacet(facetValueId: string): void;
    private showModalAndDelete;
}
