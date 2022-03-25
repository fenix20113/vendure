import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgSelectComponent, SELECTION_MODEL_FACTORY } from '@ng-select/ng-select';
import { SingleSearchSelectionModelFactory } from '@vendure/admin-ui/core';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
const ɵ0 = SingleSearchSelectionModelFactory;
export class ProductSearchInputComponent {
    constructor() {
        this.searchTermChange = new EventEmitter();
        this.facetValueChange = new EventEmitter();
        this.lastTerm = '';
        this.lastFacetValueIds = [];
        this.filterFacetResults = (term, item) => {
            if (!this.isFacetValueItem(item)) {
                return false;
            }
            return (item.facetValue.name.toLowerCase().startsWith(term.toLowerCase()) ||
                item.facetValue.facet.name.toLowerCase().startsWith(term.toLowerCase()));
        };
        this.isFacetValueItem = (input) => {
            return typeof input === 'object' && !!input && input.hasOwnProperty('facetValue');
        };
    }
    setSearchTerm(term) {
        if (term) {
            this.selectComponent.select({ label: term, value: { label: term } });
        }
        else {
            const currentTerm = this.selectComponent.selectedItems.find(i => !this.isFacetValueItem(i.value));
            if (currentTerm) {
                this.selectComponent.unselect(currentTerm);
            }
        }
    }
    setFacetValues(ids) {
        const items = this.selectComponent.items;
        this.selectComponent.selectedItems.forEach(item => {
            if (this.isFacetValueItem(item.value) && !ids.includes(item.value.facetValue.id)) {
                this.selectComponent.unselect(item);
            }
        });
        ids.map(id => {
            return items.find(item => this.isFacetValueItem(item) && item.facetValue.id === id);
        })
            .filter(notNullOrUndefined)
            .forEach(item => {
            const isSelected = this.selectComponent.selectedItems.find(i => {
                const val = i.value;
                if (this.isFacetValueItem(val)) {
                    return val.facetValue.id === item.facetValue.id;
                }
                return false;
            });
            if (!isSelected) {
                this.selectComponent.select({ label: '', value: item });
            }
        });
    }
    onSelectChange(selectedItems) {
        if (!Array.isArray(selectedItems)) {
            selectedItems = [selectedItems];
        }
        const searchTermItem = selectedItems.find(item => !this.isFacetValueItem(item));
        const searchTerm = searchTermItem ? searchTermItem.label : '';
        const facetValueIds = selectedItems.filter(this.isFacetValueItem).map(i => i.facetValue.id);
        if (searchTerm !== this.lastTerm) {
            this.searchTermChange.emit(searchTerm);
            this.lastTerm = searchTerm;
        }
        if (this.lastFacetValueIds.join(',') !== facetValueIds.join(',')) {
            this.facetValueChange.emit(facetValueIds);
            this.lastFacetValueIds = facetValueIds;
        }
    }
    addTagFn(item) {
        return { label: item };
    }
    isSearchHeaderSelected() {
        return this.selectComponent.itemsList.markedIndex === -1;
    }
}
ProductSearchInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-search-input',
                template: "<ng-select\n    [addTag]=\"addTagFn\"\n    [placeholder]=\"'catalog.search-product-name-or-code' | translate\"\n    [items]=\"facetValueResults\"\n    [searchFn]=\"filterFacetResults\"\n    [hideSelected]=\"true\"\n    [multiple]=\"true\"\n    [markFirst]=\"false\"\n    (change)=\"onSelectChange($event)\"\n    #selectComponent\n>\n    <ng-template ng-header-tmp>\n        <div\n            class=\"search-header\"\n            *ngIf=\"selectComponent.searchTerm\"\n            [class.selected]=\"isSearchHeaderSelected()\"\n            (click)=\"selectComponent.selectTag()\"\n        >\n            {{ 'catalog.search-for-term' | translate }}: {{ selectComponent.searchTerm }}\n        </div>\n    </ng-template>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <ng-container *ngIf=\"item.facetValue\">\n            <vdr-facet-value-chip\n                [facetValue]=\"item.facetValue\"\n                [removable]=\"true\"\n                (remove)=\"clear(item)\"\n            ></vdr-facet-value-chip>\n        </ng-container>\n        <ng-container *ngIf=\"!item.facetValue\">\n            <vdr-chip [icon]=\"'times'\" (iconClick)=\"clear(item)\">\"{{ item.label }}\"</vdr-chip>\n        </ng-container>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\" let-search=\"searchTerm\">\n        <ng-container *ngIf=\"item.facetValue\">\n            <vdr-facet-value-chip [facetValue]=\"item.facetValue\" [removable]=\"false\"></vdr-facet-value-chip>\n        </ng-container>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{ provide: SELECTION_MODEL_FACTORY, useValue: ɵ0 }],
                styles: [":host{margin-top:6px;display:block;width:100%}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}ng-select{width:100%;min-width:300px;margin-right:12px}.search-header{padding:8px 10px;border-bottom:1px solid var(--color-component-border-100);cursor:pointer}.search-header.selected,.search-header:hover{background-color:var(--color-component-bg-200)}"]
            },] }
];
ProductSearchInputComponent.propDecorators = {
    facetValueResults: [{ type: Input }],
    searchTermChange: [{ type: Output }],
    facetValueChange: [{ type: Output }],
    selectComponent: [{ type: ViewChild, args: ['selectComponent', { static: true },] }]
};
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1zZWFyY2gtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jYXRhbG9nL3NyYy9jb21wb25lbnRzL3Byb2R1Y3Qtc2VhcmNoLWlucHV0L3Byb2R1Y3Qtc2VhcmNoLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRixPQUFPLEVBQWtCLGlDQUFpQyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDM0YsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7V0FPUixpQ0FBaUM7QUFFL0YsTUFBTSxPQUFPLDJCQUEyQjtJQVB4QztRQVNjLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDOUMscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUVsRCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2Qsc0JBQWlCLEdBQWEsRUFBRSxDQUFDO1FBd0N6Qyx1QkFBa0IsR0FBRyxDQUFDLElBQVksRUFBRSxJQUFvRCxFQUFFLEVBQUU7WUFDeEYsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxPQUFPLENBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFB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QkFBdUIsRUFBRSxRQUFRLElBQW1DLEVBQUUsQ0FBQzs7YUFDakc7OztnQ0FFSSxLQUFLOytCQUNMLE1BQU07K0JBQ04sTUFBTTs4QkFDTixTQUFTLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nU2VsZWN0Q29tcG9uZW50LCBTRUxFQ1RJT05fTU9ERUxfRkFDVE9SWSB9IGZyb20gJ0BuZy1zZWxlY3Qvbmctc2VsZWN0JztcbmltcG9ydCB7IFNlYXJjaFByb2R1Y3RzLCBTaW5nbGVTZWFyY2hTZWxlY3Rpb25Nb2RlbEZhY3RvcnkgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IG5vdE51bGxPclVuZGVmaW5lZCB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcHJvZHVjdC1zZWFyY2gtaW5wdXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcm9kdWN0LXNlYXJjaC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvZHVjdC1zZWFyY2gtaW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IFNFTEVDVElPTl9NT0RFTF9GQUNUT1JZLCB1c2VWYWx1ZTogU2luZ2xlU2VhcmNoU2VsZWN0aW9uTW9kZWxGYWN0b3J5IH1dLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0U2VhcmNoSW5wdXRDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIGZhY2V0VmFsdWVSZXN1bHRzOiBTZWFyY2hQcm9kdWN0cy5GYWNldFZhbHVlc1tdO1xuICAgIEBPdXRwdXQoKSBzZWFyY2hUZXJtQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgQE91dHB1dCgpIGZhY2V0VmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZ1tdPigpO1xuICAgIEBWaWV3Q2hpbGQoJ3NlbGVjdENvbXBvbmVudCcsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgc2VsZWN0Q29tcG9uZW50OiBOZ1NlbGVjdENvbXBvbmVudDtcbiAgICBwcml2YXRlIGxhc3RUZXJtID0gJyc7XG4gICAgcHJpdmF0ZSBsYXN0RmFjZXRWYWx1ZUlkczogc3RyaW5nW10gPSBbXTtcblxuICAgIHNldFNlYXJjaFRlcm0odGVybTogc3RyaW5nIHwgbnVsbCkge1xuICAgICAgICBpZiAodGVybSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQuc2VsZWN0KHsgbGFiZWw6IHRlcm0sIHZhbHVlOiB7IGxhYmVsOiB0ZXJtIH0gfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGVybSA9IHRoaXMuc2VsZWN0Q29tcG9uZW50LnNlbGVjdGVkSXRlbXMuZmluZChpID0+ICF0aGlzLmlzRmFjZXRWYWx1ZUl0ZW0oaS52YWx1ZSkpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXJtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQudW5zZWxlY3QoY3VycmVudFRlcm0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0RmFjZXRWYWx1ZXMoaWRzOiBzdHJpbmdbXSkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuc2VsZWN0Q29tcG9uZW50Lml0ZW1zO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50LnNlbGVjdGVkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRmFjZXRWYWx1ZUl0ZW0oaXRlbS52YWx1ZSkgJiYgIWlkcy5pbmNsdWRlcyhpdGVtLnZhbHVlLmZhY2V0VmFsdWUuaWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQudW5zZWxlY3QoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlkcy5tYXAoaWQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLmZpbmQoaXRlbSA9PiB0aGlzLmlzRmFjZXRWYWx1ZUl0ZW0oaXRlbSkgJiYgaXRlbS5mYWNldFZhbHVlLmlkID09PSBpZCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKG5vdE51bGxPclVuZGVmaW5lZClcbiAgICAgICAgICAgIC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdENvbXBvbmVudC5zZWxlY3RlZEl0ZW1zLmZpbmQoaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGkudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRmFjZXRWYWx1ZUl0ZW0odmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5mYWNldFZhbHVlLmlkID09PSBpdGVtLmZhY2V0VmFsdWUuaWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICghaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENvbXBvbmVudC5zZWxlY3QoeyBsYWJlbDogJycsIHZhbHVlOiBpdGVtIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpbHRlckZhY2V0UmVzdWx0cyA9ICh0ZXJtOiBzdHJpbmcsIGl0ZW06IFNlYXJjaFByb2R1Y3RzLkZhY2V0VmFsdWVzIHwgeyBsYWJlbDogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRmFjZXRWYWx1ZUl0ZW0oaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgaXRlbS5mYWNldFZhbHVlLm5hbWUudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKHRlcm0udG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgICAgICAgIGl0ZW0uZmFjZXRWYWx1ZS5mYWNldC5uYW1lLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCh0ZXJtLnRvTG93ZXJDYXNlKCkpXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIG9uU2VsZWN0Q2hhbmdlKHNlbGVjdGVkSXRlbXM6IEFycmF5PFNlYXJjaFByb2R1Y3RzLkZhY2V0VmFsdWVzIHwgeyBsYWJlbDogc3RyaW5nIH0+KSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzZWxlY3RlZEl0ZW1zKSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IFtzZWxlY3RlZEl0ZW1zXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWFyY2hUZXJtSXRlbSA9IHNlbGVjdGVkSXRlbXMuZmluZChpdGVtID0+ICF0aGlzLmlzRmFjZXRWYWx1ZUl0ZW0oaXRlbSkpIGFzXG4gICAgICAgICAgICB8IHsgbGFiZWw6IHN0cmluZyB9XG4gICAgICAgICAgICB8IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHNlYXJjaFRlcm1JdGVtID8gc2VhcmNoVGVybUl0ZW0ubGFiZWwgOiAnJztcblxuICAgICAgICBjb25zdCBmYWNldFZhbHVlSWRzID0gc2VsZWN0ZWRJdGVtcy5maWx0ZXIodGhpcy5pc0ZhY2V0VmFsdWVJdGVtKS5tYXAoaSA9PiBpLmZhY2V0VmFsdWUuaWQpO1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtICE9PSB0aGlzLmxhc3RUZXJtKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFRlcm1DaGFuZ2UuZW1pdChzZWFyY2hUZXJtKTtcbiAgICAgICAgICAgIHRoaXMubGFzdFRlcm0gPSBzZWFyY2hUZXJtO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxhc3RGYWNldFZhbHVlSWRzLmpvaW4oJywnKSAhPT0gZmFjZXRWYWx1ZUlkcy5qb2luKCcsJykpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjZXRWYWx1ZUNoYW5nZS5lbWl0KGZhY2V0VmFsdWVJZHMpO1xuICAgICAgICAgICAgdGhpcy5sYXN0RmFjZXRWYWx1ZUlkcyA9IGZhY2V0VmFsdWVJZHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRUYWdGbihpdGVtOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHsgbGFiZWw6IGl0ZW0gfTtcbiAgICB9XG5cbiAgICBpc1NlYXJjaEhlYWRlclNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RDb21wb25lbnQuaXRlbXNMaXN0Lm1hcmtlZEluZGV4ID09PSAtMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRmFjZXRWYWx1ZUl0ZW0gPSAoaW5wdXQ6IHVua25vd24pOiBpbnB1dCBpcyBTZWFyY2hQcm9kdWN0cy5GYWNldFZhbHVlcyA9PiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnICYmICEhaW5wdXQgJiYgaW5wdXQuaGFzT3duUHJvcGVydHkoJ2ZhY2V0VmFsdWUnKTtcbiAgICB9O1xufVxuIl19