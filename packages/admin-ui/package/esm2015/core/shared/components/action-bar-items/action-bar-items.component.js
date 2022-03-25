import { ChangeDetectionStrategy, Component, HostBinding, Input, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { assertNever } from '@vendure/common/lib/shared-utils';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../../../data/providers/data.service';
import { NavBuilderService } from '../../../providers/nav-builder/nav-builder.service';
import { NotificationService } from '../../../providers/notification/notification.service';
export class ActionBarItemsComponent {
    constructor(navBuilderService, route, dataService, notificationService) {
        this.navBuilderService = navBuilderService;
        this.route = route;
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.locationId$ = new BehaviorSubject('');
    }
    ngOnInit() {
        this.items$ = combineLatest(this.navBuilderService.actionBarConfig$, this.locationId$).pipe(map(([items, locationId]) => items.filter(config => config.locationId === locationId)));
    }
    ngOnChanges(changes) {
        if ('locationId' in changes) {
            this.locationId$.next(changes['locationId'].currentValue);
        }
    }
    handleClick(event, item) {
        if (typeof item.onClick === 'function') {
            item.onClick(event, {
                route: this.route,
                dataService: this.dataService,
                notificationService: this.notificationService,
            });
        }
    }
    getRouterLink(item) {
        return this.navBuilderService.getRouterLink(item, this.route);
    }
    getButtonStyles(item) {
        const styles = ['btn'];
        if (item.buttonStyle && item.buttonStyle === 'link') {
            styles.push('btn-link');
            return styles;
        }
        styles.push(this.getButtonColorClass(item));
        return styles;
    }
    getButtonColorClass(item) {
        switch (item.buttonColor) {
            case undefined:
            case 'primary':
                return item.buttonStyle === 'outline' ? 'btn-outline' : 'btn-primary';
            case 'success':
                return item.buttonStyle === 'outline' ? 'btn-success-outline' : 'btn-success';
            case 'warning':
                return item.buttonStyle === 'outline' ? 'btn-warning-outline' : 'btn-warning';
            default:
                assertNever(item.buttonColor);
                return '';
        }
    }
}
ActionBarItemsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-action-bar-items',
                template: "<ng-container *ngFor=\"let item of items$ | async\">\n    <button *vdrIfPermissions=\"item.requiresPermission\"\n            [routerLink]=\"getRouterLink(item)\"\n            [disabled]=\"item.disabled ? (item.disabled | async) : false\"\n            (click)=\"handleClick($event, item)\"\n            [ngClass]=\"getButtonStyles(item)\">\n        <clr-icon *ngIf=\"item.icon\" [attr.shape]=\"item.icon\"></clr-icon>\n        {{ item.label | translate }}\n    </button>\n</ng-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ActionBarItemsComponent.ctorParameters = () => [
    { type: NavBuilderService },
    { type: ActivatedRoute },
    { type: DataService },
    { type: NotificationService }
];
ActionBarItemsComponent.propDecorators = {
    locationId: [{ type: HostBinding, args: ['attr.data-location-id',] }, { type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWJhci1pdGVtcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2FjdGlvbi1iYXItaXRlbXMvYWN0aW9uLWJhci1pdGVtcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsV0FBVyxFQUNYLEtBQUssR0FJUixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFrQixNQUFNLE1BQU0sQ0FBQztBQUN0RSxPQUFPLEVBQVUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBUTNGLE1BQU0sT0FBTyx1QkFBdUI7SUFRaEMsWUFDWSxpQkFBb0MsRUFDcEMsS0FBcUIsRUFDckIsV0FBd0IsRUFDeEIsbUJBQXdDO1FBSHhDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQU41QyxnQkFBVyxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBT25ELENBQUM7SUFFSixRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ3ZGLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUN6RixDQUFDO0lBQ04sQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLFlBQVksSUFBSSxPQUFPLEVBQUU7WUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzdEO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFpQixFQUFFLElBQW1CO1FBQzlDLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDaEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7YUFDaEQsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQW1CO1FBQzdCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxlQUFlLENBQUMsSUFBbUI7UUFDL0IsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxNQUFNLEVBQUU7WUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QixPQUFPLE1BQU0sQ0FBQztTQUNqQjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVPLG1CQUFtQixDQUFDLElBQW1CO1FBQzNDLFFBQVEsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN0QixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssU0FBUztnQkFDVixPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUMxRSxLQUFLLFNBQVM7Z0JBQ1YsT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUNsRixLQUFLLFNBQVM7Z0JBQ1YsT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUNsRjtnQkFDSSxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM5QixPQUFPLEVBQUUsQ0FBQztTQUNqQjtJQUNMLENBQUM7OztZQXRFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsb2ZBQWdEO2dCQUVoRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OztZQVJRLGlCQUFpQjtZQVBqQixjQUFjO1lBS2QsV0FBVztZQUdYLG1CQUFtQjs7O3lCQVN2QixXQUFXLFNBQUMsdUJBQXVCLGNBQ25DLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBIb3N0QmluZGluZyxcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25Jbml0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgYXNzZXJ0TmV2ZXIgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC11dGlscyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhL3Byb3ZpZGVycy9kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWN0aW9uQmFySXRlbSB9IGZyb20gJy4uLy4uLy4uL3Byb3ZpZGVycy9uYXYtYnVpbGRlci9uYXYtYnVpbGRlci10eXBlcyc7XG5pbXBvcnQgeyBOYXZCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3Byb3ZpZGVycy9uYXYtYnVpbGRlci9uYXYtYnVpbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9wcm92aWRlcnMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYWN0aW9uLWJhci1pdGVtcycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FjdGlvbi1iYXItaXRlbXMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2FjdGlvbi1iYXItaXRlbXMuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQWN0aW9uQmFySXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLmRhdGEtbG9jYXRpb24taWQnKVxuICAgIEBJbnB1dCgpXG4gICAgbG9jYXRpb25JZDogc3RyaW5nO1xuXG4gICAgaXRlbXMkOiBPYnNlcnZhYmxlPEFjdGlvbkJhckl0ZW1bXT47XG4gICAgcHJpdmF0ZSBsb2NhdGlvbklkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBuYXZCdWlsZGVyU2VydmljZTogTmF2QnVpbGRlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLml0ZW1zJCA9IGNvbWJpbmVMYXRlc3QodGhpcy5uYXZCdWlsZGVyU2VydmljZS5hY3Rpb25CYXJDb25maWckLCB0aGlzLmxvY2F0aW9uSWQkKS5waXBlKFxuICAgICAgICAgICAgbWFwKChbaXRlbXMsIGxvY2F0aW9uSWRdKSA9PiBpdGVtcy5maWx0ZXIoY29uZmlnID0+IGNvbmZpZy5sb2NhdGlvbklkID09PSBsb2NhdGlvbklkKSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoJ2xvY2F0aW9uSWQnIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb25JZCQubmV4dChjaGFuZ2VzWydsb2NhdGlvbklkJ10uY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBpdGVtOiBBY3Rpb25CYXJJdGVtKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbS5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpdGVtLm9uQ2xpY2soZXZlbnQsIHtcbiAgICAgICAgICAgICAgICByb3V0ZTogdGhpcy5yb3V0ZSxcbiAgICAgICAgICAgICAgICBkYXRhU2VydmljZTogdGhpcy5kYXRhU2VydmljZSxcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb25TZXJ2aWNlOiB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFJvdXRlckxpbmsoaXRlbTogQWN0aW9uQmFySXRlbSk6IGFueVtdIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdkJ1aWxkZXJTZXJ2aWNlLmdldFJvdXRlckxpbmsoaXRlbSwgdGhpcy5yb3V0ZSk7XG4gICAgfVxuXG4gICAgZ2V0QnV0dG9uU3R5bGVzKGl0ZW06IEFjdGlvbkJhckl0ZW0pOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IFsnYnRuJ107XG4gICAgICAgIGlmIChpdGVtLmJ1dHRvblN0eWxlICYmIGl0ZW0uYnV0dG9uU3R5bGUgPT09ICdsaW5rJykge1xuICAgICAgICAgICAgc3R5bGVzLnB1c2goJ2J0bi1saW5rJyk7XG4gICAgICAgICAgICByZXR1cm4gc3R5bGVzO1xuICAgICAgICB9XG4gICAgICAgIHN0eWxlcy5wdXNoKHRoaXMuZ2V0QnV0dG9uQ29sb3JDbGFzcyhpdGVtKSk7XG4gICAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCdXR0b25Db2xvckNsYXNzKGl0ZW06IEFjdGlvbkJhckl0ZW0pOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKGl0ZW0uYnV0dG9uQ29sb3IpIHtcbiAgICAgICAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICAgICAgY2FzZSAncHJpbWFyeSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uYnV0dG9uU3R5bGUgPT09ICdvdXRsaW5lJyA/ICdidG4tb3V0bGluZScgOiAnYnRuLXByaW1hcnknO1xuICAgICAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uYnV0dG9uU3R5bGUgPT09ICdvdXRsaW5lJyA/ICdidG4tc3VjY2Vzcy1vdXRsaW5lJyA6ICdidG4tc3VjY2Vzcyc7XG4gICAgICAgICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5idXR0b25TdHlsZSA9PT0gJ291dGxpbmUnID8gJ2J0bi13YXJuaW5nLW91dGxpbmUnIDogJ2J0bi13YXJuaW5nJztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYXNzZXJ0TmV2ZXIoaXRlbS5idXR0b25Db2xvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19