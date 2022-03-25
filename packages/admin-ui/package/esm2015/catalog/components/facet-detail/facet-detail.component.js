import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseDetailComponent, createUpdatedTranslatable, DataService, DeletionResult, findTranslation, ModalService, NotificationService, Permission, ServerConfigService, } from '@vendure/admin-ui/core';
import { normalizeString } from '@vendure/common/lib/normalize-string';
import { notNullOrUndefined } from '@vendure/common/lib/shared-utils';
import { combineLatest, EMPTY, forkJoin } from 'rxjs';
import { map, mapTo, mergeMap, switchMap, take } from 'rxjs/operators';
export class FacetDetailComponent extends BaseDetailComponent {
    constructor(router, route, serverConfigService, changeDetector, dataService, formBuilder, notificationService, modalService) {
        super(route, router, serverConfigService, dataService);
        this.changeDetector = changeDetector;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.updatePermission = [Permission.UpdateCatalog, Permission.UpdateFacet];
        this.customFields = this.getCustomFieldConfig('Facet');
        this.customValueFields = this.getCustomFieldConfig('FacetValue');
        this.detailForm = this.formBuilder.group({
            facet: this.formBuilder.group({
                code: ['', Validators.required],
                name: '',
                visible: true,
                customFields: this.formBuilder.group(this.customFields.reduce((hash, field) => (Object.assign(Object.assign({}, hash), { [field.name]: '' })), {})),
            }),
            values: this.formBuilder.array([]),
        });
    }
    ngOnInit() {
        this.init();
    }
    ngOnDestroy() {
        this.destroy();
    }
    updateCode(currentCode, nameValue) {
        if (!currentCode) {
            const codeControl = this.detailForm.get(['facet', 'code']);
            if (codeControl && codeControl.pristine) {
                codeControl.setValue(normalizeString(nameValue, '-'));
            }
        }
    }
    updateValueCode(currentCode, nameValue, index) {
        if (!currentCode) {
            const codeControl = this.detailForm.get(['values', index, 'code']);
            if (codeControl && codeControl.pristine) {
                codeControl.setValue(normalizeString(nameValue, '-'));
            }
        }
    }
    customFieldIsSet(name) {
        return !!this.detailForm.get(['facet', 'customFields', name]);
    }
    customValueFieldIsSet(index, name) {
        return !!this.detailForm.get(['values', index, 'customFields', name]);
    }
    getValuesFormArray() {
        return this.detailForm.get('values');
    }
    addFacetValue() {
        const valuesFormArray = this.detailForm.get('values');
        if (valuesFormArray) {
            valuesFormArray.insert(valuesFormArray.length, this.formBuilder.group({
                id: '',
                name: ['', Validators.required],
                code: '',
            }));
            this.values.push({ name: '', code: '' });
        }
    }
    create() {
        const facetForm = this.detailForm.get('facet');
        if (!facetForm || !facetForm.dirty) {
            return;
        }
        combineLatest(this.entity$, this.languageCode$)
            .pipe(take(1), mergeMap(([facet, languageCode]) => {
            const newFacet = this.getUpdatedFacet(facet, facetForm, languageCode);
            return this.dataService.facet.createFacet(newFacet);
        }), switchMap(data => this.dataService.facet.getAllFacets().single$.pipe(mapTo(data))))
            .subscribe(data => {
            this.notificationService.success(_('common.notify-create-success'), { entity: 'Facet' });
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.router.navigate(['../', data.createFacet.id], { relativeTo: this.route });
        }, err => {
            this.notificationService.error(_('common.notify-create-error'), {
                entity: 'Facet',
            });
        });
    }
    save() {
        combineLatest(this.entity$, this.languageCode$)
            .pipe(take(1), mergeMap(([facet, languageCode]) => {
            const facetGroup = this.detailForm.get('facet');
            const updateOperations = [];
            if (facetGroup && facetGroup.dirty) {
                const newFacet = this.getUpdatedFacet(facet, facetGroup, languageCode);
                if (newFacet) {
                    updateOperations.push(this.dataService.facet.updateFacet(newFacet));
                }
            }
            const valuesArray = this.detailForm.get('values');
            if (valuesArray && valuesArray.dirty) {
                const newValues = valuesArray.controls
                    .filter(c => !c.value.id)
                    .map(c => ({
                    facetId: facet.id,
                    code: c.value.code,
                    translations: [{ name: c.value.name, languageCode }],
                }));
                if (newValues.length) {
                    updateOperations.push(this.dataService.facet
                        .createFacetValues(newValues)
                        .pipe(switchMap(() => this.dataService.facet.getFacet(this.id).single$)));
                }
                const updatedValues = this.getUpdatedFacetValues(facet, valuesArray, languageCode);
                if (updatedValues.length) {
                    updateOperations.push(this.dataService.facet.updateFacetValues(updatedValues));
                }
            }
            return forkJoin(updateOperations);
        }), switchMap(() => this.dataService.facet.getAllFacets().single$))
            .subscribe(() => {
            this.detailForm.markAsPristine();
            this.changeDetector.markForCheck();
            this.notificationService.success(_('common.notify-update-success'), { entity: 'Facet' });
        }, err => {
            this.notificationService.error(_('common.notify-update-error'), {
                entity: 'Facet',
            });
        });
    }
    deleteFacetValue(facetValueId, index) {
        if (!facetValueId) {
            // deleting a newly-added (not persisted) FacetValue
            const valuesFormArray = this.detailForm.get('values');
            if (valuesFormArray) {
                valuesFormArray.removeAt(index);
            }
            this.values.splice(index, 1);
            return;
        }
        this.showModalAndDelete(facetValueId)
            .pipe(switchMap(response => {
            if (response.result === DeletionResult.DELETED) {
                return [true];
            }
            else {
                return this.showModalAndDelete(facetValueId, response.message || '').pipe(map(r => r.result === DeletionResult.DELETED));
            }
        }), switchMap(deleted => (deleted ? this.dataService.facet.getFacet(this.id).single$ : [])))
            .subscribe(() => {
            this.notificationService.success(_('common.notify-delete-success'), {
                entity: 'FacetValue',
            });
        }, err => {
            this.notificationService.error(_('common.notify-delete-error'), {
                entity: 'FacetValue',
            });
        });
    }
    showModalAndDelete(facetValueId, message) {
        return this.modalService
            .dialog({
            title: _('catalog.confirm-delete-facet-value'),
            body: message,
            buttons: [
                { type: 'secondary', label: _('common.cancel') },
                { type: 'danger', label: _('common.delete'), returnValue: true },
            ],
        })
            .pipe(switchMap(result => result ? this.dataService.facet.deleteFacetValues([facetValueId], !!message) : EMPTY), map(result => result.deleteFacetValues[0]));
    }
    /**
     * Sets the values of the form on changes to the facet or current language.
     */
    setFormValues(facet, languageCode) {
        var _a;
        const currentTranslation = findTranslation(facet, languageCode);
        this.detailForm.patchValue({
            facet: {
                code: facet.code,
                visible: !facet.isPrivate,
                name: (_a = currentTranslation === null || currentTranslation === void 0 ? void 0 : currentTranslation.name) !== null && _a !== void 0 ? _a : '',
            },
        });
        if (this.customFields.length) {
            const customFieldsGroup = this.detailForm.get(['facet', 'customFields']);
            for (const fieldDef of this.customFields) {
                const key = fieldDef.name;
                const value = fieldDef.type === 'localeString'
                    ? currentTranslation.customFields[key]
                    : facet.customFields[key];
                const control = customFieldsGroup.get(key);
                if (control) {
                    control.patchValue(value);
                }
            }
        }
        const currentValuesFormArray = this.detailForm.get('values');
        this.values = [...facet.values];
        facet.values.forEach((value, i) => {
            const valueTranslation = findTranslation(value, languageCode);
            const group = {
                id: value.id,
                code: value.code,
                name: valueTranslation ? valueTranslation.name : '',
            };
            const valueControl = currentValuesFormArray.at(i);
            if (valueControl) {
                valueControl.setValue(group);
            }
            else {
                currentValuesFormArray.insert(i, this.formBuilder.group(group));
            }
            if (this.customValueFields.length) {
                let customValueFieldsGroup = this.detailForm.get(['values', i, 'customFields']);
                if (!customValueFieldsGroup) {
                    customValueFieldsGroup = new FormGroup({});
                    this.detailForm.get(['values', i]).addControl('customFields', customValueFieldsGroup);
                }
                if (customValueFieldsGroup) {
                    for (const fieldDef of this.customValueFields) {
                        const key = fieldDef.name;
                        const fieldValue = fieldDef.type === 'localeString'
                            ? valueTranslation.customFields[key]
                            : value.customFields[key];
                        const control = customValueFieldsGroup.get(key);
                        if (control) {
                            control.setValue(fieldValue);
                        }
                        else {
                            customValueFieldsGroup.addControl(key, new FormControl(fieldValue));
                        }
                    }
                }
            }
        });
    }
    /**
     * Given a facet and the value of the detailForm, this method creates an updated copy of the facet which
     * can then be persisted to the API.
     */
    getUpdatedFacet(facet, facetFormGroup, languageCode) {
        const input = createUpdatedTranslatable({
            translatable: facet,
            updatedFields: facetFormGroup.value,
            customFieldConfig: this.customFields,
            languageCode,
            defaultTranslation: {
                languageCode,
                name: facet.name || '',
            },
        });
        input.isPrivate = !facetFormGroup.value.visible;
        return input;
    }
    /**
     * Given an array of facet values and the values from the detailForm, this method creates an new array
     * which can be persisted to the API.
     */
    getUpdatedFacetValues(facet, valuesFormArray, languageCode) {
        const dirtyValues = facet.values.filter((v, i) => {
            const formRow = valuesFormArray.get(i.toString());
            return formRow && formRow.dirty && formRow.value.id;
        });
        const dirtyValueValues = valuesFormArray.controls
            .filter(c => c.dirty && c.value.id)
            .map(c => c.value);
        if (dirtyValues.length !== dirtyValueValues.length) {
            throw new Error(_(`error.facet-value-form-values-do-not-match`));
        }
        return dirtyValues
            .map((value, i) => {
            return createUpdatedTranslatable({
                translatable: value,
                updatedFields: dirtyValueValues[i],
                customFieldConfig: this.customValueFields,
                languageCode,
                defaultTranslation: {
                    languageCode,
                    name: '',
                },
            });
        })
            .filter(notNullOrUndefined);
    }
}
FacetDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-facet-detail',
                template: "<vdr-action-bar>\n    <vdr-ab-left>\n        <vdr-entity-info [entity]=\"entity$ | async\"></vdr-entity-info>\n        <vdr-language-selector\n            [disabled]=\"isNew$ | async\"\n            [availableLanguageCodes]=\"availableLanguages$ | async\"\n            [currentLanguageCode]=\"languageCode$ | async\"\n            (languageCodeChange)=\"setLanguage($event)\"\n        ></vdr-language-selector>\n    </vdr-ab-left>\n\n    <vdr-ab-right>\n        <vdr-action-bar-items locationId=\"facet-detail\"></vdr-action-bar-items>\n        <button\n            class=\"btn btn-primary\"\n            *ngIf=\"isNew$ | async; else updateButton\"\n            (click)=\"create()\"\n            [disabled]=\"detailForm.invalid || detailForm.pristine\"\n        >\n            {{ 'common.create' | translate }}\n        </button>\n        <ng-template #updateButton>\n            <button\n                *vdrIfPermissions=\"updatePermission\"\n                class=\"btn btn-primary\"\n                (click)=\"save()\"\n                [disabled]=\"detailForm.invalid || detailForm.pristine\"\n            >\n                {{ 'common.update' | translate }}\n            </button>\n        </ng-template>\n    </vdr-ab-right>\n</vdr-action-bar>\n\n<form class=\"form\" [formGroup]=\"detailForm\" *ngIf=\"entity$ | async as facet\">\n    <section class=\"form-block\" formGroupName=\"facet\">\n        <vdr-form-field [label]=\"'catalog.visibility' | translate\" for=\"visibility\">\n            <clr-toggle-wrapper>\n                <input\n                    type=\"checkbox\"\n                    clrToggle\n                    [vdrDisabled]=\"!(updatePermission | hasPermission)\"\n                    formControlName=\"visible\"\n                    id=\"visibility\"\n                />\n                <label class=\"visible-toggle\">\n                    <ng-container *ngIf=\"detailForm.value.facet.visible; else private\">{{ 'catalog.public' | translate }}</ng-container>\n                    <ng-template #private>{{ 'catalog.private' | translate }}</ng-template>\n                </label>\n            </clr-toggle-wrapper>\n        </vdr-form-field>\n        <vdr-form-field [label]=\"'common.name' | translate\" for=\"name\">\n            <input\n                id=\"name\"\n                type=\"text\"\n                formControlName=\"name\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                (input)=\"updateCode(facet.code, $event.target.value)\"\n            />\n        </vdr-form-field>\n        <vdr-form-field\n            [label]=\"'common.code' | translate\"\n            for=\"code\"\n            [readOnlyToggle]=\"updatePermission | hasPermission\"\n        >\n            <input\n                id=\"code\"\n                type=\"text\"\n                [readonly]=\"!(updatePermission | hasPermission)\"\n                formControlName=\"code\"\n            />\n        </vdr-form-field>\n\n        <section formGroupName=\"customFields\" *ngIf=\"customFields.length\">\n            <label>{{ 'common.custom-fields' | translate }}</label>\n            <ng-container *ngFor=\"let customField of customFields\">\n                <vdr-custom-field-control\n                    *ngIf=\"customFieldIsSet(customField.name)\"\n                    entityName=\"Facet\"\n                    [customFieldsFormGroup]=\"detailForm.get(['facet', 'customFields'])\"\n                    [customField]=\"customField\"\n                ></vdr-custom-field-control>\n            </ng-container>\n        </section>\n    </section>\n\n    <section class=\"form-block\" *ngIf=\"!(isNew$ | async)\">\n        <label>{{ 'catalog.facet-values' | translate }}</label>\n\n        <table class=\"facet-values-list table\" formArrayName=\"values\" *ngIf=\"0 < getValuesFormArray().length\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th>{{ 'common.name' | translate }}</th>\n                    <th>{{ 'common.code' | translate }}</th>\n                    <ng-container *ngFor=\"let customField of customValueFields\">\n                        <th>{{ customField.name }}</th>\n                    </ng-container>\n                    <th></th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr\n                    class=\"facet-value\"\n                    *ngFor=\"let value of values; let i = index\"\n                    [formGroupName]=\"i\"\n                >\n                    <td class=\"align-middle\">\n                        <vdr-entity-info [entity]=\"value\"></vdr-entity-info>\n                    </td>\n                    <td class=\"align-middle\">\n                        <input\n                            type=\"text\"\n                            formControlName=\"name\"\n                            [readonly]=\"!(updatePermission | hasPermission)\"\n                            (input)=\"updateValueCode(facet.values[i]?.code, $event.target.value, i)\"\n                        />\n                    </td>\n                    <td class=\"align-middle\"><input type=\"text\" formControlName=\"code\" readonly /></td>\n                    <ng-container *ngFor=\"let customField of customValueFields\">\n                        <td class=\"align-middle\">\n                            <vdr-custom-field-control\n                                *ngIf=\"customValueFieldIsSet(i, customField.name)\"\n                                entityName=\"FacetValue\"\n                                [showLabel]=\"false\"\n                                [customFieldsFormGroup]=\"detailForm.get(['values', i, 'customFields'])\"\n                                [customField]=\"customField\"\n                            ></vdr-custom-field-control>\n                        </td>\n                    </ng-container>\n                    <td class=\"align-middle\">\n                        <vdr-dropdown>\n                            <button type=\"button\" class=\"btn btn-link btn-sm\" vdrDropdownTrigger>\n                                {{ 'common.actions' | translate }}\n                                <clr-icon shape=\"caret down\"></clr-icon>\n                            </button>\n                            <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n                                <button\n                                    type=\"button\"\n                                    class=\"delete-button\"\n                                    (click)=\"deleteFacetValue(facet.values[i]?.id, i)\"\n                                    [disabled]=\"!(updatePermission | hasPermission)\"\n                                    vdrDropdownItem\n                                >\n                                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon>\n                                    {{ 'common.delete' | translate }}\n                                </button>\n                            </vdr-dropdown-menu>\n                        </vdr-dropdown>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n\n        <div>\n            <button\n                type=\"button\"\n                class=\"btn btn-secondary\"\n                *vdrIfPermissions=\"['CreateCatalog', 'CreateFacet']\"\n                (click)=\"addFacetValue()\"\n            >\n                <clr-icon shape=\"add\"></clr-icon>\n                {{ 'catalog.add-facet-value' | translate }}\n            </button>\n        </div>\n    </section>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".visible-toggle{margin-top:-3px!important}"]
            },] }
];
FacetDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ServerConfigService },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: FormBuilder },
    { type: NotificationService },
    { type: ModalService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9mYWNldC1kZXRhaWwvZmFjZXQtZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQWEsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3RFLE9BQU8sRUFDSCxtQkFBbUIsRUFHbkIseUJBQXlCLEVBRXpCLFdBQVcsRUFDWCxjQUFjLEVBRWQsZUFBZSxFQUVmLFlBQVksRUFDWixtQkFBbUIsRUFDbkIsVUFBVSxFQUNWLG1CQUFtQixHQUd0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVF2RSxNQUFNLE9BQU8sb0JBQ1QsU0FBUSxtQkFBNkM7SUFRckQsWUFDSSxNQUFjLEVBQ2QsS0FBcUIsRUFDckIsbUJBQXdDLEVBQ2hDLGNBQWlDLEVBQy9CLFdBQXdCLEVBQzFC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WUFUSyxXQUFXO1lBZTNCLG1CQUFtQjtZQURuQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQXJyYXksIEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtYXJrZXIgYXMgXyB9IGZyb20gJ0BiaWVzYmplcmcvbmd4LXRyYW5zbGF0ZS1leHRyYWN0LW1hcmtlcic7XG5pbXBvcnQge1xuICAgIEJhc2VEZXRhaWxDb21wb25lbnQsXG4gICAgQ3JlYXRlRmFjZXRJbnB1dCxcbiAgICBDcmVhdGVGYWNldFZhbHVlSW5wdXQsXG4gICAgY3JlYXRlVXBkYXRlZFRyYW5zbGF0YWJsZSxcbiAgICBDdXN0b21GaWVsZENvbmZpZyxcbiAgICBEYXRhU2VydmljZSxcbiAgICBEZWxldGlvblJlc3VsdCxcbiAgICBGYWNldFdpdGhWYWx1ZXMsXG4gICAgZmluZFRyYW5zbGF0aW9uLFxuICAgIExhbmd1YWdlQ29kZSxcbiAgICBNb2RhbFNlcnZpY2UsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBQZXJtaXNzaW9uLFxuICAgIFNlcnZlckNvbmZpZ1NlcnZpY2UsXG4gICAgVXBkYXRlRmFjZXRJbnB1dCxcbiAgICBVcGRhdGVGYWNldFZhbHVlSW5wdXQsXG59IGZyb20gJ0B2ZW5kdXJlL2FkbWluLXVpL2NvcmUnO1xuaW1wb3J0IHsgbm9ybWFsaXplU3RyaW5nIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9ub3JtYWxpemUtc3RyaW5nJztcbmltcG9ydCB7IG5vdE51bGxPclVuZGVmaW5lZCB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXV0aWxzJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIEVNUFRZLCBmb3JrSm9pbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtYXBUbywgbWVyZ2VNYXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZmFjZXQtZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmFjZXQtZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9mYWNldC1kZXRhaWwuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRmFjZXREZXRhaWxDb21wb25lbnRcbiAgICBleHRlbmRzIEJhc2VEZXRhaWxDb21wb25lbnQ8RmFjZXRXaXRoVmFsdWVzLkZyYWdtZW50PlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGN1c3RvbUZpZWxkczogQ3VzdG9tRmllbGRDb25maWdbXTtcbiAgICBjdXN0b21WYWx1ZUZpZWxkczogQ3VzdG9tRmllbGRDb25maWdbXTtcbiAgICBkZXRhaWxGb3JtOiBGb3JtR3JvdXA7XG4gICAgdmFsdWVzOiBBcnJheTxGYWNldFdpdGhWYWx1ZXMuVmFsdWVzIHwgeyBuYW1lOiBzdHJpbmc7IGNvZGU6IHN0cmluZyB9PjtcbiAgICByZWFkb25seSB1cGRhdGVQZXJtaXNzaW9uID0gW1Blcm1pc3Npb24uVXBkYXRlQ2F0YWxvZywgUGVybWlzc2lvbi5VcGRhdGVGYWNldF07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgc2VydmVyQ29uZmlnU2VydmljZTogU2VydmVyQ29uZmlnU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByb3RlY3RlZCBkYXRhU2VydmljZTogRGF0YVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvdXRlLCByb3V0ZXIsIHNlcnZlckNvbmZpZ1NlcnZpY2UsIGRhdGFTZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5jdXN0b21GaWVsZHMgPSB0aGlzLmdldEN1c3RvbUZpZWxkQ29uZmlnKCdGYWNldCcpO1xuICAgICAgICB0aGlzLmN1c3RvbVZhbHVlRmllbGRzID0gdGhpcy5nZXRDdXN0b21GaWVsZENvbmZpZygnRmFjZXRWYWx1ZScpO1xuICAgICAgICB0aGlzLmRldGFpbEZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgIGZhY2V0OiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgICAgICAgICAgICBjb2RlOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY3VzdG9tRmllbGRzOiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUZpZWxkcy5yZWR1Y2UoKGhhc2gsIGZpZWxkKSA9PiAoeyAuLi5oYXNoLCBbZmllbGQubmFtZV06ICcnIH0pLCB7fSksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdmFsdWVzOiB0aGlzLmZvcm1CdWlsZGVyLmFycmF5KFtdKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDb2RlKGN1cnJlbnRDb2RlOiBzdHJpbmcsIG5hbWVWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghY3VycmVudENvZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGVDb250cm9sID0gdGhpcy5kZXRhaWxGb3JtLmdldChbJ2ZhY2V0JywgJ2NvZGUnXSk7XG4gICAgICAgICAgICBpZiAoY29kZUNvbnRyb2wgJiYgY29kZUNvbnRyb2wucHJpc3RpbmUpIHtcbiAgICAgICAgICAgICAgICBjb2RlQ29udHJvbC5zZXRWYWx1ZShub3JtYWxpemVTdHJpbmcobmFtZVZhbHVlLCAnLScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVZhbHVlQ29kZShjdXJyZW50Q29kZTogc3RyaW5nLCBuYW1lVmFsdWU6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoIWN1cnJlbnRDb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBjb2RlQ29udHJvbCA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoWyd2YWx1ZXMnLCBpbmRleCwgJ2NvZGUnXSk7XG4gICAgICAgICAgICBpZiAoY29kZUNvbnRyb2wgJiYgY29kZUNvbnRyb2wucHJpc3RpbmUpIHtcbiAgICAgICAgICAgICAgICBjb2RlQ29udHJvbC5zZXRWYWx1ZShub3JtYWxpemVTdHJpbmcobmFtZVZhbHVlLCAnLScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGN1c3RvbUZpZWxkSXNTZXQobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZGV0YWlsRm9ybS5nZXQoWydmYWNldCcsICdjdXN0b21GaWVsZHMnLCBuYW1lXSk7XG4gICAgfVxuXG4gICAgY3VzdG9tVmFsdWVGaWVsZElzU2V0KGluZGV4OiBudW1iZXIsIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmRldGFpbEZvcm0uZ2V0KFsndmFsdWVzJywgaW5kZXgsICdjdXN0b21GaWVsZHMnLCBuYW1lXSk7XG4gICAgfVxuXG4gICAgZ2V0VmFsdWVzRm9ybUFycmF5KCk6IEZvcm1BcnJheSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRldGFpbEZvcm0uZ2V0KCd2YWx1ZXMnKSBhcyBGb3JtQXJyYXk7XG4gICAgfVxuXG4gICAgYWRkRmFjZXRWYWx1ZSgpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzRm9ybUFycmF5ID0gdGhpcy5kZXRhaWxGb3JtLmdldCgndmFsdWVzJykgYXMgRm9ybUFycmF5IHwgbnVsbDtcbiAgICAgICAgaWYgKHZhbHVlc0Zvcm1BcnJheSkge1xuICAgICAgICAgICAgdmFsdWVzRm9ybUFycmF5Lmluc2VydChcbiAgICAgICAgICAgICAgICB2YWx1ZXNGb3JtQXJyYXkubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICAgICAgICAgIGNvZGU6ICcnLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzLnB1c2goeyBuYW1lOiAnJywgY29kZTogJycgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIGNvbnN0IGZhY2V0Rm9ybSA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ2ZhY2V0Jyk7XG4gICAgICAgIGlmICghZmFjZXRGb3JtIHx8ICFmYWNldEZvcm0uZGlydHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb21iaW5lTGF0ZXN0KHRoaXMuZW50aXR5JCwgdGhpcy5sYW5ndWFnZUNvZGUkKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoW2ZhY2V0LCBsYW5ndWFnZUNvZGVdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0ZhY2V0ID0gdGhpcy5nZXRVcGRhdGVkRmFjZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2V0Rm9ybSBhcyBGb3JtR3JvdXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZUNvZGUsXG4gICAgICAgICAgICAgICAgICAgICkgYXMgQ3JlYXRlRmFjZXRJbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVNlcnZpY2UuZmFjZXQuY3JlYXRlRmFjZXQobmV3RmFjZXQpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChkYXRhID0+IHRoaXMuZGF0YVNlcnZpY2UuZmFjZXQuZ2V0QWxsRmFjZXRzKCkuc2luZ2xlJC5waXBlKG1hcFRvKGRhdGEpKSksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LWNyZWF0ZS1zdWNjZXNzJyksIHsgZW50aXR5OiAnRmFjZXQnIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEZvcm0ubWFya0FzUHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8nLCBkYXRhLmNyZWF0ZUZhY2V0LmlkXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktY3JlYXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0ZhY2V0JyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLmVudGl0eSQsIHRoaXMubGFuZ3VhZ2VDb2RlJClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoKFtmYWNldCwgbGFuZ3VhZ2VDb2RlXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNldEdyb3VwID0gdGhpcy5kZXRhaWxGb3JtLmdldCgnZmFjZXQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlT3BlcmF0aW9uczogQXJyYXk8T2JzZXJ2YWJsZTxhbnk+PiA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmYWNldEdyb3VwICYmIGZhY2V0R3JvdXAuZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0ZhY2V0ID0gdGhpcy5nZXRVcGRhdGVkRmFjZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjZXRHcm91cCBhcyBGb3JtR3JvdXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgKSBhcyBVcGRhdGVGYWNldElucHV0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0ZhY2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlT3BlcmF0aW9ucy5wdXNoKHRoaXMuZGF0YVNlcnZpY2UuZmFjZXQudXBkYXRlRmFjZXQobmV3RmFjZXQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXNBcnJheSA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ3ZhbHVlcycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVzQXJyYXkgJiYgdmFsdWVzQXJyYXkuZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlczogQ3JlYXRlRmFjZXRWYWx1ZUlucHV0W10gPSAodmFsdWVzQXJyYXkgYXMgRm9ybUFycmF5KS5jb250cm9sc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoYyA9PiAhYy52YWx1ZS5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGMgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjZXRJZDogZmFjZXQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IGMudmFsdWUuY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb25zOiBbeyBuYW1lOiBjLnZhbHVlLm5hbWUsIGxhbmd1YWdlQ29kZSB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZU9wZXJhdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5mYWNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZUZhY2V0VmFsdWVzKG5ld1ZhbHVlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHN3aXRjaE1hcCgoKSA9PiB0aGlzLmRhdGFTZXJ2aWNlLmZhY2V0LmdldEZhY2V0KHRoaXMuaWQpLnNpbmdsZSQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlZFZhbHVlcyA9IHRoaXMuZ2V0VXBkYXRlZEZhY2V0VmFsdWVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlc0FycmF5IGFzIEZvcm1BcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZUNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWRWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlT3BlcmF0aW9ucy5wdXNoKHRoaXMuZGF0YVNlcnZpY2UuZmFjZXQudXBkYXRlRmFjZXRWYWx1ZXModXBkYXRlZFZhbHVlcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcmtKb2luKHVwZGF0ZU9wZXJhdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmRhdGFTZXJ2aWNlLmZhY2V0LmdldEFsbEZhY2V0cygpLnNpbmdsZSQpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGV0YWlsRm9ybS5tYXJrQXNQcmlzdGluZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhfKCdjb21tb24ubm90aWZ5LXVwZGF0ZS1zdWNjZXNzJyksIHsgZW50aXR5OiAnRmFjZXQnIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktdXBkYXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0ZhY2V0JyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZGVsZXRlRmFjZXRWYWx1ZShmYWNldFZhbHVlSWQ6IHN0cmluZyB8IHVuZGVmaW5lZCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoIWZhY2V0VmFsdWVJZCkge1xuICAgICAgICAgICAgLy8gZGVsZXRpbmcgYSBuZXdseS1hZGRlZCAobm90IHBlcnNpc3RlZCkgRmFjZXRWYWx1ZVxuICAgICAgICAgICAgY29uc3QgdmFsdWVzRm9ybUFycmF5ID0gdGhpcy5kZXRhaWxGb3JtLmdldCgndmFsdWVzJykgYXMgRm9ybUFycmF5IHwgbnVsbDtcbiAgICAgICAgICAgIGlmICh2YWx1ZXNGb3JtQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNGb3JtQXJyYXkucmVtb3ZlQXQoaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52YWx1ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dNb2RhbEFuZERlbGV0ZShmYWNldFZhbHVlSWQpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UucmVzdWx0ID09PSBEZWxldGlvblJlc3VsdC5ERUxFVEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3RydWVdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd01vZGFsQW5kRGVsZXRlKGZhY2V0VmFsdWVJZCwgcmVzcG9uc2UubWVzc2FnZSB8fCAnJykucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAociA9PiByLnJlc3VsdCA9PT0gRGVsZXRpb25SZXN1bHQuREVMRVRFRCksXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKGRlbGV0ZWQgPT4gKGRlbGV0ZWQgPyB0aGlzLmRhdGFTZXJ2aWNlLmZhY2V0LmdldEZhY2V0KHRoaXMuaWQpLnNpbmdsZSQgOiBbXSkpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKF8oJ2NvbW1vbi5ub3RpZnktZGVsZXRlLXN1Y2Nlc3MnKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiAnRmFjZXRWYWx1ZScsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmVycm9yKF8oJ2NvbW1vbi5ub3RpZnktZGVsZXRlLWVycm9yJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eTogJ0ZhY2V0VmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dNb2RhbEFuZERlbGV0ZShmYWNldFZhbHVlSWQ6IHN0cmluZywgbWVzc2FnZT86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2VcbiAgICAgICAgICAgIC5kaWFsb2coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBfKCdjYXRhbG9nLmNvbmZpcm0tZGVsZXRlLWZhY2V0LXZhbHVlJyksXG4gICAgICAgICAgICAgICAgYm9keTogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3NlY29uZGFyeScsIGxhYmVsOiBfKCdjb21tb24uY2FuY2VsJykgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnZGFuZ2VyJywgbGFiZWw6IF8oJ2NvbW1vbi5kZWxldGUnKSwgcmV0dXJuVmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChyZXN1bHQgPT5cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID8gdGhpcy5kYXRhU2VydmljZS5mYWNldC5kZWxldGVGYWNldFZhbHVlcyhbZmFjZXRWYWx1ZUlkXSwgISFtZXNzYWdlKSA6IEVNUFRZLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgbWFwKHJlc3VsdCA9PiByZXN1bHQuZGVsZXRlRmFjZXRWYWx1ZXNbMF0pLFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZXMgb2YgdGhlIGZvcm0gb24gY2hhbmdlcyB0byB0aGUgZmFjZXQgb3IgY3VycmVudCBsYW5ndWFnZS5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc2V0Rm9ybVZhbHVlcyhmYWNldDogRmFjZXRXaXRoVmFsdWVzLkZyYWdtZW50LCBsYW5ndWFnZUNvZGU6IExhbmd1YWdlQ29kZSkge1xuICAgICAgICBjb25zdCBjdXJyZW50VHJhbnNsYXRpb24gPSBmaW5kVHJhbnNsYXRpb24oZmFjZXQsIGxhbmd1YWdlQ29kZSk7XG5cbiAgICAgICAgdGhpcy5kZXRhaWxGb3JtLnBhdGNoVmFsdWUoe1xuICAgICAgICAgICAgZmFjZXQ6IHtcbiAgICAgICAgICAgICAgICBjb2RlOiBmYWNldC5jb2RlLFxuICAgICAgICAgICAgICAgIHZpc2libGU6ICFmYWNldC5pc1ByaXZhdGUsXG4gICAgICAgICAgICAgICAgbmFtZTogY3VycmVudFRyYW5zbGF0aW9uPy5uYW1lID8/ICcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tRmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgY3VzdG9tRmllbGRzR3JvdXAgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KFsnZmFjZXQnLCAnY3VzdG9tRmllbGRzJ10pIGFzIEZvcm1Hcm91cDtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWVsZERlZiBvZiB0aGlzLmN1c3RvbUZpZWxkcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGZpZWxkRGVmLm5hbWU7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPVxuICAgICAgICAgICAgICAgICAgICBmaWVsZERlZi50eXBlID09PSAnbG9jYWxlU3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAoY3VycmVudFRyYW5zbGF0aW9uIGFzIGFueSkuY3VzdG9tRmllbGRzW2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogKGZhY2V0IGFzIGFueSkuY3VzdG9tRmllbGRzW2tleV07XG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IGN1c3RvbUZpZWxkc0dyb3VwLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIGlmIChjb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wucGF0Y2hWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlc0Zvcm1BcnJheSA9IHRoaXMuZGV0YWlsRm9ybS5nZXQoJ3ZhbHVlcycpIGFzIEZvcm1BcnJheTtcbiAgICAgICAgdGhpcy52YWx1ZXMgPSBbLi4uZmFjZXQudmFsdWVzXTtcbiAgICAgICAgZmFjZXQudmFsdWVzLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZVRyYW5zbGF0aW9uID0gZmluZFRyYW5zbGF0aW9uKHZhbHVlLCBsYW5ndWFnZUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IHZhbHVlLmlkLFxuICAgICAgICAgICAgICAgIGNvZGU6IHZhbHVlLmNvZGUsXG4gICAgICAgICAgICAgICAgbmFtZTogdmFsdWVUcmFuc2xhdGlvbiA/IHZhbHVlVHJhbnNsYXRpb24ubmFtZSA6ICcnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlQ29udHJvbCA9IGN1cnJlbnRWYWx1ZXNGb3JtQXJyYXkuYXQoaSk7XG4gICAgICAgICAgICBpZiAodmFsdWVDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVDb250cm9sLnNldFZhbHVlKGdyb3VwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFZhbHVlc0Zvcm1BcnJheS5pbnNlcnQoaSwgdGhpcy5mb3JtQnVpbGRlci5ncm91cChncm91cCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tVmFsdWVGaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1c3RvbVZhbHVlRmllbGRzR3JvdXAgPSB0aGlzLmRldGFpbEZvcm0uZ2V0KFsndmFsdWVzJywgaSwgJ2N1c3RvbUZpZWxkcyddKSBhcyBGb3JtR3JvdXA7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXN0b21WYWx1ZUZpZWxkc0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbVZhbHVlRmllbGRzR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuZGV0YWlsRm9ybS5nZXQoWyd2YWx1ZXMnLCBpXSkgYXMgRm9ybUdyb3VwKS5hZGRDb250cm9sKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2N1c3RvbUZpZWxkcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21WYWx1ZUZpZWxkc0dyb3VwLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXN0b21WYWx1ZUZpZWxkc0dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZmllbGREZWYgb2YgdGhpcy5jdXN0b21WYWx1ZUZpZWxkcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZmllbGREZWYubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkVmFsdWUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRGVmLnR5cGUgPT09ICdsb2NhbGVTdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKHZhbHVlVHJhbnNsYXRpb24gYXMgYW55KS5jdXN0b21GaWVsZHNba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICh2YWx1ZSBhcyBhbnkpLmN1c3RvbUZpZWxkc1trZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IGN1c3RvbVZhbHVlRmllbGRzR3JvdXAuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2wuc2V0VmFsdWUoZmllbGRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVZhbHVlRmllbGRzR3JvdXAuYWRkQ29udHJvbChrZXksIG5ldyBGb3JtQ29udHJvbChmaWVsZFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIGEgZmFjZXQgYW5kIHRoZSB2YWx1ZSBvZiB0aGUgZGV0YWlsRm9ybSwgdGhpcyBtZXRob2QgY3JlYXRlcyBhbiB1cGRhdGVkIGNvcHkgb2YgdGhlIGZhY2V0IHdoaWNoXG4gICAgICogY2FuIHRoZW4gYmUgcGVyc2lzdGVkIHRvIHRoZSBBUEkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRVcGRhdGVkRmFjZXQoXG4gICAgICAgIGZhY2V0OiBGYWNldFdpdGhWYWx1ZXMuRnJhZ21lbnQsXG4gICAgICAgIGZhY2V0Rm9ybUdyb3VwOiBGb3JtR3JvdXAsXG4gICAgICAgIGxhbmd1YWdlQ29kZTogTGFuZ3VhZ2VDb2RlLFxuICAgICk6IENyZWF0ZUZhY2V0SW5wdXQgfCBVcGRhdGVGYWNldElucHV0IHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBjcmVhdGVVcGRhdGVkVHJhbnNsYXRhYmxlKHtcbiAgICAgICAgICAgIHRyYW5zbGF0YWJsZTogZmFjZXQsXG4gICAgICAgICAgICB1cGRhdGVkRmllbGRzOiBmYWNldEZvcm1Hcm91cC52YWx1ZSxcbiAgICAgICAgICAgIGN1c3RvbUZpZWxkQ29uZmlnOiB0aGlzLmN1c3RvbUZpZWxkcyxcbiAgICAgICAgICAgIGxhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgIGRlZmF1bHRUcmFuc2xhdGlvbjoge1xuICAgICAgICAgICAgICAgIGxhbmd1YWdlQ29kZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBmYWNldC5uYW1lIHx8ICcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlucHV0LmlzUHJpdmF0ZSA9ICFmYWNldEZvcm1Hcm91cC52YWx1ZS52aXNpYmxlO1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYW4gYXJyYXkgb2YgZmFjZXQgdmFsdWVzIGFuZCB0aGUgdmFsdWVzIGZyb20gdGhlIGRldGFpbEZvcm0sIHRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gbmV3IGFycmF5XG4gICAgICogd2hpY2ggY2FuIGJlIHBlcnNpc3RlZCB0byB0aGUgQVBJLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VXBkYXRlZEZhY2V0VmFsdWVzKFxuICAgICAgICBmYWNldDogRmFjZXRXaXRoVmFsdWVzLkZyYWdtZW50LFxuICAgICAgICB2YWx1ZXNGb3JtQXJyYXk6IEZvcm1BcnJheSxcbiAgICAgICAgbGFuZ3VhZ2VDb2RlOiBMYW5ndWFnZUNvZGUsXG4gICAgKTogVXBkYXRlRmFjZXRWYWx1ZUlucHV0W10ge1xuICAgICAgICBjb25zdCBkaXJ0eVZhbHVlcyA9IGZhY2V0LnZhbHVlcy5maWx0ZXIoKHYsIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1Sb3cgPSB2YWx1ZXNGb3JtQXJyYXkuZ2V0KGkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICByZXR1cm4gZm9ybVJvdyAmJiBmb3JtUm93LmRpcnR5ICYmIGZvcm1Sb3cudmFsdWUuaWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBkaXJ0eVZhbHVlVmFsdWVzID0gdmFsdWVzRm9ybUFycmF5LmNvbnRyb2xzXG4gICAgICAgICAgICAuZmlsdGVyKGMgPT4gYy5kaXJ0eSAmJiBjLnZhbHVlLmlkKVxuICAgICAgICAgICAgLm1hcChjID0+IGMudmFsdWUpO1xuXG4gICAgICAgIGlmIChkaXJ0eVZhbHVlcy5sZW5ndGggIT09IGRpcnR5VmFsdWVWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXyhgZXJyb3IuZmFjZXQtdmFsdWUtZm9ybS12YWx1ZXMtZG8tbm90LW1hdGNoYCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaXJ0eVZhbHVlc1xuICAgICAgICAgICAgLm1hcCgodmFsdWUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlVXBkYXRlZFRyYW5zbGF0YWJsZSh7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0YWJsZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRGaWVsZHM6IGRpcnR5VmFsdWVWYWx1ZXNbaV0sXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUZpZWxkQ29uZmlnOiB0aGlzLmN1c3RvbVZhbHVlRmllbGRzLFxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZUNvZGUsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUcmFuc2xhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZpbHRlcihub3ROdWxsT3JVbmRlZmluZWQpO1xuICAgIH1cbn1cbiJdfQ==