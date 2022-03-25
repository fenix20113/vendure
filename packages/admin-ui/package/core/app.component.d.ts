import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data/providers/data.service';
export declare class AppComponent implements OnInit {
    private dataService;
    private document?;
    loading$: Observable<boolean>;
    private _document?;
    constructor(dataService: DataService, document?: any);
    ngOnInit(): void;
}
