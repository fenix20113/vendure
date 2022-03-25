import { OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService, GetCountryList, GetZones, ModalService, NotificationService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class CountryListComponent implements OnInit, OnDestroy {
    private dataService;
    private notificationService;
    private modalService;
    searchTerm: FormControl;
    countriesWithZones$: Observable<Array<GetCountryList.Items & {
        zones: GetZones.Zones[];
    }>>;
    zones$: Observable<GetZones.Zones[]>;
    private countries;
    private destroy$;
    constructor(dataService: DataService, notificationService: NotificationService, modalService: ModalService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    deleteCountry(countryId: string): void;
    private isZone;
}
