import { Directive, Input, Optional } from '@angular/core';
import { FormControlDirective, FormControlName } from '@angular/forms';
/**
 * Allows declarative binding to the "disabled" property of a reactive form
 * control.
 */
export class DisabledDirective {
    constructor(formControlName, formControl) {
        this.formControlName = formControlName;
        this.formControl = formControl;
    }
    set disabled(val) {
        var _a, _b, _c;
        const formControl = (_b = (_a = this.formControlName) === null || _a === void 0 ? void 0 : _a.control) !== null && _b !== void 0 ? _b : (_c = this.formControl) === null || _c === void 0 ? void 0 : _c.form;
        if (!formControl) {
            return;
        }
        if (!!val === false) {
            formControl.enable({ emitEvent: false });
        }
        else {
            formControl.disable({ emitEvent: false });
        }
    }
}
DisabledDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrDisabled]',
            },] }
];
DisabledDirective.ctorParameters = () => [
    { type: FormControlName, decorators: [{ type: Optional }] },
    { type: FormControlDirective, decorators: [{ type: Optional }] }
];
DisabledDirective.propDecorators = {
    disabled: [{ type: Input, args: ['vdrDisabled',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvZGlyZWN0aXZlcy9kaXNhYmxlZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBZSxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRjs7O0dBR0c7QUFJSCxNQUFNLE9BQU8saUJBQWlCO0lBYTFCLFlBQ3dCLGVBQWdDLEVBQ2hDLFdBQWlDO1FBRGpDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBc0I7SUFDdEQsQ0FBQztJQWZKLElBQTBCLFFBQVEsQ0FBQyxHQUFZOztRQUMzQyxNQUFNLFdBQVcsZUFBRyxJQUFJLENBQUMsZUFBZSwwQ0FBRSxPQUFPLHlDQUFJLElBQUksQ0FBQyxXQUFXLDBDQUFFLElBQUksQ0FBQztRQUM1RSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2QsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEtBQUssRUFBRTtZQUNqQixXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNILFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUM3QztJQUNMLENBQUM7OztZQWRKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTthQUM1Qjs7O1lBUjJDLGVBQWUsdUJBdUJsRCxRQUFRO1lBdkJLLG9CQUFvQix1QkF3QmpDLFFBQVE7Ozt1QkFkWixLQUFLLFNBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUNvbnRyb2xEaXJlY3RpdmUsIEZvcm1Db250cm9sTmFtZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLyoqXG4gKiBBbGxvd3MgZGVjbGFyYXRpdmUgYmluZGluZyB0byB0aGUgXCJkaXNhYmxlZFwiIHByb3BlcnR5IG9mIGEgcmVhY3RpdmUgZm9ybVxuICogY29udHJvbC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdmRyRGlzYWJsZWRdJyxcbn0pXG5leHBvcnQgY2xhc3MgRGlzYWJsZWREaXJlY3RpdmUge1xuICAgIEBJbnB1dCgndmRyRGlzYWJsZWQnKSBzZXQgZGlzYWJsZWQodmFsOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sID0gdGhpcy5mb3JtQ29udHJvbE5hbWU/LmNvbnRyb2wgPz8gdGhpcy5mb3JtQ29udHJvbD8uZm9ybTtcbiAgICAgICAgaWYgKCFmb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghIXZhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGZvcm1Db250cm9sLmVuYWJsZSh7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3JtQ29udHJvbC5kaXNhYmxlKHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGZvcm1Db250cm9sTmFtZTogRm9ybUNvbnRyb2xOYW1lLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbERpcmVjdGl2ZSxcbiAgICApIHt9XG59XG4iXX0=