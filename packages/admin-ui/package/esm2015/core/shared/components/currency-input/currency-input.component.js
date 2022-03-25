import { ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
/**
 * A form input control which displays currency in decimal format, whilst working
 * with the integer cent value in the background.
 */
export class CurrencyInputComponent {
    constructor(dataService, changeDetectorRef) {
        this.dataService = dataService;
        this.changeDetectorRef = changeDetectorRef;
        this.disabled = false;
        this.readonly = false;
        this.currencyCode = '';
        this.valueChange = new EventEmitter();
        this.currencyCode$ = new BehaviorSubject('');
    }
    ngOnInit() {
        const languageCode$ = this.dataService.client.uiState().mapStream(data => data.uiState.language);
        const shouldPrefix$ = combineLatest(languageCode$, this.currencyCode$).pipe(map(([languageCode, currencyCode]) => {
            if (!currencyCode) {
                return '';
            }
            const locale = languageCode.replace(/_/g, '-');
            const localised = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currencyCode,
                currencyDisplay: 'symbol',
            }).format(undefined);
            return localised.indexOf('NaN') > 0;
        }));
        this.prefix$ = shouldPrefix$.pipe(map(shouldPrefix => (shouldPrefix ? this.currencyCode : '')));
        this.suffix$ = shouldPrefix$.pipe(map(shouldPrefix => (shouldPrefix ? '' : this.currencyCode)));
    }
    ngOnChanges(changes) {
        if ('value' in changes) {
            this.writeValue(changes['value'].currentValue);
        }
        if ('currencyCode' in changes) {
            this.currencyCode$.next(this.currencyCode);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    onInput(value) {
        const integerValue = Math.round(+value * 100);
        if (typeof this.onChange === 'function') {
            this.onChange(integerValue);
        }
        this.valueChange.emit(integerValue);
        const delta = Math.abs(Number(this._decimalValue) - Number(value));
        if (0.009 < delta && delta < 0.011) {
            this._decimalValue = this.toNumericString(value);
        }
        else {
            this._decimalValue = value;
        }
    }
    onFocus() {
        if (typeof this.onTouch === 'function') {
            this.onTouch();
        }
    }
    writeValue(value) {
        const numericValue = +value;
        if (!Number.isNaN(numericValue)) {
            this._decimalValue = this.toNumericString(Math.floor(value) / 100);
        }
    }
    toNumericString(value) {
        return Number(value).toFixed(2);
    }
}
CurrencyInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-currency-input',
                template: "<vdr-affixed-input\n    [prefix]=\"prefix$ | async | localeCurrencyName: 'symbol'\"\n    [suffix]=\"suffix$ | async | localeCurrencyName: 'symbol'\"\n>\n    <input\n        type=\"number\"\n        step=\"0.01\"\n        [value]=\"_decimalValue\"\n        [disabled]=\"disabled\"\n        [readonly]=\"readonly\"\n        (input)=\"onInput($event.target.value)\"\n        (focus)=\"onFocus()\"\n    />\n</vdr-affixed-input>\n",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: CurrencyInputComponent,
                        multi: true,
                    },
                ],
                styles: [":host{padding:0;border:none}input{max-width:96px}input[readonly]{background-color:transparent}"]
            },] }
];
CurrencyInputComponent.ctorParameters = () => [
    { type: DataService },
    { type: ChangeDetectorRef }
];
CurrencyInputComponent.propDecorators = {
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    value: [{ type: Input }],
    currencyCode: [{ type: Input }],
    valueChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9jdXJyZW5jeS1pbnB1dC9jdXJyZW5jeS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFbkU7OztHQUdHO0FBYUgsTUFBTSxPQUFPLHNCQUFzQjtJQWEvQixZQUFvQixXQUF3QixFQUFVLGlCQUFvQztRQUF0RSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFaakYsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU1uQyxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBRXFDLENBQUM7SUFFOUYsUUFBUTtRQUNKLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENB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QUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtZQUNwQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVU7UUFDakIsTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDdEU7SUFDTCxDQUFDO0lBRU8sZUFBZSxDQUFDLEtBQXNCO1FBQzFDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUFqR0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLHFiQUE4QztnQkFFOUMsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxzQkFBc0I7d0JBQ25DLEtBQUssRUFBRSxJQUFJO3FCQUNkO2lCQUNKOzthQUNKOzs7WUFqQlEsV0FBVztZQWJoQixpQkFBaUI7Ozt1QkFnQ2hCLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5cbi8qKlxuICogQSBmb3JtIGlucHV0IGNvbnRyb2wgd2hpY2ggZGlzcGxheXMgY3VycmVuY3kgaW4gZGVjaW1hbCBmb3JtYXQsIHdoaWxzdCB3b3JraW5nXG4gKiB3aXRoIHRoZSBpbnRlZ2VyIGNlbnQgdmFsdWUgaW4gdGhlIGJhY2tncm91bmQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWN1cnJlbmN5LWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY3VycmVuY3ktaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2N1cnJlbmN5LWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IEN1cnJlbmN5SW5wdXRDb21wb25lbnQsXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDdXJyZW5jeUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5ID0gZmFsc2U7XG4gICAgQElucHV0KCkgdmFsdWU6IG51bWJlcjtcbiAgICBASW5wdXQoKSBjdXJyZW5jeUNvZGUgPSAnJztcbiAgICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgcHJlZml4JDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgIHN1ZmZpeCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgICBvbkNoYW5nZTogKHZhbDogYW55KSA9PiB2b2lkO1xuICAgIG9uVG91Y2g6ICgpID0+IHZvaWQ7XG4gICAgX2RlY2ltYWxWYWx1ZTogc3RyaW5nO1xuICAgIHByaXZhdGUgY3VycmVuY3lDb2RlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSwgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2VDb2RlJCA9IHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50LnVpU3RhdGUoKS5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLnVpU3RhdGUubGFuZ3VhZ2UpO1xuICAgICAgICBjb25zdCBzaG91bGRQcmVmaXgkID0gY29tYmluZUxhdGVzdChsYW5ndWFnZUNvZGUkLCB0aGlzLmN1cnJlbmN5Q29kZSQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKFtsYW5ndWFnZUNvZGUsIGN1cnJlbmN5Q29kZV0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbmN5Q29kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsZSA9IGxhbmd1YWdlQ29kZS5yZXBsYWNlKC9fL2csICctJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYWxpc2VkID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KGxvY2FsZSwge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IGN1cnJlbmN5Q29kZSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVuY3lEaXNwbGF5OiAnc3ltYm9sJyxcbiAgICAgICAgICAgICAgICB9KS5mb3JtYXQodW5kZWZpbmVkIGFzIGFueSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsaXNlZC5pbmRleE9mKCdOYU4nKSA+IDA7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wcmVmaXgkID0gc2hvdWxkUHJlZml4JC5waXBlKG1hcChzaG91bGRQcmVmaXggPT4gKHNob3VsZFByZWZpeCA/IHRoaXMuY3VycmVuY3lDb2RlIDogJycpKSk7XG4gICAgICAgIHRoaXMuc3VmZml4JCA9IHNob3VsZFByZWZpeCQucGlwZShtYXAoc2hvdWxkUHJlZml4ID0+IChzaG91bGRQcmVmaXggPyAnJyA6IHRoaXMuY3VycmVuY3lDb2RlKSkpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCd2YWx1ZScgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy53cml0ZVZhbHVlKGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJ2N1cnJlbmN5Q29kZScgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW5jeUNvZGUkLm5leHQodGhpcy5jdXJyZW5jeUNvZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25Ub3VjaCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBvbklucHV0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgaW50ZWdlclZhbHVlID0gTWF0aC5yb3VuZCgrdmFsdWUgKiAxMDApO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoaW50ZWdlclZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQoaW50ZWdlclZhbHVlKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBNYXRoLmFicyhOdW1iZXIodGhpcy5fZGVjaW1hbFZhbHVlKSAtIE51bWJlcih2YWx1ZSkpO1xuICAgICAgICBpZiAoMC4wMDkgPCBkZWx0YSAmJiBkZWx0YSA8IDAuMDExKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWNpbWFsVmFsdWUgPSB0aGlzLnRvTnVtZXJpY1N0cmluZyh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kZWNpbWFsVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vblRvdWNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCBudW1lcmljVmFsdWUgPSArdmFsdWU7XG4gICAgICAgIGlmICghTnVtYmVyLmlzTmFOKG51bWVyaWNWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlY2ltYWxWYWx1ZSA9IHRoaXMudG9OdW1lcmljU3RyaW5nKE1hdGguZmxvb3IodmFsdWUpIC8gMTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdG9OdW1lcmljU3RyaW5nKHZhbHVlOiBudW1iZXIgfCBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKS50b0ZpeGVkKDIpO1xuICAgIH1cbn1cbiJdfQ==