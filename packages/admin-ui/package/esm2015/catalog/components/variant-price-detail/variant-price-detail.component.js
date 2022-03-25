import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DataService } from '@vendure/admin-ui/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
export class VariantPriceDetailComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.priceChange$ = new BehaviorSubject(0);
        this.taxCategoryIdChange$ = new BehaviorSubject('');
    }
    ngOnInit() {
        const taxRates$ = this.dataService.settings
            .getTaxRates(999, 0, 'cache-first')
            .mapStream(data => data.taxRates.items);
        const activeChannel$ = this.dataService.settings
            .getActiveChannel('cache-first')
            .refetchOnChannelChange()
            .mapStream(data => data.activeChannel);
        this.taxRate$ = combineLatest(activeChannel$, taxRates$, this.taxCategoryIdChange$).pipe(map(([channel, taxRates, taxCategoryId]) => {
            const defaultTaxZone = channel.defaultTaxZone;
            if (!defaultTaxZone) {
                return 0;
            }
            const applicableRate = taxRates.find(taxRate => taxRate.zone.id === defaultTaxZone.id && taxRate.category.id === taxCategoryId);
            if (!applicableRate) {
                return 0;
            }
            return applicableRate.value;
        }));
        this.grossPrice$ = combineLatest(this.taxRate$, this.priceChange$).pipe(map(([taxRate, price]) => {
            return Math.round(price * ((100 + taxRate) / 100));
        }));
    }
    ngOnChanges(changes) {
        if ('price' in changes) {
            this.priceChange$.next(changes.price.currentValue);
        }
        if ('taxCategoryId' in changes) {
            this.taxCategoryIdChange$.next(changes.taxCategoryId.currentValue);
        }
    }
}
VariantPriceDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-variant-price-detail',
                template: "<label class=\"clr-control-label\">{{ 'catalog.taxes' | translate }}</label>\n<div *ngIf=\"priceIncludesTax\" class=\"value\">\n    {{ 'catalog.price-includes-tax-at' | translate: { rate: taxRate$ | async } }}\n</div>\n<div *ngIf=\"!priceIncludesTax\" class=\"value\">\n    {{\n        'catalog.price-with-tax-in-default-zone'\n            | translate: { price: grossPrice$ | async | localeCurrency: currencyCode, rate: taxRate$ | async }\n    }}\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;flex-direction:column}.value{margin-top:3px}"]
            },] }
];
VariantPriceDetailComponent.ctorParameters = () => [
    { type: DataService }
];
VariantPriceDetailComponent.propDecorators = {
    priceIncludesTax: [{ type: Input }],
    price: [{ type: Input }],
    currencyCode: [{ type: Input }],
    taxCategoryId: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1wcmljZS1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jYXRhbG9nL3NyYy9jb21wb25lbnRzL3ZhcmlhbnQtcHJpY2UtZGV0YWlsL3ZhcmlhbnQtcHJpY2UtZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUF1QixNQUFNLE1BQU0sQ0FBQztBQUMzRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRckMsTUFBTSxPQUFPLDJCQUEyQjtJQVlwQyxZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUhwQyxpQkFBWSxHQUFHLElBQUksZUFBZSxDQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzlDLHlCQUFvQixHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBRWhCLENBQUM7SUFFaEQsUUFBUTtRQUNKLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUTthQUN0QyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUM7YUFDbEMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7YUFDM0MsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO2FBQy9CLHNCQUFzQixFQUFFO2FBQ3hCLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxjQUFjLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FDcEYsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQztZQUM5QyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNqQixPQUFPLENBQUMsQ0FBQzthQUNaO1lBQ0QsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FDaEMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxjQUFjLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLGFBQWEsQ0FDNUYsQ0FBQztZQUVGLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ2pCLE9BQU8sQ0FBQyxDQUFDO2FBQ1o7WUFDRCxPQUFPLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUVGLElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FDbkUsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUNyQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sSUFBSSxPQUFPLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN0RDtRQUNELElBQUksZUFBZSxJQUFJLE9BQU8sRUFBRTtZQUM1QixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDdEU7SUFDTCxDQUFDOzs7WUE1REosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLG9kQUFvRDtnQkFFcEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFUUSxXQUFXOzs7K0JBV2YsS0FBSztvQkFDTCxLQUFLOzJCQUNMLEtBQUs7NEJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci12YXJpYW50LXByaWNlLWRldGFpbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3ZhcmlhbnQtcHJpY2UtZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi92YXJpYW50LXByaWNlLWRldGFpbC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBWYXJpYW50UHJpY2VEZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgcHJpY2VJbmNsdWRlc1RheDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwcmljZTogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRheENhdGVnb3J5SWQ6IHN0cmluZztcblxuICAgIGdyb3NzUHJpY2UkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gICAgdGF4UmF0ZSQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICAgIHByaXZhdGUgcHJpY2VDaGFuZ2UkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICAgIHByaXZhdGUgdGF4Q2F0ZWdvcnlJZENoYW5nZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgdGF4UmF0ZXMkID0gdGhpcy5kYXRhU2VydmljZS5zZXR0aW5nc1xuICAgICAgICAgICAgLmdldFRheFJhdGVzKDk5OSwgMCwgJ2NhY2hlLWZpcnN0JylcbiAgICAgICAgICAgIC5tYXBTdHJlYW0oZGF0YSA9PiBkYXRhLnRheFJhdGVzLml0ZW1zKTtcbiAgICAgICAgY29uc3QgYWN0aXZlQ2hhbm5lbCQgPSB0aGlzLmRhdGFTZXJ2aWNlLnNldHRpbmdzXG4gICAgICAgICAgICAuZ2V0QWN0aXZlQ2hhbm5lbCgnY2FjaGUtZmlyc3QnKVxuICAgICAgICAgICAgLnJlZmV0Y2hPbkNoYW5uZWxDaGFuZ2UoKVxuICAgICAgICAgICAgLm1hcFN0cmVhbShkYXRhID0+IGRhdGEuYWN0aXZlQ2hhbm5lbCk7XG5cbiAgICAgICAgdGhpcy50YXhSYXRlJCA9IGNvbWJpbmVMYXRlc3QoYWN0aXZlQ2hhbm5lbCQsIHRheFJhdGVzJCwgdGhpcy50YXhDYXRlZ29yeUlkQ2hhbmdlJCkucGlwZShcbiAgICAgICAgICAgIG1hcCgoW2NoYW5uZWwsIHRheFJhdGVzLCB0YXhDYXRlZ29yeUlkXSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRUYXhab25lID0gY2hhbm5lbC5kZWZhdWx0VGF4Wm9uZTtcbiAgICAgICAgICAgICAgICBpZiAoIWRlZmF1bHRUYXhab25lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBhcHBsaWNhYmxlUmF0ZSA9IHRheFJhdGVzLmZpbmQoXG4gICAgICAgICAgICAgICAgICAgIHRheFJhdGUgPT4gdGF4UmF0ZS56b25lLmlkID09PSBkZWZhdWx0VGF4Wm9uZS5pZCAmJiB0YXhSYXRlLmNhdGVnb3J5LmlkID09PSB0YXhDYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWFwcGxpY2FibGVSYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYXBwbGljYWJsZVJhdGUudmFsdWU7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmdyb3NzUHJpY2UkID0gY29tYmluZUxhdGVzdCh0aGlzLnRheFJhdGUkLCB0aGlzLnByaWNlQ2hhbmdlJCkucGlwZShcbiAgICAgICAgICAgIG1hcCgoW3RheFJhdGUsIHByaWNlXSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHByaWNlICogKCgxMDAgKyB0YXhSYXRlKSAvIDEwMCkpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoJ3ByaWNlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLnByaWNlQ2hhbmdlJC5uZXh0KGNoYW5nZXMucHJpY2UuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJ3RheENhdGVnb3J5SWQnIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMudGF4Q2F0ZWdvcnlJZENoYW5nZSQubmV4dChjaGFuZ2VzLnRheENhdGVnb3J5SWQuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==