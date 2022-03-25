import { Permission } from '../../common/generated-types';
import { DashboardWidgetConfig, WidgetLayout, WidgetLayoutDefinition } from './dashboard-widget-types';
/**
 * Responsible for registering dashboard widget components and querying for layouts.
 */
export declare class DashboardWidgetService {
    private registry;
    private layoutDef;
    registerWidget(id: string, config: DashboardWidgetConfig): void;
    getAvailableIds(currentUserPermissions: Permission[]): string[];
    getWidgetById(id: string): DashboardWidgetConfig | undefined;
    setDefaultLayout(layout: WidgetLayoutDefinition): void;
    getDefaultLayout(): WidgetLayoutDefinition;
    getWidgetLayout(layoutDef?: WidgetLayoutDefinition): WidgetLayout;
    private idNotFound;
    private getValidWidth;
    private buildLayout;
}
