import { ChangeDetectorRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomFieldConfig, GetAvailableCountries, ModalService } from '@vendure/admin-ui/core';
export declare class AddressCardComponent implements OnInit, OnChanges {
    private modalService;
    private changeDetector;
    addressForm: FormGroup;
    customFields: CustomFieldConfig;
    availableCountries: GetAvailableCountries.Items[];
    isDefaultBilling: string;
    isDefaultShipping: string;
    editable: boolean;
    setAsDefaultShipping: EventEmitter<string>;
    setAsDefaultBilling: EventEmitter<string>;
    private dataDependenciesPopulated;
    constructor(modalService: ModalService, changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    getCountryName(countryCode: string): string;
    setAsDefaultBillingAddress(): void;
    setAsDefaultShippingAddress(): void;
    editAddress(): void;
}
