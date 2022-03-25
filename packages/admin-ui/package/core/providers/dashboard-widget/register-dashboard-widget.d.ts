import { FactoryProvider } from '@angular/core';
import { DashboardWidgetConfig, WidgetLayoutDefinition } from './dashboard-widget-types';
/**
 * @description
 * Registers a dashboard widget. Once registered, the widget can be set as part of the default
 * (using {@link setDashboardWidgetLayout}).
 */
export declare function registerDashboardWidget(id: string, config: DashboardWidgetConfig): FactoryProvider;
/**
 * @description
 * Sets the default widget layout for the Admin UI dashboard.
 */
export declare function setDashboardWidgetLayout(layoutDef: WidgetLayoutDefinition): FactoryProvider;
