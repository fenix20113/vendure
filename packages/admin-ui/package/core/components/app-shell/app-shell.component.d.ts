import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LanguageCode } from '../../common/generated-types';
import { DataService } from '../../data/providers/data.service';
import { AuthService } from '../../providers/auth/auth.service';
import { I18nService } from '../../providers/i18n/i18n.service';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
import { ModalService } from '../../providers/modal/modal.service';
export declare class AppShellComponent implements OnInit {
    private authService;
    private dataService;
    private router;
    private i18nService;
    private modalService;
    private localStorageService;
    userName$: Observable<string>;
    uiLanguage$: Observable<LanguageCode>;
    availableLanguages: LanguageCode[];
    constructor(authService: AuthService, dataService: DataService, router: Router, i18nService: I18nService, modalService: ModalService, localStorageService: LocalStorageService);
    ngOnInit(): void;
    selectUiLanguage(): void;
    logOut(): void;
}
