import { Permission } from '@vendure/common/lib/generated-types';
export declare const PERMISSIONS_METADATA_KEY = "__permissions__";
/**
 * @description
 * Attaches metadata to the resolver defining which permissions are required to execute the
 * operation, using one or more {@link Permission} values. Can be applied to top-level queries
 * and mutations as well as field resolvers.
 *
 * @example
 * ```TypeScript
 *  \@Allow(Permission.SuperAdmin)
 *  \@Query()
 *  getAdministrators() {
 *      // ...
 *  }
 * ```
 *
 * @docsCategory request
 * @docsPage Allow Decorator
 */
export declare const Allow: (...permissions: Permission[]) => import("@nestjs/common").CustomDecorator<string>;
