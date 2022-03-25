import { ChangeDetectionStrategy, Component } from '@angular/core';
export class UiLanguageSwitcherDialogComponent {
    constructor() {
        this.availableLanguages = [];
    }
    setLanguage(languageCode) {
        this.resolveWith(languageCode);
    }
}
UiLanguageSwitcherDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-ui-language-switcher',
                template: "<ng-template vdrDialogTitle>{{ 'common.select-display-language' | translate }}</ng-template>\n\n<div *ngFor=\"let code of availableLanguages\" >\n    <button class=\"btn btn-link btn-sm\" (click)=\"setLanguage(code)\">\n        <clr-icon [attr.shape]=\"code === currentLanguage ? 'dot-circle' : 'circle'\"></clr-icon>\n        {{ code | uppercase }} ({{ 'lang.' + code | translate }})\n    </button>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbGFuZ3VhZ2Utc3dpdGNoZXItZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvY29tcG9uZW50cy91aS1sYW5ndWFnZS1zd2l0Y2hlci1kaWFsb2cvdWktbGFuZ3VhZ2Utc3dpdGNoZXItZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBV25FLE1BQU0sT0FBTyxpQ0FBaUM7SUFOOUM7UUFTSSx1QkFBa0IsR0FBbUIsRUFBRSxDQUFDO0lBSzVDLENBQUM7SUFIRyxXQUFXLENBQUMsWUFBMEI7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7WUFiSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMscWFBQTJEO2dCQUUzRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IExhbmd1YWdlQ29kZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgRGlhbG9nIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL21vZGFsL21vZGFsLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci11aS1sYW5ndWFnZS1zd2l0Y2hlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3VpLWxhbmd1YWdlLXN3aXRjaGVyLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdWktbGFuZ3VhZ2Utc3dpdGNoZXItZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFVpTGFuZ3VhZ2VTd2l0Y2hlckRpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIERpYWxvZzxMYW5ndWFnZUNvZGU+IHtcbiAgICByZXNvbHZlV2l0aDogKHJlc3VsdD86IExhbmd1YWdlQ29kZSkgPT4gdm9pZDtcbiAgICBjdXJyZW50TGFuZ3VhZ2U6IExhbmd1YWdlQ29kZTtcbiAgICBhdmFpbGFibGVMYW5ndWFnZXM6IExhbmd1YWdlQ29kZVtdID0gW107XG5cbiAgICBzZXRMYW5ndWFnZShsYW5ndWFnZUNvZGU6IExhbmd1YWdlQ29kZSkge1xuICAgICAgICB0aGlzLnJlc29sdmVXaXRoKGxhbmd1YWdlQ29kZSk7XG4gICAgfVxufVxuIl19