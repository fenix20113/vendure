import { __awaiter } from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { combineLatest, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
export class AssignProductsToChannelDialogComponent {
    constructor(dataService, notificationService) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.priceFactorControl = new FormControl(1);
        this.selectedChannelIdControl = new FormControl();
    }
    get isProductVariantMode() {
        return this.productVariantIds != null;
    }
    ngOnInit() {
        const activeChannelId$ = this.dataService.client
            .userStatus()
            .mapSingle(({ userStatus }) => userStatus.activeChannelId);
        const allChannels$ = this.dataService.settings.getChannels().mapSingle(data => data.channels);
        combineLatest(activeChannelId$, allChannels$).subscribe(([activeChannelId, channels]) => {
            // tslint:disable-next-line:no-non-null-assertion
            this.currentChannel = channels.find(c => c.id === activeChannelId);
            this.availableChannels = channels;
        });
        this.selectedChannelIdControl.valueChanges.subscribe(ids => {
            this.selectChannel(ids);
        });
        this.variantsPreview$ = combineLatest(from(this.getTopVariants(10)), this.priceFactorControl.valueChanges.pipe(startWith(1))).pipe(map(([variants, factor]) => {
            return variants.map(v => ({
                id: v.id,
                name: v.name,
                price: v.price,
                pricePreview: v.price * +factor,
            }));
        }));
    }
    selectChannel(channelIds) {
        this.selectedChannel = this.availableChannels.find(c => c.id === channelIds[0]);
    }
    assign() {
        const selectedChannel = this.selectedChannel;
        if (selectedChannel) {
            if (!this.isProductVariantMode) {
                this.dataService.product
                    .assignProductsToChannel({
                    channelId: selectedChannel.id,
                    productIds: this.productIds,
                    priceFactor: +this.priceFactorControl.value,
                })
                    .subscribe(() => {
                    this.notificationService.success(_('catalog.assign-product-to-channel-success'), {
                        channel: selectedChannel.code,
                    });
                    this.resolveWith(true);
                });
            }
            else if (this.productVariantIds) {
                this.dataService.product
                    .assignVariantsToChannel({
                    channelId: selectedChannel.id,
                    productVariantIds: this.productVariantIds,
                    priceFactor: +this.priceFactorControl.value,
                })
                    .subscribe(() => {
                    this.notificationService.success(_('catalog.assign-variant-to-channel-success'), {
                        channel: selectedChannel.code,
                    });
                    this.resolveWith(true);
                });
            }
        }
    }
    cancel() {
        this.resolveWith();
    }
    getTopVariants(take) {
        return __awaiter(this, void 0, void 0, function* () {
            const variants = [];
            for (let i = 0; i < this.productIds.length && variants.length < take; i++) {
                const productVariants = yield this.dataService.product
                    .getProduct(this.productIds[i])
                    .mapSingle(({ product }) => {
                    const _variants = product ? product.variants : [];
                    return _variants.filter(v => { var _a; return this.isProductVariantMode ? (_a = this.productVariantIds) === null || _a === void 0 ? void 0 : _a.includes(v.id) : true; });
                })
                    .toPromise();
                variants.push(...(productVariants || []));
            }
            return variants.slice(0, take);
        });
    }
}
AssignProductsToChannelDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-assign-products-to-channel-dialog',
                template: "<ng-template vdrDialogTitle>\n    <ng-container *ngIf=\"isProductVariantMode; else productModeTitle\">{{\n        'catalog.assign-variants-to-channel' | translate\n    }}</ng-container>\n    <ng-template #productModeTitle>{{ 'catalog.assign-products-to-channel' | translate }}</ng-template>\n</ng-template>\n\n<div class=\"flex\">\n    <clr-input-container>\n        <label>{{ 'common.channel' | translate }}</label>\n        <vdr-channel-assignment-control\n            clrInput\n            [multiple]=\"false\"\n            [includeDefaultChannel]=\"false\"\n            [disableChannelIds]=\"currentChannelIds\"\n            [formControl]=\"selectedChannelIdControl\"\n        ></vdr-channel-assignment-control>\n    </clr-input-container>\n    <div class=\"flex-spacer\"></div>\n    <clr-input-container>\n        <label>{{ 'catalog.price-conversion-factor' | translate }}</label>\n        <input clrInput type=\"number\" min=\"0\" max=\"99999\" [formControl]=\"priceFactorControl\" />\n    </clr-input-container>\n</div>\n\n<div class=\"channel-price-preview\">\n    <label class=\"clr-control-label\">{{ 'catalog.channel-price-preview' | translate }}</label>\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th>{{ 'common.name' | translate }}</th>\n                <th>\n                    {{\n                        'catalog.price-in-channel'\n                            | translate: { channel: currentChannel?.code | channelCodeToLabel | translate }\n                    }}\n                </th>\n                <th>\n                    <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noSelection\">\n                        {{ 'catalog.price-in-channel' | translate: { channel: selectedChannel?.code } }}\n                    </ng-template>\n                    <ng-template #noSelection>\n                        {{ 'catalog.no-channel-selected' | translate }}\n                    </ng-template>\n                </th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"let row of variantsPreview$ | async\">\n                <td>{{ row.name }}</td>\n                <td>{{ row.price | localeCurrency: currentChannel?.currencyCode }}</td>\n                <td>\n                    <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noChannelSelected\">\n                        {{ row.pricePreview | localeCurrency: selectedChannel?.currencyCode }}\n                    </ng-template>\n                    <ng-template #noChannelSelected> - </ng-template>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"assign()\" [disabled]=\"!selectedChannel\" class=\"btn btn-primary\">\n        <ng-template [ngIf]=\"selectedChannel\" [ngIfElse]=\"noSelection\">\n            {{ 'catalog.assign-to-named-channel' | translate: { channelCode: selectedChannel?.code } }}\n        </ng-template>\n        <ng-template #noSelection>\n            {{ 'catalog.no-channel-selected' | translate }}\n        </ng-template>\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["vdr-channel-assignment-control{min-width:200px}.channel-price-preview{margin-top:24px}.channel-price-preview table.table{margin-top:6px}"]
            },] }
];
AssignProductsToChannelDialogComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduLXByb2R1Y3RzLXRvLWNoYW5uZWwtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9hc3NpZ24tcHJvZHVjdHMtdG8tY2hhbm5lbC1kaWFsb2cvYXNzaWduLXByb2R1Y3RzLXRvLWNoYW5uZWwtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDdkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQVEzRCxNQUFNLE9BQU8sc0NBQXNDO0lBa0IvQyxZQUFvQixXQUF3QixFQUFVLG1CQUF3QztRQUExRSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFaOUYsdUJBQWtCLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsNkJBQXdCLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQVdvRCxDQUFDO0lBSmxHLElBQUksb0JBQW9CO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQztJQUMxQyxDQUFDO0lBSUQsUUFBUTtRQUNKLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO2FBQzNDLFVBQVUsRUFBRTthQUNaLFNBQVMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMvRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUYsYUFBYSxDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUU7WUFDcEYsaURBQWlEO1lBQ2pELElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssZUFBZSxDQUFFLENBQUM7WUFDcEUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsYUFBYSxDQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUM3QixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDMUQsQ0FBQyxJQUFJLENBQ0YsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUN2QixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0QixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO2dCQUNaLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSztnQkFDZCxZQUFZLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU07YUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUFvQjtRQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM3QyxJQUFJLGVBQWUsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87cUJBQ25CLHVCQUF1QixDQUFDO29CQUNyQixTQUFTLEVBQUUsZUFBZSxDQUFDLEVBQUU7b0JBQzdCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtvQkFDM0IsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUs7aUJBQzlDLENBQUM7cUJBQ0QsU0FBUyxDQUFDLEdBQUcsRUFBRTtvQkFDWixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQywyQ0FBMkMsQ0FBQyxFQUFFO3dCQUM3RSxPQUFPLEVBQUUsZUFBZSxDQUFDLElBQUk7cUJBQ2hDLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixDQUFDLENBQUMsQ0FBQzthQUNWO2lCQUFNLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87cUJBQ25CLHVCQUF1QixDQUFDO29CQUNyQixTQUFTLEVBQUUsZUFBZSxDQUFDLEVBQUU7b0JBQzdCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUI7b0JBQ3pDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO2lCQUM5QyxDQUFDO3FCQUNELFNBQVMsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsMkNBQTJDLENBQUMsRUFBRTt3QkFDN0UsT0FBTyxFQUFFLGVBQWUsQ0FBQyxJQUFJO3FCQUNoQyxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7YUFDVjtTQUNKO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVhLGNBQWMsQ0FBQyxJQUFZOztZQUNyQyxNQUFNLFFBQVEsR0FBNkIsRUFBRSxDQUFDO1lBRTlDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdkUsTUFBTSxlQUFlLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87cUJBQ2pELFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUM5QixTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7b0JBQ3ZCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNsRCxPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FDeEIsT0FBQSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFDLElBQUksQ0FBQyxpQkFBaUIsMENBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQSxFQUFBLENBQzVFLENBQUM7Z0JBQ04sQ0FBQyxDQUFDO3FCQUNELFNBQVMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM3QztZQUNELE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQztLQUFBOzs7WUFsSEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1Q0FBdUM7Z0JBQ2pELCtxR0FBaUU7Z0JBRWpFLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBVlEsV0FBVztZQURYLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQgeyBHZXRDaGFubmVscywgUHJvZHVjdFZhcmlhbnRGcmFnbWVudCB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tICdAdmVuZHVyZS9hZG1pbi11aS9jb3JlJztcbmltcG9ydCB7IERpYWxvZyB9IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgZnJvbSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYXNzaWduLXByb2R1Y3RzLXRvLWNoYW5uZWwtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXNzaWduLXByb2R1Y3RzLXRvLWNoYW5uZWwtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hc3NpZ24tcHJvZHVjdHMtdG8tY2hhbm5lbC1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQXNzaWduUHJvZHVjdHNUb0NoYW5uZWxEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERpYWxvZzxhbnk+IHtcbiAgICBzZWxlY3RlZENoYW5uZWw6IEdldENoYW5uZWxzLkNoYW5uZWxzIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICBjdXJyZW50Q2hhbm5lbDogR2V0Q2hhbm5lbHMuQ2hhbm5lbHM7XG4gICAgYXZhaWxhYmxlQ2hhbm5lbHM6IEdldENoYW5uZWxzLkNoYW5uZWxzW107XG4gICAgcmVzb2x2ZVdpdGg6IChyZXN1bHQ/OiBhbnkpID0+IHZvaWQ7XG4gICAgdmFyaWFudHNQcmV2aWV3JDogT2JzZXJ2YWJsZTxBcnJheTx7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgcHJpY2U6IG51bWJlcjsgcHJpY2VQcmV2aWV3OiBudW1iZXIgfT4+O1xuICAgIHByaWNlRmFjdG9yQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgxKTtcbiAgICBzZWxlY3RlZENoYW5uZWxJZENvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcblxuICAgIC8vIGFzc2lnbmVkIGJ5IE1vZGFsU2VydmljZS5mcm9tQ29tcG9uZW50KCkgY2FsbFxuICAgIHByb2R1Y3RJZHM6IHN0cmluZ1tdO1xuICAgIHByb2R1Y3RWYXJpYW50SWRzOiBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcbiAgICBjdXJyZW50Q2hhbm5lbElkczogc3RyaW5nW107XG5cbiAgICBnZXQgaXNQcm9kdWN0VmFyaWFudE1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RWYXJpYW50SWRzICE9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zdCBhY3RpdmVDaGFubmVsSWQkID0gdGhpcy5kYXRhU2VydmljZS5jbGllbnRcbiAgICAgICAgICAgIC51c2VyU3RhdHVzKClcbiAgICAgICAgICAgIC5tYXBTaW5nbGUoKHsgdXNlclN0YXR1cyB9KSA9PiB1c2VyU3RhdHVzLmFjdGl2ZUNoYW5uZWxJZCk7XG4gICAgICAgIGNvbnN0IGFsbENoYW5uZWxzJCA9IHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3MuZ2V0Q2hhbm5lbHMoKS5tYXBTaW5nbGUoZGF0YSA9PiBkYXRhLmNoYW5uZWxzKTtcblxuICAgICAgICBjb21iaW5lTGF0ZXN0KGFjdGl2ZUNoYW5uZWxJZCQsIGFsbENoYW5uZWxzJCkuc3Vic2NyaWJlKChbYWN0aXZlQ2hhbm5lbElkLCBjaGFubmVsc10pID0+IHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgIHRoaXMuY3VycmVudENoYW5uZWwgPSBjaGFubmVscy5maW5kKGMgPT4gYy5pZCA9PT0gYWN0aXZlQ2hhbm5lbElkKSE7XG4gICAgICAgICAgICB0aGlzLmF2YWlsYWJsZUNoYW5uZWxzID0gY2hhbm5lbHM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFubmVsSWRDb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoaWRzID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2hhbm5lbChpZHMpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnZhcmlhbnRzUHJldmlldyQgPSBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgZnJvbSh0aGlzLmdldFRvcFZhcmlhbnRzKDEwKSksXG4gICAgICAgICAgICB0aGlzLnByaWNlRmFjdG9yQ29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShzdGFydFdpdGgoMSkpLFxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICBtYXAoKFt2YXJpYW50cywgZmFjdG9yXSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YXJpYW50cy5tYXAodiA9PiAoe1xuICAgICAgICAgICAgICAgICAgICBpZDogdi5pZCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdi5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBwcmljZTogdi5wcmljZSxcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VQcmV2aWV3OiB2LnByaWNlICogK2ZhY3RvcixcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZWxlY3RDaGFubmVsKGNoYW5uZWxJZHM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFubmVsID0gdGhpcy5hdmFpbGFibGVDaGFubmVscy5maW5kKGMgPT4gYy5pZCA9PT0gY2hhbm5lbElkc1swXSk7XG4gICAgfVxuXG4gICAgYXNzaWduKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZENoYW5uZWwgPSB0aGlzLnNlbGVjdGVkQ2hhbm5lbDtcbiAgICAgICAgaWYgKHNlbGVjdGVkQ2hhbm5lbCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzUHJvZHVjdFZhcmlhbnRNb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5wcm9kdWN0XG4gICAgICAgICAgICAgICAgICAgIC5hc3NpZ25Qcm9kdWN0c1RvQ2hhbm5lbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsSWQ6IHNlbGVjdGVkQ2hhbm5lbC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZHM6IHRoaXMucHJvZHVjdElkcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlRmFjdG9yOiArdGhpcy5wcmljZUZhY3RvckNvbnRyb2wudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY2F0YWxvZy5hc3NpZ24tcHJvZHVjdC10by1jaGFubmVsLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IHNlbGVjdGVkQ2hhbm5lbC5jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVXaXRoKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9kdWN0VmFyaWFudElkcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgICAgICAgICAuYXNzaWduVmFyaWFudHNUb0NoYW5uZWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbElkOiBzZWxlY3RlZENoYW5uZWwuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0VmFyaWFudElkczogdGhpcy5wcm9kdWN0VmFyaWFudElkcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlRmFjdG9yOiArdGhpcy5wcmljZUZhY3RvckNvbnRyb2wudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY2F0YWxvZy5hc3NpZ24tdmFyaWFudC10by1jaGFubmVsLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IHNlbGVjdGVkQ2hhbm5lbC5jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVXaXRoKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlV2l0aCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZ2V0VG9wVmFyaWFudHModGFrZTogbnVtYmVyKTogUHJvbWlzZTxQcm9kdWN0VmFyaWFudEZyYWdtZW50W10+IHtcbiAgICAgICAgY29uc3QgdmFyaWFudHM6IFByb2R1Y3RWYXJpYW50RnJhZ21lbnRbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9kdWN0SWRzLmxlbmd0aCAmJiB2YXJpYW50cy5sZW5ndGggPCB0YWtlOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RWYXJpYW50cyA9IGF3YWl0IHRoaXMuZGF0YVNlcnZpY2UucHJvZHVjdFxuICAgICAgICAgICAgICAgIC5nZXRQcm9kdWN0KHRoaXMucHJvZHVjdElkc1tpXSlcbiAgICAgICAgICAgICAgICAubWFwU2luZ2xlKCh7IHByb2R1Y3QgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBfdmFyaWFudHMgPSBwcm9kdWN0ID8gcHJvZHVjdC52YXJpYW50cyA6IFtdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZhcmlhbnRzLmZpbHRlcih2ID0+XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUHJvZHVjdFZhcmlhbnRNb2RlID8gdGhpcy5wcm9kdWN0VmFyaWFudElkcz8uaW5jbHVkZXModi5pZCkgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgdmFyaWFudHMucHVzaCguLi4ocHJvZHVjdFZhcmlhbnRzIHx8IFtdKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhcmlhbnRzLnNsaWNlKDAsIHRha2UpO1xuICAgIH1cbn1cbiJdfQ==