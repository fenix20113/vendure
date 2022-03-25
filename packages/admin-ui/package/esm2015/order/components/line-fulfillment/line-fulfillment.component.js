import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class LineFulfillmentComponent {
    constructor() {
        this.fulfilledCount = 0;
        this.fulfillments = [];
    }
    ngOnChanges(changes) {
        if (this.line) {
            this.fulfilledCount = this.getDeliveredCount(this.line);
            this.fulfillmentStatus = this.getFulfillmentStatus(this.fulfilledCount, this.line.items.length);
            this.fulfillments = this.getFulfillments(this.line);
        }
    }
    /**
     * Returns the number of items in an OrderLine which are fulfilled.
     */
    getDeliveredCount(line) {
        return line.items.reduce((sum, item) => sum + (item.fulfillment ? 1 : 0), 0);
    }
    getFulfillmentStatus(fulfilledCount, lineQuantity) {
        if (fulfilledCount === lineQuantity) {
            return 'full';
        }
        if (0 < fulfilledCount && fulfilledCount < lineQuantity) {
            return 'partial';
        }
        return 'none';
    }
    getFulfillments(line) {
        const counts = {};
        for (const item of line.items) {
            if (item.fulfillment) {
                if (counts[item.fulfillment.id] === undefined) {
                    counts[item.fulfillment.id] = 1;
                }
                else {
                    counts[item.fulfillment.id]++;
                }
            }
        }
        const all = line.items.reduce((fulfillments, item) => {
            return item.fulfillment ? [...fulfillments, item.fulfillment] : fulfillments;
        }, []);
        return Object.entries(counts).map(([id, count]) => {
            return {
                count,
                // tslint:disable-next-line:no-non-null-assertion
                fulfillment: all.find(f => f.id === id),
            };
        });
    }
}
LineFulfillmentComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-line-fulfillment',
                template: "<vdr-dropdown class=\"search-settings-menu\" *ngIf=\"fulfilledCount || orderState === 'PartiallyDelivered'\">\n    <button type=\"button\" class=\"icon-button\" vdrDropdownTrigger>\n        <clr-icon *ngIf=\"fulfillmentStatus === 'full'\" class=\"item-fulfilled\" shape=\"check-circle\"></clr-icon>\n        <clr-icon\n            *ngIf=\"fulfillmentStatus === 'partial'\"\n            class=\"item-partially-fulfilled\"\n            shape=\"check-circle\"\n        ></clr-icon>\n        <clr-icon\n            *ngIf=\"fulfillmentStatus === 'none'\"\n            class=\"item-not-fulfilled\"\n            shape=\"exclamation-circle\"\n        ></clr-icon>\n    </button>\n    <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n        <label class=\"dropdown-header\" *ngIf=\"fulfillmentStatus === 'full'\">\n            {{ 'order.line-fulfillment-all' | translate }}\n        </label>\n        <label class=\"dropdown-header\" *ngIf=\"fulfillmentStatus === 'partial'\">\n            {{\n                'order.line-fulfillment-partial' | translate: { total: line.quantity, count: fulfilledCount }\n            }}\n        </label>\n        <label class=\"dropdown-header\" *ngIf=\"fulfillmentStatus === 'none'\">\n            {{ 'order.line-fulfillment-none' | translate }}\n        </label>\n        <div class=\"fulfillment-detail\" *ngFor=\"let item of fulfillments\">\n            <div class=\"fulfillment-title\">\n                {{ 'order.fulfillment' | translate }} #{{ item.fulfillment.id }} ({{\n                    'order.item-count' | translate: { count: item.count }\n                }})\n            </div>\n            <vdr-labeled-data [label]=\"'common.created-at' | translate\">\n                {{ item.fulfillment.createdAt | localeDate: 'medium' }}\n            </vdr-labeled-data>\n            <vdr-labeled-data [label]=\"'order.fulfillment-method' | translate\">\n                {{ item.fulfillment.method }}\n            </vdr-labeled-data>\n            <vdr-labeled-data\n                *ngIf=\"item.fulfillment.trackingCode\"\n                [label]=\"'order.tracking-code' | translate\"\n            >\n                {{ item.fulfillment.trackingCode }}\n            </vdr-labeled-data>\n        </div>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".item-fulfilled{color:var(--color-success-500)}.item-partially-fulfilled{color:var(--color-warning-500)}.item-not-fulfilled{color:var(--color-error-500)}.fulfillment-detail{margin:6px 12px}.fulfillment-detail:not(:last-of-type){border-bottom:1px dashed var(--color-component-border-200)}"]
            },] }
];
LineFulfillmentComponent.propDecorators = {
    line: [{ type: Input }],
    orderState: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1mdWxmaWxsbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL29yZGVyL3NyYy9jb21wb25lbnRzL2xpbmUtZnVsZmlsbG1lbnQvbGluZS1mdWxmaWxsbWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBWXBHLE1BQU0sT0FBTyx3QkFBd0I7SUFOckM7UUFTSSxtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUVuQixpQkFBWSxHQUFvRSxFQUFFLENBQUM7SUFxRHZGLENBQUM7SUFuREcsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2RDtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLGlCQUFpQixDQUFDLElBQXVCO1FBQzdDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxjQUFzQixFQUFFLFlBQW9CO1FBQ3JFLElBQUksY0FBYyxLQUFLLFlBQVksRUFBRTtZQUNqQyxPQUFPLE1BQU0sQ0FBQztTQUNqQjtRQUNELElBQUksQ0FBQyxHQUFHLGNBQWMsSUFBSSxjQUFjLEdBQUcsWUFBWSxFQUFFO1lBQ3JELE9BQU8sU0FBUyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVPLGVBQWUsQ0FDbkIsSUFBdUI7UUFFdkIsTUFBTSxNQUFNLEdBQXdDLEVBQUUsQ0FBQztRQUV2RCxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDM0IsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxLQUFLLFNBQVMsRUFBRTtvQkFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQztxQkFBTTtvQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNqQzthQUNKO1NBQ0o7UUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNqRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7UUFDakYsQ0FBQyxFQUFFLEVBQWdDLENBQUMsQ0FBQztRQUVyQyxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUM5QyxPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsaURBQWlEO2dCQUNqRCxXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFFO2FBQzNDLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQS9ESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsa3ZFQUFnRDtnQkFFaEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7bUJBRUksS0FBSzt5QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWwgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IHVuaXF1ZSB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvdW5pcXVlJztcblxuZXhwb3J0IHR5cGUgRnVsZmlsbG1lbnRTdGF0dXMgPSAnZnVsbCcgfCAncGFydGlhbCcgfCAnbm9uZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWxpbmUtZnVsZmlsbG1lbnQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9saW5lLWZ1bGZpbGxtZW50LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9saW5lLWZ1bGZpbGxtZW50LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIExpbmVGdWxmaWxsbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgbGluZTogT3JkZXJEZXRhaWwuTGluZXM7XG4gICAgQElucHV0KCkgb3JkZXJTdGF0ZTogc3RyaW5nO1xuICAgIGZ1bGZpbGxlZENvdW50ID0gMDtcbiAgICBmdWxmaWxsbWVudFN0YXR1czogRnVsZmlsbG1lbnRTdGF0dXM7XG4gICAgZnVsZmlsbG1lbnRzOiBBcnJheTx7IGNvdW50OiBudW1iZXI7IGZ1bGZpbGxtZW50OiBPcmRlckRldGFpbC5GdWxmaWxsbWVudHMgfT4gPSBbXTtcblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubGluZSkge1xuICAgICAgICAgICAgdGhpcy5mdWxmaWxsZWRDb3VudCA9IHRoaXMuZ2V0RGVsaXZlcmVkQ291bnQodGhpcy5saW5lKTtcbiAgICAgICAgICAgIHRoaXMuZnVsZmlsbG1lbnRTdGF0dXMgPSB0aGlzLmdldEZ1bGZpbGxtZW50U3RhdHVzKHRoaXMuZnVsZmlsbGVkQ291bnQsIHRoaXMubGluZS5pdGVtcy5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5mdWxmaWxsbWVudHMgPSB0aGlzLmdldEZ1bGZpbGxtZW50cyh0aGlzLmxpbmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGl0ZW1zIGluIGFuIE9yZGVyTGluZSB3aGljaCBhcmUgZnVsZmlsbGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RGVsaXZlcmVkQ291bnQobGluZTogT3JkZXJEZXRhaWwuTGluZXMpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gbGluZS5pdGVtcy5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4gc3VtICsgKGl0ZW0uZnVsZmlsbG1lbnQgPyAxIDogMCksIDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RnVsZmlsbG1lbnRTdGF0dXMoZnVsZmlsbGVkQ291bnQ6IG51bWJlciwgbGluZVF1YW50aXR5OiBudW1iZXIpOiBGdWxmaWxsbWVudFN0YXR1cyB7XG4gICAgICAgIGlmIChmdWxmaWxsZWRDb3VudCA9PT0gbGluZVF1YW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Z1bGwnO1xuICAgICAgICB9XG4gICAgICAgIGlmICgwIDwgZnVsZmlsbGVkQ291bnQgJiYgZnVsZmlsbGVkQ291bnQgPCBsaW5lUXVhbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiAncGFydGlhbCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdub25lJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEZ1bGZpbGxtZW50cyhcbiAgICAgICAgbGluZTogT3JkZXJEZXRhaWwuTGluZXMsXG4gICAgKTogQXJyYXk8eyBjb3VudDogbnVtYmVyOyBmdWxmaWxsbWVudDogT3JkZXJEZXRhaWwuRnVsZmlsbG1lbnRzIH0+IHtcbiAgICAgICAgY29uc3QgY291bnRzOiB7IFtmdWxmaWxsbWVudElkOiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xuXG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBsaW5lLml0ZW1zKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5mdWxmaWxsbWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudHNbaXRlbS5mdWxmaWxsbWVudC5pZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb3VudHNbaXRlbS5mdWxmaWxsbWVudC5pZF0gPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50c1tpdGVtLmZ1bGZpbGxtZW50LmlkXSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGwgPSBsaW5lLml0ZW1zLnJlZHVjZSgoZnVsZmlsbG1lbnRzLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5mdWxmaWxsbWVudCA/IFsuLi5mdWxmaWxsbWVudHMsIGl0ZW0uZnVsZmlsbG1lbnRdIDogZnVsZmlsbG1lbnRzO1xuICAgICAgICB9LCBbXSBhcyBPcmRlckRldGFpbC5GdWxmaWxsbWVudHNbXSk7XG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGNvdW50cykubWFwKChbaWQsIGNvdW50XSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjb3VudCxcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICAgICAgZnVsZmlsbG1lbnQ6IGFsbC5maW5kKGYgPT4gZi5pZCA9PT0gaWQpISxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==