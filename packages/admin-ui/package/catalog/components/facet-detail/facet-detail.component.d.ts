import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, CustomFieldConfig, DataService, FacetWithValues, LanguageCode, ModalService, NotificationService, Permission, ServerConfigService } from '@vendure/admin-ui/core';
export declare class FacetDetailComponent extends BaseDetailComponent<FacetWithValues.Fragment> implements OnInit, OnDestroy {
    private changeDetector;
    protected dataService: DataService;
    private formBuilder;
    private notificationService;
    private modalService;
    customFields: CustomFieldConfig[];
    customValueFields: CustomFieldConfig[];
    detailForm: FormGroup;
    values: Array<FacetWithValues.Values | {
        name: string;
        code: string;
    }>;
    readonly updatePermission: Permission[];
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, formBuilder: FormBuilder, notificationService: NotificationService, modalService: ModalService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    updateCode(currentCode: string, nameValue: string): void;
    updateValueCode(currentCode: string, nameValue: string, index: number): void;
    customFieldIsSet(name: string): boolean;
    customValueFieldIsSet(index: number, name: string): boolean;
    getValuesFormArray(): FormArray;
    addFacetValue(): void;
    create(): void;
    save(): void;
    deleteFacetValue(facetValueId: string | undefined, index: number): void;
    private showModalAndDelete;
    /**
     * Sets the values of the form on changes to the facet or current language.
     */
    protected setFormValues(facet: FacetWithValues.Fragment, languageCode: LanguageCode): void;
    /**
     * Given a facet and the value of the detailForm, this method creates an updated copy of the facet which
     * can then be persisted to the API.
     */
    private getUpdatedFacet;
    /**
     * Given an array of facet values and the values from the detailForm, this method creates an new array
     * which can be persisted to the API.
     */
    private getUpdatedFacetValues;
}
