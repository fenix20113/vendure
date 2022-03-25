import { ConfigArgDefinition, ConfigurableOperation, ConfigurableOperationDefinition, ConfigurableOperationInput } from '../generated-types';
/**
 * ConfigArg values are always stored as strings. If they are not primitives, then
 * they are JSON-encoded. This function unwraps them back into their original
 * data type.
 */
export declare function getConfigArgValue(value: any): any;
export declare function encodeConfigArgValue(value: any): string;
/**
 * Creates an empty ConfigurableOperation object based on the definition.
 */
export declare function configurableDefinitionToInstance(def: ConfigurableOperationDefinition): ConfigurableOperation;
/**
 * Converts an object of the type:
 * ```
 * {
 *     code: 'my-operation',
 *     args: {
 *         someProperty: 'foo'
 *     }
 * }
 * ```
 * to the format defined by the ConfigurableOperationInput GraphQL input type:
 * ```
 * {
 *     code: 'my-operation',
 *     args: [
 *         { name: 'someProperty', value: 'foo' }
 *     ]
 * }
 * ```
 */
export declare function toConfigurableOperationInput(operation: ConfigurableOperation, formValueOperations: any): ConfigurableOperationInput;
export declare function configurableOperationValueIsValid(def?: ConfigurableOperationDefinition, value?: {
    code: string;
    args: {
        [key: string]: string;
    };
}): boolean;
/**
 * Returns a default value based on the type of the config arg.
 */
export declare function getDefaultConfigArgValue(arg: ConfigArgDefinition): any;
