import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
export class FulfillmentCardComponent {
    constructor() {
        this.transitionState = new EventEmitter();
    }
    nextSuggestedState() {
        var _a;
        if (!this.fulfillment) {
            return;
        }
        const { nextStates } = this.fulfillment;
        const namedStateOrDefault = (targetState) => nextStates.includes(targetState) ? targetState : nextStates[0];
        switch ((_a = this.fulfillment) === null || _a === void 0 ? void 0 : _a.state) {
            case 'Pending':
                return namedStateOrDefault('Shipped');
            case 'Shipped':
                return namedStateOrDefault('Delivered');
            default:
                return nextStates.find(s => s !== 'Cancelled');
        }
    }
    nextOtherStates() {
        if (!this.fulfillment) {
            return [];
        }
        const suggested = this.nextSuggestedState();
        return this.fulfillment.nextStates.filter(s => s !== suggested);
    }
}
FulfillmentCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-fulfillment-card',
                template: "<div class=\"card\">\n    <div class=\"card-header fulfillment-header\">\n        <div>{{ 'order.fulfillment' | translate }}</div>\n        <div class=\"fulfillment-state\">\n            <vdr-fulfillment-state-label [state]=\"fulfillment?.state\"></vdr-fulfillment-state-label>\n        </div>\n    </div>\n    <div class=\"card-block\">\n        <vdr-fulfillment-detail\n            *ngIf=\"!!fulfillment\"\n            [fulfillmentId]=\"fulfillment?.id\"\n            [order]=\"order\"\n        ></vdr-fulfillment-detail>\n    </div>\n    <div class=\"card-footer\" *ngIf=\"fulfillment?.nextStates.length\">\n        <ng-container *ngIf=\"nextSuggestedState() as suggestedState\">\n            <button class=\"btn btn-sm btn-primary\" (click)=\"transitionState.emit(suggestedState)\">\n                {{ 'order.set-fulfillment-state' | translate: { state: (suggestedState | stateI18nToken | translate) } }}\n            </button>\n        </ng-container>\n        <vdr-dropdown>\n            <button class=\"icon-button\" vdrDropdownTrigger>\n                <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n            </button>\n            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                <ng-container *ngFor=\"let nextState of nextOtherStates()\">\n                    <button\n                        type=\"button\"\n                        class=\"btn\"\n                        vdrDropdownItem\n                        (click)=\"transitionState.emit(nextState)\"\n                    >\n                        <ng-container *ngIf=\"nextState !== 'Cancelled'; else cancel\">\n                            <clr-icon shape=\"step-forward-2\"></clr-icon>\n                            {{ 'order.transition-to-state' | translate: { state: (nextState | stateI18nToken | translate) } }}\n                        </ng-container>\n                        <ng-template #cancel>\n                            <clr-icon shape=\"error-standard\" class=\"is-error\"></clr-icon>\n                            {{ 'order.cancel-fulfillment' | translate }}\n                        </ng-template>\n                    </button>\n                </ng-container>\n            </vdr-dropdown-menu>\n        </vdr-dropdown>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".fulfillment-header{display:flex;justify-content:space-between;align-items:center}.card-footer{display:flex;align-items:center;justify-content:flex-end}"]
            },] }
];
FulfillmentCardComponent.propDecorators = {
    fulfillment: [{ type: Input }],
    order: [{ type: Input }],
    transitionState: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsZmlsbG1lbnQtY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL2Z1bGZpbGxtZW50LWNhcmQvZnVsZmlsbG1lbnQtY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVNoRyxNQUFNLE9BQU8sd0JBQXdCO0lBTnJDO1FBU2Msb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBMEIzRCxDQUFDO0lBeEJHLGtCQUFrQjs7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQixPQUFPO1NBQ1Y7UUFDRCxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxNQUFNLG1CQUFtQixHQUFHLENBQUMsV0FBbUIsRUFBRSxFQUFFLENBQ2hELFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25FLGNBQVEsSUFBSSxDQUFDLFdBQVcsMENBQUUsS0FBSyxFQUFFO1lBQzdCLEtBQUssU0FBUztnQkFDVixPQUFPLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFDLEtBQUssU0FBUztnQkFDVixPQUFPLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVDO2dCQUNJLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzVDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7OztZQWxDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsdXRFQUFnRDtnQkFFaEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7MEJBRUksS0FBSztvQkFDTCxLQUFLOzhCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZ1bGZpbGxtZW50LCBPcmRlckRldGFpbCB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1mdWxmaWxsbWVudC1jYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZnVsZmlsbG1lbnQtY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZnVsZmlsbG1lbnQtY2FyZC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGdWxmaWxsbWVudENhcmRDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIGZ1bGZpbGxtZW50OiBGdWxmaWxsbWVudC5GcmFnbWVudCB8IHVuZGVmaW5lZDtcbiAgICBASW5wdXQoKSBvcmRlcjogT3JkZXJEZXRhaWwuRnJhZ21lbnQ7XG4gICAgQE91dHB1dCgpIHRyYW5zaXRpb25TdGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgbmV4dFN1Z2dlc3RlZFN0YXRlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICghdGhpcy5mdWxmaWxsbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgbmV4dFN0YXRlcyB9ID0gdGhpcy5mdWxmaWxsbWVudDtcbiAgICAgICAgY29uc3QgbmFtZWRTdGF0ZU9yRGVmYXVsdCA9ICh0YXJnZXRTdGF0ZTogc3RyaW5nKSA9PlxuICAgICAgICAgICAgbmV4dFN0YXRlcy5pbmNsdWRlcyh0YXJnZXRTdGF0ZSkgPyB0YXJnZXRTdGF0ZSA6IG5leHRTdGF0ZXNbMF07XG4gICAgICAgIHN3aXRjaCAodGhpcy5mdWxmaWxsbWVudD8uc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ1BlbmRpbmcnOlxuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lZFN0YXRlT3JEZWZhdWx0KCdTaGlwcGVkJyk7XG4gICAgICAgICAgICBjYXNlICdTaGlwcGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZWRTdGF0ZU9yRGVmYXVsdCgnRGVsaXZlcmVkJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0U3RhdGVzLmZpbmQocyA9PiBzICE9PSAnQ2FuY2VsbGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0T3RoZXJTdGF0ZXMoKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoIXRoaXMuZnVsZmlsbG1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdWdnZXN0ZWQgPSB0aGlzLm5leHRTdWdnZXN0ZWRTdGF0ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5mdWxmaWxsbWVudC5uZXh0U3RhdGVzLmZpbHRlcihzID0+IHMgIT09IHN1Z2dlc3RlZCk7XG4gICAgfVxufVxuIl19