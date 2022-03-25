import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, Customer, CustomFieldConfig, DataService, GetAvailableCountries, GetCustomer, GetCustomerHistory, GetCustomerQuery, HistoryEntry, ModalService, NotificationService, ServerConfigService } from '@vendure/admin-ui/core';
import { Observable, Subject } from 'rxjs';
declare type CustomerWithOrders = NonNullable<GetCustomerQuery['customer']>;
export declare class CustomerDetailComponent extends BaseDetailComponent<CustomerWithOrders> implements OnInit, OnDestroy {
    private changeDetector;
    private formBuilder;
    protected dataService: DataService;
    private modalService;
    private notificationService;
    detailForm: FormGroup;
    customFields: CustomFieldConfig[];
    addressCustomFields: CustomFieldConfig[];
    availableCountries$: Observable<GetAvailableCountries.Items[]>;
    orders$: Observable<GetCustomer.Items[]>;
    ordersCount$: Observable<number>;
    history$: Observable<GetCustomerHistory.Items[] | undefined>;
    fetchHistory: Subject<void>;
    defaultShippingAddressId: string;
    defaultBillingAddressId: string;
    addressDefaultsUpdated: boolean;
    ordersPerPage: number;
    currentOrdersPage: number;
    private orderListUpdates$;
    constructor(route: ActivatedRoute, router: Router, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, formBuilder: FormBuilder, dataService: DataService, modalService: ModalService, notificationService: NotificationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    customFieldIsSet(name: string): boolean;
    getAddressFormControls(): FormControl[];
    setDefaultBillingAddressId(id: string): void;
    setDefaultShippingAddressId(id: string): void;
    addAddress(): void;
    setOrderItemsPerPage(itemsPerPage: number): void;
    setOrderCurrentPage(page: number): void;
    create(): void;
    save(): void;
    addToGroup(): void;
    removeFromGroup(group: GetCustomer.Groups): void;
    addNoteToCustomer({ note }: {
        note: string;
    }): void;
    updateNote(entry: HistoryEntry): void;
    deleteNote(entry: HistoryEntry): import("rxjs").Subscription;
    protected setFormValues(entity: Customer.Fragment): void;
    /**
     * Refetch the customer with the current order list settings.
     */
    private fetchOrdersList;
}
export {};
