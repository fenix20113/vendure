import { CustomFieldConfig, LanguageCode } from '../generated-types';
export interface TranslatableUpdateOptions<T extends {
    translations: any[];
} & MayHaveCustomFields> {
    translatable: T;
    updatedFields: {
        [key: string]: any;
    };
    languageCode: LanguageCode;
    customFieldConfig?: CustomFieldConfig[];
    defaultTranslation?: Partial<T['translations'][number]>;
}
export declare type MayHaveCustomFields = {
    customFields?: {
        [key: string]: any;
    };
};
/**
 * When updating an entity which has translations, the value from the form will pertain to the current
 * languageCode. This function ensures that the "translations" array is correctly set based on the
 * existing languages and the updated values in the specified language.
 */
export declare function createUpdatedTranslatable<T extends {
    translations: any[];
} & MayHaveCustomFields>(options: TranslatableUpdateOptions<T>): T;
