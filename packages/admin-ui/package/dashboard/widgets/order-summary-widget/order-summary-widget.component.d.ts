import { OnInit } from '@angular/core';
import { DataService } from '@vendure/admin-ui/core';
import { BehaviorSubject, Observable } from 'rxjs';
export declare type Timeframe = 'day' | 'week' | 'month';
export declare class OrderSummaryWidgetComponent implements OnInit {
    private dataService;
    today: Date;
    yesterday: Date;
    totalOrderCount$: Observable<number>;
    totalOrderValue$: Observable<number>;
    currencyCode$: Observable<string | undefined>;
    selection$: BehaviorSubject<{
        timeframe: Timeframe;
        date?: Date | undefined;
    }>;
    dateRange$: Observable<{
        start: Date;
        end: Date;
    }>;
    constructor(dataService: DataService);
    ngOnInit(): void;
}
export declare class OrderSummaryWidgetModule {
}
