import { EventEmitter } from '@angular/core';
export declare type TimelineDisplayType = 'success' | 'error' | 'warning' | 'default' | 'muted';
export declare class TimelineEntryComponent {
    displayType: TimelineDisplayType;
    createdAt: string;
    name: string;
    featured: boolean;
    iconShape?: string | [string, string];
    isLast?: boolean;
    collapsed: boolean;
    expandClick: EventEmitter<any>;
    get timelineTitle(): string;
    getIconShape(): string | undefined;
    getIconClass(): string | undefined;
}
