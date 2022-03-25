import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { map, tap } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
export class ChannelAssignmentControlComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.multiple = true;
        this.includeDefaultChannel = true;
        this.disableChannelIds = [];
        this.value = [];
        this.disabled = false;
    }
    ngOnInit() {
        this.channels$ = this.dataService.client.userStatus().single$.pipe(map(({ userStatus }) => userStatus.channels.filter(c => this.includeDefaultChannel ? true : c.code !== DEFAULT_CHANNEL_CODE)), tap(channels => (this.channels = channels)));
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    writeValue(obj) {
        var _a;
        if (Array.isArray(obj)) {
            if (typeof obj[0] === 'string') {
                this.value = obj.map(id => { var _a; return (_a = this.channels) === null || _a === void 0 ? void 0 : _a.find(c => c.id === id); }).filter(notNullOrUndefined);
            }
            else {
                this.value = obj;
            }
        }
        else {
            if (typeof obj === 'string') {
                const channel = (_a = this.channels) === null || _a === void 0 ? void 0 : _a.find(c => c.id === obj);
                if (channel) {
                    this.value = [channel];
                }
            }
            else if (obj && obj.id) {
                this.value = [obj];
            }
        }
    }
    focussed() {
        if (this.onTouched) {
            this.onTouched();
        }
    }
    channelIsDisabled(id) {
        return this.disableChannelIds.includes(id);
    }
    valueChanged(value) {
        if (Array.isArray(value)) {
            this.onChange(value.map(c => c.id));
        }
        else {
            this.onChange([value ? value.id : undefined]);
        }
    }
    compareFn(c1, c2) {
        const c1id = typeof c1 === 'string' ? c1 : c1.id;
        const c2id = typeof c2 === 'string' ? c2 : c2.id;
        return c1id === c2id;
    }
}
ChannelAssignmentControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-channel-assignment-control',
                template: "<ng-select\n    appendTo=\"body\"\n    [addTag]=\"false\"\n    [multiple]=\"multiple\"\n    [ngModel]=\"value\"\n    [clearable]=\"false\"\n    [searchable]=\"false\"\n    [disabled]=\"disabled\"\n    [compareWith]=\"compareFn\"\n    (focus)=\"focussed()\"\n    (change)=\"valueChanged($event)\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <span aria-hidden=\"true\" class=\"ng-value-icon left\" (click)=\"clear(item)\"> \u00D7 </span>\n        <vdr-channel-badge [channelCode]=\"item.code\"></vdr-channel-badge>\n        <span class=\"channel-label\">{{ item.code | channelCodeToLabel | translate }}</span>\n    </ng-template>\n    <ng-option *ngFor=\"let item of channels$ | async\" [value]=\"item\" [disabled]=\"channelIsDisabled(item.id)\">\n        <vdr-channel-badge [channelCode]=\"item.code\"></vdr-channel-badge>\n        {{ item.code | channelCodeToLabel | translate }}\n    </ng-option>\n</ng-select>\n\n",
                changeDetection: ChangeDetectionStrategy.Default,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: ChannelAssignmentControlComponent,
                        multi: true,
                    },
                ],
                styles: [":host{min-width:200px}:host.clr-input{border-bottom:none;padding:0}::ng-deep .ng-option>vdr-channel-badge,::ng-deep .ng-value>vdr-channel-badge{margin-bottom:-1px}::ng-deep .ng-value>vdr-channel-badge{margin-left:6px}.channel-label{margin-right:6px}"]
            },] }
];
ChannelAssignmentControlComponent.ctorParameters = () => [
    { type: DataService }
];
ChannelAssignmentControlComponent.propDecorators = {
    multiple: [{ type: Input }],
    includeDefaultChannel: [{ type: Input }],
    disableChannelIds: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC1hc3NpZ25tZW50LWNvbnRyb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9jaGFubmVsLWFzc2lnbm1lbnQtY29udHJvbC9jaGFubmVsLWFzc2lnbm1lbnQtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBZW5FLE1BQU0sT0FBTyxpQ0FBaUM7SUFZMUMsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFYbkMsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQiwwQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDN0Isc0JBQWlCLEdBQWEsRUFBRSxDQUFDO1FBRzFDLFVBQUssR0FBeUIsRUFBRSxDQUFDO1FBQ2pDLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFLOEIsQ0FBQztJQUVoRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUM5RCxHQUFHLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FDbkIsVUFBVSxDQUFD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QUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2pELE9BQU8sSUFBSSxLQUFLLElBQUksQ0FBQztJQUN6QixDQUFDOzs7WUEzRkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLHE4QkFBMEQ7Z0JBRTFELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2dCQUNoRCxTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLGlDQUFpQzt3QkFDOUMsS0FBSyxFQUFFLElBQUk7cUJBQ2Q7aUJBQ0o7O2FBQ0o7OztZQWRRLFdBQVc7Ozt1QkFnQmYsS0FBSztvQ0FDTCxLQUFLO2dDQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBERUZBVUxUX0NIQU5ORUxfQ09ERSB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBub3ROdWxsT3JVbmRlZmluZWQgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC11dGlscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQ2hhbm5lbCwgQ3VycmVudFVzZXJDaGFubmVsIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWNoYW5uZWwtYXNzaWdubWVudC1jb250cm9sJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2hhbm5lbC1hc3NpZ25tZW50LWNvbnRyb2wuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NoYW5uZWwtYXNzaWdubWVudC1jb250cm9sLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBDaGFubmVsQXNzaWdubWVudENvbnRyb2xDb21wb25lbnQsXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDaGFubmVsQXNzaWdubWVudENvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBASW5wdXQoKSBtdWx0aXBsZSA9IHRydWU7XG4gICAgQElucHV0KCkgaW5jbHVkZURlZmF1bHRDaGFubmVsID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBkaXNhYmxlQ2hhbm5lbElkczogc3RyaW5nW10gPSBbXTtcblxuICAgIGNoYW5uZWxzJDogT2JzZXJ2YWJsZTxDdXJyZW50VXNlckNoYW5uZWxbXT47XG4gICAgdmFsdWU6IEN1cnJlbnRVc2VyQ2hhbm5lbFtdID0gW107XG4gICAgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZDtcbiAgICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZDtcbiAgICBwcml2YXRlIGNoYW5uZWxzOiBDdXJyZW50VXNlckNoYW5uZWxbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2hhbm5lbHMkID0gdGhpcy5kYXRhU2VydmljZS5jbGllbnQudXNlclN0YXR1cygpLnNpbmdsZSQucGlwZShcbiAgICAgICAgICAgIG1hcCgoeyB1c2VyU3RhdHVzIH0pID0+XG4gICAgICAgICAgICAgICAgdXNlclN0YXR1cy5jaGFubmVscy5maWx0ZXIoYyA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluY2x1ZGVEZWZhdWx0Q2hhbm5lbCA/IHRydWUgOiBjLmNvZGUgIT09IERFRkFVTFRfQ0hBTk5FTF9DT0RFLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdGFwKGNoYW5uZWxzID0+ICh0aGlzLmNoYW5uZWxzID0gY2hhbm5lbHMpKSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZShvYmo6IHVua25vd24pOiB2b2lkIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG9iai5tYXAoaWQgPT4gdGhpcy5jaGFubmVscz8uZmluZChjID0+IGMuaWQgPT09IGlkKSkuZmlsdGVyKG5vdE51bGxPclVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBvYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy5jaGFubmVscz8uZmluZChjID0+IGMuaWQgPT09IG9iaik7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFtjaGFubmVsXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iaiAmJiAob2JqIGFzIGFueSkuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gW29iaiBhcyBhbnldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXNzZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uVG91Y2hlZCkge1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5uZWxJc0Rpc2FibGVkKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZUNoYW5uZWxJZHMuaW5jbHVkZXMoaWQpO1xuICAgIH1cblxuICAgIHZhbHVlQ2hhbmdlZCh2YWx1ZTogQ3VycmVudFVzZXJDaGFubmVsW10gfCBDdXJyZW50VXNlckNoYW5uZWwgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlLm1hcChjID0+IGMuaWQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoW3ZhbHVlID8gdmFsdWUuaWQgOiB1bmRlZmluZWRdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBhcmVGbihjMTogQ2hhbm5lbCB8IHN0cmluZywgYzI6IENoYW5uZWwgfCBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgYzFpZCA9IHR5cGVvZiBjMSA9PT0gJ3N0cmluZycgPyBjMSA6IGMxLmlkO1xuICAgICAgICBjb25zdCBjMmlkID0gdHlwZW9mIGMyID09PSAnc3RyaW5nJyA/IGMyIDogYzIuaWQ7XG4gICAgICAgIHJldHVybiBjMWlkID09PSBjMmlkO1xuICAgIH1cbn1cbiJdfQ==