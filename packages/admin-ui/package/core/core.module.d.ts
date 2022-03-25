import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { MessageFormatConfig } from 'ngx-translate-messageformat-compiler';
import { CustomHttpTranslationLoader } from './providers/i18n/custom-http-loader';
import { I18nService } from './providers/i18n/i18n.service';
import { LocalStorageService } from './providers/local-storage/local-storage.service';
export declare class CoreModule {
    private i18nService;
    private localStorageService;
    private titleService;
    constructor(i18nService: I18nService, localStorageService: LocalStorageService, titleService: Title);
    private initUiLanguages;
    private initUiTitle;
}
export declare function HttpLoaderFactory(http: HttpClient, location: PlatformLocation): CustomHttpTranslationLoader;
/**
 * Returns the locales defined in the vendure-ui-config.json, ensuring that the
 * default language is the first item in the array as per the messageformat
 * documentation:
 *
 * > The default locale will be the first entry of the array
 * https://messageformat.github.io/messageformat/MessageFormat
 */
export declare function getLocales(): MessageFormatConfig;
