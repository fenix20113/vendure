import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DataService } from '../data/providers/data.service';
import { ServerConfigService } from '../data/server-config';
import { DeactivateAware } from './deactivate-aware';
import { CustomFieldConfig, CustomFields, LanguageCode } from './generated-types';
export declare abstract class BaseDetailComponent<Entity extends {
    id: string;
    updatedAt?: string;
}> implements DeactivateAware {
    protected route: ActivatedRoute;
    protected router: Router;
    protected serverConfigService: ServerConfigService;
    protected dataService: DataService;
    entity$: Observable<Entity>;
    availableLanguages$: Observable<LanguageCode[]>;
    languageCode$: Observable<LanguageCode>;
    isNew$: Observable<boolean>;
    id: string;
    abstract detailForm: FormGroup;
    protected destroy$: Subject<void>;
    protected constructor(route: ActivatedRoute, router: Router, serverConfigService: ServerConfigService, dataService: DataService);
    init(): void;
    destroy(): void;
    setLanguage(code: LanguageCode): void;
    canDeactivate(): boolean;
    protected abstract setFormValues(entity: Entity, languageCode: LanguageCode): void;
    protected getCustomFieldConfig(key: Exclude<keyof CustomFields, '__typename'>): CustomFieldConfig[];
    protected setQueryParam(key: string, value: any): void;
}
