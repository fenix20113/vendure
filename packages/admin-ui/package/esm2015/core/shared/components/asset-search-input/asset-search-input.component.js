import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgSelectComponent, SELECTION_MODEL_FACTORY } from '@ng-select/ng-select';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { SingleSearchSelectionModelFactory } from '../../../common/single-search-selection-model';
const ɵ0 = SingleSearchSelectionModelFactory;
export class AssetSearchInputComponent {
    constructor() {
        this.searchTermChange = new EventEmitter();
        this.tagsChange = new EventEmitter();
        this.lastTerm = '';
        this.lastTagIds = [];
        this.filterTagResults = (term, item) => {
            if (!this.isTag(item)) {
                return false;
            }
            return item.value.toLowerCase().startsWith(term.toLowerCase());
        };
        this.isTag = (input) => {
            return typeof input === 'object' && !!input && input.hasOwnProperty('value');
        };
    }
    setSearchTerm(term) {
        if (term) {
            this.selectComponent.select({ label: term, value: { label: term } });
        }
        else {
            const currentTerm = this.selectComponent.selectedItems.find(i => !this.isTag(i.value));
            if (currentTerm) {
                this.selectComponent.unselect(currentTerm);
            }
        }
    }
    setTags(tags) {
        const items = this.selectComponent.items;
        this.selectComponent.selectedItems.forEach(item => {
            if (this.isTag(item.value) && !tags.map(t => t.id).includes(item.id)) {
                this.selectComponent.unselect(item);
            }
        });
        tags.map(tag => {
            return items.find(item => this.isTag(item) && item.id === tag.id);
        })
            .filter(notNullOrUndefined)
            .forEach(item => {
            const isSelected = this.selectComponent.selectedItems.find(i => {
                const val = i.value;
                if (this.isTag(val)) {
                    return val.id === item.id;
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
        const searchTermItems = selectedItems.filter(item => !this.isTag(item));
        if (1 < searchTermItems.length) {
            for (let i = 0; i < searchTermItems.length - 1; i++) {
                // this.selectComponent.unselect(searchTermItems[i] as any);
            }
        }
        const searchTermItem = searchTermItems[searchTermItems.length - 1];
        const searchTerm = searchTermItem ? searchTermItem.label : '';
        const tags = selectedItems.filter(this.isTag);
        if (searchTerm !== this.lastTerm) {
            this.searchTermChange.emit(searchTerm);
            this.lastTerm = searchTerm;
        }
        if (this.lastTagIds.join(',') !== tags.map(t => t.id).join(',')) {
            this.tagsChange.emit(tags);
            this.lastTagIds = tags.map(t => t.id);
        }
    }
    isSearchHeaderSelected() {
        return this.selectComponent.itemsList.markedIndex === -1;
    }
    addTagFn(item) {
        return { label: item };
    }
}
AssetSearchInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-search-input',
                template: "<ng-select\n    [addTag]=\"addTagFn\"\n    [placeholder]=\"'catalog.search-asset-name-or-tag' | translate\"\n    [items]=\"tags\"\n    [searchFn]=\"filterTagResults\"\n    [hideSelected]=\"true\"\n    [multiple]=\"true\"\n    [markFirst]=\"false\"\n    (change)=\"onSelectChange($event)\"\n    #selectComponent\n>\n    <ng-template ng-header-tmp>\n        <div\n            class=\"search-header\"\n            *ngIf=\"selectComponent.searchTerm\"\n            [class.selected]=\"isSearchHeaderSelected()\"\n            (click)=\"selectComponent.selectTag()\"\n        >\n            {{ 'catalog.search-for-term' | translate }}: {{ selectComponent.searchTerm }}\n        </div>\n    </ng-template>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <ng-container *ngIf=\"item.value\">\n            <vdr-chip [colorFrom]=\"item.value\" icon=\"close\" (iconClick)=\"clear(item)\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ item.value }}</vdr-chip>\n        </ng-container>\n        <ng-container *ngIf=\"!item.value\">\n            <vdr-chip [icon]=\"'times'\" (iconClick)=\"clear(item)\">\"{{ item.label || item }}\"</vdr-chip>\n        </ng-container>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\" let-search=\"searchTerm\">\n        <ng-container *ngIf=\"item.value\">\n            <vdr-chip [colorFrom]=\"item.value\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ item.value }}</vdr-chip>\n        </ng-container>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{ provide: SELECTION_MODEL_FACTORY, useValue: ɵ0 }],
                styles: [":host{display:block;width:100%}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}ng-select{width:100%;min-width:300px;margin-right:12px}.search-header{padding:8px 10px;border-bottom:1px solid var(--color-component-border-100);cursor:pointer}.search-header.selected,.search-header:hover{background-color:var(--color-component-bg-200)}"]
            },] }
];
AssetSearchInputComponent.propDecorators = {
    tags: [{ type: Input }],
    searchTermChange: [{ type: Output }],
    tagsChange: [{ type: Output }],
    selectComponent: [{ type: ViewChild, args: ['selectComponent', { static: true },] }]
};
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQtc2VhcmNoLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2NvbXBvbmVudHMvYXNzZXQtc2VhcmNoLWlucHV0L2Fzc2V0LXNlYXJjaC1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0csT0FBTyxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFHdEUsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sK0NBQStDLENBQUM7V0FPcEMsaUNBQWlDO0FBRS9GLE1BQU0sT0FBTyx5QkFBeUI7SUFQdEM7UUFTYyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzlDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUVqRCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsZUFBVSxHQUFhLEVBQUUsQ0FBQztRQXdDbEMscUJBQWdCLEdBQUcsQ0FBQyxJQUFZLEVBQUUsSUFBb0QsRUFBRSxFQUFFO1lBQ3RGLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNuQixPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDO1FBd0NNLFVBQUssR0FBRyxDQUFDLEtBQWMsRUFBd0IsRUFBRTtZQUNyRCxPQUFPLE9BQU8s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QUM7SUFDM0IsQ0FBQzs7O1lBaEdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxnaERBQWtEO2dCQUVsRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxJQUFtQyxFQUFFLENBQUM7O2FBQ2pHOzs7bUJBRUksS0FBSzsrQkFDTCxNQUFNO3lCQUNOLE1BQU07OEJBQ04sU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1NlbGVjdENvbXBvbmVudCwgU0VMRUNUSU9OX01PREVMX0ZBQ1RPUlkgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQgeyBub3ROdWxsT3JVbmRlZmluZWQgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC11dGlscyc7XG5cbmltcG9ydCB7IFNlYXJjaFByb2R1Y3RzLCBUYWdGcmFnbWVudCB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHsgU2luZ2xlU2VhcmNoU2VsZWN0aW9uTW9kZWxGYWN0b3J5IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL3NpbmdsZS1zZWFyY2gtc2VsZWN0aW9uLW1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYXNzZXQtc2VhcmNoLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXNzZXQtc2VhcmNoLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hc3NldC1zZWFyY2gtaW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IFNFTEVDVElPTl9NT0RFTF9GQUNUT1JZLCB1c2VWYWx1ZTogU2luZ2xlU2VhcmNoU2VsZWN0aW9uTW9kZWxGYWN0b3J5IH1dLFxufSlcbmV4cG9ydCBjbGFzcyBBc3NldFNlYXJjaElucHV0Q29tcG9uZW50IHtcbiAgICBASW5wdXQoKSB0YWdzOiBUYWdGcmFnbWVudFtdO1xuICAgIEBPdXRwdXQoKSBzZWFyY2hUZXJtQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgQE91dHB1dCgpIHRhZ3NDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0ZyYWdtZW50W10+KCk7XG4gICAgQFZpZXdDaGlsZCgnc2VsZWN0Q29tcG9uZW50JywgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSBzZWxlY3RDb21wb25lbnQ6IE5nU2VsZWN0Q29tcG9uZW50O1xuICAgIHByaXZhdGUgbGFzdFRlcm0gPSAnJztcbiAgICBwcml2YXRlIGxhc3RUYWdJZHM6IHN0cmluZ1tdID0gW107XG5cbiAgICBzZXRTZWFyY2hUZXJtKHRlcm06IHN0cmluZyB8IG51bGwpIHtcbiAgICAgICAgaWYgKHRlcm0pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50LnNlbGVjdCh7IGxhYmVsOiB0ZXJtLCB2YWx1ZTogeyBsYWJlbDogdGVybSB9IH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFRlcm0gPSB0aGlzLnNlbGVjdENvbXBvbmVudC5zZWxlY3RlZEl0ZW1zLmZpbmQoaSA9PiAhdGhpcy5pc1RhZyhpLnZhbHVlKSk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFRlcm0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENvbXBvbmVudC51bnNlbGVjdChjdXJyZW50VGVybSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRUYWdzKHRhZ3M6IFRhZ0ZyYWdtZW50W10pIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLnNlbGVjdENvbXBvbmVudC5pdGVtcztcblxuICAgICAgICB0aGlzLnNlbGVjdENvbXBvbmVudC5zZWxlY3RlZEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1RhZyhpdGVtLnZhbHVlKSAmJiAhdGFncy5tYXAodCA9PiB0LmlkKS5pbmNsdWRlcyhpdGVtLmlkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50LnVuc2VsZWN0KGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0YWdzLm1hcCh0YWcgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLmZpbmQoaXRlbSA9PiB0aGlzLmlzVGFnKGl0ZW0pICYmIGl0ZW0uaWQgPT09IHRhZy5pZCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKG5vdE51bGxPclVuZGVmaW5lZClcbiAgICAgICAgICAgIC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdENvbXBvbmVudC5zZWxlY3RlZEl0ZW1zLmZpbmQoaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGkudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVGFnKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwuaWQgPT09IGl0ZW0uaWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICghaXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENvbXBvbmVudC5zZWxlY3QoeyBsYWJlbDogJycsIHZhbHVlOiBpdGVtIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpbHRlclRhZ1Jlc3VsdHMgPSAodGVybTogc3RyaW5nLCBpdGVtOiBTZWFyY2hQcm9kdWN0cy5GYWNldFZhbHVlcyB8IHsgbGFiZWw6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pc1RhZyhpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtLnZhbHVlLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCh0ZXJtLnRvTG93ZXJDYXNlKCkpO1xuICAgIH07XG5cbiAgICBvblNlbGVjdENoYW5nZShzZWxlY3RlZEl0ZW1zOiBBcnJheTxUYWdGcmFnbWVudCB8IHsgbGFiZWw6IHN0cmluZyB9Pikge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2VsZWN0ZWRJdGVtcykpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSBbc2VsZWN0ZWRJdGVtc107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWFyY2hUZXJtSXRlbXMgPSBzZWxlY3RlZEl0ZW1zLmZpbHRlcihpdGVtID0+ICF0aGlzLmlzVGFnKGl0ZW0pKTtcbiAgICAgICAgaWYgKDEgPCBzZWFyY2hUZXJtSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlYXJjaFRlcm1JdGVtcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNlbGVjdENvbXBvbmVudC51bnNlbGVjdChzZWFyY2hUZXJtSXRlbXNbaV0gYXMgYW55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm1JdGVtID0gc2VhcmNoVGVybUl0ZW1zW3NlYXJjaFRlcm1JdGVtcy5sZW5ndGggLSAxXSBhc1xuICAgICAgICAgICAgfCB7IGxhYmVsOiBzdHJpbmcgfVxuICAgICAgICAgICAgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IHNlYXJjaFRlcm1JdGVtID8gc2VhcmNoVGVybUl0ZW0ubGFiZWwgOiAnJztcblxuICAgICAgICBjb25zdCB0YWdzID0gc2VsZWN0ZWRJdGVtcy5maWx0ZXIodGhpcy5pc1RhZyk7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gIT09IHRoaXMubGFzdFRlcm0pIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVGVybUNoYW5nZS5lbWl0KHNlYXJjaFRlcm0pO1xuICAgICAgICAgICAgdGhpcy5sYXN0VGVybSA9IHNlYXJjaFRlcm07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubGFzdFRhZ0lkcy5qb2luKCcsJykgIT09IHRhZ3MubWFwKHQgPT4gdC5pZCkuam9pbignLCcpKSB7XG4gICAgICAgICAgICB0aGlzLnRhZ3NDaGFuZ2UuZW1pdCh0YWdzKTtcbiAgICAgICAgICAgIHRoaXMubGFzdFRhZ0lkcyA9IHRhZ3MubWFwKHQgPT4gdC5pZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1NlYXJjaEhlYWRlclNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RDb21wb25lbnQuaXRlbXNMaXN0Lm1hcmtlZEluZGV4ID09PSAtMTtcbiAgICB9XG5cbiAgICBhZGRUYWdGbihpdGVtOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHsgbGFiZWw6IGl0ZW0gfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVGFnID0gKGlucHV0OiB1bmtub3duKTogaW5wdXQgaXMgVGFnRnJhZ21lbnQgPT4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnb2JqZWN0JyAmJiAhIWlucHV0ICYmIGlucHV0Lmhhc093blByb3BlcnR5KCd2YWx1ZScpO1xuICAgIH07XG59XG4iXX0=