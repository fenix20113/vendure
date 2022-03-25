import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, ConfigurableOperation, ConfigurableOperationDefinition, CustomFieldConfig, DataService, GetActiveChannel, LanguageCode, NotificationService, Permission, ServerConfigService, ShippingMethod, TestShippingMethodResult } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { TestAddress } from '../test-address-form/test-address-form.component';
import { TestOrderLine } from '../test-order-builder/test-order-builder.component';
export declare class ShippingMethodDetailComponent extends BaseDetailComponent<ShippingMethod.Fragment> implements OnInit, OnDestroy {
    private changeDetector;
    protected dataService: DataService;
    private formBuilder;
    private notificationService;
    detailForm: FormGroup;
    checkers: ConfigurableOperationDefinition[];
    calculators: ConfigurableOperationDefinition[];
    fulfillmentHandlers: ConfigurableOperationDefinition[];
    selectedChecker?: ConfigurableOperation | null;
    selectedCheckerDefinition?: ConfigurableOperationDefinition;
    selectedCalculator?: ConfigurableOperation | null;
    selectedCalculatorDefinition?: ConfigurableOperationDefinition;
    activeChannel$: Observable<GetActiveChannel.ActiveChannel>;
    testAddress: TestAddress;
    testOrderLines: TestOrderLine[];
    testDataUpdated: boolean;
    testResult$: Observable<TestShippingMethodResult | undefined>;
    customFields: CustomFieldConfig[];
    readonly updatePermission: Permission[];
    private fetchTestResult$;
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, formBuilder: FormBuilder, notificationService: NotificationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    customFieldIsSet(name: string): boolean;
    updateCode(currentCode: string, nameValue: string): void;
    selectChecker(checker: ConfigurableOperationDefinition): void;
    selectCalculator(calculator: ConfigurableOperationDefinition): void;
    create(): void;
    save(): void;
    setTestOrderLines(event: TestOrderLine[]): void;
    setTestAddress(event: TestAddress): void;
    allTestDataPresent(): boolean;
    runTest(): void;
    /**
     * Given a ShippingMethod and the value of the detailForm, this method creates an updated copy which
     * can then be persisted to the API.
     */
    private getUpdatedShippingMethod;
    protected setFormValues(shippingMethod: ShippingMethod.Fragment, languageCode: LanguageCode): void;
}
