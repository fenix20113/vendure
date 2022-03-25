import { EventEmitter } from '@angular/core';
import { LanguageCode } from '../../common/generated-types';
export declare class UserMenuComponent {
    userName: string;
    availableLanguages: LanguageCode[];
    uiLanguage: LanguageCode;
    logOut: EventEmitter<void>;
    selectUiLanguage: EventEmitter<void>;
}
