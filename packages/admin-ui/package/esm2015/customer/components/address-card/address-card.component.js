import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from '@vendure/admin-ui/core';
import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AddressDetailDialogComponent } from '../address-detail-dialog/address-detail-dialog.component';
export class AddressCardComponent {
    constructor(modalService, changeDetector) {
        this.modalService = modalService;
        this.changeDetector = changeDetector;
        this.availableCountries = [];
        this.editable = true;
        this.setAsDefaultShipping = new EventEmitter();
        this.setAsDefaultBilling = new EventEmitter();
        this.dataDependenciesPopulated = new BehaviorSubject(false);
    }
    ngOnInit() {
        const streetLine1 = this.addressForm.get('streetLine1');
        // Make the address dialog display automatically if there is no address line
        // as is the case when adding a new address.
        if (!streetLine1.value) {
            this.dataDependenciesPopulated
                .pipe(filter(value => value), take(1))
                .subscribe(() => {
                this.editAddress();
            });
        }
    }
    ngOnChanges(changes) {
        if (this.customFields != null && this.availableCountries != null) {
            this.dataDependenciesPopulated.next(true);
        }
    }
    getCountryName(countryCode) {
        if (!this.availableCountries) {
            return '';
        }
        const match = this.availableCountries.find(c => c.code === countryCode);
        return match ? match.name : '';
    }
    setAsDefaultBillingAddress() {
        this.setAsDefaultBilling.emit(this.addressForm.value.id);
        this.addressForm.markAsDirty();
    }
    setAsDefaultShippingAddress() {
        this.setAsDefaultShipping.emit(this.addressForm.value.id);
        this.addressForm.markAsDirty();
    }
    editAddress() {
        this.modalService
            .fromComponent(AddressDetailDialogComponent, {
            locals: {
                addressForm: this.addressForm,
                customFields: this.customFields,
                availableCountries: this.availableCountries,
            },
            size: 'md',
            closable: true,
        })
            .subscribe(() => {
            this.changeDetector.markForCheck();
        });
    }
}
AddressCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-address-card',
                template: "<div class=\"card\" *ngIf=\"addressForm.value as address\">\n    <div class=\"card-header\">\n        <div class=\"address-title\">\n            <span class=\"street-line\" *ngIf=\"address.streetLine1\">{{ address.streetLine1 }},</span>\n            {{ address.countryCode }}\n        </div>\n        <div class=\"default-controls\">\n            <vdr-chip class=\"is-default p8\" *ngIf=\"isDefaultShipping\">\n                <clr-icon shape=\"truck\"></clr-icon>\n                {{ 'customer.default-shipping-address' | translate }}\n            </vdr-chip>\n            <vdr-chip class=\"is-default p8\" *ngIf=\"isDefaultBilling\">\n                <clr-icon shape=\"credit-card\"></clr-icon>\n                {{ 'customer.default-billing-address' | translate }}\n            </vdr-chip>\n        </div>\n    </div>\n    <div class=\"card-block\">\n        <div class=\"card-text\">\n            <vdr-formatted-address [address]=\"address\"></vdr-formatted-address>\n        </div>\n    </div>\n    <div class=\"card-footer\">\n        <vdr-entity-info [entity]=\"address\"></vdr-entity-info>\n        <ng-container *ngIf=\"editable\">\n            <button class=\"btn btn-sm btn-link\" (click)=\"editAddress()\">\n                {{ 'common.edit' | translate }}\n            </button>\n            <vdr-dropdown>\n                <button type=\"button\" class=\"btn btn-sm btn-link\" vdrDropdownTrigger>\n                    {{ 'common.more' | translate }}\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <vdr-dropdown-menu>\n                    <button\n                        vdrDropdownItem\n                        class=\"button\"\n                        [disabled]=\"isDefaultShipping\"\n                        (click)=\"setAsDefaultShippingAddress()\"\n                    >\n                        {{ 'customer.set-as-default-shipping-address' | translate }}\n                    </button>\n                    <button\n                        vdrDropdownItem\n                        class=\"button\"\n                        [disabled]=\"isDefaultBilling\"\n                        (click)=\"setAsDefaultBillingAddress()\"\n                    >\n                        {{ 'customer.set-as-default-billing-address' | translate }}\n                    </button>\n                </vdr-dropdown-menu>\n            </vdr-dropdown>\n        </ng-container>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;max-width:360px}clr-input-container{margin-bottom:12px}.defaul-controls{display:flex}.is-default{margin:0;color:var(--color-success-500)}"]
            },] }
];
AddressCardComponent.ctorParameters = () => [
    { type: ModalService },
    { type: ChangeDetectorRef }
];
AddressCardComponent.propDecorators = {
    addressForm: [{ type: Input }],
    customFields: [{ type: Input }],
    availableCountries: [{ type: Input }],
    isDefaultBilling: [{ type: Input }],
    isDefaultShipping: [{ type: Input }],
    editable: [{ type: Input }],
    setAsDefaultShipping: [{ type: Output }],
    setAsDefaultBilling: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy1jYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY3VzdG9tZXIvc3JjL2NvbXBvbmVudHMvYWRkcmVzcy1jYXJkL2FkZHJlc3MtY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQTRDLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQVF4RyxNQUFNLE9BQU8sb0JBQW9CO0lBVzdCLFlBQW9CLFlBQTBCLEVBQVUsY0FBaUM7UUFBckUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFSaEYsdUJBQWtCLEdBQWtDLEVBQUUsQ0FBQztRQUd2RCxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2YseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNsRCx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ25ELDhCQUF5QixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBRW9CLENBQUM7SUFFN0YsUUFBUTtRQUNKLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBZ0IsQ0FBQztRQUN2RSw0RUFBNEU7UUFDNUUsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyx5QkFBeUI7aUJBQ3pCLElBQUksQ0FDRCxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFDdEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNWO2lCQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1NBQ1Y7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksRUFBRTtZQUM5RCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdDO0lBQ0wsQ0FBQztJQUVELGNBQWMsQ0FBQyxXQUFtQjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzFCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQztRQUN4RSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCwwQkFBMEI7UUFDdEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCwyQkFBMkI7UUFDdkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFlBQVk7YUFDWixhQUFhLENBQUMsNEJBQTRCLEVBQUU7WUFDekMsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDN0IsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO2dCQUMvQixrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO2FBQzlDO1lBQ0QsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsSUFBSTtTQUNqQixDQUFDO2FBQ0QsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDOzs7WUF6RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLGs2RUFBNEM7Z0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O1lBWGtELFlBQVk7WUFWM0QsaUJBQWlCOzs7MEJBdUJoQixLQUFLOzJCQUNMLEtBQUs7aUNBQ0wsS0FBSzsrQkFDTCxLQUFLO2dDQUNMLEtBQUs7dUJBQ0wsS0FBSzttQ0FDTCxNQUFNO2tDQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ3VzdG9tRmllbGRDb25maWcsIEdldEF2YWlsYWJsZUNvdW50cmllcywgTW9kYWxTZXJ2aWNlIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQWRkcmVzc0RldGFpbERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL2FkZHJlc3MtZGV0YWlsLWRpYWxvZy9hZGRyZXNzLWRldGFpbC1kaWFsb2cuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItYWRkcmVzcy1jYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYWRkcmVzcy1jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hZGRyZXNzLWNhcmQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQWRkcmVzc0NhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgYWRkcmVzc0Zvcm06IEZvcm1Hcm91cDtcbiAgICBASW5wdXQoKSBjdXN0b21GaWVsZHM6IEN1c3RvbUZpZWxkQ29uZmlnO1xuICAgIEBJbnB1dCgpIGF2YWlsYWJsZUNvdW50cmllczogR2V0QXZhaWxhYmxlQ291bnRyaWVzLkl0ZW1zW10gPSBbXTtcbiAgICBASW5wdXQoKSBpc0RlZmF1bHRCaWxsaW5nOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaXNEZWZhdWx0U2hpcHBpbmc6IHN0cmluZztcbiAgICBASW5wdXQoKSBlZGl0YWJsZSA9IHRydWU7XG4gICAgQE91dHB1dCgpIHNldEFzRGVmYXVsdFNoaXBwaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgQE91dHB1dCgpIHNldEFzRGVmYXVsdEJpbGxpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgICBwcml2YXRlIGRhdGFEZXBlbmRlbmNpZXNQb3B1bGF0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHN0cmVldExpbmUxID0gdGhpcy5hZGRyZXNzRm9ybS5nZXQoJ3N0cmVldExpbmUxJykgYXMgRm9ybUNvbnRyb2w7XG4gICAgICAgIC8vIE1ha2UgdGhlIGFkZHJlc3MgZGlhbG9nIGRpc3BsYXkgYXV0b21hdGljYWxseSBpZiB0aGVyZSBpcyBubyBhZGRyZXNzIGxpbmVcbiAgICAgICAgLy8gYXMgaXMgdGhlIGNhc2Ugd2hlbiBhZGRpbmcgYSBuZXcgYWRkcmVzcy5cbiAgICAgICAgaWYgKCFzdHJlZXRMaW5lMS52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhRGVwZW5kZW5jaWVzUG9wdWxhdGVkXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRBZGRyZXNzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZpZWxkcyAhPSBudWxsICYmIHRoaXMuYXZhaWxhYmxlQ291bnRyaWVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YURlcGVuZGVuY2llc1BvcHVsYXRlZC5uZXh0KHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q291bnRyeU5hbWUoY291bnRyeUNvZGU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuYXZhaWxhYmxlQ291bnRyaWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWF0Y2ggPSB0aGlzLmF2YWlsYWJsZUNvdW50cmllcy5maW5kKGMgPT4gYy5jb2RlID09PSBjb3VudHJ5Q29kZSk7XG4gICAgICAgIHJldHVybiBtYXRjaCA/IG1hdGNoLm5hbWUgOiAnJztcbiAgICB9XG5cbiAgICBzZXRBc0RlZmF1bHRCaWxsaW5nQWRkcmVzcygpIHtcbiAgICAgICAgdGhpcy5zZXRBc0RlZmF1bHRCaWxsaW5nLmVtaXQodGhpcy5hZGRyZXNzRm9ybS52YWx1ZS5pZCk7XG4gICAgICAgIHRoaXMuYWRkcmVzc0Zvcm0ubWFya0FzRGlydHkoKTtcbiAgICB9XG5cbiAgICBzZXRBc0RlZmF1bHRTaGlwcGluZ0FkZHJlc3MoKSB7XG4gICAgICAgIHRoaXMuc2V0QXNEZWZhdWx0U2hpcHBpbmcuZW1pdCh0aGlzLmFkZHJlc3NGb3JtLnZhbHVlLmlkKTtcbiAgICAgICAgdGhpcy5hZGRyZXNzRm9ybS5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cblxuICAgIGVkaXRBZGRyZXNzKCkge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmZyb21Db21wb25lbnQoQWRkcmVzc0RldGFpbERpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzRm9ybTogdGhpcy5hZGRyZXNzRm9ybSxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tRmllbGRzOiB0aGlzLmN1c3RvbUZpZWxkcyxcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlQ291bnRyaWVzOiB0aGlzLmF2YWlsYWJsZUNvdW50cmllcyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNpemU6ICdtZCcsXG4gICAgICAgICAgICAgICAgY2xvc2FibGU6IHRydWUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==