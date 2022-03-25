import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class LineRefundsComponent {
    getRefundedCount() {
        var _a, _b;
        const refunds = (_b = (_a = this.payments) === null || _a === void 0 ? void 0 : _a.reduce((all, payment) => [...all, ...payment.refunds], [])) !== null && _b !== void 0 ? _b : [];
        return this.line.items.filter(i => {
            if (i.refundId === null && !i.cancelled) {
                return false;
            }
            if (i.refundId) {
                const refund = refunds.find(r => r.id === i.refundId);
                if ((refund === null || refund === void 0 ? void 0 : refund.state) === 'Failed') {
                    return false;
                }
                else {
                    return true;
                }
            }
            return false;
        }).length;
    }
}
LineRefundsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-line-refunds',
                template: "<span *ngIf=\"getRefundedCount()\" [title]=\"'order.refunded-count' | translate: { count: getRefundedCount() }\">\n    <clr-icon shape=\"redo\" class=\"is-solid\" dir=\"down\"></clr-icon>\n</span>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{color:var(--color-error-500)}"]
            },] }
];
LineRefundsComponent.propDecorators = {
    line: [{ type: Input }],
    payments: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1yZWZ1bmRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvb3JkZXIvc3JjL2NvbXBvbmVudHMvbGluZS1yZWZ1bmRzL2xpbmUtcmVmdW5kcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFTMUUsTUFBTSxPQUFPLG9CQUFvQjtJQUk3QixnQkFBZ0I7O1FBQ1osTUFBTSxPQUFPLGVBQ1QsSUFBSSxDQUFDLFFBQVEsMENBQUUsTUFBTSxDQUNqQixDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQzlDLEVBQTJCLG9DQUMxQixFQUFFLENBQUM7UUFDWixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtnQkFDckMsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ1osTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssTUFBSyxRQUFRLEVBQUU7b0JBQzVCLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtxQkFBTTtvQkFDSCxPQUFPLElBQUksQ0FBQztpQkFDZjthQUNKO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ2QsQ0FBQzs7O1lBOUJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrTkFBNEM7Z0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O21CQUVJLEtBQUs7dUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPcmRlckRldGFpbCB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1saW5lLXJlZnVuZHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9saW5lLXJlZnVuZHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2xpbmUtcmVmdW5kcy5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBMaW5lUmVmdW5kc0NvbXBvbmVudCB7XG4gICAgQElucHV0KCkgbGluZTogT3JkZXJEZXRhaWwuTGluZXM7XG4gICAgQElucHV0KCkgcGF5bWVudHM6IE9yZGVyRGV0YWlsLlBheW1lbnRzW107XG5cbiAgICBnZXRSZWZ1bmRlZENvdW50KCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHJlZnVuZHMgPVxuICAgICAgICAgICAgdGhpcy5wYXltZW50cz8ucmVkdWNlKFxuICAgICAgICAgICAgICAgIChhbGwsIHBheW1lbnQpID0+IFsuLi5hbGwsIC4uLnBheW1lbnQucmVmdW5kc10sXG4gICAgICAgICAgICAgICAgW10gYXMgT3JkZXJEZXRhaWwuUmVmdW5kc1tdLFxuICAgICAgICAgICAgKSA/PyBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXMubGluZS5pdGVtcy5maWx0ZXIoaSA9PiB7XG4gICAgICAgICAgICBpZiAoaS5yZWZ1bmRJZCA9PT0gbnVsbCAmJiAhaS5jYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaS5yZWZ1bmRJZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZnVuZCA9IHJlZnVuZHMuZmluZChyID0+IHIuaWQgPT09IGkucmVmdW5kSWQpO1xuICAgICAgICAgICAgICAgIGlmIChyZWZ1bmQ/LnN0YXRlID09PSAnRmFpbGVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KS5sZW5ndGg7XG4gICAgfVxufVxuIl19