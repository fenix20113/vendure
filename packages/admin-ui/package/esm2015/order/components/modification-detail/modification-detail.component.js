import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class ModificationDetailComponent {
    constructor() {
        this.addedItems = new Map();
        this.removedItems = new Map();
    }
    ngOnChanges() {
        const { added, removed } = this.getModifiedLines();
        this.addedItems = added;
        this.removedItems = removed;
    }
    getSurcharge(id) {
        return this.order.surcharges.find(m => m.id === id);
    }
    getAddedItems() {
        return [...this.addedItems.entries()].map(([line, count]) => {
            return { name: line.productVariant.name, quantity: count };
        });
    }
    getRemovedItems() {
        return [...this.removedItems.entries()].map(([line, count]) => {
            return { name: line.productVariant.name, quantity: count };
        });
    }
    getModifiedLines() {
        var _a, _b;
        const added = new Map();
        const removed = new Map();
        for (const _item of this.modification.orderItems || []) {
            const result = this.getOrderLineAndItem(_item.id);
            if (result) {
                const { line, item } = result;
                if (item.cancelled) {
                    const count = (_a = removed.get(line)) !== null && _a !== void 0 ? _a : 0;
                    removed.set(line, count + 1);
                }
                else {
                    const count = (_b = added.get(line)) !== null && _b !== void 0 ? _b : 0;
                    added.set(line, count + 1);
                }
            }
        }
        return { added, removed };
    }
    getOrderLineAndItem(itemId) {
        for (const line of this.order.lines) {
            const item = line.items.find(i => i.id === itemId);
            if (item) {
                return { line, item };
            }
        }
    }
}
ModificationDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-modification-detail',
                template: "<vdr-labeled-data [label]=\"'common.ID' | translate\">{{ modification.id }}</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"modification.note\" [label]=\"'order.note' | translate\">{{\n    modification.note\n}}</vdr-labeled-data>\n<vdr-labeled-data *ngFor=\"let surcharge of modification.surcharges\" [label]=\"'order.surcharges' | translate\">\n    {{ getSurcharge(surcharge.id)?.description }}\n    {{ getSurcharge(surcharge.id)?.priceWithTax | localeCurrency: order.currencyCode }}</vdr-labeled-data\n>\n<vdr-labeled-data *ngIf=\"getAddedItems().length\" [label]=\"'order.added-items' | translate\">\n    <vdr-simple-item-list [items]=\"getAddedItems()\"></vdr-simple-item-list>\n</vdr-labeled-data>\n<vdr-labeled-data *ngIf=\"getRemovedItems().length\" [label]=\"'order.removed-items' | translate\">\n    <vdr-simple-item-list [items]=\"getRemovedItems()\"></vdr-simple-item-list>\n</vdr-labeled-data>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ModificationDetailComponent.propDecorators = {
    order: [{ type: Input }],
    modification: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZpY2F0aW9uLWRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL21vZGlmaWNhdGlvbi1kZXRhaWwvbW9kaWZpY2F0aW9uLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBUzdGLE1BQU0sT0FBTywyQkFBMkI7SUFOeEM7UUFTWSxlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQTZCLENBQUM7UUFDbEQsaUJBQVksR0FBRyxJQUFJLEdBQUcsRUFBNkIsQ0FBQztJQW1EaEUsQ0FBQztJQWpERyxXQUFXO1FBQ1AsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztJQUNoQyxDQUFDO0lBRUQsWUFBWSxDQUFDLEVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDeEQsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZUFBZTtRQUNYLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQzFELE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGdCQUFnQjs7UUFDcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQTZCLENBQUM7UUFDbkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQTZCLENBQUM7UUFDckQsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsSUFBSSxFQUFFLEVBQUU7WUFDcEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsRCxJQUFJLE1BQU0sRUFBRTtnQkFDUixNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQztnQkFDOUIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNoQixNQUFNLEtBQUssU0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxtQ0FBSSxDQUFDLENBQUM7b0JBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDaEM7cUJBQU07b0JBQ0gsTUFBTSxLQUFLLFNBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUNBQUksQ0FBQyxDQUFDO29CQUNuQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQzlCO2FBQ0o7U0FDSjtRQUNELE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVPLG1CQUFtQixDQUFDLE1BQWM7UUFDdEMsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNqQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLENBQUM7WUFDbkQsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUN6QjtTQUNKO0lBQ0wsQ0FBQzs7O1lBNURKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxxNUJBQW1EO2dCQUVuRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztvQkFFSSxLQUFLOzJCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9yZGVyRGV0YWlsLCBPcmRlckRldGFpbEZyYWdtZW50IH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLW1vZGlmaWNhdGlvbi1kZXRhaWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tb2RpZmljYXRpb24tZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9tb2RpZmljYXRpb24tZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1vZGlmaWNhdGlvbkRldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgb3JkZXI6IE9yZGVyRGV0YWlsRnJhZ21lbnQ7XG4gICAgQElucHV0KCkgbW9kaWZpY2F0aW9uOiBPcmRlckRldGFpbC5Nb2RpZmljYXRpb25zO1xuICAgIHByaXZhdGUgYWRkZWRJdGVtcyA9IG5ldyBNYXA8T3JkZXJEZXRhaWwuTGluZXMsIG51bWJlcj4oKTtcbiAgICBwcml2YXRlIHJlbW92ZWRJdGVtcyA9IG5ldyBNYXA8T3JkZXJEZXRhaWwuTGluZXMsIG51bWJlcj4oKTtcblxuICAgIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB7IGFkZGVkLCByZW1vdmVkIH0gPSB0aGlzLmdldE1vZGlmaWVkTGluZXMoKTtcbiAgICAgICAgdGhpcy5hZGRlZEl0ZW1zID0gYWRkZWQ7XG4gICAgICAgIHRoaXMucmVtb3ZlZEl0ZW1zID0gcmVtb3ZlZDtcbiAgICB9XG5cbiAgICBnZXRTdXJjaGFyZ2UoaWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmRlci5zdXJjaGFyZ2VzLmZpbmQobSA9PiBtLmlkID09PSBpZCk7XG4gICAgfVxuXG4gICAgZ2V0QWRkZWRJdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLmFkZGVkSXRlbXMuZW50cmllcygpXS5tYXAoKFtsaW5lLCBjb3VudF0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGxpbmUucHJvZHVjdFZhcmlhbnQubmFtZSwgcXVhbnRpdHk6IGNvdW50IH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFJlbW92ZWRJdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLnJlbW92ZWRJdGVtcy5lbnRyaWVzKCldLm1hcCgoW2xpbmUsIGNvdW50XSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogbGluZS5wcm9kdWN0VmFyaWFudC5uYW1lLCBxdWFudGl0eTogY291bnQgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRNb2RpZmllZExpbmVzKCkge1xuICAgICAgICBjb25zdCBhZGRlZCA9IG5ldyBNYXA8T3JkZXJEZXRhaWwuTGluZXMsIG51bWJlcj4oKTtcbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9IG5ldyBNYXA8T3JkZXJEZXRhaWwuTGluZXMsIG51bWJlcj4oKTtcbiAgICAgICAgZm9yIChjb25zdCBfaXRlbSBvZiB0aGlzLm1vZGlmaWNhdGlvbi5vcmRlckl0ZW1zIHx8IFtdKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmdldE9yZGVyTGluZUFuZEl0ZW0oX2l0ZW0uaWQpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgbGluZSwgaXRlbSB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNhbmNlbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IHJlbW92ZWQuZ2V0KGxpbmUpID8/IDA7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZWQuc2V0KGxpbmUsIGNvdW50ICsgMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSBhZGRlZC5nZXQobGluZSkgPz8gMDtcbiAgICAgICAgICAgICAgICAgICAgYWRkZWQuc2V0KGxpbmUsIGNvdW50ICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGFkZGVkLCByZW1vdmVkIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPcmRlckxpbmVBbmRJdGVtKGl0ZW1JZDogc3RyaW5nKSB7XG4gICAgICAgIGZvciAoY29uc3QgbGluZSBvZiB0aGlzLm9yZGVyLmxpbmVzKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbGluZS5pdGVtcy5maW5kKGkgPT4gaS5pZCA9PT0gaXRlbUlkKTtcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbGluZSwgaXRlbSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19