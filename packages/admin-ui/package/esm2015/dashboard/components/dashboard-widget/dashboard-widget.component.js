import { __awaiter } from "tslib";
import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, } from '@angular/core';
export class DashboardWidgetComponent {
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    ngAfterViewInit() {
        this.loadWidget();
    }
    loadWidget() {
        return __awaiter(this, void 0, void 0, function* () {
            const loadComponentResult = this.widgetConfig.loadComponent();
            const componentType = loadComponentResult instanceof Promise ? yield loadComponentResult : loadComponentResult;
            this.componentRef = this.portal.createComponent(this.componentFactoryResolver.resolveComponentFactory(componentType));
            this.componentRef.changeDetectorRef.markForCheck();
        });
    }
    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }
}
DashboardWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dashboard-widget',
                template: "<div class=\"card\">\n    <div class=\"card-header\">\n        <div class=\"title\">\n            <ng-container *ngIf=\"widgetConfig.title as title\">{{ title | translate }}</ng-container>\n        </div>\n        <div class=\"controls\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n    <div class=\"card-block\">\n        <ng-template #portal></ng-template>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}.card{margin-top:0;min-height:200px}.card-header{display:flex;justify-content:space-between}"]
            },] }
];
DashboardWidgetComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
DashboardWidgetComponent.propDecorators = {
    widgetConfig: [{ type: Input }],
    portal: [{ type: ViewChild, args: ['portal', { read: ViewContainerRef },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2Rhc2hib2FyZC9zcmMvY29tcG9uZW50cy9kYXNoYm9hcmQtd2lkZ2V0L2Rhc2hib2FyZC13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCx3QkFBd0IsRUFFeEIsS0FBSyxFQUdMLFNBQVMsRUFDVCxnQkFBZ0IsR0FDbkIsTUFBTSxlQUFlLENBQUM7QUFTdkIsTUFBTSxPQUFPLHdCQUF3QjtJQVFqQyxZQUFvQix3QkFBa0Q7UUFBbEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtJQUFHLENBQUM7SUFFMUUsZUFBZTtRQUNYLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRWEsVUFBVTs7WUFDcEIsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzlELE1BQU0sYUFBYSxHQUNmLG1CQUFtQixZQUFZLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUM7WUFDN0YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FDM0MsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxDQUN2RSxDQUFDO1lBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2RCxDQUFDO0tBQUE7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDL0I7SUFDTCxDQUFDOzs7WUFsQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLGdhQUFnRDtnQkFFaEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFmRyx3QkFBd0I7OzsyQkFpQnZCLEtBQUs7cUJBRUwsU0FBUyxTQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhc2hib2FyZFdpZGdldENvbmZpZyB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1kYXNoYm9hcmQtd2lkZ2V0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHdpZGdldENvbmZpZzogRGFzaGJvYXJkV2lkZ2V0Q29uZmlnO1xuXG4gICAgQFZpZXdDaGlsZCgncG9ydGFsJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gICAgcHJpdmF0ZSBwb3J0YWw6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgICBwcml2YXRlIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvYWRXaWRnZXQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGxvYWRXaWRnZXQoKSB7XG4gICAgICAgIGNvbnN0IGxvYWRDb21wb25lbnRSZXN1bHQgPSB0aGlzLndpZGdldENvbmZpZy5sb2FkQ29tcG9uZW50KCk7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFR5cGUgPVxuICAgICAgICAgICAgbG9hZENvbXBvbmVudFJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UgPyBhd2FpdCBsb2FkQ29tcG9uZW50UmVzdWx0IDogbG9hZENvbXBvbmVudFJlc3VsdDtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYgPSB0aGlzLnBvcnRhbC5jcmVhdGVDb21wb25lbnQoXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnRUeXBlKSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19