import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DashboardWidgetService, DataService, LocalStorageService, } from '@vendure/admin-ui/core';
import { assertNever } from '@vendure/common/lib/shared-utils';
import { map, tap } from 'rxjs/operators';
export class DashboardComponent {
    constructor(dashboardWidgetService, localStorageService, changedDetectorRef, dataService) {
        this.dashboardWidgetService = dashboardWidgetService;
        this.localStorageService = localStorageService;
        this.changedDetectorRef = changedDetectorRef;
        this.dataService = dataService;
        this.deletionMarker = '__delete__';
    }
    ngOnInit() {
        this.availableWidgetIds$ = this.dataService.client.userStatus().stream$.pipe(map(({ userStatus }) => userStatus.permissions), map(permissions => this.dashboardWidgetService.getAvailableIds(permissions)), tap(ids => (this.widgetLayout = this.initLayout(ids))));
    }
    getClassForWidth(width) {
        switch (width) {
            case 3:
                return `clr-col-12 clr-col-sm-6 clr-col-lg-3`;
            case 4:
                return `clr-col-12 clr-col-sm-6 clr-col-lg-4`;
            case 6:
                return `clr-col-12 clr-col-lg-6`;
            case 8:
                return `clr-col-12 clr-col-lg-8`;
            case 12:
                return `clr-col-12`;
            default:
                assertNever(width);
        }
    }
    getSupportedWidths(config) {
        return config.supportedWidths || [3, 4, 6, 8, 12];
    }
    setWidgetWidth(widget, width) {
        widget.width = width;
        this.recalculateLayout();
    }
    trackRow(index, row) {
        const id = row.map(item => `${item.id}:${item.width}`).join('|');
        return id;
    }
    trackRowItem(index, item) {
        return item.config;
    }
    addWidget(id) {
        var _a;
        const config = this.dashboardWidgetService.getWidgetById(id);
        if (config) {
            const width = this.getSupportedWidths(config)[0];
            const widget = {
                id,
                config,
                width,
            };
            let targetRow;
            if (this.widgetLayout && this.widgetLayout.length) {
                targetRow = this.widgetLayout[this.widgetLayout.length - 1];
            }
            else {
                targetRow = [];
                (_a = this.widgetLayout) === null || _a === void 0 ? void 0 : _a.push(targetRow);
            }
            targetRow.push(widget);
            this.recalculateLayout();
        }
    }
    removeWidget(widget) {
        widget.id = this.deletionMarker;
        this.recalculateLayout();
    }
    drop(event) {
        const { currentIndex, previousIndex, previousContainer, container } = event;
        if (previousIndex === currentIndex && previousContainer.data.index === container.data.index) {
            // Nothing changed
            return;
        }
        if (this.widgetLayout) {
            const previousLayoutRow = this.widgetLayout[previousContainer.data.index];
            const newLayoutRow = this.widgetLayout[container.data.index];
            previousLayoutRow.splice(previousIndex, 1);
            newLayoutRow.splice(currentIndex, 0, event.item.data);
            this.recalculateLayout();
        }
    }
    initLayout(availableIds) {
        const savedLayoutDef = this.localStorageService.get('dashboardWidgetLayout');
        let layoutDef;
        if (savedLayoutDef) {
            // validate all the IDs from the saved layout are still available
            layoutDef = savedLayoutDef.filter(item => availableIds.includes(item.id));
        }
        return this.dashboardWidgetService.getWidgetLayout(layoutDef);
    }
    recalculateLayout() {
        if (this.widgetLayout) {
            const flattened = this.widgetLayout
                .reduce((flat, row) => [...flat, ...row], [])
                .filter(item => item.id !== this.deletionMarker);
            const newLayoutDef = flattened.map(item => ({
                id: item.id,
                width: item.width,
            }));
            this.widgetLayout = this.dashboardWidgetService.getWidgetLayout(newLayoutDef);
            this.localStorageService.set('dashboardWidgetLayout', newLayoutDef);
            setTimeout(() => this.changedDetectorRef.markForCheck());
        }
    }
}
DashboardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dashboard',
                template: "<div class=\"widget-header\">\n    <vdr-dropdown>\n        <button class=\"btn btn-secondary btn-sm\" vdrDropdownTrigger>\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'dashboard.add-widget' | translate }}\n        </button>\n        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n            <button\n                class=\"button\"\n                vdrDropdownItem\n                *ngFor=\"let id of availableWidgetIds$ | async\"\n                (click)=\"addWidget(id)\"\n            >\n                {{ id }}\n            </button>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n</div>\n<div cdkDropListGroup>\n    <div\n        class=\"clr-row dashboard-row\"\n        *ngFor=\"let row of widgetLayout; index as rowIndex; trackBy: trackRow\"\n        cdkDropList\n        (cdkDropListDropped)=\"drop($event)\"\n        cdkDropListOrientation=\"horizontal\"\n        [cdkDropListData]=\"{ index: rowIndex }\"\n    >\n        <div\n            *ngFor=\"let widget of row; trackBy: trackRowItem\"\n            class=\"dashboard-item\"\n            [ngClass]=\"getClassForWidth(widget.width)\"\n            cdkDrag\n            [cdkDragData]=\"widget\"\n        >\n            <vdr-dashboard-widget\n                *vdrIfPermissions=\"widget.config.requiresPermissions || null\"\n                [widgetConfig]=\"widget.config\"\n            >\n                <div class=\"flex\">\n                    <div class=\"drag-handle\" cdkDragHandle>\n                        <clr-icon shape=\"drag-handle\" size=\"24\"></clr-icon>\n                    </div>\n                    <vdr-dropdown>\n                        <button class=\"icon-button\" vdrDropdownTrigger>\n                            <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n                        </button>\n                        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                            <h4 class=\"dropdown-header\">{{ 'dashboard.widget-resize' | translate }}</h4>\n                            <button\n                                class=\"button\"\n                                vdrDropdownItem\n                                [disabled]=\"width === widget.width\"\n                                *ngFor=\"let width of getSupportedWidths(widget.config)\"\n                                (click)=\"setWidgetWidth(widget, width)\"\n                            >\n                                {{ 'dashboard.widget-width' | translate: { width: width } }}\n                            </button>\n                            <div class=\"dropdown-divider\" role=\"separator\"></div>\n                            <button class=\"button\" vdrDropdownItem (click)=\"removeWidget(widget)\">\n                                <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                {{ 'dashboard.remove-widget' | translate }}\n                            </button>\n                        </vdr-dropdown-menu>\n                    </vdr-dropdown>\n                </div>\n            </vdr-dashboard-widget>\n        </div>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".widget-header{display:flex;justify-content:flex-end}.placeholder{color:var(--color-grey-300);text-align:center}.placeholder .version{font-size:3em;margin:24px;line-height:1em}.placeholder ::ng-deep .clr-i-outline{fill:var(--color-grey-200)}vdr-dashboard-widget{margin-bottom:24px}.cdk-drag-preview{box-sizing:border-box;border-radius:4px}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.dashboard-row{padding:0;border-width:1;margin-bottom:6px;transition:padding .2s,margin .2s}.dashboard-row.cdk-drop-list-dragging,.dashboard-row.cdk-drop-list-receiving{border:1px dashed var(--color-component-border-200);padding:6px}.dashboard-row.cdk-drop-list-dragging .dashboard-item:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"]
            },] }
];
DashboardComponent.ctorParameters = () => [
    { type: DashboardWidgetService },
    { type: LocalStorageService },
    { type: ChangeDetectorRef },
    { type: DataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvZGFzaGJvYXJkL3NyYy9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUVILHNCQUFzQixFQUV0QixXQUFXLEVBQ1gsbUJBQW1CLEdBR3RCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRS9ELE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRMUMsTUFBTSxPQUFPLGtCQUFrQjtJQUszQixZQUNZLHNCQUE4QyxFQUM5QyxtQkFBd0MsRUFDeEMsa0JBQXFDLEVBQ3JDLFdBQXdCO1FBSHhCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDOUMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTm5CLG1CQUFjLEdBQUcsWUFBWSxDQUFDO0lBTzVDLENBQUM7SUFFSixRQUFRO1FBQ0osSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ3hFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFDL0MsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxF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QUFHLENBQUMsRUFBRSxFQUFFLENBQUM7aUJBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sWUFBWSxHQUEyQixTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzthQUNwQixDQUFDLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3BFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztTQUM1RDtJQUNMLENBQUM7OztZQTlISixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLG9qR0FBeUM7Z0JBRXpDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBaEJHLHNCQUFzQjtZQUd0QixtQkFBbUI7WUFOVyxpQkFBaUI7WUFLL0MsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0RyYWdEcm9wIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERhc2hib2FyZFdpZGdldENvbmZpZyxcbiAgICBEYXNoYm9hcmRXaWRnZXRTZXJ2aWNlLFxuICAgIERhc2hib2FyZFdpZGdldFdpZHRoLFxuICAgIERhdGFTZXJ2aWNlLFxuICAgIExvY2FsU3RvcmFnZVNlcnZpY2UsXG4gICAgV2lkZ2V0TGF5b3V0LFxuICAgIFdpZGdldExheW91dERlZmluaXRpb24sXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgYXNzZXJ0TmV2ZXIgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC11dGlscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZGFzaGJvYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGFzaGJvYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICB3aWRnZXRMYXlvdXQ6IFdpZGdldExheW91dCB8IHVuZGVmaW5lZDtcbiAgICBhdmFpbGFibGVXaWRnZXRJZHMkOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlbGV0aW9uTWFya2VyID0gJ19fZGVsZXRlX18nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZGFzaGJvYXJkV2lkZ2V0U2VydmljZTogRGFzaGJvYXJkV2lkZ2V0U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNoYW5nZWREZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVdpZGdldElkcyQgPSB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudC51c2VyU3RhdHVzKCkuc3RyZWFtJC5waXBlKFxuICAgICAgICAgICAgbWFwKCh7IHVzZXJTdGF0dXMgfSkgPT4gdXNlclN0YXR1cy5wZXJtaXNzaW9ucyksXG4gICAgICAgICAgICBtYXAocGVybWlzc2lvbnMgPT4gdGhpcy5kYXNoYm9hcmRXaWRnZXRTZXJ2aWNlLmdldEF2YWlsYWJsZUlkcyhwZXJtaXNzaW9ucykpLFxuICAgICAgICAgICAgdGFwKGlkcyA9PiAodGhpcy53aWRnZXRMYXlvdXQgPSB0aGlzLmluaXRMYXlvdXQoaWRzKSkpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldENsYXNzRm9yV2lkdGgod2lkdGg6IERhc2hib2FyZFdpZGdldFdpZHRoKTogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoICh3aWR0aCkge1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiBgY2xyLWNvbC0xMiBjbHItY29sLXNtLTYgY2xyLWNvbC1sZy0zYDtcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gYGNsci1jb2wtMTIgY2xyLWNvbC1zbS02IGNsci1jb2wtbGctNGA7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBjbHItY29sLTEyIGNsci1jb2wtbGctNmA7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBjbHItY29sLTEyIGNsci1jb2wtbGctOGA7XG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgIHJldHVybiBgY2xyLWNvbC0xMmA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGFzc2VydE5ldmVyKHdpZHRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFN1cHBvcnRlZFdpZHRocyhjb25maWc6IERhc2hib2FyZFdpZGdldENvbmZpZyk6IERhc2hib2FyZFdpZGdldFdpZHRoW10ge1xuICAgICAgICByZXR1cm4gY29uZmlnLnN1cHBvcnRlZFdpZHRocyB8fCBbMywgNCwgNiwgOCwgMTJdO1xuICAgIH1cblxuICAgIHNldFdpZGdldFdpZHRoKHdpZGdldDogV2lkZ2V0TGF5b3V0W251bWJlcl1bbnVtYmVyXSwgd2lkdGg6IERhc2hib2FyZFdpZGdldFdpZHRoKSB7XG4gICAgICAgIHdpZGdldC53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLnJlY2FsY3VsYXRlTGF5b3V0KCk7XG4gICAgfVxuXG4gICAgdHJhY2tSb3coaW5kZXg6IG51bWJlciwgcm93OiBXaWRnZXRMYXlvdXRbbnVtYmVyXSkge1xuICAgICAgICBjb25zdCBpZCA9IHJvdy5tYXAoaXRlbSA9PiBgJHtpdGVtLmlkfToke2l0ZW0ud2lkdGh9YCkuam9pbignfCcpO1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuXG4gICAgdHJhY2tSb3dJdGVtKGluZGV4OiBudW1iZXIsIGl0ZW06IFdpZGdldExheW91dFtudW1iZXJdW251bWJlcl0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uY29uZmlnO1xuICAgIH1cblxuICAgIGFkZFdpZGdldChpZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZGFzaGJvYXJkV2lkZ2V0U2VydmljZS5nZXRXaWRnZXRCeUlkKGlkKTtcbiAgICAgICAgaWYgKGNvbmZpZykge1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmdldFN1cHBvcnRlZFdpZHRocyhjb25maWcpWzBdO1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0OiBXaWRnZXRMYXlvdXRbbnVtYmVyXVtudW1iZXJdID0ge1xuICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgdGFyZ2V0Um93OiBXaWRnZXRMYXlvdXRbbnVtYmVyXTtcbiAgICAgICAgICAgIGlmICh0aGlzLndpZGdldExheW91dCAmJiB0aGlzLndpZGdldExheW91dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRSb3cgPSB0aGlzLndpZGdldExheW91dFt0aGlzLndpZGdldExheW91dC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Um93ID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy53aWRnZXRMYXlvdXQ/LnB1c2godGFyZ2V0Um93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldFJvdy5wdXNoKHdpZGdldCk7XG4gICAgICAgICAgICB0aGlzLnJlY2FsY3VsYXRlTGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVXaWRnZXQod2lkZ2V0OiBXaWRnZXRMYXlvdXRbbnVtYmVyXVtudW1iZXJdKSB7XG4gICAgICAgIHdpZGdldC5pZCA9IHRoaXMuZGVsZXRpb25NYXJrZXI7XG4gICAgICAgIHRoaXMucmVjYWxjdWxhdGVMYXlvdXQoKTtcbiAgICB9XG5cbiAgICBkcm9wKGV2ZW50OiBDZGtEcmFnRHJvcDx7IGluZGV4OiBudW1iZXIgfT4pIHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50SW5kZXgsIHByZXZpb3VzSW5kZXgsIHByZXZpb3VzQ29udGFpbmVyLCBjb250YWluZXIgfSA9IGV2ZW50O1xuICAgICAgICBpZiAocHJldmlvdXNJbmRleCA9PT0gY3VycmVudEluZGV4ICYmIHByZXZpb3VzQ29udGFpbmVyLmRhdGEuaW5kZXggPT09IGNvbnRhaW5lci5kYXRhLmluZGV4KSB7XG4gICAgICAgICAgICAvLyBOb3RoaW5nIGNoYW5nZWRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy53aWRnZXRMYXlvdXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzTGF5b3V0Um93ID0gdGhpcy53aWRnZXRMYXlvdXRbcHJldmlvdXNDb250YWluZXIuZGF0YS5pbmRleF07XG4gICAgICAgICAgICBjb25zdCBuZXdMYXlvdXRSb3cgPSB0aGlzLndpZGdldExheW91dFtjb250YWluZXIuZGF0YS5pbmRleF07XG5cbiAgICAgICAgICAgIHByZXZpb3VzTGF5b3V0Um93LnNwbGljZShwcmV2aW91c0luZGV4LCAxKTtcbiAgICAgICAgICAgIG5ld0xheW91dFJvdy5zcGxpY2UoY3VycmVudEluZGV4LCAwLCBldmVudC5pdGVtLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZUxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0TGF5b3V0KGF2YWlsYWJsZUlkczogc3RyaW5nW10pOiBXaWRnZXRMYXlvdXQge1xuICAgICAgICBjb25zdCBzYXZlZExheW91dERlZiA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2Rhc2hib2FyZFdpZGdldExheW91dCcpO1xuICAgICAgICBsZXQgbGF5b3V0RGVmOiBXaWRnZXRMYXlvdXREZWZpbml0aW9uIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoc2F2ZWRMYXlvdXREZWYpIHtcbiAgICAgICAgICAgIC8vIHZhbGlkYXRlIGFsbCB0aGUgSURzIGZyb20gdGhlIHNhdmVkIGxheW91dCBhcmUgc3RpbGwgYXZhaWxhYmxlXG4gICAgICAgICAgICBsYXlvdXREZWYgPSBzYXZlZExheW91dERlZi5maWx0ZXIoaXRlbSA9PiBhdmFpbGFibGVJZHMuaW5jbHVkZXMoaXRlbS5pZCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRhc2hib2FyZFdpZGdldFNlcnZpY2UuZ2V0V2lkZ2V0TGF5b3V0KGxheW91dERlZik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWNhbGN1bGF0ZUxheW91dCgpIHtcbiAgICAgICAgaWYgKHRoaXMud2lkZ2V0TGF5b3V0KSB7XG4gICAgICAgICAgICBjb25zdCBmbGF0dGVuZWQgPSB0aGlzLndpZGdldExheW91dFxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGZsYXQsIHJvdykgPT4gWy4uLmZsYXQsIC4uLnJvd10sIFtdKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9PSB0aGlzLmRlbGV0aW9uTWFya2VyKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0xheW91dERlZjogV2lkZ2V0TGF5b3V0RGVmaW5pdGlvbiA9IGZsYXR0ZW5lZC5tYXAoaXRlbSA9PiAoe1xuICAgICAgICAgICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBpdGVtLndpZHRoLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy53aWRnZXRMYXlvdXQgPSB0aGlzLmRhc2hib2FyZFdpZGdldFNlcnZpY2UuZ2V0V2lkZ2V0TGF5b3V0KG5ld0xheW91dERlZik7XG4gICAgICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdkYXNoYm9hcmRXaWRnZXRMYXlvdXQnLCBuZXdMYXlvdXREZWYpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNoYW5nZWREZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=