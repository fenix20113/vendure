import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { flattenFacetValues } from '../../../common/utilities/flatten-facet-values';
import { DataService } from '../../../data/providers/data.service';
export class FacetValueSelectorComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.selectedValuesChange = new EventEmitter();
        this.readonly = false;
        this.facetValues = [];
        this.disabled = false;
        this.toSelectorItem = (facetValue) => {
            return {
                name: facetValue.name,
                facetName: facetValue.facet.name,
                id: facetValue.id,
                value: facetValue,
            };
        };
    }
    ngOnInit() {
        this.facetValues = flattenFacetValues(this.facets).map(this.toSelectorItem);
    }
    onChange(selected) {
        if (this.readonly) {
            return;
        }
        this.selectedValuesChange.emit(selected.map(s => s.value));
        if (this.onChangeFn) {
            this.onChangeFn(JSON.stringify(selected.map(s => s.id)));
        }
    }
    registerOnChange(fn) {
        this.onChangeFn = fn;
    }
    registerOnTouched(fn) {
        this.onTouchFn = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    focus() {
        this.ngSelect.focus();
    }
    writeValue(obj) {
        if (typeof obj === 'string') {
            try {
                const facetIds = JSON.parse(obj);
                this.value = facetIds;
            }
            catch (err) {
                // TODO: log error
                throw err;
            }
        }
        else if (Array.isArray(obj)) {
            const isIdArray = (input) => input.every(i => typeof i === 'number' || typeof i === 'string');
            if (isIdArray(obj)) {
                this.value = obj.map(fv => fv.toString());
            }
            else {
                this.value = obj.map(fv => fv.id);
            }
        }
    }
}
FacetValueSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-facet-value-selector',
                template: "<ng-select\n    [items]=\"facetValues\"\n    [addTag]=\"false\"\n    [hideSelected]=\"true\"\n    bindValue=\"id\"\n    multiple=\"true\"\n    appendTo=\"body\"\n    bindLabel=\"name\"\n    [disabled]=\"disabled || readonly\"\n    [ngModel]=\"value\"\n    (change)=\"onChange($event)\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <vdr-facet-value-chip\n            [facetValue]=\"item.value\"\n            [removable]=\"!readonly\"\n            (remove)=\"clear(item)\"\n        ></vdr-facet-value-chip>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <vdr-facet-value-chip [facetValue]=\"item.value\" [removable]=\"false\"></vdr-facet-value-chip>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: FacetValueSelectorComponent,
                        multi: true,
                    },
                ],
                styles: [":host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}"]
            },] }
];
FacetValueSelectorComponent.ctorParameters = () => [
    { type: DataService }
];
FacetValueSelectorComponent.propDecorators = {
    selectedValuesChange: [{ type: Output }],
    facets: [{ type: Input }],
    readonly: [{ type: Input }],
    ngSelect: [{ type: ViewChild, args: [NgSelectComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtdmFsdWUtc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9mYWNldC12YWx1ZS1zZWxlY3Rvci9mYWNldC12YWx1ZS1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNwRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFzQm5FLE1BQU0sT0FBTywyQkFBMkI7SUFZcEMsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFYbEMseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQXlCLENBQUM7UUFFbEUsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUkxQixnQkFBVyxHQUE0QixFQUFFLENBQUM7UUFHMUMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQXNEVCxtQkFBYyxHQUFHLENBQUMsVUFBK0IsRUFBeUIsRUFBRTtZQUNoRixPQUFPO2dCQUNILElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTtnQkFDckIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSTtnQkFDaEMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxFQUFFO2dCQUNqQixLQUFLLEVBQUUsVUFBVTthQUNwQixDQUFDO1FBQ04sQ0FBQyxDQUFDO0lBM0Q2QyxDQUFDO0lBRWhELFFBQVE7UUFDSixJQUFJLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxRQUFRLENBQUMsUUFBaUM7UUFDdEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1RDtJQUNMLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFPO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFtRTtRQUMxRSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUN6QixJQUFJO2dCQUNBLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFhLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO2FBQ3pCO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1Ysa0JBQWtCO2dCQUNsQixNQUFNLEdBQUcsQ0FBQzthQUNiO1NBQ0o7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0IsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFnQixFQUFtQyxFQUFFLENBQ3BFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUM7WUFDckUsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQzdDO2lCQUFNO2dCQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNyQztTQUNKO0lBQ0wsQ0FBQzs7O1lBM0VKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyw2dkJBQW9EO2dCQUVwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSwyQkFBMkI7d0JBQ3hDLEtBQUssRUFBRSxJQUFJO3FCQUNkO2lCQUNKOzthQUNKOzs7WUFyQlEsV0FBVzs7O21DQXVCZixNQUFNO3FCQUNOLEtBQUs7dUJBQ0wsS0FBSzt1QkFFTCxTQUFTLFNBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE5nU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnQG5nLXNlbGVjdC9uZy1zZWxlY3QnO1xuXG5pbXBvcnQgeyBGYWNldFZhbHVlLCBGYWNldFdpdGhWYWx1ZXMgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IGZsYXR0ZW5GYWNldFZhbHVlcyB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi91dGlsaXRpZXMvZmxhdHRlbi1mYWNldC12YWx1ZXMnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuXG5leHBvcnQgdHlwZSBGYWNldFZhbHVlU2VsZXRvckl0ZW0gPSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGZhY2V0TmFtZTogc3RyaW5nO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdmFsdWU6IEZhY2V0VmFsdWUuRnJhZ21lbnQ7XG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1mYWNldC12YWx1ZS1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ZhY2V0LXZhbHVlLXNlbGVjdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9mYWNldC12YWx1ZS1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBGYWNldFZhbHVlU2VsZWN0b3JDb21wb25lbnQsXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBGYWNldFZhbHVlU2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWRWYWx1ZXNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEZhY2V0VmFsdWUuRnJhZ21lbnRbXT4oKTtcbiAgICBASW5wdXQoKSBmYWNldHM6IEZhY2V0V2l0aFZhbHVlcy5GcmFnbWVudFtdO1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5ID0gZmFsc2U7XG5cbiAgICBAVmlld0NoaWxkKE5nU2VsZWN0Q29tcG9uZW50KSBwcml2YXRlIG5nU2VsZWN0OiBOZ1NlbGVjdENvbXBvbmVudDtcblxuICAgIGZhY2V0VmFsdWVzOiBGYWNldFZhbHVlU2VsZXRvckl0ZW1bXSA9IFtdO1xuICAgIG9uQ2hhbmdlRm46ICh2YWw6IGFueSkgPT4gdm9pZDtcbiAgICBvblRvdWNoRm46ICgpID0+IHZvaWQ7XG4gICAgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB2YWx1ZTogc3RyaW5nW107XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5mYWNldFZhbHVlcyA9IGZsYXR0ZW5GYWNldFZhbHVlcyh0aGlzLmZhY2V0cykubWFwKHRoaXMudG9TZWxlY3Rvckl0ZW0pO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlKHNlbGVjdGVkOiBGYWNldFZhbHVlU2VsZXRvckl0ZW1bXSkge1xuICAgICAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZXNDaGFuZ2UuZW1pdChzZWxlY3RlZC5tYXAocyA9PiBzLnZhbHVlKSk7XG4gICAgICAgIGlmICh0aGlzLm9uQ2hhbmdlRm4pIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VGbihKU09OLnN0cmluZ2lmeShzZWxlY3RlZC5tYXAocyA9PiBzLmlkKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VGbiA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoRm4gPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIHRoaXMubmdTZWxlY3QuZm9jdXMoKTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKG9iajogc3RyaW5nIHwgRmFjZXRWYWx1ZS5GcmFnbWVudFtdIHwgQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZhY2V0SWRzID0gSlNPTi5wYXJzZShvYmopIGFzIHN0cmluZ1tdO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBmYWNldElkcztcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGxvZyBlcnJvclxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzSWRBcnJheSA9IChpbnB1dDogdW5rbm93bltdKTogaW5wdXQgaXMgQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiA9PlxuICAgICAgICAgICAgICAgIGlucHV0LmV2ZXJ5KGkgPT4gdHlwZW9mIGkgPT09ICdudW1iZXInIHx8IHR5cGVvZiBpID09PSAnc3RyaW5nJyk7XG4gICAgICAgICAgICBpZiAoaXNJZEFycmF5KG9iaikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gb2JqLm1hcChmdiA9PiBmdi50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG9iai5tYXAoZnYgPT4gZnYuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b1NlbGVjdG9ySXRlbSA9IChmYWNldFZhbHVlOiBGYWNldFZhbHVlLkZyYWdtZW50KTogRmFjZXRWYWx1ZVNlbGV0b3JJdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IGZhY2V0VmFsdWUubmFtZSxcbiAgICAgICAgICAgIGZhY2V0TmFtZTogZmFjZXRWYWx1ZS5mYWNldC5uYW1lLFxuICAgICAgICAgICAgaWQ6IGZhY2V0VmFsdWUuaWQsXG4gICAgICAgICAgICB2YWx1ZTogZmFjZXRWYWx1ZSxcbiAgICAgICAgfTtcbiAgICB9O1xufVxuIl19