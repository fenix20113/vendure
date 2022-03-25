import { Route } from '@angular/router';
import { ExtensionHostOptions } from './extension-host-config';
export interface ExternalFrameOptions extends ExtensionHostOptions {
    path: string;
    breadcrumbLabel: string;
}
/**
 * This function is used to conveniently configure a UI extension route to
 * host an external URL from the Admin UI using the {@link ExtensionHostComponent}
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *     imports: [
 *         RouterModule.forChild([
 *             hostExternalFrame({
 *                 path: '',
 *                 breadcrumbLabel: 'Vue.js App',
 *                 extensionUrl: './assets/vue-app/index.html',
 *                 openInNewTab: false,
 *             }),
 *         ]),
 *     ],
 * })
 export class VueUiExtensionModule {}
 * ```
 */
export declare function hostExternalFrame(options: ExternalFrameOptions): Route;
