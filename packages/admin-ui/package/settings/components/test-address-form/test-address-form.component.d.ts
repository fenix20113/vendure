import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService, GetAvailableCountries, LocalStorageService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export interface TestAddress {
    city: string;
    province: string;
    postalCode: string;
    countryCode: string;
}
export declare class TestAddressFormComponent implements OnInit, OnDestroy {
    private formBuilder;
    private dataService;
    private localStorageService;
    addressChange: EventEmitter<TestAddress>;
    availableCountries$: Observable<GetAvailableCountries.Items[]>;
    form: FormGroup;
    private subscription;
    constructor(formBuilder: FormBuilder, dataService: DataService, localStorageService: LocalStorageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
