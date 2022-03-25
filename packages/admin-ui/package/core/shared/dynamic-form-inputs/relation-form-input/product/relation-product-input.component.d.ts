import { OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { GetProductList, GetProductSimple, RelationCustomFieldConfig } from '../../../../common/generated-types';
import { DataService } from '../../../../data/providers/data.service';
import { ModalService } from '../../../../providers/modal/modal.service';
export declare class RelationProductInputComponent implements OnInit {
    private modalService;
    private dataService;
    readonly: boolean;
    parentFormControl: FormControl;
    config: RelationCustomFieldConfig;
    template: TemplateRef<any>;
    searchControl: FormControl;
    searchTerm$: Subject<string>;
    results$: Observable<GetProductList.Items[]>;
    product$: Observable<GetProductSimple.Product | undefined>;
    constructor(modalService: ModalService, dataService: DataService);
    ngOnInit(): void;
    selectProduct(): void;
    remove(): void;
}
