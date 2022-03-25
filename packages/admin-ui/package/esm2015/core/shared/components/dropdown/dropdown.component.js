import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class DropdownComponent {
    constructor() {
        this.isOpen = false;
        this.onOpenChangeCallbacks = [];
        this.manualToggle = false;
    }
    onClick() {
        if (!this.manualToggle) {
            this.toggleOpen();
        }
    }
    toggleOpen() {
        this.isOpen = !this.isOpen;
        this.onOpenChangeCallbacks.forEach(fn => fn(this.isOpen));
    }
    onOpenChange(callback) {
        this.onOpenChangeCallbacks.push(callback);
    }
    setTriggerElement(elementRef) {
        this.trigger = elementRef;
    }
}
DropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dropdown',
                template: "<ng-content></ng-content>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
DropdownComponent.propDecorators = {
    manualToggle: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRdEYsTUFBTSxPQUFPLGlCQUFpQjtJQU45QjtRQU9ZLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZiwwQkFBcUIsR0FBcUMsRUFBRSxDQUFDO1FBRTVELGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBb0JsQyxDQUFDO0lBbEJHLE9BQU87UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELFlBQVksQ0FBQyxRQUFtQztRQUM1QyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxVQUFzQjtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUM5QixDQUFDOzs7WUE3QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4Qix1Q0FBd0M7Z0JBRXhDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7OzJCQUtJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1kcm9wZG93bicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Ryb3Bkb3duLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9kcm9wZG93bi5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBEcm9wZG93bkNvbXBvbmVudCB7XG4gICAgcHJpdmF0ZSBpc09wZW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG9uT3BlbkNoYW5nZUNhbGxiYWNrczogQXJyYXk8KGlzT3BlbjogYm9vbGVhbikgPT4gdm9pZD4gPSBbXTtcbiAgICBwdWJsaWMgdHJpZ2dlcjogRWxlbWVudFJlZjtcbiAgICBASW5wdXQoKSBtYW51YWxUb2dnbGUgPSBmYWxzZTtcblxuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIGlmICghdGhpcy5tYW51YWxUb2dnbGUpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlT3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlT3BlbigpIHtcbiAgICAgICAgdGhpcy5pc09wZW4gPSAhdGhpcy5pc09wZW47XG4gICAgICAgIHRoaXMub25PcGVuQ2hhbmdlQ2FsbGJhY2tzLmZvckVhY2goZm4gPT4gZm4odGhpcy5pc09wZW4pKTtcbiAgICB9XG5cbiAgICBvbk9wZW5DaGFuZ2UoY2FsbGJhY2s6IChpc09wZW46IGJvb2xlYW4pID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5vbk9wZW5DaGFuZ2VDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgc2V0VHJpZ2dlckVsZW1lbnQoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLnRyaWdnZXIgPSBlbGVtZW50UmVmO1xuICAgIH1cbn1cbiJdfQ==