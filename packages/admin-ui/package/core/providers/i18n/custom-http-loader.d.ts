import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
export declare type Dictionary = {
    [key: string]: string | Dictionary;
};
/**
 * A loader for ngx-translate which extends the HttpLoader functionality by stripping out any
 * values which are empty strings. This means that during development, translation keys which have
 * been extracted but not yet defined will fall back to the raw key text rather than displaying nothing.
 *
 * Originally from https://github.com/ngx-translate/core/issues/662#issuecomment-377010232
 */
export declare class CustomHttpTranslationLoader implements TranslateLoader {
    private http;
    private prefix;
    private suffix;
    constructor(http: HttpClient, prefix?: string, suffix?: string);
    getTranslation(lang: string): Observable<any>;
    private process;
}
