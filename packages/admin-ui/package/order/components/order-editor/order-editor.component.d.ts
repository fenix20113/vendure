import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddItemInput, AdjustOrderLineInput, BaseDetailComponent, CustomFieldConfig, DataService, GetAvailableCountries, LanguageCode, ModalService, ModifyOrderInput, NotificationService, OrderDetail, ProductSelectorSearch, ServerConfigService, SurchargeInput } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { OrderTransitionService } from '../../providers/order-transition.service';
interface AddedLine {
    productVariantId: string;
    productAsset?: ProductSelectorSearch.ProductAsset | null;
    productVariantName: string;
    sku: string;
    priceWithTax: number;
    price: number;
    quantity: number;
}
declare type ModifyOrderData = Omit<ModifyOrderInput, 'addItems' | 'adjustOrderLines'> & {
    addItems: Array<AddItemInput & {
        customFields?: any;
    }>;
    adjustOrderLines: Array<AdjustOrderLineInput & {
        customFields?: any;
    }>;
};
export declare class OrderEditorComponent extends BaseDetailComponent<OrderDetail.Fragment> implements OnInit, OnDestroy {
    private changeDetector;
    protected dataService: DataService;
    private notificationService;
    private modalService;
    private orderTransitionService;
    availableCountries$: Observable<GetAvailableCountries.Items[]>;
    addressCustomFields: CustomFieldConfig[];
    detailForm: FormGroup;
    orderLineCustomFieldsFormArray: FormArray;
    addItemCustomFieldsFormArray: FormArray;
    addItemCustomFieldsForm: FormGroup;
    addItemSelectedVariant: ProductSelectorSearch.Items | undefined;
    orderLineCustomFields: CustomFieldConfig[];
    modifyOrderInput: ModifyOrderData;
    surchargeForm: FormGroup;
    shippingAddressForm: FormGroup;
    billingAddressForm: FormGroup;
    note: string;
    recalculateShipping: boolean;
    previousState: string;
    private addedVariants;
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, notificationService: NotificationService, modalService: ModalService, orderTransitionService: OrderTransitionService);
    get addedLines(): AddedLine[];
    ngOnInit(): void;
    ngOnDestroy(): void;
    transitionToPriorState(order: OrderDetail.Fragment): void;
    canPreviewChanges(): boolean;
    isLineModified(line: OrderDetail.Lines): boolean;
    updateLineQuantity(line: OrderDetail.Lines, quantity: string): void;
    updateAddedItemQuantity(item: AddedLine, quantity: string): void;
    trackByProductVariantId(index: number, item: AddedLine): string;
    getSelectedItemPrice(result: ProductSelectorSearch.Items | undefined): number;
    addItemToOrder(result: ProductSelectorSearch.Items | undefined): void;
    private isMatchingAddItemRow;
    removeAddedItem(index: number): void;
    getSurchargePrices(surcharge: SurchargeInput): {
        price: number;
        priceWithTax: number;
    };
    addSurcharge(value: any): void;
    removeSurcharge(index: number): void;
    previewAndModify(order: OrderDetail.Fragment): void;
    protected setFormValues(entity: OrderDetail.Fragment, languageCode: LanguageCode): void;
}
export {};
