import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { ZoneMemberControlsDirective } from './zone-member-controls.directive';
import { ZoneMemberListHeaderDirective } from './zone-member-list-header.directive';
export class ZoneMemberListComponent {
    constructor() {
        this.members = [];
        this.selectedMemberIds = [];
        this.selectionChange = new EventEmitter();
        this.filterTerm = '';
        this.isMemberSelected = (member) => {
            return -1 < this.selectedMemberIds.indexOf(member.id);
        };
    }
    filteredMembers() {
        if (this.filterTerm !== '') {
            const term = this.filterTerm.toLocaleLowerCase();
            return this.members.filter(m => m.name.toLocaleLowerCase().includes(term) || m.code.toLocaleLowerCase().includes(term));
        }
        else {
            return this.members;
        }
    }
    areAllSelected() {
        if (this.members) {
            return this.selectedMemberIds.length === this.members.length;
        }
        else {
            return false;
        }
    }
    toggleSelectAll() {
        if (this.areAllSelected()) {
            this.selectionChange.emit([]);
        }
        else {
            this.selectionChange.emit(this.members.map(v => v.id));
        }
    }
    toggleSelectMember(member) {
        if (this.selectedMemberIds.includes(member.id)) {
            this.selectionChange.emit(this.selectedMemberIds.filter(id => id !== member.id));
        }
        else {
            this.selectionChange.emit([...this.selectedMemberIds, member.id]);
        }
    }
}
ZoneMemberListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-zone-member-list',
                template: "<div class=\"members-header\">\n    <ng-container *ngIf=\"headerTemplate\">\n        <ng-container *ngTemplateOutlet=\"headerTemplate.templateRef\"></ng-container>\n    </ng-container>\n    <input\n        type=\"text\"\n        [placeholder]=\"'settings.filter-by-member-name' | translate\"\n        [(ngModel)]=\"filterTerm\"\n    />\n</div>\n<vdr-data-table\n    [items]=\"filteredMembers()\"\n    [allSelected]=\"areAllSelected()\"\n    [isRowSelectedFn]=\"(['UpdateSettings', 'UpdateZone'] | hasPermission) && isMemberSelected\"\n    (rowSelectChange)=\"toggleSelectMember($event)\"\n    (allSelectChange)=\"toggleSelectAll()\"\n>\n    <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>\n    <vdr-dt-column>{{ 'common.enabled' | translate }}</vdr-dt-column>\n    <vdr-dt-column></vdr-dt-column>\n    <ng-template let-member=\"item\">\n        <td class=\"left align-middle\">{{ member.code }}</td>\n        <td class=\"left align-middle\">{{ member.name }}</td>\n        <td class=\"left align-middle\">\n            <clr-icon\n                [class.is-success]=\"member.enabled\"\n                [attr.shape]=\"member.enabled ? 'check' : 'times'\"\n            ></clr-icon>\n        </td>\n        <td class=\"right align-middle\">\n            <ng-container *ngIf=\"controlsTemplate\">\n                <ng-container\n                    *ngTemplateOutlet=\"controlsTemplate.templateRef; context: { member: member }\"\n                ></ng-container>\n            </ng-container>\n        </td>\n    </ng-template>\n</vdr-data-table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".members-header{background-color:var(--color-component-bg-100);position:sticky;top:0;padding:6px;z-index:5;border-bottom:1px solid var(--color-component-border-200)}.members-header .header-title-row{display:flex;justify-content:space-between;align-items:center}.members-header .clr-input{width:100%}"]
            },] }
];
ZoneMemberListComponent.propDecorators = {
    members: [{ type: Input }],
    selectedMemberIds: [{ type: Input }],
    selectionChange: [{ type: Output }],
    headerTemplate: [{ type: ContentChild, args: [ZoneMemberListHeaderDirective,] }],
    controlsTemplate: [{ type: ContentChild, args: [ZoneMemberControlsDirective,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9uZS1tZW1iZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL3NldHRpbmdzL3NyYy9jb21wb25lbnRzL3pvbmUtbWVtYmVyLWxpc3Qvem9uZS1tZW1iZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHOUcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFVcEYsTUFBTSxPQUFPLHVCQUF1QjtJQU5wQztRQU9hLFlBQU8sR0FBaUIsRUFBRSxDQUFDO1FBQzNCLHNCQUFpQixHQUFhLEVBQUUsQ0FBQztRQUNoQyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFHekQsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQXFDaEIscUJBQWdCLEdBQUcsQ0FBQyxNQUFrQixFQUFXLEVBQUU7WUFDL0MsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUM7SUFDTixDQUFDO0lBdENHLGVBQWU7UUFDWCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssRUFBRSxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNqRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUN0QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FDOUYsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNoRTthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pDO2FBQU07WUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFEO0lBQ0wsQ0FBQztJQUVELGtCQUFrQixDQUFDLE1BQWtCO1FBQ2pDLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNwRjthQUFNO1lBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNyRTtJQUNMLENBQUM7OztZQS9DSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMscW1EQUFnRDtnQkFFaEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7c0JBRUksS0FBSztnQ0FDTCxLQUFLOzhCQUNMLE1BQU07NkJBQ04sWUFBWSxTQUFDLDZCQUE2QjsrQkFDMUMsWUFBWSxTQUFDLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHZXRab25lcyB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuXG5pbXBvcnQgeyBab25lTWVtYmVyQ29udHJvbHNEaXJlY3RpdmUgfSBmcm9tICcuL3pvbmUtbWVtYmVyLWNvbnRyb2xzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBab25lTWVtYmVyTGlzdEhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vem9uZS1tZW1iZXItbGlzdC1oZWFkZXIuZGlyZWN0aXZlJztcblxuZXhwb3J0IHR5cGUgWm9uZU1lbWJlciA9IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjb2RlOiBzdHJpbmcgfTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItem9uZS1tZW1iZXItbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3pvbmUtbWVtYmVyLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3pvbmUtbWVtYmVyLWxpc3QuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgWm9uZU1lbWJlckxpc3RDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIG1lbWJlcnM6IFpvbmVNZW1iZXJbXSA9IFtdO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkTWVtYmVySWRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZ1tdPigpO1xuICAgIEBDb250ZW50Q2hpbGQoWm9uZU1lbWJlckxpc3RIZWFkZXJEaXJlY3RpdmUpIGhlYWRlclRlbXBsYXRlOiBab25lTWVtYmVyTGlzdEhlYWRlckRpcmVjdGl2ZTtcbiAgICBAQ29udGVudENoaWxkKFpvbmVNZW1iZXJDb250cm9sc0RpcmVjdGl2ZSkgY29udHJvbHNUZW1wbGF0ZTogWm9uZU1lbWJlckNvbnRyb2xzRGlyZWN0aXZlO1xuICAgIGZpbHRlclRlcm0gPSAnJztcblxuICAgIGZpbHRlcmVkTWVtYmVycygpOiBab25lTWVtYmVyW10ge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJUZXJtICE9PSAnJykge1xuICAgICAgICAgICAgY29uc3QgdGVybSA9IHRoaXMuZmlsdGVyVGVybS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVtYmVycy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgbSA9PiBtLm5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKS5pbmNsdWRlcyh0ZXJtKSB8fCBtLmNvZGUudG9Mb2NhbGVMb3dlckNhc2UoKS5pbmNsdWRlcyh0ZXJtKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZW1iZXJzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXJlQWxsU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLm1lbWJlcnMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkTWVtYmVySWRzLmxlbmd0aCA9PT0gdGhpcy5tZW1iZXJzLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVNlbGVjdEFsbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXJlQWxsU2VsZWN0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChbXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMubWVtYmVycy5tYXAodiA9PiB2LmlkKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVTZWxlY3RNZW1iZXIobWVtYmVyOiBab25lTWVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTWVtYmVySWRzLmluY2x1ZGVzKG1lbWJlci5pZCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZE1lbWJlcklkcy5maWx0ZXIoaWQgPT4gaWQgIT09IG1lbWJlci5pZCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChbLi4udGhpcy5zZWxlY3RlZE1lbWJlcklkcywgbWVtYmVyLmlkXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc01lbWJlclNlbGVjdGVkID0gKG1lbWJlcjogWm9uZU1lbWJlcik6IGJvb2xlYW4gPT4ge1xuICAgICAgICByZXR1cm4gLTEgPCB0aGlzLnNlbGVjdGVkTWVtYmVySWRzLmluZGV4T2YobWVtYmVyLmlkKTtcbiAgICB9O1xufVxuIl19