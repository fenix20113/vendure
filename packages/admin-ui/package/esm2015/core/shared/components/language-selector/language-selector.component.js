import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageCode } from '../../../common/generated-types';
export class LanguageSelectorComponent {
    constructor() {
        this.disabled = false;
        this.languageCodeChange = new EventEmitter();
    }
}
LanguageSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-language-selector',
                template: "<ng-container *ngIf=\"1 < availableLanguageCodes?.length\">\n    <vdr-dropdown>\n        <button type=\"button\" class=\"btn btn-sm btn-link\" vdrDropdownTrigger [disabled]=\"disabled\">\n            <clr-icon shape=\"world\"></clr-icon>\n            {{ 'common.language' | translate }}: {{ 'lang.' + currentLanguageCode | translate | uppercase }}\n            <clr-icon shape=\"caret down\"></clr-icon>\n        </button>\n        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n            <button\n                type=\"button\"\n                *ngFor=\"let code of availableLanguageCodes\"\n                (click)=\"languageCodeChange.emit(code)\"\n                vdrDropdownItem\n            >\n                {{ 'lang.' + code | translate }} <span class=\"code\">{{ code }}</span>\n            </button>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n</ng-container>\n",
                styles: [".code{color:var(--color-grey-400)}"]
            },] }
];
LanguageSelectorComponent.propDecorators = {
    currentLanguageCode: [{ type: Input }],
    availableLanguageCodes: [{ type: Input }],
    disabled: [{ type: Input }],
    languageCodeChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2Utc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9sYW5ndWFnZS1zZWxlY3Rvci9sYW5ndWFnZS1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFPL0QsTUFBTSxPQUFPLHlCQUF5QjtJQUx0QztRQVFhLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDaEIsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFDcEUsQ0FBQzs7O1lBVkEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLGs0QkFBaUQ7O2FBRXBEOzs7a0NBRUksS0FBSztxQ0FDTCxLQUFLO3VCQUNMLEtBQUs7aUNBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IExhbmd1YWdlQ29kZSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1sYW5ndWFnZS1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xhbmd1YWdlLXNlbGVjdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9sYW5ndWFnZS1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBMYW5ndWFnZVNlbGVjdG9yQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBjdXJyZW50TGFuZ3VhZ2VDb2RlOiBMYW5ndWFnZUNvZGU7XG4gICAgQElucHV0KCkgYXZhaWxhYmxlTGFuZ3VhZ2VDb2RlczogTGFuZ3VhZ2VDb2RlW107XG4gICAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgbGFuZ3VhZ2VDb2RlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxMYW5ndWFnZUNvZGU+KCk7XG59XG4iXX0=