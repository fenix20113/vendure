import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export class I18nService {
    constructor(ngxTranslate) {
        this.ngxTranslate = ngxTranslate;
        this._availableLanguages = [];
    }
    get availableLanguages() {
        return [...this._availableLanguages];
    }
    /**
     * Set the default language
     */
    setDefaultLanguage(languageCode) {
        this.ngxTranslate.setDefaultLang(languageCode);
    }
    /**
     * Set the UI language
     */
    setLanguage(language) {
        this.ngxTranslate.use(language);
    }
    /**
     * Set the available UI languages
     */
    setAvailableLanguages(languages) {
        this._availableLanguages = languages;
    }
    /**
     * Translate the given key.
     */
    translate(key, params) {
        return this.ngxTranslate.instant(key, params);
    }
}
I18nService.ɵprov = i0.ɵɵdefineInjectable({ factory: function I18nService_Factory() { return new I18nService(i0.ɵɵinject(i1.TranslateService)); }, token: I18nService, providedIn: "root" });
I18nService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
I18nService.ctorParameters = () => [
    { type: TranslateService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9wcm92aWRlcnMvaTE4bi9pMThuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBT3ZELE1BQU0sT0FBTyxXQUFXO0lBT3BCLFlBQW9CLFlBQThCO1FBQTlCLGlCQUFZLEdBQVosWUFBWSxDQUFrQjtRQU5sRCx3QkFBbUIsR0FBbUIsRUFBRSxDQUFDO0lBTVksQ0FBQztJQUp0RCxJQUFJLGtCQUFrQjtRQUNsQixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBSUQ7O09BRUc7SUFDSCxrQkFBa0IsQ0FBQyxZQUEwQjtRQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsUUFBc0I7UUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gscUJBQXFCLENBQUMsU0FBeUI7UUFDM0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTLENBQUMsR0FBc0IsRUFBRSxNQUFZO1FBQzFDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7WUF0Q0osVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7WUFOUSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IExhbmd1YWdlQ29kZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBJMThuU2VydmljZSB7XG4gICAgX2F2YWlsYWJsZUxhbmd1YWdlczogTGFuZ3VhZ2VDb2RlW10gPSBbXTtcblxuICAgIGdldCBhdmFpbGFibGVMYW5ndWFnZXMoKTogTGFuZ3VhZ2VDb2RlW10ge1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMuX2F2YWlsYWJsZUxhbmd1YWdlc107XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ3hUcmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGRlZmF1bHQgbGFuZ3VhZ2VcbiAgICAgKi9cbiAgICBzZXREZWZhdWx0TGFuZ3VhZ2UobGFuZ3VhZ2VDb2RlOiBMYW5ndWFnZUNvZGUpIHtcbiAgICAgICAgdGhpcy5uZ3hUcmFuc2xhdGUuc2V0RGVmYXVsdExhbmcobGFuZ3VhZ2VDb2RlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIFVJIGxhbmd1YWdlXG4gICAgICovXG4gICAgc2V0TGFuZ3VhZ2UobGFuZ3VhZ2U6IExhbmd1YWdlQ29kZSk6IHZvaWQge1xuICAgICAgICB0aGlzLm5neFRyYW5zbGF0ZS51c2UobGFuZ3VhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgYXZhaWxhYmxlIFVJIGxhbmd1YWdlc1xuICAgICAqL1xuICAgIHNldEF2YWlsYWJsZUxhbmd1YWdlcyhsYW5ndWFnZXM6IExhbmd1YWdlQ29kZVtdKSB7XG4gICAgICAgIHRoaXMuX2F2YWlsYWJsZUxhbmd1YWdlcyA9IGxhbmd1YWdlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2xhdGUgdGhlIGdpdmVuIGtleS5cbiAgICAgKi9cbiAgICB0cmFuc2xhdGUoa2V5OiBzdHJpbmcgfCBzdHJpbmdbXSwgcGFyYW1zPzogYW55KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmd4VHJhbnNsYXRlLmluc3RhbnQoa2V5LCBwYXJhbXMpO1xuICAgIH1cbn1cbiJdfQ==