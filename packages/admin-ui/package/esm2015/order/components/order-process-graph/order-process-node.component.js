import { ChangeDetectionStrategy, Component, ElementRef, Input, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NODE_HEIGHT } from './constants';
export class OrderProcessNodeComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.active$ = new BehaviorSubject(false);
        this.activeTarget$ = new BehaviorSubject(false);
        this.isCancellable = false;
        // We use a class field here to prevent the
        // i18n extractor from extracting a "Cancelled" key
        this.cancelledState = 'Cancelled';
    }
    ngOnChanges(changes) {
        this.isCancellable = !!this.node.to.find((s) => s.name === 'Cancelled');
        if (changes.active) {
            this.active$.next(this.active);
        }
    }
    getPos(origin = 'top') {
        var _a, _b;
        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        const nodeHeight = (_b = (_a = this.elementRef.nativeElement.querySelector('.node')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().height) !== null && _b !== void 0 ? _b : 0;
        return {
            x: 10,
            y: this.index * NODE_HEIGHT + (origin === 'bottom' ? nodeHeight : 0),
        };
    }
    getStyle() {
        const pos = this.getPos();
        return {
            'top.px': pos.y,
            'left.px': pos.x,
        };
    }
}
OrderProcessNodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-process-node',
                template: "<div class=\"node-wrapper\" [ngStyle]=\"getStyle()\" [class.active]=\"active$ | async\">\n    <div\n        class=\"node\"\n        [class.active-target]=\"activeTarget$ | async\"\n    >\n        {{ node.name | stateI18nToken | translate }}\n    </div>\n    <div class=\"cancelled-wrapper\" *ngIf=\"isCancellable\">\n        <div class=\"cancelled-edge\">\n        </div>\n        <clr-icon shape=\"dot-circle\"></clr-icon>\n        <div class=\"cancelled-node\">\n            {{ cancelledState | stateI18nToken | translate }}\n        </div>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}.node-wrapper{position:absolute;z-index:1;display:flex;align-items:center}.node{display:inline-block;border:2px solid var(--color-component-border-200);border-radius:3px;padding:3px 6px;z-index:1;background-color:var(--color-component-bg-100);opacity:.7;transition:opacity .2s,background-color .2s,color .2s;cursor:default}.node.active-target{border-color:var(--color-primary-500);opacity:.9}.cancelled-wrapper{display:flex;align-items:center;color:var(--color-grey-300);transition:color .2s,opacity .2s;opacity:.7}.cancelled-edge{width:48px;height:2px;background-color:var(--color-component-bg-300);transition:background-color .2s}clr-icon{margin-left:-1px}.cancelled-node{margin-left:6px}.active .cancelled-wrapper{opacity:1}.active .node{opacity:1;background-color:var(--color-primary-600);border-color:var(--color-primary-600);color:var(--color-primary-100)}.active .cancelled-wrapper{color:var(--color-error-500)}.active .cancelled-edge{background-color:var(--color-error-500)}"]
            },] }
];
OrderProcessNodeComponent.ctorParameters = () => [
    { type: ElementRef }
];
OrderProcessNodeComponent.propDecorators = {
    node: [{ type: Input }],
    index: [{ type: Input }],
    active: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcHJvY2Vzcy1ub2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvb3JkZXIvc3JjL2NvbXBvbmVudHMvb3JkZXItcHJvY2Vzcy1ncmFwaC9vcmRlci1wcm9jZXNzLW5vZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEdBR1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBUzFDLE1BQU0sT0FBTyx5QkFBeUI7SUFXbEMsWUFBb0IsVUFBc0M7UUFBdEMsZUFBVSxHQUFWLFVBQVUsQ0FBNEI7UUFQMUQsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQzlDLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFDcEQsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsMkNBQTJDO1FBQzNDLG1EQUFtRDtRQUNuRCxtQkFBYyxHQUFHLFdBQVcsQ0FBQztJQUVnQyxDQUFDO0lBRTlELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLENBQUM7UUFDeEUsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsU0FBMkIsS0FBSzs7UUFDbkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNuRSxNQUFNLFVBQVUsZUFDWixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLDBDQUFFLHFCQUFxQixHQUFHLE1BQU0sbUNBQUksQ0FBQyxDQUFDO1FBQzlGLE9BQU87WUFDSCxDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsR0FBRyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZFLENBQUM7SUFDTixDQUFDO0lBRUQsUUFBUTtRQUNKLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQixPQUFPO1lBQ0gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ25CLENBQUM7SUFDTixDQUFDOzs7WUExQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLGdrQkFBa0Q7Z0JBRWxELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBZkcsVUFBVTs7O21CQWlCVCxLQUFLO29CQUNMLEtBQUs7cUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE5PREVfSEVJR0hUIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgU3RhdGVOb2RlIH0gZnJvbSAnLi90eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLW9yZGVyLXByb2Nlc3Mtbm9kZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL29yZGVyLXByb2Nlc3Mtbm9kZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vb3JkZXItcHJvY2Vzcy1ub2RlLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyUHJvY2Vzc05vZGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIG5vZGU6IFN0YXRlTm9kZTtcbiAgICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGFjdGl2ZTogYm9vbGVhbjtcbiAgICBhY3RpdmUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgYWN0aXZlVGFyZ2V0JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGlzQ2FuY2VsbGFibGUgPSBmYWxzZTtcbiAgICAvLyBXZSB1c2UgYSBjbGFzcyBmaWVsZCBoZXJlIHRvIHByZXZlbnQgdGhlXG4gICAgLy8gaTE4biBleHRyYWN0b3IgZnJvbSBleHRyYWN0aW5nIGEgXCJDYW5jZWxsZWRcIiBrZXlcbiAgICBjYW5jZWxsZWRTdGF0ZSA9ICdDYW5jZWxsZWQnO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50Pikge31cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5pc0NhbmNlbGxhYmxlID0gISF0aGlzLm5vZGUudG8uZmluZCgocykgPT4gcy5uYW1lID09PSAnQ2FuY2VsbGVkJyk7XG4gICAgICAgIGlmIChjaGFuZ2VzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmUkLm5leHQodGhpcy5hY3RpdmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UG9zKG9yaWdpbjogJ3RvcCcgfCAnYm90dG9tJyA9ICd0b3AnKTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBub2RlSGVpZ2h0ID1cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub2RlJyk/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCA/PyAwO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogMTAsXG4gICAgICAgICAgICB5OiB0aGlzLmluZGV4ICogTk9ERV9IRUlHSFQgKyAob3JpZ2luID09PSAnYm90dG9tJyA/IG5vZGVIZWlnaHQgOiAwKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRTdHlsZSgpIHtcbiAgICAgICAgY29uc3QgcG9zID0gdGhpcy5nZXRQb3MoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICd0b3AucHgnOiBwb3MueSxcbiAgICAgICAgICAgICdsZWZ0LnB4JzogcG9zLngsXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19