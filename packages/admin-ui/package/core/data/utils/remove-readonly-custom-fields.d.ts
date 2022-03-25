import { DocumentNode } from 'graphql';
import { CustomFieldConfig } from '../../common/generated-types';
/**
 * Checks the current documentNode for an operation with a variable named "Create<Entity>Input" or "Update<Entity>Input"
 * and if a match is found, returns the <Entity> name.
 */
export declare function isEntityCreateOrUpdateMutation(documentNode: DocumentNode): string | undefined;
/**
 * Removes any `readonly` custom fields from an entity (including its translations).
 * To be used before submitting the entity for a create or update request.
 */
export declare function removeReadonlyCustomFields<T extends {
    input?: any;
} & Record<string, any> = any>(variables: T, customFieldConfig: CustomFieldConfig[]): T;
