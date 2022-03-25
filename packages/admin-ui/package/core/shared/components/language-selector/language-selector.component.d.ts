import { EventEmitter } from '@angular/core';
import { LanguageCode } from '../../../common/generated-types';
export declare class LanguageSelectorComponent {
    currentLanguageCode: LanguageCode;
    availableLanguageCodes: LanguageCode[];
    disabled: boolean;
    languageCodeChange: EventEmitter<LanguageCode>;
}
