import { TranslateService } from '@ngx-translate/core';
import { LanguageCode } from '../../common/generated-types';
export declare class I18nService {
    private ngxTranslate;
    _availableLanguages: LanguageCode[];
    get availableLanguages(): LanguageCode[];
    constructor(ngxTranslate: TranslateService);
    /**
     * Set the default language
     */
    setDefaultLanguage(languageCode: LanguageCode): void;
    /**
     * Set the UI language
     */
    setLanguage(language: LanguageCode): void;
    /**
     * Set the available UI languages
     */
    setAvailableLanguages(languages: LanguageCode[]): void;
    /**
     * Translate the given key.
     */
    translate(key: string | string[], params?: any): string;
}
