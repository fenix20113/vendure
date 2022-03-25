import { OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService, GetOrderList, LocalStorageService, ServerConfigService } from '@vendure/admin-ui/core';
import { Order } from '@vendure/common/lib/generated-types';
import { Observable } from 'rxjs';
interface OrderFilterConfig {
    active?: boolean;
    states?: string[];
}
interface FilterPreset {
    name: string;
    label: string;
    config: OrderFilterConfig;
}
export declare class OrderListComponent extends BaseListComponent<GetOrderList.Query, GetOrderList.Items> implements OnInit {
    private serverConfigService;
    private dataService;
    private localStorageService;
    searchOrderCodeControl: FormControl;
    searchLastNameControl: FormControl;
    customFilterForm: FormGroup;
    orderStates: string[];
    filterPresets: FilterPreset[];
    activePreset$: Observable<string>;
    constructor(serverConfigService: ServerConfigService, dataService: DataService, localStorageService: LocalStorageService, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    selectFilterPreset(presetName: string): void;
    applyCustomFilters(): void;
    private createQueryOptions;
    getShippingNames(order: Order): string;
}
export {};
