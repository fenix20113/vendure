/**
 * ConfigArg values are always stored as strings. If they are not primitives, then
 * they are JSON-encoded. This function unwraps them back into their original
 * data type.
 */
export function getConfigArgValue(value) {
    try {
        return value ? JSON.parse(value) : undefined;
    }
    catch (e) {
        return value;
    }
}
export function encodeConfigArgValue(value) {
    return Array.isArray(value) ? JSON.stringify(value) : (value !== null && value !== void 0 ? value : '').toString();
}
/**
 * Creates an empty ConfigurableOperation object based on the definition.
 */
export function configurableDefinitionToInstance(def) {
    return Object.assign(Object.assign({}, def), { args: def.args.map(arg => {
            return Object.assign(Object.assign({}, arg), { value: getDefaultConfigArgValue(arg) });
        }) });
}
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
export function toConfigurableOperationInput(operation, formValueOperations) {
    return {
        code: operation.code,
        arguments: Object.values(formValueOperations.args || {}).map((value, j) => ({
            name: operation.args[j].name,
            value: value.hasOwnProperty('value')
                ? encodeConfigArgValue(value.value)
                : encodeConfigArgValue(value),
        })),
    };
}
export function configurableOperationValueIsValid(def, value) {
    if (!def || !value) {
        return false;
    }
    if (def.code !== value.code) {
        return false;
    }
    for (const argDef of def.args) {
        const argVal = value.args[argDef.name];
        if (argDef.required && (argVal == null || argVal === '' || argVal === '0')) {
            return false;
        }
    }
    return true;
}
/**
 * Returns a default value based on the type of the config arg.
 */
export function getDefaultConfigArgValue(arg) {
    var _a;
    return arg.list ? [] : (_a = arg.defaultValue) !== null && _a !== void 0 ? _a : null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhYmxlLW9wZXJhdGlvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvY29tbW9uL3V0aWxpdGllcy9jb25maWd1cmFibGUtb3BlcmF0aW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVBOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsS0FBVTtJQUN4QyxJQUFJO1FBQ0EsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztLQUNoRDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDTCxDQUFDO0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLEtBQVU7SUFDM0MsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ25GLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxnQ0FBZ0MsQ0FDNUMsR0FBb0M7SUFFcEMsT0FBTyxnQ0FDQSxHQUFHLEtBQ04sSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLHVDQUNPLEdBQUcsS0FDTixLQUFLLEVBQUUsd0JBQXdCLENBQUMsR0FBRyxDQUFDLElBQ3RDO1FBQ04sQ0FBQyxDQUFDLEdBQ29CLENBQUM7QUFDL0IsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxVQUFVLDRCQUE0QixDQUN4QyxTQUFnQyxFQUNoQyxtQkFBd0I7SUFFeEIsT0FBTztRQUNILElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTtRQUNwQixTQUFTLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBTSxtQkFBbUIsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM3RSxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVCLEtBQUssRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLG9CQUFvQixDQUFFLEtBQWEsQ0FBQyxLQUFLLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7U0FDcEMsQ0FBQyxDQUFDO0tBQ04sQ0FBQztBQUNOLENBQUM7QUFFRCxNQUFNLFVBQVUsaUNBQWlDLENBQzdDLEdBQXFDLEVBQ3JDLEtBQXlEO0lBRXpELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDaEIsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFDRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksRUFBRTtRQUN6QixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELEtBQUssTUFBTSxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtRQUMzQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sS0FBSyxFQUFFLElBQUksTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ3hFLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0tBQ0o7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsR0FBd0I7O0lBQzdELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBQyxHQUFHLENBQUMsWUFBWSxtQ0FBSSxJQUFJLENBQUM7QUFDcEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZ0FyZ1R5cGUsIEN1c3RvbUZpZWxkVHlwZSB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXR5cGVzJztcbmltcG9ydCB7IGFzc2VydE5ldmVyIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuXG5pbXBvcnQge1xuICAgIENvbmZpZ0FyZ0RlZmluaXRpb24sXG4gICAgQ29uZmlndXJhYmxlT3BlcmF0aW9uLFxuICAgIENvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZmluaXRpb24sXG4gICAgQ29uZmlndXJhYmxlT3BlcmF0aW9uSW5wdXQsXG59IGZyb20gJy4uL2dlbmVyYXRlZC10eXBlcyc7XG5cbi8qKlxuICogQ29uZmlnQXJnIHZhbHVlcyBhcmUgYWx3YXlzIHN0b3JlZCBhcyBzdHJpbmdzLiBJZiB0aGV5IGFyZSBub3QgcHJpbWl0aXZlcywgdGhlblxuICogdGhleSBhcmUgSlNPTi1lbmNvZGVkLiBUaGlzIGZ1bmN0aW9uIHVud3JhcHMgdGhlbSBiYWNrIGludG8gdGhlaXIgb3JpZ2luYWxcbiAqIGRhdGEgdHlwZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmZpZ0FyZ1ZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPyBKU09OLnBhcnNlKHZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGVDb25maWdBcmdWYWx1ZSh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgOiAodmFsdWUgPz8gJycpLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBlbXB0eSBDb25maWd1cmFibGVPcGVyYXRpb24gb2JqZWN0IGJhc2VkIG9uIHRoZSBkZWZpbml0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJhYmxlRGVmaW5pdGlvblRvSW5zdGFuY2UoXG4gICAgZGVmOiBDb25maWd1cmFibGVPcGVyYXRpb25EZWZpbml0aW9uLFxuKTogQ29uZmlndXJhYmxlT3BlcmF0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5kZWYsXG4gICAgICAgIGFyZ3M6IGRlZi5hcmdzLm1hcChhcmcgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5hcmcsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGdldERlZmF1bHRDb25maWdBcmdWYWx1ZShhcmcpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgfSBhcyBDb25maWd1cmFibGVPcGVyYXRpb247XG59XG5cbi8qKlxuICogQ29udmVydHMgYW4gb2JqZWN0IG9mIHRoZSB0eXBlOlxuICogYGBgXG4gKiB7XG4gKiAgICAgY29kZTogJ215LW9wZXJhdGlvbicsXG4gKiAgICAgYXJnczoge1xuICogICAgICAgICBzb21lUHJvcGVydHk6ICdmb28nXG4gKiAgICAgfVxuICogfVxuICogYGBgXG4gKiB0byB0aGUgZm9ybWF0IGRlZmluZWQgYnkgdGhlIENvbmZpZ3VyYWJsZU9wZXJhdGlvbklucHV0IEdyYXBoUUwgaW5wdXQgdHlwZTpcbiAqIGBgYFxuICoge1xuICogICAgIGNvZGU6ICdteS1vcGVyYXRpb24nLFxuICogICAgIGFyZ3M6IFtcbiAqICAgICAgICAgeyBuYW1lOiAnc29tZVByb3BlcnR5JywgdmFsdWU6ICdmb28nIH1cbiAqICAgICBdXG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQ29uZmlndXJhYmxlT3BlcmF0aW9uSW5wdXQoXG4gICAgb3BlcmF0aW9uOiBDb25maWd1cmFibGVPcGVyYXRpb24sXG4gICAgZm9ybVZhbHVlT3BlcmF0aW9uczogYW55LFxuKTogQ29uZmlndXJhYmxlT3BlcmF0aW9uSW5wdXQge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IG9wZXJhdGlvbi5jb2RlLFxuICAgICAgICBhcmd1bWVudHM6IE9iamVjdC52YWx1ZXM8YW55Pihmb3JtVmFsdWVPcGVyYXRpb25zLmFyZ3MgfHwge30pLm1hcCgodmFsdWUsIGopID0+ICh7XG4gICAgICAgICAgICBuYW1lOiBvcGVyYXRpb24uYXJnc1tqXS5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLmhhc093blByb3BlcnR5KCd2YWx1ZScpXG4gICAgICAgICAgICAgICAgPyBlbmNvZGVDb25maWdBcmdWYWx1ZSgodmFsdWUgYXMgYW55KS52YWx1ZSlcbiAgICAgICAgICAgICAgICA6IGVuY29kZUNvbmZpZ0FyZ1ZhbHVlKHZhbHVlKSxcbiAgICAgICAgfSkpLFxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmFibGVPcGVyYXRpb25WYWx1ZUlzVmFsaWQoXG4gICAgZGVmPzogQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmaW5pdGlvbixcbiAgICB2YWx1ZT86IHsgY29kZTogc3RyaW5nOyBhcmdzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IH0sXG4pIHtcbiAgICBpZiAoIWRlZiB8fCAhdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZGVmLmNvZGUgIT09IHZhbHVlLmNvZGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGFyZ0RlZiBvZiBkZWYuYXJncykge1xuICAgICAgICBjb25zdCBhcmdWYWwgPSB2YWx1ZS5hcmdzW2FyZ0RlZi5uYW1lXTtcbiAgICAgICAgaWYgKGFyZ0RlZi5yZXF1aXJlZCAmJiAoYXJnVmFsID09IG51bGwgfHwgYXJnVmFsID09PSAnJyB8fCBhcmdWYWwgPT09ICcwJykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZGVmYXVsdCB2YWx1ZSBiYXNlZCBvbiB0aGUgdHlwZSBvZiB0aGUgY29uZmlnIGFyZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRDb25maWdBcmdWYWx1ZShhcmc6IENvbmZpZ0FyZ0RlZmluaXRpb24pOiBhbnkge1xuICAgIHJldHVybiBhcmcubGlzdCA/IFtdIDogYXJnLmRlZmF1bHRWYWx1ZSA/PyBudWxsO1xufVxuIl19