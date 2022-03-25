import { ChangeDetectorRef, Pipe } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
/**
 * A pipe which checks the provided permission against all the permissions of the current user.
 * Returns `true` if the current user has that permission.
 *
 * @example
 * ```
 * <button [disabled]="!('UpdateCatalog' | hasPermission)">Save Changes</button>
 * ```
 */
export class HasPermissionPipe {
    constructor(dataService, changeDetectorRef) {
        this.dataService = dataService;
        this.changeDetectorRef = changeDetectorRef;
        this.hasPermission = false;
        this.lastPermissions = null;
        this.currentPermissions$ = this.dataService.client
            .userStatus()
            .mapStream(data => data.userStatus.permissions);
    }
    transform(input) {
        const requiredPermissions = Array.isArray(input) ? input : [input];
        const requiredPermissionsString = requiredPermissions.join(',');
        if (this.lastPermissions !== requiredPermissionsString) {
            this.lastPermissions = requiredPermissionsString;
            this.hasPermission = false;
            this.dispose();
            this.subscription = this.currentPermissions$.subscribe(permissions => {
                this.hasPermission = this.checkPermissions(permissions, requiredPermissions);
                this.changeDetectorRef.markForCheck();
            });
        }
        return this.hasPermission;
    }
    ngOnDestroy() {
        this.dispose();
    }
    checkPermissions(userPermissions, requiredPermissions) {
        for (const perm of requiredPermissions) {
            if (userPermissions.includes(perm)) {
                return true;
            }
        }
        return false;
    }
    dispose() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
HasPermissionPipe.decorators = [
    { type: Pipe, args: [{
                name: 'hasPermission',
                pure: false,
            },] }
];
HasPermissionPipe.ctorParameters = () => [
    { type: DataService },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLXBlcm1pc3Npb24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL3BpcGVzL2hhcy1wZXJtaXNzaW9uLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFhLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFHbEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRWhFOzs7Ozs7OztHQVFHO0FBS0gsTUFBTSxPQUFPLGlCQUFpQjtJQU0xQixZQUFvQixXQUF3QixFQUFVLGlCQUFvQztRQUF0RSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFMbEYsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFdEIsb0JBQWUsR0FBa0IsSUFBSSxDQUFDO1FBSTFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07YUFDN0MsVUFBVSxFQUFFO2FBQ1osU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQXdCO1FBQzlCLE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25FLE1BQU0seUJBQXlCLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hFLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyx5QkFBeUIsRUFBRTtZQUNwRCxJQUFJLENBQUMsZUFBZSxHQUFHLHlCQUF5QixDQUFDO1lBQ2pELElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDakUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLG1CQUFtQixDQUFDLENBQUM7Z0JBQzdFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxlQUF5QixFQUFFLG1CQUE2QjtRQUM3RSxLQUFLLE1BQU0sSUFBSSxJQUFJLG1CQUFtQixFQUFFO1lBQ3BDLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEMsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVPLE9BQU87UUFDWCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNuQztJQUNMLENBQUM7OztZQWpESixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLElBQUksRUFBRSxLQUFLO2FBQ2Q7OztZQWRRLFdBQVc7WUFIWCxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgT25EZXN0cm95LCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuXG4vKipcbiAqIEEgcGlwZSB3aGljaCBjaGVja3MgdGhlIHByb3ZpZGVkIHBlcm1pc3Npb24gYWdhaW5zdCBhbGwgdGhlIHBlcm1pc3Npb25zIG9mIHRoZSBjdXJyZW50IHVzZXIuXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgY3VycmVudCB1c2VyIGhhcyB0aGF0IHBlcm1pc3Npb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogPGJ1dHRvbiBbZGlzYWJsZWRdPVwiISgnVXBkYXRlQ2F0YWxvZycgfCBoYXNQZXJtaXNzaW9uKVwiPlNhdmUgQ2hhbmdlczwvYnV0dG9uPlxuICogYGBgXG4gKi9cbkBQaXBlKHtcbiAgICBuYW1lOiAnaGFzUGVybWlzc2lvbicsXG4gICAgcHVyZTogZmFsc2UsXG59KVxuZXhwb3J0IGNsYXNzIEhhc1Blcm1pc3Npb25QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIGhhc1Blcm1pc3Npb24gPSBmYWxzZTtcbiAgICBwcml2YXRlIGN1cnJlbnRQZXJtaXNzaW9ucyQ6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICAgIHByaXZhdGUgbGFzdFBlcm1pc3Npb25zOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBlcm1pc3Npb25zJCA9IHRoaXMuZGF0YVNlcnZpY2UuY2xpZW50XG4gICAgICAgICAgICAudXNlclN0YXR1cygpXG4gICAgICAgICAgICAubWFwU3RyZWFtKGRhdGEgPT4gZGF0YS51c2VyU3RhdHVzLnBlcm1pc3Npb25zKTtcbiAgICB9XG5cbiAgICB0cmFuc2Zvcm0oaW5wdXQ6IHN0cmluZyB8IHN0cmluZ1tdKTogYW55IHtcbiAgICAgICAgY29uc3QgcmVxdWlyZWRQZXJtaXNzaW9ucyA9IEFycmF5LmlzQXJyYXkoaW5wdXQpID8gaW5wdXQgOiBbaW5wdXRdO1xuICAgICAgICBjb25zdCByZXF1aXJlZFBlcm1pc3Npb25zU3RyaW5nID0gcmVxdWlyZWRQZXJtaXNzaW9ucy5qb2luKCcsJyk7XG4gICAgICAgIGlmICh0aGlzLmxhc3RQZXJtaXNzaW9ucyAhPT0gcmVxdWlyZWRQZXJtaXNzaW9uc1N0cmluZykge1xuICAgICAgICAgICAgdGhpcy5sYXN0UGVybWlzc2lvbnMgPSByZXF1aXJlZFBlcm1pc3Npb25zU3RyaW5nO1xuICAgICAgICAgICAgdGhpcy5oYXNQZXJtaXNzaW9uID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5jdXJyZW50UGVybWlzc2lvbnMkLnN1YnNjcmliZShwZXJtaXNzaW9ucyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNQZXJtaXNzaW9uID0gdGhpcy5jaGVja1Blcm1pc3Npb25zKHBlcm1pc3Npb25zLCByZXF1aXJlZFBlcm1pc3Npb25zKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5oYXNQZXJtaXNzaW9uO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrUGVybWlzc2lvbnModXNlclBlcm1pc3Npb25zOiBzdHJpbmdbXSwgcmVxdWlyZWRQZXJtaXNzaW9uczogc3RyaW5nW10pOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChjb25zdCBwZXJtIG9mIHJlcXVpcmVkUGVybWlzc2lvbnMpIHtcbiAgICAgICAgICAgIGlmICh1c2VyUGVybWlzc2lvbnMuaW5jbHVkZXMocGVybSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=