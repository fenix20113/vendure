import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from '@vendure/admin-ui/core';
import { GetActiveChannel, GetShippingMethodList, ShippingMethodQuote } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ModalService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { TestAddress } from '../test-address-form/test-address-form.component';
import { TestOrderLine } from '../test-order-builder/test-order-builder.component';
export declare class ShippingMethodListComponent extends BaseListComponent<GetShippingMethodList.Query, GetShippingMethodList.Items> implements OnInit {
    private modalService;
    private notificationService;
    private dataService;
    activeChannel$: Observable<GetActiveChannel.ActiveChannel>;
    testAddress: TestAddress;
    testOrderLines: TestOrderLine[];
    testDataUpdated: boolean;
    testResult$: Observable<ShippingMethodQuote[] | undefined>;
    private fetchTestResult$;
    constructor(modalService: ModalService, notificationService: NotificationService, dataService: DataService, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    deleteShippingMethod(id: string): void;
    setTestOrderLines(event: TestOrderLine[]): void;
    setTestAddress(event: TestAddress): void;
    allTestDataPresent(): boolean;
    runTest(): void;
}
