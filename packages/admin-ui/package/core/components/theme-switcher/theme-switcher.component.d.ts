import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../data/providers/data.service';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
export declare class ThemeSwitcherComponent implements OnInit {
    private dataService;
    private localStorageService;
    activeTheme$: Observable<string>;
    constructor(dataService: DataService, localStorageService: LocalStorageService);
    ngOnInit(): void;
    toggleTheme(current: string): void;
}
