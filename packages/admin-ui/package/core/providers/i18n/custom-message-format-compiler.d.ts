import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
/**
 * Work-around for Angular 9 compat.
 * See https://github.com/lephyrus/ngx-translate-messageformat-compiler/issues/53#issuecomment-583677994
 *
 * Also logs errors which would otherwise get swallowed by ngx-translate. This is important
 * because it is quite easy to make errors in messageformat syntax, and without clear
 * error messages it's very hard to debug.
 */
export declare class InjectableTranslateMessageFormatCompiler extends TranslateMessageFormatCompiler {
    compileTranslations(value: any, lang: string): any;
}
