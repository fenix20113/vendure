import { getGraphQlInputName } from '@vendure/common/lib/shared-utils';
/**
 * Transforms any custom field "relation" type inputs into the corresponding `<name>Id` format,
 * as expected by the server.
 */
export function transformRelationCustomFieldInputs(variables, customFieldConfig) {
    if (variables.input) {
        transformRelations(variables.input, customFieldConfig);
    }
    return transformRelations(variables, customFieldConfig);
}
/**
 * @description
 * When persisting custom fields, we need to send just the IDs of the relations,
 * rather than the objects themselves.
 */
function transformRelations(input, customFieldConfig) {
    for (const field of customFieldConfig) {
        if (field.type === 'relation') {
            if (hasCustomFields(input)) {
                const entityValue = input.customFields[field.name];
                if (input.customFields.hasOwnProperty(field.name)) {
                    delete input.customFields[field.name];
                    input.customFields[getGraphQlInputName(field)] =
                        field.list && Array.isArray(entityValue)
                            ? entityValue.map(v => v === null || v === void 0 ? void 0 : v.id)
                            : entityValue === null
                                ? null
                                : entityValue === null || entityValue === void 0 ? void 0 : entityValue.id;
                }
            }
        }
    }
    return input;
}
function hasCustomFields(input) {
    return input != null && input.hasOwnProperty('customFields');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLXJlbGF0aW9uLWN1c3RvbS1maWVsZC1pbnB1dHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvdXRpbHMvdHJhbnNmb3JtLXJlbGF0aW9uLWN1c3RvbS1maWVsZC1pbnB1dHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFLdkU7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGtDQUFrQyxDQUM5QyxTQUFZLEVBQ1osaUJBQXNDO0lBRXRDLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRTtRQUNqQixrQkFBa0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUM7S0FDMUQ7SUFDRCxPQUFPLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyxrQkFBa0IsQ0FBQyxLQUFVLEVBQUUsaUJBQXNDO0lBQzFFLEtBQUssTUFBTSxLQUFLLElBQUksaUJBQWlCLEVBQUU7UUFDbkMsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtZQUMzQixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDeEIsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25ELElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUMvQyxPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0QyxLQUFLLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMxQyxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDOzRCQUNwQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxFQUFFLENBQUM7NEJBQzdCLENBQUMsQ0FBQyxXQUFXLEtBQUssSUFBSTtnQ0FDdEIsQ0FBQyxDQUFDLElBQUk7Z0NBQ04sQ0FBQyxDQUFDLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxFQUFFLENBQUM7aUJBQzdCO2FBQ0o7U0FDSjtLQUNKO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLEtBQVU7SUFDL0IsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDakUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEdyYXBoUWxJbnB1dE5hbWUgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC11dGlscyc7XG5pbXBvcnQgeyBzaW1wbGVEZWVwQ2xvbmUgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NpbXBsZS1kZWVwLWNsb25lJztcblxuaW1wb3J0IHsgQ3VzdG9tRmllbGRDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGFueSBjdXN0b20gZmllbGQgXCJyZWxhdGlvblwiIHR5cGUgaW5wdXRzIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgYDxuYW1lPklkYCBmb3JtYXQsXG4gKiBhcyBleHBlY3RlZCBieSB0aGUgc2VydmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtUmVsYXRpb25DdXN0b21GaWVsZElucHV0czxUIGV4dGVuZHMgeyBpbnB1dD86IGFueSB9ICYgUmVjb3JkPHN0cmluZywgYW55PiA9IGFueT4oXG4gICAgdmFyaWFibGVzOiBULFxuICAgIGN1c3RvbUZpZWxkQ29uZmlnOiBDdXN0b21GaWVsZENvbmZpZ1tdLFxuKTogVCB7XG4gICAgaWYgKHZhcmlhYmxlcy5pbnB1dCkge1xuICAgICAgICB0cmFuc2Zvcm1SZWxhdGlvbnModmFyaWFibGVzLmlucHV0LCBjdXN0b21GaWVsZENvbmZpZyk7XG4gICAgfVxuICAgIHJldHVybiB0cmFuc2Zvcm1SZWxhdGlvbnModmFyaWFibGVzLCBjdXN0b21GaWVsZENvbmZpZyk7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBXaGVuIHBlcnNpc3RpbmcgY3VzdG9tIGZpZWxkcywgd2UgbmVlZCB0byBzZW5kIGp1c3QgdGhlIElEcyBvZiB0aGUgcmVsYXRpb25zLFxuICogcmF0aGVyIHRoYW4gdGhlIG9iamVjdHMgdGhlbXNlbHZlcy5cbiAqL1xuZnVuY3Rpb24gdHJhbnNmb3JtUmVsYXRpb25zKGlucHV0OiBhbnksIGN1c3RvbUZpZWxkQ29uZmlnOiBDdXN0b21GaWVsZENvbmZpZ1tdKSB7XG4gICAgZm9yIChjb25zdCBmaWVsZCBvZiBjdXN0b21GaWVsZENvbmZpZykge1xuICAgICAgICBpZiAoZmllbGQudHlwZSA9PT0gJ3JlbGF0aW9uJykge1xuICAgICAgICAgICAgaWYgKGhhc0N1c3RvbUZpZWxkcyhpbnB1dCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHlWYWx1ZSA9IGlucHV0LmN1c3RvbUZpZWxkc1tmaWVsZC5uYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQuY3VzdG9tRmllbGRzLmhhc093blByb3BlcnR5KGZpZWxkLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBpbnB1dC5jdXN0b21GaWVsZHNbZmllbGQubmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmN1c3RvbUZpZWxkc1tnZXRHcmFwaFFsSW5wdXROYW1lKGZpZWxkKV0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQubGlzdCAmJiBBcnJheS5pc0FycmF5KGVudGl0eVZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZW50aXR5VmFsdWUubWFwKHYgPT4gdj8uaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBlbnRpdHlWYWx1ZSA9PT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZW50aXR5VmFsdWU/LmlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIGhhc0N1c3RvbUZpZWxkcyhpbnB1dDogYW55KTogaW5wdXQgaXMgeyBjdXN0b21GaWVsZHM6IHsgW2tleTogc3RyaW5nXTogYW55IH0gfSB7XG4gICAgcmV0dXJuIGlucHV0ICE9IG51bGwgJiYgaW5wdXQuaGFzT3duUHJvcGVydHkoJ2N1c3RvbUZpZWxkcycpO1xufVxuIl19