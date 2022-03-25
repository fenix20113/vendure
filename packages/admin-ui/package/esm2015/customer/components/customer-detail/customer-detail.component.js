import { __rest } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, DataService, EditNoteDialogComponent, ModalService, NotificationService, ServerConfigService, SortOrder, } from '@vendure/admin-ui/core';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { EMPTY, forkJoin, from, Subject } from 'rxjs';
import { concatMap, filter, map, merge, mergeMap, shareReplay, startWith, switchMap, take, } from 'rxjs/operators';
import { SelectCustomerGroupDialogComponent } from '../select-customer-group-dialog/select-customer-group-dialog.component';
export class CustomerDetailComponent extends BaseDetailComponent {
    constructor(route, router, serverConfigService, changeDetector, formBuilder, dataService, modalService, notificationService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.formBuilder = formBuilder;
        this.dataService = dataService;
        this.modalService = modalService;
        this.notificationService = notificationService;
        this.fetchHistory = new Subject();
        this.addressDefaultsUpdated = false;
        this.ordersPerPage = 10;
        this.currentOrdersPage = 1;
        this.orderListUpdates$ = new Subject();
        this.customFields = this.getCustomFieldConfig('Customer');
        this.addressCustomFields = this.getCustomFieldConfig('Address');
        this.detailForm = this.formBuilder.group({
            customer: this.formBuilder.group({
                title: '',
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                phoneNumber: '',
                emailAddress: ['', [Validators.required, Validators.email]],
                password: '',
                customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
            }),
            addresses: new FormArray([]),
        });
    }
    ngOnInit() {
        this.init();
        this.availableCountries$ = this.dataService.settings
            .getAvailableCountries()
            .mapSingle(result => result.countries.items)
            .pipe(shareReplay(1));
        const customerWithUpdates$ = this.entity$.pipe(merge(this.orderListUpdates$));
        this.orders$ = customerWithUpdates$.pipe(map(customer => customer.orders.items));
        this.ordersCount$ = this.entity$.pipe(map(customer => customer.orders.totalItems));
        this.history$ = this.fetchHistory.pipe(startWith(null), switchMap(() => {
            return this.dataService.customer
                .getCustomerHistory(this.id, {
                sort: {
                    createdAt: SortOrder.DESC,
                },
            })
                .mapStream(data => { var _a; return (_a = data.customer) === null || _a === void 0 ? void 0 : _a.history.items; });
        }));
    }
    ngOnDestroy() {
        this.destroy();
        this.orderListUpdates$.complete();
    }
    customFieldIsSet(name) {
        return !!this.detailForm.get(['customer', 'customFields', name]);
    }
    getAddressFormControls() {
        const formArray = this.detailForm.get(['addresses']);
        return formArray.controls;
    }
    setDefaultBillingAddressId(id) {
        this.defaultBillingAddressId = id;
        this.addressDefaultsUpdated = true;
    }
    setDefaultShippingAddressId(id) {
        this.defaultShippingAddressId = id;
        this.addressDefaultsUpdated = true;
    }
    addAddress() {
        const addressFormArray = this.detailForm.get('addresses');
        const newAddress = this.formBuilder.group({
            fullName: '',
            company: '',
            streetLine1: ['', Validators.required],
            streetLine2: '',
            city: '',
            province: '',
            postalCode: '',
            countryCode: ['', Validators.required],
            phoneNumber: '',
            defaultShippingAddress: false,
            defaultBillingAddress: false,
        });
        if (this.addressCustomFields.length) {
            const customFieldsGroup = this.formBuilder.group({});
            for (const fieldDef of this.addressCustomFields) {
                customFieldsGroup.addControl(fieldDef.name, new FormControl(''));
            }
            newAddress.addControl('customFields', customFieldsGroup);
        }
        addressFormArray.push(newAddress);
    }
    setOrderItemsPerPage(itemsPerPage) {
        this.ordersPerPage = +itemsPerPage;
        this.fetchOrdersList();
    }
    setOrderCurrentPage(page) {
        this.currentOrdersPage = +page;
        this.fetchOrdersList();
    }
    create() {
        var _a;
        const customerForm = this.detailForm.get('customer');
        if (!customerForm) {
            return;
        }
        const formValue = customerForm.value;
        const customFields = (_a = customerForm.get('customFields')) === null || _a === void 0 ? void 0 : _a.value;
        const customer = {
            title: formValue.title,
            emailAddress: formValue.emailAddress,
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            phoneNumber: formValue.phoneNumber,
            customFields,
        };
        this.dataService.customer
            .createCustomer(customer, formValue.password)
            .subscribe(({ createCustomer }) => {
            switch (createCustomer.__typename) {
                case 'Customer':
                    this.notificationService.success(_('common.notify-create-success'), {
                        entity: 'Customer',
                    });
                    if (createCustomer.emailAddress && !formValue.password) {
                        this.notificationService.notify({
                            message: _('customer.email-verification-sent'),
                            translationVars: { emailAddress: formValue.emailAddress },
                            type: 'info',
                            duration: 10000,
                        });
                    }
                    this.detailForm.markAsPristine();
                    this.addressDefaultsUpdated = false;
                    this.changeDetector.markForCheck();
                    this.router.navigate(['../', createCustomer.id], { relativeTo: this.route });
                    break;
                case 'EmailAddressConflictError':
                    this.notificationService.error(createCustomer.message);
            }
        });
    }
    save() {
        this.entity$
            .pipe(take(1), mergeMap(({ id }) => {
            var _a;
            const saveOperations = [];
            const customerForm = this.detailForm.get('customer');
            if (customerForm && customerForm.dirty) {
                const formValue = customerForm.value;
                const customFields = (_a = customerForm.get('customFields')) === null || _a === void 0 ? void 0 : _a.value;
                const customer = {
                    id,
                    title: formValue.title,
                    emailAddress: formValue.emailAddress,
                    firstName: formValue.firstName,
                    lastName: formValue.lastName,
                    phoneNumber: formValue.phoneNumber,
                    customFields,
                };
                saveOperations.push(this.dataService.customer
                    .updateCustomer(customer)
                    .pipe(map(res => res.updateCustomer)));
            }
            const addressFormArray = this.detailForm.get('addresses');
            if ((addressFormArray && addressFormArray.dirty) || this.addressDefaultsUpdated) {
                for (const addressControl of addressFormArray.controls) {
                    if (addressControl.dirty || this.addressDefaultsUpdated) {
                        const address = addressControl.value;
                        const input = {
                            fullName: address.fullName,
                            company: address.company,
                            streetLine1: address.streetLine1,
                            streetLine2: address.streetLine2,
                            city: address.city,
                            province: address.province,
                            postalCode: address.postalCode,
                            countryCode: address.countryCode,
                            phoneNumber: address.phoneNumber,
                            defaultShippingAddress: this.defaultShippingAddressId === address.id,
                            defaultBillingAddress: this.defaultBillingAddressId === address.id,
                            customFields: address.customFields,
                        };
                        if (!address.id) {
                            saveOperations.push(this.dataService.customer
                                .createCustomerAddress(id, input)
                                .pipe(map(res => res.createCustomerAddress)));
                        }
                        else {
                            saveOperations.push(this.dataService.customer
                                .updateCustomerAddress(Object.assign(Object.assign({}, input), { id: address.id }))
                                .pipe(map(res => res.updateCustomerAddress)));
                        }
                    }
                }
            }
            return forkJoin(saveOperations);
        }))
            .subscribe(data => {
            for (const result of data) {
                switch (result.__typename) {
                    case 'Customer':
                    case 'Address':
                        this.notificationService.success(_('common.notify-update-success'), {
                            entity: 'Customer',
                        });
                        this.detailForm.markAsPristine();
                        this.addressDefaultsUpdated = false;
                        this.changeDetector.markForCheck();
                        this.fetchHistory.next();
                        break;
                    case 'EmailAddressConflictError':
                        this.notificationService.error(result.message);
                        break;
                }
            }
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
                entity: 'Customer',
            });
        });
    }
    addToGroup() {
        this.modalService
            .fromComponent(SelectCustomerGroupDialogComponent, {
            size: 'md',
        })
            .pipe(switchMap(groupIds => (groupIds ? from(groupIds) : EMPTY)), concatMap(groupId => this.dataService.customer.addCustomersToGroup(groupId, [this.id])))
            .subscribe({
            next: res => {
                this.notificationService.success(_(`customer.add-customers-to-group-success`), {
                    customerCount: 1,
                    groupName: res.addCustomersToGroup.name,
                });
            },
            complete: () => {
                this.dataService.customer.getCustomer(this.id, { take: 0 }).single$.subscribe();
                this.fetchHistory.next();
            },
        });
    }
    removeFromGroup(group) {
        this.modalService
            .dialog({
            title: _('customer.confirm-remove-customer-from-group'),
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(response => response
            ? this.dataService.customer.removeCustomersFromGroup(group.id, [this.id])
            : EMPTY), switchMap(() => this.dataService.customer.getCustomer(this.id, { take: 0 }).single$))
            .subscribe(result => {
            this.notificationService.success(_(`customer.remove-customers-from-group-success`), {
                customerCount: 1,
                groupName: group.name,
            });
            this.fetchHistory.next();
        });
    }
    addNoteToCustomer({ note }) {
        this.dataService.customer.addNoteToCustomer(this.id, note).subscribe(() => {
            this.fetchHistory.next();
            this.notificationService.success(_('common.notify-create-success'), {
                entity: 'Note',
            });
        });
    }
    updateNote(entry) {
        this.modalService
            .fromComponent(EditNoteDialogComponent, {
            closable: true,
            locals: {
                displayPrivacyControls: false,
                note: entry.data.note,
            },
        })
            .pipe(switchMap(result => {
            if (result) {
                return this.dataService.customer.updateCustomerNote({
                    noteId: entry.id,
                    note: result.note,
                });
            }
            else {
                return EMPTY;
            }
        }))
            .subscribe(result => {
            this.fetchHistory.next();
            this.notificationService.success(_('common.notify-update-success'), {
                entity: 'Note',
            });
        });
    }
    deleteNote(entry) {
        return this.modalService
            .dialog({
            title: _('common.confirm-delete-note'),
            body: entry.data.note,
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(res => (res ? this.dataService.customer.deleteCustomerNote(entry.id) : EMPTY)))
            .subscribe(() => {
            this.fetchHistory.next();
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'Note',
            });
        });
    }
    setFormValues(entity) {
        var _a, _b;
        const customerGroup = this.detailForm.get('customer');
        if (customerGroup) {
            customerGroup.patchValue({
                title: entity.title,
                firstName: entity.firstName,
                lastName: entity.lastName,
                phoneNumber: entity.phoneNumber,
                emailAddress: entity.emailAddress,
            });
        }
        if (entity.addresses) {
            const addressesArray = new FormArray([]);
            for (const address of entity.addresses) {
                const _c = address, { customFields } = _c, rest = __rest(_c, ["customFields"]);
                const addressGroup = this.formBuilder.group(Object.assign(Object.assign({}, rest), { countryCode: address.country.code }));
                addressesArray.push(addressGroup);
                if (address.defaultShippingAddress) {
                    this.defaultShippingAddressId = address.id;
                }
                if (address.defaultBillingAddress) {
                    this.defaultBillingAddressId = address.id;
                }
                if (this.addressCustomFields.length) {
                    const customFieldsGroup = this.formBuilder.group({});
                    for (const fieldDef of this.addressCustomFields) {
                        const key = fieldDef.name;
                        const value = (_a = address.customFields) === null || _a === void 0 ? void 0 : _a[key];
                        const control = new FormControl(value);
                        customFieldsGroup.addControl(key, control);
                    }
                    addressGroup.addControl('customFields', customFieldsGroup);
                }
            }
            this.detailForm.setControl('addresses', addressesArray);
        }
        if (this.customFields.length) {
            const customFieldsGroup = this.detailForm.get(['customer', 'customFields']);
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = (_b = entity.customFields) === null || _b === void 0 ? void 0 : _b[key];
                const control = customFieldsGroup.get(key);
                if (control) {
                    control.patchValue(value);
                }
            }
        }
        this.changeDetector.markForCheck();
    }
    /**
     * Refetch the customer with the current order list settings.
     */
    fetchOrdersList() {
        this.dataService.customer
            .getCustomer(this.id, {
            take: this.ordersPerPage,
            skip: (this.currentOrdersPage - 1) * this.ordersPerPage,
        })
            .single$.pipe(map(data => data.customer), filter(notNullOrUndefined))
            .subscribe(result => this.orderListUpdates$.next(result));
    }
}
CustomerDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <div class=\"flex clr-align-items-center\">\n            <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n            <vdr-customer-status-label [customer]=\"entity$ | async\"></vdr-customer-status-label>\n            <div class=\"last-login\" *ngIf=\"(entity$ | async)?.user?.lastLogin as lastLogin\" [title]=\"lastLogin | localeDate:'medium'\">\n                {{ 'customer.last-login' | translate }}: {{ lastLogin | timeAgo }}\n            </div>\n        </div>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"customer-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"!(addressDefaultsUpdated || (detailForm.valid && detailForm.dirty))\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"'UpdateCustomer'\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"!(addressDefaultsUpdated || (detailForm.valid && detailForm.dirty))\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm.get('customer')\">\n    <vdr-form-field [label]=\"'customer.title' | translate\" for=\"title\" [readOnlyToggle]=\"!(isNew$ | async)\">\n        <input id=\"title\" type=\"text\" formControlName=\"title\" />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'customer.first-name' | translate\"\n        for=\"firstName\"\n        [readOnlyToggle]=\"!(isNew$ | async)\"\n    >\n        <input id=\"firstName\" type=\"text\" formControlName=\"firstName\" />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'customer.last-name' | translate\"\n        for=\"lastName\"\n        [readOnlyToggle]=\"!(isNew$ | async)\"\n    >\n        <input id=\"lastName\" type=\"text\" formControlName=\"lastName\" />\n    </vdr-form-field>\n    <vdr-form-field\n        [label]=\"'customer.email-address' | translate\"\n        for=\"emailAddress\"\n        [readOnlyToggle]=\"!(isNew$ | async)\"\n    >\n        <input id=\"emailAddress\" type=\"text\" formControlName=\"emailAddress\" />\n    </vdr-form-field>\n    <vdr-form-field\n           [label]=\"'customer.phone-number' | translate\"\n           for=\"phoneNumber\"\n           [readOnlyToggle]=\"!(isNew$ | async)\"\n       >\n           <input id=\"phoneNumber\" type=\"text\" formControlName=\"phoneNumber\" />\n       </vdr-form-field>\n    <vdr-form-field [label]=\"'customer.password' | translate\" for=\"password\" *ngIf=\"isNew$ | async\">\n        <input id=\"password\" type=\"password\" formControlName=\"password\" />\n    </vdr-form-field>\n\n    <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <ng-container *ngFor=\"let customField of customFields\">\n            <vdr-custom-field-control\n                *ngIf=\"customFieldIsSet(customField.name)\"\n                entityName=\"Customer\"\n                [customFieldsFormGroup]=\"detailForm.get(['customer', 'customFields'])\"\n                [customField]=\"customField\"\n            ></vdr-custom-field-control>\n        </ng-container>\n    </section>\n</form>\n\n<div class=\"groups\" *ngIf=\"(entity$ | async)?.groups as groups\">\n    <label class=\"clr-control-label\">{{ 'customer.customer-groups' | translate }}</label>\n    <ng-container *ngIf=\"groups.length; else noGroups\">\n        <vdr-chip\n            *ngFor=\"let group of groups\"\n            [colorFrom]=\"group.id\"\n            icon=\"times\"\n            (iconClick)=\"removeFromGroup(group)\"\n            >{{ group.name }}</vdr-chip\n        >\n    </ng-container>\n    <ng-template #noGroups>\n        {{ 'customer.not-a-member-of-any-groups' | translate }}\n    </ng-template>\n    <div>\n        <button class=\"btn btn-sm btn-secondary\" (click)=\"addToGroup()\" *vdrIfPermissions=\"'UpdateCustomerGroup'\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'customer.add-customer-to-group' | translate }}\n        </button>\n    </div>\n</div>\n\n<div class=\"clr-row\" *ngIf=\"!(isNew$ | async)\">\n    <div class=\"clr-col-md-4\">\n        <h3>{{ 'customer.addresses' | translate }}</h3>\n        <vdr-address-card\n            *ngFor=\"let addressForm of getAddressFormControls()\"\n            [availableCountries]=\"availableCountries$ | async\"\n            [isDefaultBilling]=\"defaultBillingAddressId === addressForm.value.id\"\n            [isDefaultShipping]=\"defaultShippingAddressId === addressForm.value.id\"\n            [addressForm]=\"addressForm\"\n            [customFields]=\"addressCustomFields\"\n            [editable]=\"['UpdateCustomer'] | hasPermission\"\n            (setAsDefaultBilling)=\"setDefaultBillingAddressId($event)\"\n            (setAsDefaultShipping)=\"setDefaultShippingAddressId($event)\"\n        ></vdr-address-card>\n        <button class=\"btn btn-secondary\" (click)=\"addAddress()\" *vdrIfPermissions=\"'UpdateCustomer'\">\n            <clr-icon shape=\"plus\"></clr-icon>\n            {{ 'customer.create-new-address' | translate }}\n        </button>\n    </div>\n    <div class=\"clr-col-md-8\">\n        <h3>{{ 'customer.orders' | translate }}</h3>\n        <vdr-data-table\n            [items]=\"orders$ | async\"\n            [itemsPerPage]=\"ordersPerPage\"\n            [totalItems]=\"ordersCount$ | async\"\n            [currentPage]=\"currentOrdersPage\"\n            [emptyStateLabel]=\"'customer.no-orders-placed' | translate\"\n            (itemsPerPageChange)=\"setOrderItemsPerPage($event)\"\n            (pageChange)=\"setOrderCurrentPage($event)\"\n        >\n            <vdr-dt-column>{{ 'common.code' | translate }}</vdr-dt-column>\n            <vdr-dt-column>{{ 'order.state' | translate }}</vdr-dt-column>\n            <vdr-dt-column>{{ 'order.total' | translate }}</vdr-dt-column>\n            <vdr-dt-column>{{ 'common.updated-at' | translate }}</vdr-dt-column>\n            <vdr-dt-column></vdr-dt-column>\n            <ng-template let-order=\"item\">\n                <td class=\"left\">{{ order.code }}</td>\n                <td class=\"left\">{{ order.state }}</td>\n                <td class=\"left\">{{ order.total | localeCurrency: order.currencyCode }}</td>\n                <td class=\"left\">{{ order.updatedAt | localeDate: 'medium' }}</td>\n                <td class=\"right\">\n                    <vdr-table-row-action\n                        iconShape=\"shopping-cart\"\n                        [label]=\"'common.open' | translate\"\n                        [linkTo]=\"['/orders/', order.id]\"\n                    ></vdr-table-row-action>\n                </td>\n            </ng-template>\n        </vdr-data-table>\n    </div>\n</div>\n<div class=\"clr-row\" *ngIf=\"!(isNew$ | async)\">\n    <div class=\"clr-col-md-6\">\n        <vdr-customer-history\n            [customer]=\"entity$ | async\"\n            [history]=\"history$ | async\"\n            (addNote)=\"addNoteToCustomer($event)\"\n            (updateNote)=\"updateNote($event)\"\n            (deleteNote)=\"deleteNote($event)\"\n        ></vdr-customer-history>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".last-login{margin-left:6px;color:var(--color-grey-500)}"]
            },] }
];
CustomerDetailComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: FormBuilder },
    { type: DataService },
    { type: ModalService },
    { type: NotificationService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY3VzdG9tZXIvc3JjL2NvbXBvbmVudHMvY3VzdG9tZXItZGV0YWlsL2N1c3RvbWVyLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBYSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEUsT0FBTyxFQUNILG1CQUFtQixFQU9uQixXQUFXLEVBQ1gsdUJBQXVCLEVBTXZCLFlBQVksRUFDWixtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLFNBQVMsR0FNWixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUNILFNBQVMsRUFDVCxNQUFNLEVBQ04sR0FBRyxFQUNILEtBQUssRUFDTCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsSUFBSSxHQUNQLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFVNUgsTUFBTSxPQUFPLHVCQUF3QixTQUFRLG1CQUF1QztJQWlCaEYsWUFDSSxLQUFxQixFQUNyQixN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QUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0I7YUFDSjtTQUNKO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxlQUFlO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUTthQUNwQixXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNsQixJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDeEIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhO1NBQzFELENBQUM7YUFDRCxPQUFPLENBQUMsSUFBSSxDQUNULEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFDMUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQzdCO2FBQ0EsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7OztZQXJjSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsczRPQUErQztnQkFFL0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7WUFsRFEsY0FBYztZQUFFLE1BQU07WUFtQjNCLG1CQUFtQjtZQXJCVyxpQkFBaUI7WUFDL0IsV0FBVztZQVczQixXQUFXO1lBT1gsWUFBWTtZQUNaLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUFycmF5LCBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgbWFya2VyIGFzIF8gfSBmcm9tICdAYmllc2JqZXJnL25neC10cmFuc2xhdGUtZXh0cmFjdC1tYXJrZXInO1xuaW1wb3J0IHtcbiAgICBCYXNlRGV0YWlsQ29tcG9uZW50LFxuICAgIENyZWF0ZUFkZHJlc3NJbnB1dCxcbiAgICBDcmVhdGVDdXN0b21lckFkZHJlc3MsXG4gICAgQ3JlYXRlQ3VzdG9tZXJBZGRyZXNzTXV0YXRpb24sXG4gICAgQ3JlYXRlQ3VzdG9tZXJJbnB1dCxcbiAgICBDdXN0b21lcixcbiAgICBDdXN0b21GaWVsZENvbmZpZyxcbiAgICBEYXRhU2VydmljZSxcbiAgICBFZGl0Tm90ZURpYWxvZ0NvbXBvbmVudCxcbiAgICBHZXRBdmFpbGFibGVDb3VudHJpZXMsXG4gICAgR2V0Q3VzdG9tZXIsXG4gICAgR2V0Q3VzdG9tZXJIaXN0b3J5LFxuICAgIEdldEN1c3RvbWVyUXVlcnksXG4gICAgSGlzdG9yeUVudHJ5LFxuICAgIE1vZGFsU2VydmljZSxcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgU29ydE9yZGVyLFxuICAgIFVwZGF0ZUN1c3RvbWVyLFxuICAgIFVwZGF0ZUN1c3RvbWVyQWRkcmVzcyxcbiAgICBVcGRhdGVDdXN0b21lckFkZHJlc3NNdXRhdGlvbixcbiAgICBVcGRhdGVDdXN0b21lcklucHV0LFxuICAgIFVwZGF0ZUN1c3RvbWVyTXV0YXRpb24sXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgbm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuaW1wb3J0IHsgRU1QVFksIGZvcmtKb2luLCBmcm9tLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICAgIGNvbmNhdE1hcCxcbiAgICBmaWx0ZXIsXG4gICAgbWFwLFxuICAgIG1lcmdlLFxuICAgIG1lcmdlTWFwLFxuICAgIHNoYXJlUmVwbGF5LFxuICAgIHN0YXJ0V2l0aCxcbiAgICBzd2l0Y2hNYXAsXG4gICAgdGFrZSxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBTZWxlY3RDdXN0b21lckdyb3VwRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vc2VsZWN0LWN1c3RvbWVyLWdyb3VwLWRpYWxvZy9zZWxlY3QtY3VzdG9tZXItZ3JvdXAtZGlhbG9nLmNvbXBvbmVudCc7XG5cbnR5cGUgQ3VzdG9tZXJXaXRoT3JkZXJzID0gTm9uTnVsbGFibGU8R2V0Q3VzdG9tZXJRdWVyeVsnY3VzdG9tZXInXT47XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWN1c3RvbWVyLWRldGFpbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2N1c3RvbWVyLWRldGFpbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY3VzdG9tZXItZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyRGV0YWlsQ29tcG9uZW50IGV4dGVuZHMgQmFzZURldGFpbENvbXBvbmVudDxDdXN0b21lcldpdGhPcmRlcnM+XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgZGV0YWlsRm9ybTogRm9ybUdyb3VwO1xuICAgIGN1c3RvbUZpZWxkczogQ3VzdG9tRmllbGRDb25maWdbXTtcbiAgICBhZGRyZXNzQ3VzdG9tRmllbGRzOiBDdXN0b21GaWVsZENvbmZpZ1tdO1xuICAgIGF2YWlsYWJsZUNvdW50cmllcyQ6IE9ic2VydmFibGU8R2V0QXZhaWxhYmxlQ291bnRyaWVzLkl0ZW1zW10+O1xuICAgIG9yZGVycyQ6IE9ic2VydmFibGU8R2V0Q3VzdG9tZXIuSXRlbXNbXT47XG4gICAgb3JkZXJzQ291bnQkOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gICAgaGlzdG9yeSQ6IE9ic2VydmFibGU8R2V0Q3VzdG9tZXJIaXN0b3J5Lkl0ZW1zW10gfCB1bmRlZmluZWQ+O1xuICAgIGZldGNoSGlzdG9yeSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgZGVmYXVsdFNoaXBwaW5nQWRkcmVzc0lkOiBzdHJpbmc7XG4gICAgZGVmYXVsdEJpbGxpbmdBZGRyZXNzSWQ6IHN0cmluZztcbiAgICBhZGRyZXNzRGVmYXVsdHNVcGRhdGVkID0gZmFsc2U7XG4gICAgb3JkZXJzUGVyUGFnZSA9IDEwO1xuICAgIGN1cnJlbnRPcmRlcnNQYWdlID0gMTtcbiAgICBwcml2YXRlIG9yZGVyTGlzdFVwZGF0ZXMkID0gbmV3IFN1YmplY3Q8Q3VzdG9tZXJXaXRoT3JkZXJzPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHNlcnZlckNvbmZpZ1NlcnZpY2U6IFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICAgICAgcHJvdGVjdGVkIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICkge1xuICAgICAgICBzdXBlcihyb3V0ZSwgcm91dGVyLCBzZXJ2ZXJDb25maWdTZXJ2aWNlLCBkYXRhU2VydmljZSk7XG5cbiAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMgPSB0aGlzLmdldEN1c3RvbUZpZWxkQ29uZmlnKCdDdXN0b21lcicpO1xuICAgICAgICB0aGlzLmFkZHJlc3NDdXN0b21GaWVsZHMgPSB0aGlzLmdldEN1c3RvbUZpZWxkQ29uZmlnKCdBZGRyZXNzJyk7XG4gICAgICAgIHRoaXMuZGV0YWlsRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgY3VzdG9tZXI6IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICAgICAgbGFzdE5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICcnLFxuICAgICAgICAgICAgICAgIGVtYWlsQWRkcmVzczogWycnLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5lbWFpbF1dLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgICAgICBjdXN0b21GaWVsZHM6IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tRmllbGRzLnJlZHVjZSgoaGFzaCwgZmllbGQpID0+ICh7IC4uLmhhc2gsIFtmaWVsZC5uYW1lXTogJycgfSksIHt9KSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBhZGRyZXNzZXM6IG5ldyBGb3JtQXJyYXkoW10pLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlQ291bnRyaWVzJCA9IHRoaXMuZGF0YVNlcnZpY2Uuc2V0dGluZ3NcbiAgICAgICAgICAgIC5nZXRBdmFpbGFibGVDb3VudHJpZXMoKVxuICAgICAgICAgICAgLm1hcFNpbmdsZShyZXN1bHQgPT4gcmVzdWx0LmNvdW50cmllcy5pdGVtcylcbiAgICAgICAgICAgIC5waXBlKHNoYXJlUmVwbGF5KDEpKTtcblxuICAgICAgICBjb25zdCBjdXN0b21lcldpdGhVcGRhdGVzJCA9IHRoaXMuZW50aXR5JC5waXBlKG1lcmdlKHRoaXMub3JkZXJMaXN0VXBkYXRlcyQpKTtcbiAgICAgICAgdGhpcy5vcmRlcnMkID0gY3VzdG9tZXJXaXRoVXBkYXRlcyQucGlwZShtYXAoY3VzdG9tZXIgPT4gY3VzdG9tZXIub3JkZXJzLml0ZW1zKSk7XG4gICAgICAgIHRoaXMub3JkZXJzQ291bnQkID0gdGhpcy5lbnRpdHkkLnBpcGUobWFwKGN1c3RvbWVyID0+IGN1c3RvbWVyLm9yZGVycy50b3RhbEl0ZW1zKSk7XG4gICAgICAgIHRoaXMuaGlzdG9yeSQgPSB0aGlzLmZldGNoSGlzdG9yeS5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKG51bGwpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2VydmljZS5jdXN0b21lclxuICAgICAgICAgICAgICAgICAgICAuZ2V0Q3VzdG9tZXJIaXN0b3J5KHRoaXMuaWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IFNvcnRPcmRlci5ERVNDLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcFN0cmVhbShkYXRhID0+IGRhdGEuY3VzdG9tZXI/Lmhpc3RvcnkuaXRlbXMpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLm9yZGVyTGlzdFVwZGF0ZXMkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgY3VzdG9tRmllbGRJc1NldChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5kZXRhaWxGb3JtLmdldChbJ2N1c3RvbWVyJywgJ2N1c3RvbUZpZWxkcycsIG5hbWVdKTtcbiAgICB9XG5cbiAgICBnZXRBZGRyZXNzRm9ybUNvbnRyb2xzKCk6IEZvcm1Db250cm9sW10ge1xuICAgICAgICBjb25zdCBmb3JtQXJyYXkgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KFsnYWRkcmVzc2VzJ10pIGFzIEZvcm1BcnJheTtcbiAgICAgICAgcmV0dXJuIGZvcm1BcnJheS5jb250cm9scyBhcyBGb3JtQ29udHJvbFtdO1xuICAgIH1cblxuICAgIHNldERlZmF1bHRCaWxsaW5nQWRkcmVzc0lkKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0QmlsbGluZ0FkZHJlc3NJZCA9IGlkO1xuICAgICAgICB0aGlzLmFkZHJlc3NEZWZhdWx0c1VwZGF0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHNldERlZmF1bHRTaGlwcGluZ0FkZHJlc3NJZChpZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFNoaXBwaW5nQWRkcmVzc0lkID0gaWQ7XG4gICAgICAgIHRoaXMuYWRkcmVzc0RlZmF1bHRzVXBkYXRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgYWRkQWRkcmVzcygpIHtcbiAgICAgICAgY29uc3QgYWRkcmVzc0Zvcm1BcnJheSA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ2FkZHJlc3NlcycpIGFzIEZvcm1BcnJheTtcbiAgICAgICAgY29uc3QgbmV3QWRkcmVzcyA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgZnVsbE5hbWU6ICcnLFxuICAgICAgICAgICAgY29tcGFueTogJycsXG4gICAgICAgICAgICBzdHJlZXRMaW5lMTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHN0cmVldExpbmUyOiAnJyxcbiAgICAgICAgICAgIGNpdHk6ICcnLFxuICAgICAgICAgICAgcHJvdmluY2U6ICcnLFxuICAgICAgICAgICAgcG9zdGFsQ29kZTogJycsXG4gICAgICAgICAgICBjb3VudHJ5Q29kZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiAnJyxcbiAgICAgICAgICAgIGRlZmF1bHRTaGlwcGluZ0FkZHJlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZGVmYXVsdEJpbGxpbmdBZGRyZXNzOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmFkZHJlc3NDdXN0b21GaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjdXN0b21GaWVsZHNHcm91cCA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe30pO1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZERlZiBvZiB0aGlzLmFkZHJlc3NDdXN0b21GaWVsZHMpIHtcbiAgICAgICAgICAgICAgICBjdXN0b21GaWVsZHNHcm91cC5hZGRDb250cm9sKGZpZWxkRGVmLm5hbWUsIG5ldyBGb3JtQ29udHJvbCgnJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3QWRkcmVzcy5hZGRDb250cm9sKCdjdXN0b21GaWVsZHMnLCBjdXN0b21GaWVsZHNHcm91cCk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkcmVzc0Zvcm1BcnJheS5wdXNoKG5ld0FkZHJlc3MpO1xuICAgIH1cblxuICAgIHNldE9yZGVySXRlbXNQZXJQYWdlKGl0ZW1zUGVyUGFnZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub3JkZXJzUGVyUGFnZSA9ICtpdGVtc1BlclBhZ2U7XG4gICAgICAgIHRoaXMuZmV0Y2hPcmRlcnNMaXN0KCk7XG4gICAgfVxuXG4gICAgc2V0T3JkZXJDdXJyZW50UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50T3JkZXJzUGFnZSA9ICtwYWdlO1xuICAgICAgICB0aGlzLmZldGNoT3JkZXJzTGlzdCgpO1xuICAgIH1cblxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgY29uc3QgY3VzdG9tZXJGb3JtID0gdGhpcy5kZXRhaWxGb3JtLmdldCgnY3VzdG9tZXInKTtcbiAgICAgICAgaWYgKCFjdXN0b21lckZvcm0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmb3JtVmFsdWUgPSBjdXN0b21lckZvcm0udmFsdWU7XG4gICAgICAgIGNvbnN0IGN1c3RvbUZpZWxkcyA9IGN1c3RvbWVyRm9ybS5nZXQoJ2N1c3RvbUZpZWxkcycpPy52YWx1ZTtcbiAgICAgICAgY29uc3QgY3VzdG9tZXI6IENyZWF0ZUN1c3RvbWVySW5wdXQgPSB7XG4gICAgICAgICAgICB0aXRsZTogZm9ybVZhbHVlLnRpdGxlLFxuICAgICAgICAgICAgZW1haWxBZGRyZXNzOiBmb3JtVmFsdWUuZW1haWxBZGRyZXNzLFxuICAgICAgICAgICAgZmlyc3ROYW1lOiBmb3JtVmFsdWUuZmlyc3ROYW1lLFxuICAgICAgICAgICAgbGFzdE5hbWU6IGZvcm1WYWx1ZS5sYXN0TmFtZSxcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiBmb3JtVmFsdWUucGhvbmVOdW1iZXIsXG4gICAgICAgICAgICBjdXN0b21GaWVsZHMsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY3VzdG9tZXJcbiAgICAgICAgICAgIC5jcmVhdGVDdXN0b21lcihjdXN0b21lciwgZm9ybVZhbHVlLnBhc3N3b3JkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoeyBjcmVhdGVDdXN0b21lciB9KSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjcmVhdGVDdXN0b21lci5fX3R5cGVuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0N1c3RvbWVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktY3JlYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0N1c3RvbWVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNyZWF0ZUN1c3RvbWVyLmVtYWlsQWRkcmVzcyAmJiAhZm9ybVZhbHVlLnBhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLm5vdGlmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IF8oJ2N1c3RvbWVyLmVtYWlsLXZlcmlmaWNhdGlvbi1zZW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uVmFyczogeyBlbWFpbEFkZHJlc3M6IGZvcm1WYWx1ZS5lbWFpbEFkZHJlc3MgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkcmVzc0RlZmF1bHRzVXBkYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4vJywgY3JlYXRlQ3VzdG9tZXIuaWRdLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnRW1haWxBZGRyZXNzQ29uZmxpY3RFcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IoY3JlYXRlQ3VzdG9tZXIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5lbnRpdHkkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIG1lcmdlTWFwKCh7IGlkIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2F2ZU9wZXJhdGlvbnM6IEFycmF5PE9ic2VydmFibGU8XG4gICAgICAgICAgICAgICAgICAgICAgICB8IFVwZGF0ZUN1c3RvbWVyLlVwZGF0ZUN1c3RvbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICB8IENyZWF0ZUN1c3RvbWVyQWRkcmVzcy5DcmVhdGVDdXN0b21lckFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgVXBkYXRlQ3VzdG9tZXJBZGRyZXNzLlVwZGF0ZUN1c3RvbWVyQWRkcmVzc1xuICAgICAgICAgICAgICAgICAgICA+PiA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXN0b21lckZvcm0gPSB0aGlzLmRldGFpbEZvcm0uZ2V0KCdjdXN0b21lcicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VzdG9tZXJGb3JtICYmIGN1c3RvbWVyRm9ybS5kaXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gY3VzdG9tZXJGb3JtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VzdG9tRmllbGRzID0gY3VzdG9tZXJGb3JtLmdldCgnY3VzdG9tRmllbGRzJyk/LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VzdG9tZXI6IFVwZGF0ZUN1c3RvbWVySW5wdXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGZvcm1WYWx1ZS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbEFkZHJlc3M6IGZvcm1WYWx1ZS5lbWFpbEFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiBmb3JtVmFsdWUuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiBmb3JtVmFsdWUubGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IGZvcm1WYWx1ZS5waG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21GaWVsZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZU9wZXJhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmN1c3RvbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51cGRhdGVDdXN0b21lcihjdXN0b21lcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMudXBkYXRlQ3VzdG9tZXIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkcmVzc0Zvcm1BcnJheSA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ2FkZHJlc3NlcycpIGFzIEZvcm1BcnJheTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChhZGRyZXNzRm9ybUFycmF5ICYmIGFkZHJlc3NGb3JtQXJyYXkuZGlydHkpIHx8IHRoaXMuYWRkcmVzc0RlZmF1bHRzVXBkYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBhZGRyZXNzQ29udHJvbCBvZiBhZGRyZXNzRm9ybUFycmF5LmNvbnRyb2xzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkZHJlc3NDb250cm9sLmRpcnR5IHx8IHRoaXMuYWRkcmVzc0RlZmF1bHRzVXBkYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhZGRyZXNzID0gYWRkcmVzc0NvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0OiBDcmVhdGVBZGRyZXNzSW5wdXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxsTmFtZTogYWRkcmVzcy5mdWxsTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhbnk6IGFkZHJlc3MuY29tcGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVldExpbmUxOiBhZGRyZXNzLnN0cmVldExpbmUxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWV0TGluZTI6IGFkZHJlc3Muc3RyZWV0TGluZTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXR5OiBhZGRyZXNzLmNpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aW5jZTogYWRkcmVzcy5wcm92aW5jZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RhbENvZGU6IGFkZHJlc3MucG9zdGFsQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnlDb2RlOiBhZGRyZXNzLmNvdW50cnlDb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IGFkZHJlc3MucGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0U2hpcHBpbmdBZGRyZXNzOiB0aGlzLmRlZmF1bHRTaGlwcGluZ0FkZHJlc3NJZCA9PT0gYWRkcmVzcy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRCaWxsaW5nQWRkcmVzczogdGhpcy5kZWZhdWx0QmlsbGluZ0FkZHJlc3NJZCA9PT0gYWRkcmVzcy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUZpZWxkczogYWRkcmVzcy5jdXN0b21GaWVsZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWRkcmVzcy5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZU9wZXJhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmN1c3RvbWVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVDdXN0b21lckFkZHJlc3MoaWQsIGlucHV0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcy5jcmVhdGVDdXN0b21lckFkZHJlc3MpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlT3BlcmF0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuY3VzdG9tZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnVwZGF0ZUN1c3RvbWVyQWRkcmVzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5pbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBhZGRyZXNzLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcy51cGRhdGVDdXN0b21lckFkZHJlc3MpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcmtKb2luKHNhdmVPcGVyYXRpb25zKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocmVzdWx0Ll9fdHlwZW5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdDdXN0b21lcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnQWRkcmVzcyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnQ3VzdG9tZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLm1hcmtBc1ByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkcmVzc0RlZmF1bHRzVXBkYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoSGlzdG9yeS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0VtYWlsQWRkcmVzc0NvbmZsaWN0RXJyb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuZXJyb3IocmVzdWx0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0N1c3RvbWVyJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgYWRkVG9Hcm91cCgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5mcm9tQ29tcG9uZW50KFNlbGVjdEN1c3RvbWVyR3JvdXBEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgICAgICBzaXplOiAnbWQnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChncm91cElkcyA9PiAoZ3JvdXBJZHMgPyBmcm9tKGdyb3VwSWRzKSA6IEVNUFRZKSksXG4gICAgICAgICAgICAgICAgY29uY2F0TWFwKGdyb3VwSWQgPT4gdGhpcy5kYXRhU2VydmljZS5jdXN0b21lci5hZGRDdXN0b21lcnNUb0dyb3VwKGdyb3VwSWQsIFt0aGlzLmlkXSkpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgbmV4dDogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXyhgY3VzdG9tZXIuYWRkLWN1c3RvbWVycy10by1ncm91cC1zdWNjZXNzYCksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyQ291bnQ6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE5hbWU6IHJlcy5hZGRDdXN0b21lcnNUb0dyb3VwLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5jdXN0b21lci5nZXRDdXN0b21lcih0aGlzLmlkLCB7IHRha2U6IDAgfSkuc2luZ2xlJC5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaEhpc3RvcnkubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVGcm9tR3JvdXAoZ3JvdXA6IEdldEN1c3RvbWVyLkdyb3Vwcykge1xuICAgICAgICB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IF8oJ2N1c3RvbWVyLmNvbmZpcm0tcmVtb3ZlLWN1c3RvbWVyLWZyb20tZ3JvdXAnKSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlY29uZGFyeScsIGxhYmVsOiBfKCdjb21tb24uY2FuY2VsJykgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnZGFuZ2VyJywgbGFiZWw6IF8oJ2NvbW1vbi5kZWxldGUnKSwgcmV0dXJuVmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChyZXNwb25zZSA9PlxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRhdGFTZXJ2aWNlLmN1c3RvbWVyLnJlbW92ZUN1c3RvbWVyc0Zyb21Hcm91cChncm91cC5pZCwgW3RoaXMuaWRdKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBFTVBUWSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmRhdGFTZXJ2aWNlLmN1c3RvbWVyLmdldEN1c3RvbWVyKHRoaXMuaWQsIHsgdGFrZTogMCB9KS5zaW5nbGUkKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKGBjdXN0b21lci5yZW1vdmUtY3VzdG9tZXJzLWZyb20tZ3JvdXAtc3VjY2Vzc2ApLCB7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyQ291bnQ6IDEsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwTmFtZTogZ3JvdXAubmFtZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoSGlzdG9yeS5uZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGROb3RlVG9DdXN0b21lcih7IG5vdGUgfTogeyBub3RlOiBzdHJpbmcgfSkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmN1c3RvbWVyLmFkZE5vdGVUb0N1c3RvbWVyKHRoaXMuaWQsIG5vdGUpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZldGNoSGlzdG9yeS5uZXh0KCk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LWNyZWF0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICBlbnRpdHk6ICdOb3RlJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVOb3RlKGVudHJ5OiBIaXN0b3J5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5mcm9tQ29tcG9uZW50KEVkaXROb3RlRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgICAgICAgY2xvc2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlQcml2YWN5Q29udHJvbHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBub3RlOiBlbnRyeS5kYXRhLm5vdGUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuY3VzdG9tZXIudXBkYXRlQ3VzdG9tZXJOb3RlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RlSWQ6IGVudHJ5LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdGU6IHJlc3VsdC5ub3RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoSGlzdG9yeS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoXygnY29tbW9uLm5vdGlmeS11cGRhdGUtc3VjY2VzcycpLCB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ05vdGUnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlTm90ZShlbnRyeTogSGlzdG9yeUVudHJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IF8oJ2NvbW1vbi5jb25maXJtLWRlbGV0ZS1ub3RlJyksXG4gICAgICAgICAgICAgICAgYm9keTogZW50cnkuZGF0YS5ub3RlLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnc2Vjb25kYXJ5JywgbGFiZWw6IF8oJ2NvbW1vbi5jYW5jZWwnKSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdkYW5nZXInLCBsYWJlbDogXygnY29tbW9uLmRlbGV0ZScpLCByZXR1cm5WYWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoc3dpdGNoTWFwKHJlcyA9PiAocmVzID8gdGhpcy5kYXRhU2VydmljZS5jdXN0b21lci5kZWxldGVDdXN0b21lck5vdGUoZW50cnkuaWQpIDogRU1QVFkpKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hIaXN0b3J5Lm5leHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LWRlbGV0ZS1zdWNjZXNzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnTm90ZScsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0Rm9ybVZhbHVlcyhlbnRpdHk6IEN1c3RvbWVyLkZyYWdtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGN1c3RvbWVyR3JvdXAgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KCdjdXN0b21lcicpO1xuICAgICAgICBpZiAoY3VzdG9tZXJHcm91cCkge1xuICAgICAgICAgICAgY3VzdG9tZXJHcm91cC5wYXRjaFZhbHVlKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogZW50aXR5LnRpdGxlLFxuICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogZW50aXR5LmZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICBsYXN0TmFtZTogZW50aXR5Lmxhc3ROYW1lLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBlbnRpdHkucGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgZW1haWxBZGRyZXNzOiBlbnRpdHkuZW1haWxBZGRyZXNzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50aXR5LmFkZHJlc3Nlcykge1xuICAgICAgICAgICAgY29uc3QgYWRkcmVzc2VzQXJyYXkgPSBuZXcgRm9ybUFycmF5KFtdKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYWRkcmVzcyBvZiBlbnRpdHkuYWRkcmVzc2VzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjdXN0b21GaWVsZHMsIC4uLnJlc3QgfSA9IGFkZHJlc3MgYXMgYW55O1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZHJlc3NHcm91cCA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgICAgICAgICAuLi5yZXN0LFxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5Q29kZTogYWRkcmVzcy5jb3VudHJ5LmNvZGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYWRkcmVzc2VzQXJyYXkucHVzaChhZGRyZXNzR3JvdXApO1xuICAgICAgICAgICAgICAgIGlmIChhZGRyZXNzLmRlZmF1bHRTaGlwcGluZ0FkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0U2hpcHBpbmdBZGRyZXNzSWQgPSBhZGRyZXNzLmlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWRkcmVzcy5kZWZhdWx0QmlsbGluZ0FkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0QmlsbGluZ0FkZHJlc3NJZCA9IGFkZHJlc3MuaWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRkcmVzc0N1c3RvbUZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VzdG9tRmllbGRzR3JvdXAgPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHt9KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZERlZiBvZiB0aGlzLmFkZHJlc3NDdXN0b21GaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGZpZWxkRGVmLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IChhZGRyZXNzIGFzIGFueSkuY3VzdG9tRmllbGRzPy5ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tRmllbGRzR3JvdXAuYWRkQ29udHJvbChrZXksIGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3NHcm91cC5hZGRDb250cm9sKCdjdXN0b21GaWVsZHMnLCBjdXN0b21GaWVsZHNHcm91cCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZXRhaWxGb3JtLnNldENvbnRyb2woJ2FkZHJlc3NlcycsIGFkZHJlc3Nlc0FycmF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbUZpZWxkc0dyb3VwID0gdGhpcy5kZXRhaWxGb3JtLmdldChbJ2N1c3RvbWVyJywgJ2N1c3RvbUZpZWxkcyddKSBhcyBGb3JtR3JvdXA7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGREZWYgb2YgdGhpcy5jdXN0b21GaWVsZHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBmaWVsZERlZi5uYW1lO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gKGVudGl0eSBhcyBhbnkpLmN1c3RvbUZpZWxkcz8uW2tleV07XG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IGN1c3RvbUZpZWxkc0dyb3VwLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIGlmIChjb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wucGF0Y2hWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVmZXRjaCB0aGUgY3VzdG9tZXIgd2l0aCB0aGUgY3VycmVudCBvcmRlciBsaXN0IHNldHRpbmdzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZmV0Y2hPcmRlcnNMaXN0KCkge1xuICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmN1c3RvbWVyXG4gICAgICAgICAgICAuZ2V0Q3VzdG9tZXIodGhpcy5pZCwge1xuICAgICAgICAgICAgICAgIHRha2U6IHRoaXMub3JkZXJzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICBza2lwOiAodGhpcy5jdXJyZW50T3JkZXJzUGFnZSAtIDEpICogdGhpcy5vcmRlcnNQZXJQYWdlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zaW5nbGUkLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKGRhdGEgPT4gZGF0YS5jdXN0b21lciksXG4gICAgICAgICAgICAgICAgZmlsdGVyKG5vdE51bGxPclVuZGVmaW5lZCksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHJlc3VsdCA9PiB0aGlzLm9yZGVyTGlzdFVwZGF0ZXMkLm5leHQocmVzdWx0KSk7XG4gICAgfVxufVxuIl19