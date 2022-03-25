import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, OnInit } from '@angular/core';
import { DashboardWidgetConfig, DashboardWidgetService, DashboardWidgetWidth, DataService, LocalStorageService, WidgetLayout } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class DashboardComponent implements OnInit {
    private dashboardWidgetService;
    private localStorageService;
    private changedDetectorRef;
    private dataService;
    widgetLayout: WidgetLayout | undefined;
    availableWidgetIds$: Observable<string[]>;
    private readonly deletionMarker;
    constructor(dashboardWidgetService: DashboardWidgetService, localStorageService: LocalStorageService, changedDetectorRef: ChangeDetectorRef, dataService: DataService);
    ngOnInit(): void;
    getClassForWidth(width: DashboardWidgetWidth): string;
    getSupportedWidths(config: DashboardWidgetConfig): DashboardWidgetWidth[];
    setWidgetWidth(widget: WidgetLayout[number][number], width: DashboardWidgetWidth): void;
    trackRow(index: number, row: WidgetLayout[number]): string;
    trackRowItem(index: number, item: WidgetLayout[number][number]): DashboardWidgetConfig;
    addWidget(id: string): void;
    removeWidget(widget: WidgetLayout[number][number]): void;
    drop(event: CdkDragDrop<{
        index: number;
    }>): void;
    private initLayout;
    private recalculateLayout;
}
