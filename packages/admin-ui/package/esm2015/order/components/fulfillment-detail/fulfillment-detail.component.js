import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { isObject } from '@vendure/common/lib/shared-utils';
export class FulfillmentDetailComponent {
    constructor() {
        this.customFields = [];
    }
    ngOnChanges(changes) {
        this.customFields = this.getCustomFields();
    }
    get fulfillment() {
        return this.order.fulfillments && this.order.fulfillments.find(f => f.id === this.fulfillmentId);
    }
    get items() {
        var _a;
        const itemMap = new Map();
        const fulfillmentItemIds = (_a = this.fulfillment) === null || _a === void 0 ? void 0 : _a.orderItems.map(i => i.id);
        for (const line of this.order.lines) {
            for (const item of line.items) {
                if (fulfillmentItemIds === null || fulfillmentItemIds === void 0 ? void 0 : fulfillmentItemIds.includes(item.id)) {
                    const count = itemMap.get(line.productVariant.name);
                    if (count != null) {
                        itemMap.set(line.productVariant.name, count + 1);
                    }
                    else {
                        itemMap.set(line.productVariant.name, 1);
                    }
                }
            }
        }
        return Array.from(itemMap.entries()).map(([name, quantity]) => ({ name, quantity }));
    }
    getCustomFields() {
        const customFields = this.fulfillment.customFields;
        if (customFields) {
            return Object.entries(customFields)
                .filter(([key]) => key !== '__typename')
                .map(([key, val]) => {
                const value = Array.isArray(val) || isObject(val) ? val : val.toString();
                return { key, value };
            });
        }
        else {
            return [];
        }
    }
    customFieldIsObject(customField) {
        return Array.isArray(customField) || isObject(customField);
    }
}
FulfillmentDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-fulfillment-detail',
                template: "<vdr-labeled-data [label]=\"'common.created-at' | translate\">\n    {{ fulfillment?.createdAt | localeDate: 'medium' }}\n</vdr-labeled-data>\n<vdr-labeled-data [label]=\"'order.fulfillment-method' | translate\">\n    {{ fulfillment?.method }}\n</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"fulfillment?.trackingCode\" [label]=\"'order.tracking-code' | translate\">\n    {{ fulfillment?.trackingCode }}\n</vdr-labeled-data>\n<vdr-labeled-data [label]=\"'order.contents' | translate\">\n    <vdr-simple-item-list [items]=\"items\"></vdr-simple-item-list>\n</vdr-labeled-data>\n<ng-container *ngFor=\"let customField of customFields\">\n    <vdr-labeled-data [label]=\"customField.key\">\n        <vdr-object-tree\n            *ngIf=\"customFieldIsObject(customField.value); else primitive\"\n            [value]=\"{ object: customField.value }\"\n        ></vdr-object-tree>\n        <ng-template #primitive>\n            {{ customField.value }}\n        </ng-template>\n    </vdr-labeled-data>\n</ng-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
FulfillmentDetailComponent.propDecorators = {
    fulfillmentId: [{ type: Input }],
    order: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsZmlsbG1lbnQtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvb3JkZXIvc3JjL2NvbXBvbmVudHMvZnVsZmlsbG1lbnQtZGV0YWlsL2Z1bGZpbGxtZW50LWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRXBHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQVE1RCxNQUFNLE9BQU8sMEJBQTBCO0lBTnZDO1FBVUksaUJBQVksR0FBdUMsRUFBRSxDQUFDO0lBNkMxRCxDQUFDO0lBM0NHLFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBRUQsSUFBSSxLQUFLOztRQUNMLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBQzFDLE1BQU0sa0JBQWtCLFNBQUcsSUFBSSxDQUFDLFdBQVcsMENBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RSxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2pDLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDM0IsSUFBSSxrQkFBa0IsYUFBbEIsa0JBQWtCLHVCQUFsQixrQkFBa0IsQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRztvQkFDdkMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNwRCxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7d0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQ3BEO3lCQUFNO3dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQzVDO2lCQUNKO2FBQ0o7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVELGVBQWU7UUFDWCxNQUFNLFlBQVksR0FBSSxJQUFJLENBQUMsV0FBbUIsQ0FBQyxZQUFZLENBQUM7UUFDNUQsSUFBSSxZQUFZLEVBQUU7WUFDZCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO2lCQUM5QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssWUFBWSxDQUFDO2lCQUN2QyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFO2dCQUNoQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBRSxHQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2xGLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7U0FDVjthQUFNO1lBQ0gsT0FBTyxFQUFFLENBQUM7U0FDYjtJQUNMLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxXQUFvQjtRQUNwQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9ELENBQUM7OztZQXRESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsZ2dDQUFrRDtnQkFFbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7NEJBRUksS0FBSztvQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWwgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1mdWxmaWxsbWVudC1kZXRhaWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mdWxmaWxsbWVudC1kZXRhaWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Z1bGZpbGxtZW50LWRldGFpbC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGdWxmaWxsbWVudERldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgZnVsZmlsbG1lbnRJZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG9yZGVyOiBPcmRlckRldGFpbC5GcmFnbWVudDtcblxuICAgIGN1c3RvbUZpZWxkczogQXJyYXk8eyBrZXk6IHN0cmluZzsgdmFsdWU6IGFueSB9PiA9IFtdO1xuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICB0aGlzLmN1c3RvbUZpZWxkcyA9IHRoaXMuZ2V0Q3VzdG9tRmllbGRzKCk7XG4gICAgfVxuXG4gICAgZ2V0IGZ1bGZpbGxtZW50KCk6IE9yZGVyRGV0YWlsLkZ1bGZpbGxtZW50cyB8IHVuZGVmaW5lZCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmRlci5mdWxmaWxsbWVudHMgJiYgdGhpcy5vcmRlci5mdWxmaWxsbWVudHMuZmluZChmID0+IGYuaWQgPT09IHRoaXMuZnVsZmlsbG1lbnRJZCk7XG4gICAgfVxuXG4gICAgZ2V0IGl0ZW1zKCk6IEFycmF5PHsgbmFtZTogc3RyaW5nOyBxdWFudGl0eTogbnVtYmVyIH0+IHtcbiAgICAgICAgY29uc3QgaXRlbU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gICAgICAgIGNvbnN0IGZ1bGZpbGxtZW50SXRlbUlkcyA9IHRoaXMuZnVsZmlsbG1lbnQ/Lm9yZGVySXRlbXMubWFwKGkgPT4gaS5pZCk7XG4gICAgICAgIGZvciAoY29uc3QgbGluZSBvZiB0aGlzLm9yZGVyLmxpbmVzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgbGluZS5pdGVtcykge1xuICAgICAgICAgICAgICAgIGlmIChmdWxmaWxsbWVudEl0ZW1JZHM/LmluY2x1ZGVzKGl0ZW0uaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gaXRlbU1hcC5nZXQobGluZS5wcm9kdWN0VmFyaWFudC5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1NYXAuc2V0KGxpbmUucHJvZHVjdFZhcmlhbnQubmFtZSwgY291bnQgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1NYXAuc2V0KGxpbmUucHJvZHVjdFZhcmlhbnQubmFtZSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oaXRlbU1hcC5lbnRyaWVzKCkpLm1hcCgoW25hbWUsIHF1YW50aXR5XSkgPT4gKHsgbmFtZSwgcXVhbnRpdHkgfSkpO1xuICAgIH1cblxuICAgIGdldEN1c3RvbUZpZWxkcygpOiBBcnJheTx7IGtleTogc3RyaW5nOyB2YWx1ZTogYW55IH0+IHtcbiAgICAgICAgY29uc3QgY3VzdG9tRmllbGRzID0gKHRoaXMuZnVsZmlsbG1lbnQgYXMgYW55KS5jdXN0b21GaWVsZHM7XG4gICAgICAgIGlmIChjdXN0b21GaWVsZHMpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyhjdXN0b21GaWVsZHMpXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoW2tleV0pID0+IGtleSAhPT0gJ19fdHlwZW5hbWUnKVxuICAgICAgICAgICAgICAgIC5tYXAoKFtrZXksIHZhbF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBBcnJheS5pc0FycmF5KHZhbCkgfHwgaXNPYmplY3QodmFsKSA/IHZhbCA6ICh2YWwgYXMgYW55KS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBrZXksIHZhbHVlIH07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjdXN0b21GaWVsZElzT2JqZWN0KGN1c3RvbUZpZWxkOiB1bmtub3duKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGN1c3RvbUZpZWxkKSB8fCBpc09iamVjdChjdXN0b21GaWVsZCk7XG4gICAgfVxufVxuIl19