import { ConfigurableOperationDefinition } from '../generated-types';
/**
 * Interpolates the description of an ConfigurableOperation with the given values.
 */
export declare function interpolateDescription(operation: ConfigurableOperationDefinition, values: {
    [name: string]: any;
}): string;
