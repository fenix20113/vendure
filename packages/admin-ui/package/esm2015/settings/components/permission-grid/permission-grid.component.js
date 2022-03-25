import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
/**
 * A table showing and allowing the setting of all possible CRUD permissions.
 */
export class PermissionGridComponent {
    constructor() {
        this.readonly = false;
        this.permissionChange = new EventEmitter();
    }
    ngOnInit() {
        this.buildGrid();
    }
    setPermission(permission, value) {
        if (!this.readonly) {
            this.permissionChange.emit({ permission, value });
        }
    }
    toggleAll(defs) {
        const value = defs.some(d => !this.activePermissions.includes(d.name));
        for (const def of defs) {
            this.permissionChange.emit({ permission: def.name, value });
        }
    }
    buildGrid() {
        var _a;
        const crudGroups = new Map();
        const nonCrud = [];
        const crudRe = /^(Create|Read|Update|Delete)([a-zA-Z]+)$/;
        for (const def of this.permissionDefinitions) {
            const isCrud = crudRe.test(def.name);
            if (isCrud) {
                const groupName = (_a = def.name.match(crudRe)) === null || _a === void 0 ? void 0 : _a[2];
                if (groupName) {
                    const existing = crudGroups.get(groupName);
                    if (existing) {
                        existing.push(def);
                    }
                    else {
                        crudGroups.set(groupName, [def]);
                    }
                }
            }
            else if (def.assignable) {
                nonCrud.push(def);
            }
        }
        this.gridData = [
            ...nonCrud.map(d => ({
                label: d.name,
                description: d.description,
                permissions: [d],
            })),
            ...Array.from(crudGroups.entries()).map(([label, defs]) => {
                return {
                    label,
                    description: this.extractCrudDescription(defs[0]),
                    permissions: defs,
                };
            }),
        ];
    }
    extractCrudDescription(def) {
        return def.description.replace(/Grants permission to [\w]+/, 'Grants permissions on');
    }
}
PermissionGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-permission-grid',
                template: "<table class=\"table\">\n    <tbody>\n        <tr *ngFor=\"let section of gridData\">\n            <td class=\"permission-group left\">\n                <div><strong>{{ section.label | translate }}</strong></div>\n                <small>{{ section.description | translate }}</small><br>\n                <button *ngIf=\"1 < section.permissions.length && !readonly\" class=\"btn btn-sm btn-link\" (click)=\"toggleAll(section.permissions)\">\n                    {{ 'common.toggle-all' | translate }}\n                </button>\n            </td>\n            <td *ngFor=\"let permission of section.permissions\" [attr.colspan]=\"section.permissions.length === 1 ? 4 : 1\">\n                <vdr-select-toggle\n                    size=\"small\"\n                    [title]=\"permission.description\"\n                    [label]=\"permission.name\"\n                    [disabled]=\"readonly\"\n                    [selected]=\"activePermissions?.includes(permission.name)\"\n                    (selectedChange)=\"setPermission(permission.name, $event)\"\n                ></vdr-select-toggle>\n            </td>\n        </tr>\n    </tbody>\n</table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["td.permission-group{max-width:300px;background-color:var(--color-component-bg-200)}"]
            },] }
];
PermissionGridComponent.propDecorators = {
    permissionDefinitions: [{ type: Input }],
    activePermissions: [{ type: Input }],
    readonly: [{ type: Input }],
    permissionChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvc2V0dGluZ3Mvc3JjL2NvbXBvbmVudHMvcGVybWlzc2lvbi1ncmlkL3Blcm1pc3Npb24tZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVV4Rzs7R0FFRztBQU9ILE1BQU0sT0FBTyx1QkFBdUI7SUFOcEM7UUFTYSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUEwQyxDQUFDO0lBMkQ1RixDQUFDO0lBeERHLFFBQVE7UUFDSixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUFrQixFQUFFLEtBQWM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUE0QjtRQUNsQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQy9EO0lBQ0wsQ0FBQztJQUVPLFNBQVM7O1FBQ2IsTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQWtDLENBQUM7UUFDN0QsTUFBTSxPQUFPLEdBQTJCLEVBQUUsQ0FBQztRQUMzQyxNQUFNLE1BQU0sR0FBRywwQ0FBMEMsQ0FBQztRQUMxRCxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUMxQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxJQUFJLE1BQU0sRUFBRTtnQkFDUixNQUFNLFNBQVMsU0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsMENBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLElBQUksU0FBUyxFQUFFO29CQUNYLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzNDLElBQUksUUFBUSxFQUFFO3dCQUNWLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3RCO3lCQUFNO3dCQUNILFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDcEM7aUJBQ0o7YUFDSjtpQkFBTSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckI7U0FDSjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDWixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQixLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUk7Z0JBQ2IsV0FBVyxFQUFFLENBQUMsQ0FBQyxXQUFXO2dCQUMxQixXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDbkIsQ0FBQyxDQUFDO1lBQ0gsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RELE9BQU87b0JBQ0gsS0FBSztvQkFDTCxXQUFXLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakQsV0FBVyxFQUFFLElBQUk7aUJBQ3BCLENBQUM7WUFDTixDQUFDLENBQUM7U0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVPLHNCQUFzQixDQUFDLEdBQXlCO1FBQ3BELE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztJQUMxRixDQUFDOzs7WUFwRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLDhvQ0FBK0M7Z0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O29DQUVJLEtBQUs7Z0NBQ0wsS0FBSzt1QkFDTCxLQUFLOytCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHsgUGVybWlzc2lvbkRlZmluaXRpb24gfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBQZXJtaXNzaW9uR3JpZFJvdyB7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHBlcm1pc3Npb25zOiBQZXJtaXNzaW9uRGVmaW5pdGlvbltdO1xufVxuXG4vKipcbiAqIEEgdGFibGUgc2hvd2luZyBhbmQgYWxsb3dpbmcgdGhlIHNldHRpbmcgb2YgYWxsIHBvc3NpYmxlIENSVUQgcGVybWlzc2lvbnMuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLXBlcm1pc3Npb24tZ3JpZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Blcm1pc3Npb24tZ3JpZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGVybWlzc2lvbi1ncmlkLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFBlcm1pc3Npb25HcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwZXJtaXNzaW9uRGVmaW5pdGlvbnM6IFBlcm1pc3Npb25EZWZpbml0aW9uW107XG4gICAgQElucHV0KCkgYWN0aXZlUGVybWlzc2lvbnM6IHN0cmluZ1tdO1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5ID0gZmFsc2U7XG4gICAgQE91dHB1dCgpIHBlcm1pc3Npb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsgcGVybWlzc2lvbjogc3RyaW5nOyB2YWx1ZTogYm9vbGVhbiB9PigpO1xuICAgIGdyaWREYXRhOiBQZXJtaXNzaW9uR3JpZFJvd1tdO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYnVpbGRHcmlkKCk7XG4gICAgfVxuXG4gICAgc2V0UGVybWlzc2lvbihwZXJtaXNzaW9uOiBzdHJpbmcsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICghdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9uQ2hhbmdlLmVtaXQoeyBwZXJtaXNzaW9uLCB2YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZUFsbChkZWZzOiBQZXJtaXNzaW9uRGVmaW5pdGlvbltdKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZGVmcy5zb21lKGQgPT4gIXRoaXMuYWN0aXZlUGVybWlzc2lvbnMuaW5jbHVkZXMoZC5uYW1lKSk7XG4gICAgICAgIGZvciAoY29uc3QgZGVmIG9mIGRlZnMpIHtcbiAgICAgICAgICAgIHRoaXMucGVybWlzc2lvbkNoYW5nZS5lbWl0KHsgcGVybWlzc2lvbjogZGVmLm5hbWUsIHZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZEdyaWQoKSB7XG4gICAgICAgIGNvbnN0IGNydWRHcm91cHMgPSBuZXcgTWFwPHN0cmluZywgUGVybWlzc2lvbkRlZmluaXRpb25bXT4oKTtcbiAgICAgICAgY29uc3Qgbm9uQ3J1ZDogUGVybWlzc2lvbkRlZmluaXRpb25bXSA9IFtdO1xuICAgICAgICBjb25zdCBjcnVkUmUgPSAvXihDcmVhdGV8UmVhZHxVcGRhdGV8RGVsZXRlKShbYS16QS1aXSspJC87XG4gICAgICAgIGZvciAoY29uc3QgZGVmIG9mIHRoaXMucGVybWlzc2lvbkRlZmluaXRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBpc0NydWQgPSBjcnVkUmUudGVzdChkZWYubmFtZSk7XG4gICAgICAgICAgICBpZiAoaXNDcnVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBOYW1lID0gZGVmLm5hbWUubWF0Y2goY3J1ZFJlKT8uWzJdO1xuICAgICAgICAgICAgICAgIGlmIChncm91cE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBjcnVkR3JvdXBzLmdldChncm91cE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLnB1c2goZGVmKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNydWRHcm91cHMuc2V0KGdyb3VwTmFtZSwgW2RlZl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkZWYuYXNzaWduYWJsZSkge1xuICAgICAgICAgICAgICAgIG5vbkNydWQucHVzaChkZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ3JpZERhdGEgPSBbXG4gICAgICAgICAgICAuLi5ub25DcnVkLm1hcChkID0+ICh7XG4gICAgICAgICAgICAgICAgbGFiZWw6IGQubmFtZSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uczogW2RdLFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgLi4uQXJyYXkuZnJvbShjcnVkR3JvdXBzLmVudHJpZXMoKSkubWFwKChbbGFiZWwsIGRlZnNdKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmV4dHJhY3RDcnVkRGVzY3JpcHRpb24oZGVmc1swXSksXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zOiBkZWZzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGV4dHJhY3RDcnVkRGVzY3JpcHRpb24oZGVmOiBQZXJtaXNzaW9uRGVmaW5pdGlvbik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBkZWYuZGVzY3JpcHRpb24ucmVwbGFjZSgvR3JhbnRzIHBlcm1pc3Npb24gdG8gW1xcd10rLywgJ0dyYW50cyBwZXJtaXNzaW9ucyBvbicpO1xuICAgIH1cbn1cbiJdfQ==