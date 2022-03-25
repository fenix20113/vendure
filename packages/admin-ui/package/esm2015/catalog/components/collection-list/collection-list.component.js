import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { DataService, ModalService, NotificationService, } from '@vendure/admin-ui/core';
import { combineLatest, EMPTY } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap, take } from 'rxjs/operators';
export class CollectionListComponent {
    constructor(dataService, notificationService, modalService, router, route) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.router = router;
        this.route = route;
        this.expandAll = false;
    }
    ngOnInit() {
        this.queryResult = this.dataService.collection.getCollections(1000, 0).refetchOnChannelChange();
        this.items$ = this.queryResult.mapStream(data => data.collections.items).pipe(shareReplay(1));
        this.activeCollectionId$ = this.route.paramMap.pipe(map(pm => pm.get('contents')), distinctUntilChanged());
        this.activeCollectionTitle$ = combineLatest(this.activeCollectionId$, this.items$).pipe(map(([id, collections]) => {
            if (id) {
                const match = collections.find(c => c.id === id);
                return match ? match.name : '';
            }
            return '';
        }));
    }
    ngOnDestroy() {
        this.queryResult.completed$.next();
    }
    onRearrange(event) {
        this.dataService.collection.moveCollection([event]).subscribe({
            next: () => {
                this.notificationService.success(_('common.notify-saved-changes'));
                this.refresh();
            },
            error: err => {
                this.notificationService.error(_('common.notify-save-changes-error'));
            },
        });
    }
    deleteCollection(id) {
        this.items$
            .pipe(take(1), map(items => -1 < items.findIndex(i => i.parent && i.parent.id === id)), switchMap(hasChildren => {
            return this.modalService.dialog({
                title: _('catalog.confirm-delete-collection'),
                body: hasChildren
                    ? _('catalog.confirm-delete-collection-and-children-body')
                    : undefined,
                buttons: [
                    { type: 'secondary', label: _('common.cancel') },
                    { type: 'danger', label: _('common.delete'), returnValue: true },
                ],
            });
        }), switchMap(response => (response ? this.dataService.collection.deleteCollection(id) : EMPTY)))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'Collection',
            });
            this.refresh();
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'Collection',
            });
        });
    }
    closeContents() {
        const params = Object.assign({}, this.route.snapshot.params);
        delete params.contents;
        this.router.navigate(['./', params], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    }
    refresh() {
        this.queryResult.ref.refetch();
    }
}
CollectionListComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-collection-list',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <clr-checkbox-wrapper class=\"expand-all-toggle ml3\">\n            <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"expandAll\" />\n            <label>{{ 'catalog.expand-all-collections' | translate }}</label>\n        </clr-checkbox-wrapper>\n    </vdr-ab-left>\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"collection-list\"></vdr-action-bar-items>\n        <a class=\"btn btn-primary\" *vdrIfPermissions=\"['CreateCatalog', 'CreateCollection']\" [routerLink]=\"['./create']\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'catalog.create-new-collection' | translate }}\n        </a>\n    </vdr-ab-right>\n</vdr-action-bar>\n<div class=\"collection-wrapper\">\n    <vdr-collection-tree\n        [collections]=\"items$ | async\"\n        [activeCollectionId]=\"activeCollectionId$ | async\"\n        [expandAll]=\"expandAll\"\n        (rearrange)=\"onRearrange($event)\"\n        (deleteCollection)=\"deleteCollection($event)\"\n    ></vdr-collection-tree>\n\n    <div class=\"collection-contents\" [class.expanded]=\"activeCollectionId$ | async\">\n        <vdr-collection-contents [collectionId]=\"activeCollectionId$ | async\">\n            <ng-template let-count>\n                <div class=\"collection-title\">\n                    {{ activeCollectionTitle$ | async }} ({{\n                        'common.results-count' | translate: { count: count }\n                    }})\n                </div>\n                <button type=\"button\" class=\"close-button\" (click)=\"closeContents()\">\n                    <clr-icon shape=\"close\"></clr-icon>\n                </button>\n            </ng-template>\n        </vdr-collection-contents>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{height:100%;display:flex;flex-direction:column}.expand-all-toggle{display:block;margin-top:14px}.collection-wrapper{display:flex;height:calc(100% - 50px)}.collection-wrapper vdr-collection-tree{flex:1;height:100%;overflow:auto}.collection-wrapper .collection-contents{height:100%;width:0;opacity:0;visibility:hidden;overflow:auto;transition:width .3s,opacity .2s .3s,visibility 0s .3s}.collection-wrapper .collection-contents.expanded{width:30vw;visibility:visible;opacity:1;padding-left:12px}.collection-wrapper .collection-contents .close-button{margin:0;background:none;border:none;cursor:pointer}.paging-controls{padding-top:6px;border-top:1px solid var(--color-component-border-100);display:flex;justify-content:space-between}"]
            },] }
];
CollectionListComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService },
    { type: ModalService },
    { type: Router },
    { type: ActivatedRoute }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9jb2xsZWN0aW9uLWxpc3QvY29sbGVjdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUNILFdBQVcsRUFFWCxZQUFZLEVBQ1osbUJBQW1CLEdBRXRCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBVXpGLE1BQU0sT0FBTyx1QkFBdUI7SUFPaEMsWUFDWSxXQUF3QixFQUN4QixtQkFBd0MsRUFDeEMsWUFBMEIsRUFDMUIsTUFBYyxFQUNkLEtBQXFCO1FBSnJCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBUmpDLGNBQVMsR0FBRyxLQUFLLENBQUM7SUFTZixDQUFDO0lBRUosUUFBUTtRQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ2hHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUMvQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQzdCLG9CQUFvQixFQUFFLENBQ3pCLENBQUM7UUFFRixJQUFJLENBQUMsc0JBQXNCLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUNuRixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFO1lBQ3RCLElBQUksRUFBRSxFQUFFO2dCQUNKLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ2xDO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQXFCO1FBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzFELElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbkIsQ0FBQztZQUNELEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDVCxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLENBQUM7WUFDMUUsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFVO1FBQ3ZCLElBQUksQ0FBQyxNQUFNO2FBQ04sSUFBSSxDQUNELElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUN2RSxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztnQkFDNUIsS0FBSyxFQUFFLENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQztnQkFDN0MsSUFBSSxFQUFFLFdBQVc7b0JBQ2IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxREFBcUQsQ0FBQztvQkFDMUQsQ0FBQyxDQUFDLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFO29CQUNMLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFO29CQUNoRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO2lCQUNuRTthQUNKLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxFQUNGLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDL0Y7YUFDQSxTQUFTLENBQ04sR0FBRyxFQUFFO1lBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsOEJBQThCLENBQUMsRUFBRTtnQkFDaEUsTUFBTSxFQUFFLFlBQVk7YUFDdkIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsRUFDRCxHQUFHLENBQUMsRUFBRTtZQUNGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLEVBQUU7Z0JBQzVELE1BQU0sRUFBRSxZQUFZO2FBQ3ZCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FDSixDQUFDO0lBQ1YsQ0FBQztJQUVELGFBQWE7UUFDVCxNQUFNLE1BQU0scUJBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFFLENBQUM7UUFDakQsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUN0RyxDQUFDO0lBRU8sT0FBTztRQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25DLENBQUM7OztZQWxHSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsMnVEQUErQztnQkFFL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFoQkcsV0FBVztZQUdYLG1CQUFtQjtZQURuQixZQUFZO1lBTFMsTUFBTTtZQUF0QixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHtcbiAgICBEYXRhU2VydmljZSxcbiAgICBHZXRDb2xsZWN0aW9uTGlzdCxcbiAgICBNb2RhbFNlcnZpY2UsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBRdWVyeVJlc3VsdCxcbn0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc2hhcmVSZXBsYXksIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgUmVhcnJhbmdlRXZlbnQgfSBmcm9tICcuLi9jb2xsZWN0aW9uLXRyZWUvY29sbGVjdGlvbi10cmVlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWNvbGxlY3Rpb24tbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NvbGxlY3Rpb24tbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29sbGVjdGlvbi1saXN0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25MaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGFjdGl2ZUNvbGxlY3Rpb25JZCQ6IE9ic2VydmFibGU8c3RyaW5nIHwgbnVsbD47XG4gICAgYWN0aXZlQ29sbGVjdGlvblRpdGxlJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgIGl0ZW1zJDogT2JzZXJ2YWJsZTxHZXRDb2xsZWN0aW9uTGlzdC5JdGVtc1tdPjtcbiAgICBleHBhbmRBbGwgPSBmYWxzZTtcbiAgICBwcml2YXRlIHF1ZXJ5UmVzdWx0OiBRdWVyeVJlc3VsdDxhbnk+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnF1ZXJ5UmVzdWx0ID0gdGhpcy5kYXRhU2VydmljZS5jb2xsZWN0aW9uLmdldENvbGxlY3Rpb25zKDEwMDAsIDApLnJlZmV0Y2hPbkNoYW5uZWxDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5pdGVtcyQgPSB0aGlzLnF1ZXJ5UmVzdWx0Lm1hcFN0cmVhbShkYXRhID0+IGRhdGEuY29sbGVjdGlvbnMuaXRlbXMpLnBpcGUoc2hhcmVSZXBsYXkoMSkpO1xuICAgICAgICB0aGlzLmFjdGl2ZUNvbGxlY3Rpb25JZCQgPSB0aGlzLnJvdXRlLnBhcmFtTWFwLnBpcGUoXG4gICAgICAgICAgICBtYXAocG0gPT4gcG0uZ2V0KCdjb250ZW50cycpKSxcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmVDb2xsZWN0aW9uVGl0bGUkID0gY29tYmluZUxhdGVzdCh0aGlzLmFjdGl2ZUNvbGxlY3Rpb25JZCQsIHRoaXMuaXRlbXMkKS5waXBlKFxuICAgICAgICAgICAgbWFwKChbaWQsIGNvbGxlY3Rpb25zXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IGNvbGxlY3Rpb25zLmZpbmQoYyA9PiBjLmlkID09PSBpZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaCA/IG1hdGNoLm5hbWUgOiAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucXVlcnlSZXN1bHQuY29tcGxldGVkJC5uZXh0KCk7XG4gICAgfVxuXG4gICAgb25SZWFycmFuZ2UoZXZlbnQ6IFJlYXJyYW5nZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY29sbGVjdGlvbi5tb3ZlQ29sbGVjdGlvbihbZXZlbnRdKS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktc2F2ZWQtY2hhbmdlcycpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZXJyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoXygnY29tbW9uLm5vdGlmeS1zYXZlLWNoYW5nZXMtZXJyb3InKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVDb2xsZWN0aW9uKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pdGVtcyRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgbWFwKGl0ZW1zID0+IC0xIDwgaXRlbXMuZmluZEluZGV4KGkgPT4gaS5wYXJlbnQgJiYgaS5wYXJlbnQuaWQgPT09IGlkKSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKGhhc0NoaWxkcmVuID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXygnY2F0YWxvZy5jb25maXJtLWRlbGV0ZS1jb2xsZWN0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBoYXNDaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXygnY2F0YWxvZy5jb25maXJtLWRlbGV0ZS1jb2xsZWN0aW9uLWFuZC1jaGlsZHJlbi1ib2R5JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdzZWNvbmRhcnknLCBsYWJlbDogXygnY29tbW9uLmNhbmNlbCcpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnZGFuZ2VyJywgbGFiZWw6IF8oJ2NvbW1vbi5kZWxldGUnKSwgcmV0dXJuVmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChyZXNwb25zZSA9PiAocmVzcG9uc2UgPyB0aGlzLmRhdGFTZXJ2aWNlLmNvbGxlY3Rpb24uZGVsZXRlQ29sbGVjdGlvbihpZCkgOiBFTVBUWSkpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktZGVsZXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihfKCdjb21tb24ubm90aWZ5LWRlbGV0ZS1lcnJvcicpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6ICdDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgY2xvc2VDb250ZW50cygpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0geyAuLi50aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtcyB9O1xuICAgICAgICBkZWxldGUgcGFyYW1zLmNvbnRlbnRzO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4vJywgcGFyYW1zXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLCBxdWVyeVBhcmFtc0hhbmRsaW5nOiAncHJlc2VydmUnIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5xdWVyeVJlc3VsdC5yZWYucmVmZXRjaCgpO1xuICAgIH1cbn1cbiJdfQ==