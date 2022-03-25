import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataService } from './data/providers/data.service';
export class AppComponent {
    constructor(dataService, document) {
        this.dataService = dataService;
        this.document = document;
        this._document = document;
    }
    ngOnInit() {
        this.loading$ = this.dataService.client
            .getNetworkStatus()
            .stream$.pipe(map(data => 0 < data.networkStatus.inFlightRequests));
        this.dataService.client
            .uiState()
            .mapStream(data => data.uiState.theme)
            .subscribe(theme => {
            var _a;
            (_a = this._document) === null || _a === void 0 ? void 0 : _a.body.setAttribute('data-theme', theme);
        });
    }
}
AppComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-root',
                template: "<div class=\"progress loop\" [class.visible]=\"loading$ | async\"></div>\n<router-outlet></router-outlet>\n<vdr-overlay-host></vdr-overlay-host>\n",
                styles: [".progress{position:absolute;overflow:hidden;height:4px;background-color:var(--color-grey-500);opacity:0;transition:opacity .1s}.progress.visible{opacity:1}"]
            },] }
];
AppComponent.ctorParameters = () => [
    { type: DataService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvYXBwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBZSxNQUFNLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQU81RCxNQUFNLE9BQU8sWUFBWTtJQUlyQixZQUFvQixXQUF3QixFQUE0QixRQUFjO1FBQWxFLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQTRCLGFBQVEsR0FBUixRQUFRLENBQU07UUFDbEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTTthQUNsQyxnQkFBZ0IsRUFBRTthQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUV4RSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07YUFDbEIsT0FBTyxFQUFFO2FBQ1QsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7YUFDckMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFOztZQUNmLE1BQUEsSUFBSSxDQUFDLFNBQVMsMENBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFO1FBQzNELENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7O1lBeEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsOEpBQW1DOzthQUV0Qzs7O1lBTlEsV0FBVzs0Q0FXK0IsTUFBTSxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vZGF0YS9wcm92aWRlcnMvZGF0YS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItcm9vdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgbG9hZGluZyQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gICAgcHJpdmF0ZSBfZG9jdW1lbnQ/OiBEb2N1bWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50PzogYW55KSB7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyQgPSB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudFxuICAgICAgICAgICAgLmdldE5ldHdvcmtTdGF0dXMoKVxuICAgICAgICAgICAgLnN0cmVhbSQucGlwZShtYXAoZGF0YSA9PiAwIDwgZGF0YS5uZXR3b3JrU3RhdHVzLmluRmxpZ2h0UmVxdWVzdHMpKTtcblxuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudFxuICAgICAgICAgICAgLnVpU3RhdGUoKVxuICAgICAgICAgICAgLm1hcFN0cmVhbShkYXRhID0+IGRhdGEudWlTdGF0ZS50aGVtZSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodGhlbWUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50Py5ib2R5LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsIHRoZW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==