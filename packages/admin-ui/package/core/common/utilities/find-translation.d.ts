import { LanguageCode } from '../generated-types';
export declare type Translation<T> = T & {
    languageCode: LanguageCode;
};
export declare type PossiblyTranslatable<T> = {
    translations?: Array<Translation<T>> | null;
};
export declare type TranslationOf<E> = E extends PossiblyTranslatable<infer U> ? U : undefined;
/**
 * @description
 * Given a translatable entity, returns the translation in the specified LanguageCode if
 * one exists.
 */
export declare function findTranslation<E extends PossiblyTranslatable<any>>(entity: E | undefined, languageCode: LanguageCode): TranslationOf<E> | undefined;
