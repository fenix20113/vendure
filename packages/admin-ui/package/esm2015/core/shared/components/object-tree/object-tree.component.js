import { ChangeDetectionStrategy, Component, Input, Optional, SkipSelf } from '@angular/core';
/**
 * This component displays a plain JavaScript object as an expandable tree.
 */
export class ObjectTreeComponent {
    constructor(parent) {
        this.isArrayItem = false;
        if (parent) {
            this.depth = parent.depth + 1;
        }
        else {
            this.depth = 0;
        }
    }
    ngOnInit() {
        this.entries = this.getEntries(this.value);
        this.expanded = this.depth === 0 || this.isArrayItem;
        this.valueIsArray = Object.keys(this.value).every(v => Number.isInteger(+v));
    }
    isObject(value) {
        return typeof value === 'object' && value !== null;
    }
    getEntries(inputValue) {
        if (typeof inputValue === 'string') {
            return [{ key: '', value: inputValue }];
        }
        return Object.entries(inputValue).map(([key, value]) => ({ key, value }));
    }
}
ObjectTreeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-object-tree',
                template: "<button class=\"icon-button\" (click)=\"expanded = !expanded\" *ngIf=\"depth !== 0 && !isArrayItem\">\n    <clr-icon shape=\"caret\" size=\"12\" [dir]=\"expanded ? 'down' : 'right'\"></clr-icon>\n</button>\n<ul\n    class=\"object-tree-node\"\n    [ngClass]=\"'depth-' + depth\"\n    [class.array-value]=\"valueIsArray\"\n    [class.array-item]=\"isArrayItem\"\n    [class.expanded]=\"expanded\"\n>\n    <li *ngFor=\"let entry of entries\">\n        <span class=\"key\" *ngIf=\"entry.key\">{{ entry.key }}:</span>\n        <ng-container *ngIf=\"isObject(entry.value)\">\n            <vdr-object-tree [value]=\"entry.value\" [isArrayItem]=\"valueIsArray\"></vdr-object-tree>\n        </ng-container>\n        <ng-container *ngIf=\"!isObject(entry.value)\">\n            {{ entry.value }}\n        </ng-container>\n    </li>\n</ul>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".object-tree-node{list-style-type:none;line-height:16px;font-size:12px;overflow:hidden;max-height:0}.object-tree-node.depth-0{margin-left:0;margin-top:8px}.object-tree-node.depth-1,.object-tree-node.depth-2,.object-tree-node.depth-3,.object-tree-node.depth-4,.object-tree-node.depth-5,.object-tree-node.depth-6{margin-left:6px}.object-tree-node.expanded{max-height:5000px}.object-tree-node.array-item{margin-top:-16px;margin-left:16px}.object-tree-node.array-value.expanded>li+li{margin-top:6px}.key{color:var(--color-text-300)}"]
            },] }
];
ObjectTreeComponent.ctorParameters = () => [
    { type: ObjectTreeComponent, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
ObjectTreeComponent.propDecorators = {
    value: [{ type: Input }],
    isArrayItem: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LXRyZWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9vYmplY3QtdHJlZS9vYmplY3QtdHJlZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0Rzs7R0FFRztBQU9ILE1BQU0sT0FBTyxtQkFBbUI7SUFPNUIsWUFBb0MsTUFBMkI7UUFMdEQsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFNekIsSUFBSSxNQUFNLEVBQUU7WUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDO2FBQU07WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNsQjtJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckQsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQVU7UUFDZixPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO0lBQ3ZELENBQUM7SUFFTyxVQUFVLENBQUMsVUFBMkM7UUFDMUQsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7WUFDaEMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztTQUMzQztRQUNELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQzs7O1lBcENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQiwyMEJBQTJDO2dCQUUzQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVErQyxtQkFBbUIsdUJBQWxELFFBQVEsWUFBSSxRQUFROzs7b0JBTmhDLEtBQUs7MEJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IGRpc3BsYXlzIGEgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3QgYXMgYW4gZXhwYW5kYWJsZSB0cmVlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1vYmplY3QtdHJlZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL29iamVjdC10cmVlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9vYmplY3QtdHJlZS5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBPYmplY3RUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSB2YWx1ZTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB8IHN0cmluZztcbiAgICBASW5wdXQoKSBpc0FycmF5SXRlbSA9IGZhbHNlO1xuICAgIGRlcHRoOiBudW1iZXI7XG4gICAgZXhwYW5kZWQ6IGJvb2xlYW47XG4gICAgdmFsdWVJc0FycmF5OiBib29sZWFuO1xuICAgIGVudHJpZXM6IEFycmF5PHsga2V5OiBzdHJpbmc7IHZhbHVlOiBhbnkgfT47XG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50OiBPYmplY3RUcmVlQ29tcG9uZW50KSB7XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVwdGggPSBwYXJlbnQuZGVwdGggKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZXB0aCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLmV4cGFuZGVkID0gdGhpcy5kZXB0aCA9PT0gMCB8fCB0aGlzLmlzQXJyYXlJdGVtO1xuICAgICAgICB0aGlzLnZhbHVlSXNBcnJheSA9IE9iamVjdC5rZXlzKHRoaXMudmFsdWUpLmV2ZXJ5KHYgPT4gTnVtYmVyLmlzSW50ZWdlcigrdikpO1xuICAgIH1cblxuICAgIGlzT2JqZWN0KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRFbnRyaWVzKGlucHV0VmFsdWU6IHsgW2tleTogc3RyaW5nXTogYW55IH0gfCBzdHJpbmcpOiBBcnJheTx7IGtleTogc3RyaW5nOyB2YWx1ZTogYW55IH0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIFt7IGtleTogJycsIHZhbHVlOiBpbnB1dFZhbHVlIH1dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyhpbnB1dFZhbHVlKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gKHsga2V5LCB2YWx1ZSB9KSk7XG4gICAgfVxufVxuIl19