import { EventEmitter, OnInit } from '@angular/core';
import { PermissionDefinition } from '@vendure/admin-ui/core';
export interface PermissionGridRow {
    label: string;
    description: string;
    permissions: PermissionDefinition[];
}
/**
 * A table showing and allowing the setting of all possible CRUD permissions.
 */
export declare class PermissionGridComponent implements OnInit {
    permissionDefinitions: PermissionDefinition[];
    activePermissions: string[];
    readonly: boolean;
    permissionChange: EventEmitter<{
        permission: string;
        value: boolean;
    }>;
    gridData: PermissionGridRow[];
    ngOnInit(): void;
    setPermission(permission: string, value: boolean): void;
    toggleAll(defs: PermissionDefinition[]): void;
    private buildGrid;
    private extractCrudDescription;
}
