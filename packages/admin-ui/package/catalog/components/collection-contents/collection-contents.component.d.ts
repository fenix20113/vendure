import { OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GetCollectionContents } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
export declare class CollectionContentsComponent implements OnInit, OnChanges, OnDestroy {
    private route;
    private router;
    private dataService;
    collectionId: string;
    headerTemplate: TemplateRef<any>;
    contents$: Observable<GetCollectionContents.Items[]>;
    contentsTotalItems$: Observable<number>;
    contentsItemsPerPage$: Observable<number>;
    contentsCurrentPage$: Observable<number>;
    filterTermControl: FormControl;
    private collectionIdChange$;
    private refresh$;
    private destroy$;
    constructor(route: ActivatedRoute, router: Router, dataService: DataService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    setContentsPageNumber(page: number): void;
    setContentsItemsPerPage(perPage: number): void;
    refresh(): void;
    private setParam;
}
