import { ComponentFactoryResolver } from '@angular/core';
import { Type } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '../../common/component-registry-types';
import { CustomFields, CustomFieldsFragment } from '../../common/generated-types';
import { ComponentRegistryService } from '../component-registry/component-registry.service';
export declare type CustomFieldConfigType = CustomFieldsFragment;
export interface CustomFieldControl extends FormInputComponent<CustomFieldConfigType> {
}
export declare type CustomFieldEntityName = Exclude<keyof CustomFields, '__typename'>;
/**
 * This service allows the registration of custom controls for customFields.
 */
export declare class CustomFieldComponentService {
    private componentFactoryResolver;
    private componentRegistryService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, componentRegistryService: ComponentRegistryService);
    /**
     * Register a CustomFieldControl component to be used with the specified customField and entity.
     */
    registerCustomFieldComponent(entity: CustomFieldEntityName, fieldName: string, component: Type<CustomFieldControl>): void;
    /**
     * Checks whether a custom component is registered for the given entity custom field,
     * and if so returns the ID of that component.
     */
    customFieldComponentExists(entity: CustomFieldEntityName, fieldName: string): string | undefined;
    private generateId;
}
