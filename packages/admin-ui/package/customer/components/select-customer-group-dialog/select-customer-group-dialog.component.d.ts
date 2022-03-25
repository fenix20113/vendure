import { OnInit } from '@angular/core';
import { DataService, Dialog, GetCustomerGroups } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class SelectCustomerGroupDialogComponent implements Dialog<string[]>, OnInit {
    private dataService;
    resolveWith: (result?: string[]) => void;
    groups$: Observable<GetCustomerGroups.Items[]>;
    selectedGroupIds: string[];
    constructor(dataService: DataService);
    ngOnInit(): void;
    cancel(): void;
    add(): void;
}
