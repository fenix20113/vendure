import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, ConfigurableOperation, ConfigurableOperationDefinition, DataService, LanguageCode, NotificationService, Promotion, ServerConfigService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class PromotionDetailComponent extends BaseDetailComponent<Promotion.Fragment> implements OnInit, OnDestroy {
    private changeDetector;
    protected dataService: DataService;
    private formBuilder;
    private notificationService;
    promotion$: Observable<Promotion.Fragment>;
    detailForm: FormGroup;
    conditions: ConfigurableOperation[];
    actions: ConfigurableOperation[];
    private allConditions;
    private allActions;
    constructor(router: Router, route: ActivatedRoute, serverConfigService: ServerConfigService, changeDetector: ChangeDetectorRef, dataService: DataService, formBuilder: FormBuilder, notificationService: NotificationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    getAvailableConditions(): ConfigurableOperationDefinition[];
    getConditionDefinition(condition: ConfigurableOperation): ConfigurableOperationDefinition | undefined;
    getAvailableActions(): ConfigurableOperationDefinition[];
    getActionDefinition(action: ConfigurableOperation): ConfigurableOperationDefinition | undefined;
    saveButtonEnabled(): boolean;
    addCondition(condition: ConfigurableOperation): void;
    addAction(action: ConfigurableOperation): void;
    removeCondition(condition: ConfigurableOperation): void;
    removeAction(action: ConfigurableOperation): void;
    formArrayOf(key: 'conditions' | 'actions'): FormArray;
    create(): void;
    save(): void;
    /**
     * Update the form values when the entity changes.
     */
    protected setFormValues(entity: Promotion.Fragment, languageCode: LanguageCode): void;
    /**
     * Maps an array of conditions or actions to the input format expected by the GraphQL API.
     */
    private mapOperationsToInputs;
    /**
     * Adds a new condition or action to the promotion.
     */
    private addOperation;
    private getDefaultArgValue;
    /**
     * Removes a condition or action from the promotion.
     */
    private removeOperation;
}
