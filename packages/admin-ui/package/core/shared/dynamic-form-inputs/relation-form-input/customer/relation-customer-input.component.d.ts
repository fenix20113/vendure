import { OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { CustomerFragment, GetCustomerList, RelationCustomFieldConfig } from '../../../../common/generated-types';
import { DataService } from '../../../../data/providers/data.service';
import { ModalService } from '../../../../providers/modal/modal.service';
export declare class RelationCustomerInputComponent implements OnInit {
    private modalService;
    private dataService;
    readonly: boolean;
    parentFormControl: FormControl;
    config: RelationCustomFieldConfig;
    template: TemplateRef<any>;
    searchControl: FormControl;
    searchTerm$: Subject<string>;
    results$: Observable<GetCustomerList.Items[]>;
    get customer(): CustomerFragment | undefined;
    constructor(modalService: ModalService, dataService: DataService);
    ngOnInit(): void;
    selectCustomer(): void;
    remove(): void;
}
