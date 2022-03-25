import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * A simple, stateless toggle button for indicating selection.
 */
export class SelectToggleComponent {
    constructor() {
        this.size = 'large';
        this.selected = false;
        this.disabled = false;
        this.selectedChange = new EventEmitter();
    }
}
SelectToggleComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-select-toggle',
                template: "<div\n    class=\"toggle\"\n    [class.disabled]=\"disabled\"\n    [class.small]=\"size === 'small'\"\n    [attr.tabindex]=\"disabled ? null : 0\"\n    [class.selected]=\"selected\"\n    (keydown.enter)=\"selectedChange.emit(!selected)\"\n    (keydown.space)=\"$event.preventDefault(); selectedChange.emit(!selected)\"\n    (click)=\"selectedChange.emit(!selected)\"\n>\n    <clr-icon shape=\"check\" [attr.size]=\"size === 'small' ? 16 : 32\"></clr-icon>\n</div>\n<div class=\"toggle-label\" [class.disabled]=\"disabled\" *ngIf=\"label\" (click)=\"selectedChange.emit(!selected)\">\n    {{ label }}\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".toggle,:host{display:flex;align-items:center;justify-content:center}.toggle{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;background-color:var(--color-component-bg-100);border:2px solid var(--color-component-border-300);padding:0 6px;border-radius:50%;width:32px;height:32px;color:var(--color-grey-300);transition:background-color .2s,border .2s}.toggle.small{width:24px;height:24px}.toggle:not(.disabled):hover{border-color:var(--color-success-500);background-color:var(--color-success-400);opacity:.9}.toggle.selected{background-color:var(--color-success-500);border-color:var(--color-success-600);color:#fff}.toggle.selected:not(.disabled):hover{background-color:var(--color-success-500);border-color:var(--color-success-400);opacity:.9}.toggle:focus{outline:none;box-shadow:0 0 2px 2px var(--color-primary-500)}.toggle.disabled{cursor:default}.toggle-label{flex:1;margin-left:6px;text-align:left;font-size:12px}.toggle-label:not(.disabled){cursor:pointer}"]
            },] }
];
SelectToggleComponent.propDecorators = {
    size: [{ type: Input }],
    selected: [{ type: Input }],
    disabled: [{ type: Input }],
    label: [{ type: Input }],
    selectedChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXRvZ2dsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC10b2dnbGUvc2VsZWN0LXRvZ2dsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4Rzs7R0FFRztBQU9ILE1BQU0sT0FBTyxxQkFBcUI7SUFObEM7UUFPYSxTQUFJLEdBQXNCLE9BQU8sQ0FBQztRQUNsQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFaEIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBQzNELENBQUM7OztZQVpBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3Qiw2bUJBQTZDO2dCQUU3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OzttQkFFSSxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxLQUFLOzZCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEEgc2ltcGxlLCBzdGF0ZWxlc3MgdG9nZ2xlIGJ1dHRvbiBmb3IgaW5kaWNhdGluZyBzZWxlY3Rpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXNlbGVjdC10b2dnbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QtdG9nZ2xlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zZWxlY3QtdG9nZ2xlLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdFRvZ2dsZUNvbXBvbmVudCB7XG4gICAgQElucHV0KCkgc2l6ZTogJ3NtYWxsJyB8ICdsYXJnZScgPSAnbGFyZ2UnO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkID0gZmFsc2U7XG4gICAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbn1cbiJdfQ==