import { AfterViewInit, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { DashboardWidgetConfig } from '@vendure/admin-ui/core';
export declare class DashboardWidgetComponent implements AfterViewInit, OnDestroy {
    private componentFactoryResolver;
    widgetConfig: DashboardWidgetConfig;
    private portal;
    private componentRef;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    ngAfterViewInit(): void;
    private loadWidget;
    ngOnDestroy(): void;
}
