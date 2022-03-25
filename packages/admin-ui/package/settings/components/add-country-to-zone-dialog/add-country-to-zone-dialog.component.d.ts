import { OnInit } from '@angular/core';
import { DataService, Dialog, GetCountryList, GetZones } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class AddCountryToZoneDialogComponent implements Dialog<string[]>, OnInit {
    private dataService;
    resolveWith: (result?: string[]) => void;
    zoneName: string;
    currentMembers: GetZones.Members[];
    availableCountries$: Observable<GetCountryList.Items[]>;
    selectedMemberIds: string[];
    constructor(dataService: DataService);
    ngOnInit(): void;
    cancel(): void;
    add(): void;
}
