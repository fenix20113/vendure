import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { unique } from '@vendure/common/lib/unique';
export const OPTION_VALUE_INPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OptionValueInputComponent),
    multi: true,
};
export class OptionValueInputComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.groupName = '';
        this.disabled = false;
        this.input = '';
        this.isFocussed = false;
        this.lastSelected = false;
    }
    registerOnChange(fn) {
        this.onChangeFn = fn;
    }
    registerOnTouched(fn) {
        this.onTouchFn = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.changeDetector.markForCheck();
    }
    writeValue(obj) {
        this.options = obj || [];
    }
    focus() {
        this.textArea.nativeElement.focus();
    }
    removeOption(option) {
        if (!option.locked) {
            this.options = this.options.filter(o => o.name !== option.name);
            this.onChangeFn(this.options);
        }
    }
    handleKey(event) {
        switch (event.key) {
            case ',':
            case 'Enter':
                this.addOptionValue();
                event.preventDefault();
                break;
            case 'Backspace':
                if (this.lastSelected) {
                    this.removeLastOption();
                    this.lastSelected = false;
                }
                else if (this.input === '') {
                    this.lastSelected = true;
                }
                break;
            default:
                this.lastSelected = false;
        }
    }
    handleBlur() {
        this.isFocussed = false;
        this.addOptionValue();
    }
    addOptionValue() {
        this.options = unique([...this.options, ...this.parseInputIntoOptions(this.input)]);
        this.input = '';
        this.onChangeFn(this.options);
    }
    parseInputIntoOptions(input) {
        return input
            .split(/[,\n]/)
            .map(s => s.trim())
            .filter(s => s !== '')
            .map(s => ({ name: s, locked: false }));
    }
    removeLastOption() {
        if (!this.options[this.options.length - 1].locked) {
            this.options = this.options.slice(0, this.options.length - 1);
        }
    }
}
OptionValueInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-option-value-input',
                template: "<div class=\"input-wrapper\" [class.focus]=\"isFocussed\" (click)=\"textArea.focus()\">\n    <div class=\"chips\" *ngIf=\"0 < options.length\">\n        <vdr-chip\n            *ngFor=\"let option of options; last as isLast\"\n            [icon]=\"option.locked ? 'lock' : 'times'\"\n            [class.selected]=\"isLast && lastSelected\"\n            [class.locked]=\"option.locked\"\n            [colorFrom]=\"groupName\"\n            (iconClick)=\"removeOption(option)\"\n        >\n            {{ option.name }}\n        </vdr-chip>\n    </div>\n    <textarea\n        #textArea\n        (keyup)=\"handleKey($event)\"\n        (focus)=\"isFocussed = true\"\n        (blur)=\"handleBlur()\"\n        [(ngModel)]=\"input\"\n        [disabled]=\"disabled\"\n    ></textarea>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.Default,
                providers: [OPTION_VALUE_INPUT_VALUE_ACCESSOR],
                styles: [".input-wrapper{background-color:#fff;border-radius:3px!important;border:1px solid var(--color-grey-300)!important;cursor:text}.input-wrapper.focus{border-color:var(--color-primary-500)!important;box-shadow:0 0 1px 1px var(--color-primary-100)}.input-wrapper .chips{padding:5px}.input-wrapper textarea{border:none;width:100%;height:24px;margin-top:3px;padding:0 6px}.input-wrapper textarea:focus{outline:none}.input-wrapper textarea:disabled{background-color:var(--color-component-bg-100)}vdr-chip ::ng-deep .wrapper{margin:0 3px}vdr-chip.locked{opacity:.8}vdr-chip.selected ::ng-deep .wrapper{border-color:var(--color-warning-500)!important;box-shadow:0 0 1px 1px var(--color-warning-400);opacity:.6}"]
            },] }
];
OptionValueInputComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
OptionValueInputComponent.propDecorators = {
    groupName: [{ type: Input }],
    textArea: [{ type: ViewChild, args: ['textArea', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLXZhbHVlLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9vcHRpb24tdmFsdWUtaW5wdXQvb3B0aW9uLXZhbHVlLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixLQUFLLEVBRUwsU0FBUyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFcEQsTUFBTSxDQUFDLE1BQU0saUNBQWlDLEdBQWE7SUFDdkQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHlCQUF5QixDQUFDO0lBQ3hELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQVNGLE1BQU0sT0FBTyx5QkFBeUI7SUFXbEMsWUFBb0IsY0FBaUM7UUFBakMsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBVjVDLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFHeEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixpQkFBWSxHQUFHLEtBQUssQ0FBQztJQUltQyxDQUFDO0lBRXpELGdCQUFnQixDQUFDLEVBQU87UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFRO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELFlBQVksQ0FBQyxNQUF5QztRQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQW9CO1FBQzFCLFFBQVEsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNmLEtBQUssR0FBRyxDQUFDO1lBQ1QsS0FBSyxPQUFPO2dCQUNSLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNO1lBQ1YsS0FBSyxXQUFXO2dCQUNaLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2lCQUM3QjtxQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO29CQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztpQkFDNUI7Z0JBQ0QsTUFBTTtZQUNWO2dCQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVPLGNBQWM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU8scUJBQXFCLENBQUMsS0FBYTtRQUN2QyxPQUFPLEtBQUs7YUFDUCxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQ2QsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2xCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDckIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU8sZ0JBQWdCO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNqRTtJQUNMLENBQUM7OztZQTNGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsNnhCQUFrRDtnQkFFbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87Z0JBQ2hELFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDOzthQUNqRDs7O1lBdkJHLGlCQUFpQjs7O3dCQXlCaEIsS0FBSzt1QkFDTCxTQUFTLFNBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBQcm92aWRlcixcbiAgICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgdW5pcXVlIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi91bmlxdWUnO1xuXG5leHBvcnQgY29uc3QgT1BUSU9OX1ZBTFVFX0lOUFVUX1ZBTFVFX0FDQ0VTU09SOiBQcm92aWRlciA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPcHRpb25WYWx1ZUlucHV0Q29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLW9wdGlvbi12YWx1ZS1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL29wdGlvbi12YWx1ZS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vb3B0aW9uLXZhbHVlLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICAgIHByb3ZpZGVyczogW09QVElPTl9WQUxVRV9JTlBVVF9WQUxVRV9BQ0NFU1NPUl0sXG59KVxuZXhwb3J0IGNsYXNzIE9wdGlvblZhbHVlSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgQElucHV0KCkgZ3JvdXBOYW1lID0gJyc7XG4gICAgQFZpZXdDaGlsZCgndGV4dEFyZWEnLCB7IHN0YXRpYzogdHJ1ZSB9KSB0ZXh0QXJlYTogRWxlbWVudFJlZjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgICBvcHRpb25zOiBBcnJheTx7IG5hbWU6IHN0cmluZzsgbG9ja2VkOiBib29sZWFuIH0+O1xuICAgIGRpc2FibGVkID0gZmFsc2U7XG4gICAgaW5wdXQgPSAnJztcbiAgICBpc0ZvY3Vzc2VkID0gZmFsc2U7XG4gICAgbGFzdFNlbGVjdGVkID0gZmFsc2U7XG4gICAgb25DaGFuZ2VGbjogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gICAgb25Ub3VjaEZuOiAodmFsdWU6IGFueSkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VGbiA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoRm4gPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvYmogfHwgW107XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIHRoaXMudGV4dEFyZWEubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIHJlbW92ZU9wdGlvbihvcHRpb246IHsgbmFtZTogc3RyaW5nOyBsb2NrZWQ6IGJvb2xlYW4gfSkge1xuICAgICAgICBpZiAoIW9wdGlvbi5sb2NrZWQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucy5maWx0ZXIobyA9PiBvLm5hbWUgIT09IG9wdGlvbi5uYW1lKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VGbih0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICBjYXNlICcsJzpcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE9wdGlvblZhbHVlKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdFNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGFzdE9wdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pbnB1dCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0U2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUJsdXIoKSB7XG4gICAgICAgIHRoaXMuaXNGb2N1c3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFkZE9wdGlvblZhbHVlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRPcHRpb25WYWx1ZSgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gdW5pcXVlKFsuLi50aGlzLm9wdGlvbnMsIC4uLnRoaXMucGFyc2VJbnB1dEludG9PcHRpb25zKHRoaXMuaW5wdXQpXSk7XG4gICAgICAgIHRoaXMuaW5wdXQgPSAnJztcbiAgICAgICAgdGhpcy5vbkNoYW5nZUZuKHRoaXMub3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZUlucHV0SW50b09wdGlvbnMoaW5wdXQ6IHN0cmluZyk6IEFycmF5PHsgbmFtZTogc3RyaW5nOyBsb2NrZWQ6IGJvb2xlYW4gfT4ge1xuICAgICAgICByZXR1cm4gaW5wdXRcbiAgICAgICAgICAgIC5zcGxpdCgvWyxcXG5dLylcbiAgICAgICAgICAgIC5tYXAocyA9PiBzLnRyaW0oKSlcbiAgICAgICAgICAgIC5maWx0ZXIocyA9PiBzICE9PSAnJylcbiAgICAgICAgICAgIC5tYXAocyA9PiAoeyBuYW1lOiBzLCBsb2NrZWQ6IGZhbHNlIH0pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUxhc3RPcHRpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zW3RoaXMub3B0aW9ucy5sZW5ndGggLSAxXS5sb2NrZWQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucy5zbGljZSgwLCB0aGlzLm9wdGlvbnMubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=