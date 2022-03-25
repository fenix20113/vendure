import { Observable } from 'rxjs';
import { TaxCategory } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ModalService } from '@vendure/admin-ui/core';
export declare class TaxCategoryListComponent {
    private dataService;
    private notificationService;
    private modalService;
    taxCategories$: Observable<TaxCategory.Fragment[]>;
    private queryResult;
    constructor(dataService: DataService, notificationService: NotificationService, modalService: ModalService);
    deleteTaxCategory(taxCategory: TaxCategory.Fragment): import("rxjs").Subscription;
}
