import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * A chip component for displaying a label with an optional action icon.
 */
export class ChipComponent {
    constructor() {
        this.invert = false;
        /**
         * If set, the chip will have an auto-generated background
         * color based on the string value passed in.
         */
        this.colorFrom = '';
        this.iconClick = new EventEmitter();
    }
}
ChipComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-chip',
                template: "<div\n    class=\"wrapper\"\n    [class.with-background]=\"!invert && colorFrom\"\n    [style.backgroundColor]=\"!invert && (colorFrom | stringToColor)\"\n    [style.color]=\"invert && (colorFrom | stringToColor)\"\n    [style.borderColor]=\"invert && (colorFrom | stringToColor)\"\n    [ngClass]=\"colorType\"\n>\n    <div class=\"chip-label\"><ng-content></ng-content></div>\n    <div class=\"chip-icon\" *ngIf=\"icon\">\n        <button (click)=\"iconClick.emit($event)\">\n            <clr-icon\n                [attr.shape]=\"icon\"\n                [style.color]=\"invert && (colorFrom | stringToColor)\"\n                [class.is-inverse]=\"!invert && colorFrom\"\n            ></clr-icon>\n        </button>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-block}.wrapper{display:flex;border:1px solid var(--color-component-border-300);border-radius:3px;margin:6px}.wrapper.with-background{color:var(--color-grey-100);border-color:transparent}.wrapper.with-background .chip-label{opacity:.9}.wrapper.warning{border-color:var(--color-chip-warning-border)}.wrapper.warning .chip-label{color:var(--color-chip-warning-text);background-color:var(--color-chip-warning-bg)}.wrapper.success{border-color:var(--color-chip-success-border)}.wrapper.success .chip-label{color:var(--color-chip-success-text);background-color:var(--color-chip-success-bg)}.wrapper.error{border-color:var(--color-chip-error-border)}.wrapper.error .chip-label{color:var(--color-chip-error-text);background-color:var(--color-chip-error-bg)}.chip-label{padding:3px 6px;border-radius:3px;white-space:nowrap;align-items:center}.chip-icon,.chip-label{line-height:1em;display:flex}.chip-icon{border-left:1px solid var(--color-component-border-200);padding:0 3px}.chip-icon button{cursor:pointer;background:none;margin:0;padding:0;border:none}"]
            },] }
];
ChipComponent.propDecorators = {
    icon: [{ type: Input }],
    invert: [{ type: Input }],
    colorFrom: [{ type: Input }],
    colorType: [{ type: Input }],
    iconClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2NoaXAvY2hpcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRzs7R0FFRztBQU9ILE1BQU0sT0FBTyxhQUFhO0lBTjFCO1FBUWEsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUN4Qjs7O1dBR0c7UUFDTSxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWQsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFjLENBQUM7SUFDekQsQ0FBQzs7O1lBaEJBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsOHVCQUFvQztnQkFFcEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7bUJBRUksS0FBSztxQkFDTCxLQUFLO3dCQUtMLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQSBjaGlwIGNvbXBvbmVudCBmb3IgZGlzcGxheWluZyBhIGxhYmVsIHdpdGggYW4gb3B0aW9uYWwgYWN0aW9uIGljb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWNoaXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jaGlwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jaGlwLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENoaXBDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIGljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBpbnZlcnQgPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBJZiBzZXQsIHRoZSBjaGlwIHdpbGwgaGF2ZSBhbiBhdXRvLWdlbmVyYXRlZCBiYWNrZ3JvdW5kXG4gICAgICogY29sb3IgYmFzZWQgb24gdGhlIHN0cmluZyB2YWx1ZSBwYXNzZWQgaW4uXG4gICAgICovXG4gICAgQElucHV0KCkgY29sb3JGcm9tID0gJyc7XG4gICAgQElucHV0KCkgY29sb3JUeXBlOiAnZXJyb3InIHwgJ3N1Y2Nlc3MnIHwgJ3dhcm5pbmcnO1xuICAgIEBPdXRwdXQoKSBpY29uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG59XG4iXX0=