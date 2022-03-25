import { LanguageCode } from '../../common/generated-types';
import { Dialog } from '../../providers/modal/modal.service';
export declare class UiLanguageSwitcherDialogComponent implements Dialog<LanguageCode> {
    resolveWith: (result?: LanguageCode) => void;
    currentLanguage: LanguageCode;
    availableLanguages: LanguageCode[];
    setLanguage(languageCode: LanguageCode): void;
}
