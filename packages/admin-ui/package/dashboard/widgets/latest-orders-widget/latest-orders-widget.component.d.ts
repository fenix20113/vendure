import { OnInit } from '@angular/core';
import { DataService, GetOrderList } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class LatestOrdersWidgetComponent implements OnInit {
    private dataService;
    latestOrders$: Observable<GetOrderList.Items[]>;
    constructor(dataService: DataService);
    ngOnInit(): void;
}
export declare class LatestOrdersWidgetModule {
}
