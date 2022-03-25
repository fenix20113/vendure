import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, } from '@angular/core';
import { FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators, } from '@angular/forms';
import { getDefaultConfigArgValue } from '../../../common/utilities/configurable-operation-utils';
import { interpolateDescription } from '../../../common/utilities/interpolate-description';
/**
 * A form input which renders a card with the internal form fields of the given ConfigurableOperation.
 */
export class ConfigurableInputComponent {
    constructor() {
        this.readonly = false;
        this.removable = true;
        this.remove = new EventEmitter();
        this.argValues = {};
        this.form = new FormGroup({});
    }
    interpolateDescription() {
        if (this.operationDefinition) {
            return interpolateDescription(this.operationDefinition, this.form.value);
        }
        else {
            return '';
        }
    }
    ngOnChanges(changes) {
        if ('operation' in changes || 'operationDefinition' in changes) {
            this.createForm();
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.form.disable();
        }
        else {
            this.form.enable();
        }
    }
    writeValue(value) {
        if (value) {
            this.form.patchValue(value);
        }
    }
    trackByName(index, arg) {
        return arg.name;
    }
    getArgDef(arg) {
        var _a;
        return (_a = this.operationDefinition) === null || _a === void 0 ? void 0 : _a.args.find(a => a.name === arg.name);
    }
    createForm() {
        var _a, _b;
        if (!this.operation) {
            return;
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.form = new FormGroup({});
        this.form.__id = Math.random().toString(36).substr(10);
        if (this.operation.args) {
            for (const arg of ((_a = this.operationDefinition) === null || _a === void 0 ? void 0 : _a.args) || []) {
                let value = (_b = this.operation.args.find(a => a.name === arg.name)) === null || _b === void 0 ? void 0 : _b.value;
                if (value === undefined) {
                    value = getDefaultConfigArgValue(arg);
                }
                const validators = arg.list ? undefined : arg.required ? Validators.required : undefined;
                this.form.addControl(arg.name, new FormControl(value, validators));
            }
        }
        this.subscription = this.form.valueChanges.subscribe(value => {
            if (this.onChange) {
                this.onChange({
                    code: this.operation && this.operation.code,
                    args: value,
                });
            }
            if (this.onTouch) {
                this.onTouch();
            }
        });
    }
    validate(c) {
        if (this.form.invalid) {
            return {
                required: true,
            };
        }
        return null;
    }
}
ConfigurableInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-configurable-input',
                template: "<div class=\"card\" *ngIf=\"operation\">\n    <div class=\"card-block\">{{ interpolateDescription() }}</div>\n    <div class=\"card-block\" *ngIf=\"operation.args?.length\">\n        <form [formGroup]=\"form\" *ngIf=\"operation\" class=\"operation-inputs\">\n            <div *ngFor=\"let arg of operation.args; trackBy: trackByName\" class=\"arg-row\">\n                <ng-container *ngIf=\"form.get(arg.name)\">\n                    <label>{{ getArgDef(arg)?.label || (arg.name | sentenceCase) }}</label>\n                    <vdr-dynamic-form-input\n                        [def]=\"getArgDef(arg)\"\n                        [readonly]=\"readonly\"\n                        [control]=\"form.get(arg.name)\"\n                        [formControlName]=\"arg.name\"\n                    ></vdr-dynamic-form-input>\n                </ng-container>\n            </div>\n        </form>\n    </div>\n    <div class=\"card-footer\" *ngIf=\"!readonly && removable\">\n        <button class=\"btn btn-sm btn-link btn-warning\" (click)=\"remove.emit(operation)\">\n            <clr-icon shape=\"times\"></clr-icon>\n            {{ 'common.remove' | translate }}\n        </button>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: ConfigurableInputComponent,
                        multi: true,
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef(() => ConfigurableInputComponent),
                        multi: true,
                    },
                ],
                styles: [":host{display:block;margin-bottom:12px}:host>.card{margin-top:6px}.operation-inputs{padding-top:0}.operation-inputs .arg-row:not(:last-child){margin-bottom:24px}.operation-inputs .arg-row label{margin-right:6px}.operation-inputs .hidden{display:none}"]
            },] }
];
ConfigurableInputComponent.propDecorators = {
    operation: [{ type: Input }],
    operationDefinition: [{ type: Input }],
    readonly: [{ type: Input }],
    removable: [{ type: Input }],
    remove: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhYmxlLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvY29uZmlndXJhYmxlLWlucHV0L2NvbmZpZ3VyYWJsZS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsTUFBTSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHSCxXQUFXLEVBQ1gsU0FBUyxFQUNULGFBQWEsRUFDYixpQkFBaUIsRUFHakIsVUFBVSxHQUNiLE1BQU0sZ0JBQWdCLENBQUM7QUFZeEIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDbEcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFFM0Y7O0dBRUc7QUFtQkgsTUFBTSxPQUFPLDBCQUEwQjtJQWxCdkM7UUFxQmEsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBeUIsQ0FBQztRQUM3RCxjQUFTLEdBQTRCLEVBQUUsQ0FBQztRQUd4QyxTQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUErRjdCLENBQUM7SUE1Rkcsc0JBQXNCO1FBQ2xCLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzFCLE9BQU8sc0JBQXNCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUU7YUFBTTtZQUNILE9BQU8sRUFBRSxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUks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LEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7b0JBQzNDLElBQUksRUFBRSxLQUFLO2lCQUNkLENBQUMsQ0FBQzthQUNOO1lBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNkLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNsQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFFBQVEsQ0FBQyxDQUFrQjtRQUN2QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ25CLE9BQU87Z0JBQ0gsUUFBUSxFQUFFLElBQUk7YUFDakIsQ0FBQztTQUNMO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7O1lBekhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyx1ckNBQWtEO2dCQUVsRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSwwQkFBMEI7d0JBQ3ZDLEtBQUssRUFBRSxJQUFJO3FCQUNkO29CQUNEO3dCQUNJLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDBCQUEwQixDQUFDO3dCQUN6RCxLQUFLLEVBQUUsSUFBSTtxQkFDZDtpQkFDSjs7YUFDSjs7O3dCQUVJLEtBQUs7a0NBQ0wsS0FBSzt1QkFDTCxLQUFLO3dCQUNMLEtBQUs7cUJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBYnN0cmFjdENvbnRyb2wsXG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgRm9ybUNvbnRyb2wsXG4gICAgRm9ybUdyb3VwLFxuICAgIE5HX1ZBTElEQVRPUlMsXG4gICAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgVmFsaWRhdGlvbkVycm9ycyxcbiAgICBWYWxpZGF0b3IsXG4gICAgVmFsaWRhdG9ycyxcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29uZmlnQXJnVHlwZSB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXR5cGVzJztcbmltcG9ydCB7IGFzc2VydE5ldmVyIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IElucHV0Q29tcG9uZW50Q29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2NvbXBvbmVudC1yZWdpc3RyeS10eXBlcyc7XG5pbXBvcnQge1xuICAgIENvbmZpZ0FyZyxcbiAgICBDb25maWdBcmdEZWZpbml0aW9uLFxuICAgIENvbmZpZ3VyYWJsZU9wZXJhdGlvbixcbiAgICBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uLFxufSBmcm9tICcuLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IGdldERlZmF1bHRDb25maWdBcmdWYWx1ZSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi91dGlsaXRpZXMvY29uZmlndXJhYmxlLW9wZXJhdGlvbi11dGlscyc7XG5pbXBvcnQgeyBpbnRlcnBvbGF0ZURlc2NyaXB0aW9uIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL3V0aWxpdGllcy9pbnRlcnBvbGF0ZS1kZXNjcmlwdGlvbic7XG5cbi8qKlxuICogQSBmb3JtIGlucHV0IHdoaWNoIHJlbmRlcnMgYSBjYXJkIHdpdGggdGhlIGludGVybmFsIGZvcm0gZmllbGRzIG9mIHRoZSBnaXZlbiBDb25maWd1cmFibGVPcGVyYXRpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWNvbmZpZ3VyYWJsZS1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpZ3VyYWJsZS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29uZmlndXJhYmxlLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IENvbmZpZ3VyYWJsZUlucHV0Q29tcG9uZW50LFxuICAgICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDb25maWd1cmFibGVJbnB1dENvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmFibGVJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcbiAgICBASW5wdXQoKSBvcGVyYXRpb24/OiBDb25maWd1cmFibGVPcGVyYXRpb247XG4gICAgQElucHV0KCkgb3BlcmF0aW9uRGVmaW5pdGlvbj86IENvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZmluaXRpb247XG4gICAgQElucHV0KCkgcmVhZG9ubHkgPSBmYWxzZTtcbiAgICBASW5wdXQoKSByZW1vdmFibGUgPSB0cnVlO1xuICAgIEBPdXRwdXQoKSByZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPENvbmZpZ3VyYWJsZU9wZXJhdGlvbj4oKTtcbiAgICBhcmdWYWx1ZXM6IHsgW25hbWU6IHN0cmluZ106IGFueSB9ID0ge307XG4gICAgb25DaGFuZ2U6ICh2YWw6IGFueSkgPT4gdm9pZDtcbiAgICBvblRvdWNoOiAoKSA9PiB2b2lkO1xuICAgIGZvcm0gPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgaW50ZXJwb2xhdGVEZXNjcmlwdGlvbigpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5vcGVyYXRpb25EZWZpbml0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJwb2xhdGVEZXNjcmlwdGlvbih0aGlzLm9wZXJhdGlvbkRlZmluaXRpb24sIHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICgnb3BlcmF0aW9uJyBpbiBjaGFuZ2VzIHx8ICdvcGVyYXRpb25EZWZpbml0aW9uJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChpc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm0uZGlzYWJsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JtLmVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtLnBhdGNoVmFsdWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhY2tCeU5hbWUoaW5kZXg6IG51bWJlciwgYXJnOiBDb25maWdBcmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYXJnLm5hbWU7XG4gICAgfVxuXG4gICAgZ2V0QXJnRGVmKGFyZzogQ29uZmlnQXJnKTogQ29uZmlnQXJnRGVmaW5pdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbkRlZmluaXRpb24/LmFyZ3MuZmluZChhID0+IGEubmFtZSA9PT0gYXJnLm5hbWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRm9ybSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wZXJhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvcm0gPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICAgICAgKHRoaXMuZm9ybSBhcyBhbnkpLl9faWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMTApO1xuXG4gICAgICAgIGlmICh0aGlzLm9wZXJhdGlvbi5hcmdzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiB0aGlzLm9wZXJhdGlvbkRlZmluaXRpb24/LmFyZ3MgfHwgW10pIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IGFueSA9IHRoaXMub3BlcmF0aW9uLmFyZ3MuZmluZChhID0+IGEubmFtZSA9PT0gYXJnLm5hbWUpPy52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGdldERlZmF1bHRDb25maWdBcmdWYWx1ZShhcmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gYXJnLmxpc3QgPyB1bmRlZmluZWQgOiBhcmcucmVxdWlyZWQgPyBWYWxpZGF0b3JzLnJlcXVpcmVkIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKGFyZy5uYW1lLCBuZXcgRm9ybUNvbnRyb2wodmFsdWUsIHZhbGlkYXRvcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgY29kZTogdGhpcy5vcGVyYXRpb24gJiYgdGhpcy5vcGVyYXRpb24uY29kZSxcbiAgICAgICAgICAgICAgICAgICAgYXJnczogdmFsdWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5vblRvdWNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblRvdWNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICAgICAgaWYgKHRoaXMuZm9ybS5pbnZhbGlkKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4iXX0=