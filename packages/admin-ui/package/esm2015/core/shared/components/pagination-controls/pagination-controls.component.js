import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
export class PaginationControlsComponent {
    constructor() {
        this.pageChange = new EventEmitter();
    }
}
PaginationControlsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-pagination-controls',
                template: "<pagination-template #p=\"paginationApi\" (pageChange)=\"pageChange.emit($event)\">\n    <ul>\n        <li class=\"pagination-previous\">\n            <a *ngIf=\"!p.isFirstPage()\" (click)=\"p.previous()\" (keyup.enter)=\"p.previous()\" tabindex=\"0\">\u00AB</a>\n            <div *ngIf=\"p.isFirstPage()\">\u00AB</div>\n        </li>\n\n        <li *ngFor=\"let page of p.pages\">\n            <a\n                (click)=\"p.setCurrent(page.value)\"\n                (keyup.enter)=\"p.setCurrent(page.value)\"\n                *ngIf=\"p.getCurrent() !== page.value\"\n                tabindex=\"0\"\n            >\n                {{ page.label }}\n            </a>\n\n            <div class=\"current\" *ngIf=\"p.getCurrent() === page.value\">{{ page.label }}</div>\n        </li>\n\n        <li class=\"pagination-next\">\n            <a *ngIf=\"!p.isLastPage()\" (click)=\"p.next()\" (keyup.enter)=\"p.next()\" tabindex=\"0\">\u00BB</a>\n            <div *ngIf=\"p.isLastPage()\">\u00BB</div>\n        </li>\n    </ul>\n</pagination-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["pagination-template{display:block}pagination-template ul{list-style-type:none;display:flex;justify-content:center}pagination-template li{transition:border-bottom-color .2s}pagination-template li>a{cursor:pointer}pagination-template li>a:focus,pagination-template li>a:hover{border-bottom-color:var(--color-grey-300);text-decoration:none}pagination-template li>a,pagination-template li>div{padding:3px 12px;display:block;border-bottom:3px solid transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}pagination-template li>div.current{border-bottom-color:var(--color-primary-500)}"]
            },] }
];
PaginationControlsComponent.propDecorators = {
    currentPage: [{ type: Input }],
    itemsPerPage: [{ type: Input }],
    totalItems: [{ type: Input }],
    pageChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1jb250cm9scy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL3BhZ2luYXRpb24tY29udHJvbHMvcGFnaW5hdGlvbi1jb250cm9scy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVFoRyxNQUFNLE9BQU8sMkJBQTJCO0lBTnhDO1FBVWMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFDdEQsQ0FBQzs7O1lBWEEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLHFpQ0FBbUQ7Z0JBRW5ELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7OzBCQUVJLEtBQUs7MkJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcGFnaW5hdGlvbi1jb250cm9scycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhZ2luYXRpb24tY29udHJvbHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3BhZ2luYXRpb24tY29udHJvbHMuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbkNvbnRyb2xzQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKSBjdXJyZW50UGFnZTogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGl0ZW1zUGVyUGFnZTogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHRvdGFsSXRlbXM6IG51bWJlcjtcbiAgICBAT3V0cHV0KCkgcGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xufVxuIl19