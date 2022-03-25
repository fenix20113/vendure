import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class OrderStateLabelComponent {
    get chipColorType() {
        switch (this.state) {
            case 'AddingItems':
            case 'ArrangingPayment':
                return '';
            case 'Delivered':
                return 'success';
            case 'Cancelled':
                return 'error';
            case 'PaymentAuthorized':
            case 'PaymentSettled':
            case 'PartiallyDelivered':
            case 'PartiallyShipped':
            case 'Shipped':
            default:
                return 'warning';
        }
    }
}
OrderStateLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-state-label',
                template: "<vdr-chip [ngClass]=\"state\" [colorType]=\"chipColorType\">\n    <clr-icon shape=\"success-standard\" *ngIf=\"state === 'Delivered'\" size=\"12\"></clr-icon>\n    <clr-icon shape=\"success-standard\" *ngIf=\"state === 'PartiallyDelivered'\" size=\"12\"></clr-icon>\n    <clr-icon shape=\"ban\" *ngIf=\"state === 'Cancelled'\" size=\"12\"></clr-icon>\n    {{ state | stateI18nToken | translate }}\n    <ng-content></ng-content>\n</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["clr-icon{margin-right:3px}"]
            },] }
];
OrderStateLabelComponent.propDecorators = {
    state: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItc3RhdGUtbGFiZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9vcmRlci1zdGF0ZS1sYWJlbC9vcmRlci1zdGF0ZS1sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRMUUsTUFBTSxPQUFPLHdCQUF3QjtJQUdqQyxJQUFJLGFBQWE7UUFDYixRQUFRLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEIsS0FBSyxhQUFhLENBQUM7WUFDbkIsS0FBSyxrQkFBa0I7Z0JBQ25CLE9BQU8sRUFBRSxDQUFDO1lBQ2QsS0FBSyxXQUFXO2dCQUNaLE9BQU8sU0FBUyxDQUFDO1lBQ3JCLEtBQUssV0FBVztnQkFDWixPQUFPLE9BQU8sQ0FBQztZQUNuQixLQUFLLG1CQUFtQixDQUFDO1lBQ3pCLEtBQUssZ0JBQWdCLENBQUM7WUFDdEIsS0FBSyxvQkFBb0IsQ0FBQztZQUMxQixLQUFLLGtCQUFrQixDQUFDO1lBQ3hCLEtBQUssU0FBUyxDQUFDO1lBQ2Y7Z0JBQ0ksT0FBTyxTQUFTLENBQUM7U0FDeEI7SUFDTCxDQUFDOzs7WUExQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLHNjQUFpRDtnQkFFakQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7b0JBRUksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLW9yZGVyLXN0YXRlLWxhYmVsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vb3JkZXItc3RhdGUtbGFiZWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL29yZGVyLXN0YXRlLWxhYmVsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyU3RhdGVMYWJlbENvbXBvbmVudCB7XG4gICAgQElucHV0KCkgc3RhdGU6IHN0cmluZztcblxuICAgIGdldCBjaGlwQ29sb3JUeXBlKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0FkZGluZ0l0ZW1zJzpcbiAgICAgICAgICAgIGNhc2UgJ0FycmFuZ2luZ1BheW1lbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIGNhc2UgJ0RlbGl2ZXJlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdzdWNjZXNzJztcbiAgICAgICAgICAgIGNhc2UgJ0NhbmNlbGxlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgICAgICAgICBjYXNlICdQYXltZW50QXV0aG9yaXplZCc6XG4gICAgICAgICAgICBjYXNlICdQYXltZW50U2V0dGxlZCc6XG4gICAgICAgICAgICBjYXNlICdQYXJ0aWFsbHlEZWxpdmVyZWQnOlxuICAgICAgICAgICAgY2FzZSAnUGFydGlhbGx5U2hpcHBlZCc6XG4gICAgICAgICAgICBjYXNlICdTaGlwcGVkJzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICd3YXJuaW5nJztcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==