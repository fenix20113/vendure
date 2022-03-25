import { assertNever } from '@vendure/common/lib/shared-utils';
import { findTranslation } from './find-translation';
/**
 * When updating an entity which has translations, the value from the form will pertain to the current
 * languageCode. This function ensures that the "translations" array is correctly set based on the
 * existing languages and the updated values in the specified language.
 */
export function createUpdatedTranslatable(options) {
    const { translatable, updatedFields, languageCode, customFieldConfig, defaultTranslation } = options;
    const currentTranslation = findTranslation(translatable, languageCode) || defaultTranslation || {};
    const index = translatable.translations.indexOf(currentTranslation);
    const newTranslation = patchObject(currentTranslation, updatedFields);
    const newCustomFields = {};
    const newTranslatedCustomFields = {};
    if (customFieldConfig && updatedFields.hasOwnProperty('customFields')) {
        for (const field of customFieldConfig) {
            const value = updatedFields.customFields[field.name];
            if (field.type === 'localeString') {
                newTranslatedCustomFields[field.name] = value;
            }
            else {
                newCustomFields[field.name] =
                    value === '' ? getDefaultValue(field.type) : value;
            }
        }
        newTranslation.customFields = newTranslatedCustomFields;
    }
    const newTranslatable = Object.assign(Object.assign({}, patchObject(translatable, updatedFields)), { translations: translatable.translations.slice() });
    if (customFieldConfig) {
        newTranslatable.customFields = newCustomFields;
    }
    if (index !== -1) {
        newTranslatable.translations.splice(index, 1, newTranslation);
    }
    else {
        newTranslatable.translations.push(newTranslation);
    }
    return newTranslatable;
}
function getDefaultValue(type) {
    switch (type) {
        case 'localeString':
        case 'string':
            return '';
        case 'boolean':
            return false;
        case 'float':
        case 'int':
            return 0;
        case 'datetime':
            return new Date();
        case 'relation':
            return null;
        default:
            assertNever(type);
    }
}
/**
 * Returns a shallow clone of `obj` with any properties contained in `patch` overwriting
 * those of `obj`.
 */
function patchObject(obj, patch) {
    const clone = Object.assign({}, obj);
    Object.keys(clone).forEach(key => {
        if (patch.hasOwnProperty(key)) {
            clone[key] = patch[key];
        }
    });
    return clone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXVwZGF0ZWQtdHJhbnNsYXRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9jb21tb24vdXRpbGl0aWVzL2NyZWF0ZS11cGRhdGVkLXRyYW5zbGF0YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFJL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBY3JEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUseUJBQXlCLENBQ3JDLE9BQXFDO0lBRXJDLE1BQU0sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUNyRyxNQUFNLGtCQUFrQixHQUNwQixlQUFlLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxJQUFJLGtCQUFrQixJQUFLLEVBQVUsQ0FBQztJQUNyRixNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN0RSxNQUFNLGVBQWUsR0FBdUIsRUFBRSxDQUFDO0lBQy9DLE1BQU0seUJBQXlCLEdBQXVCLEVBQUUsQ0FBQztJQUN6RCxJQUFJLGlCQUFpQixJQUFJLGFBQWEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDbkUsS0FBSyxNQUFNLEtBQUssSUFBSSxpQkFBaUIsRUFBRTtZQUNuQyxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFO2dCQUMvQix5QkFBeUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ2pEO2lCQUFNO2dCQUNILGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUN2QixLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQzdFO1NBQ0o7UUFDRCxjQUFjLENBQUMsWUFBWSxHQUFHLHlCQUF5QixDQUFDO0tBQzNEO0lBQ0QsTUFBTSxlQUFlLG1DQUNiLFdBQVcsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFTLEdBQ2pELEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDekQsQ0FBQztJQUNGLElBQUksaUJBQWlCLEVBQUU7UUFDbkIsZUFBZSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUM7S0FDbEQ7SUFDRCxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNkLGVBQWUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7S0FDakU7U0FBTTtRQUNILGVBQWUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ3JEO0lBQ0QsT0FBTyxlQUFlLENBQUM7QUFDM0IsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLElBQXFCO0lBQzFDLFFBQVEsSUFBSSxFQUFFO1FBQ1YsS0FBSyxjQUFjLENBQUM7UUFDcEIsS0FBSyxRQUFRO1lBQ1QsT0FBTyxFQUFFLENBQUM7UUFDZCxLQUFLLFNBQVM7WUFDVixPQUFPLEtBQUssQ0FBQztRQUNqQixLQUFLLE9BQU8sQ0FBQztRQUNiLEtBQUssS0FBSztZQUNOLE9BQU8sQ0FBQyxDQUFDO1FBQ2IsS0FBSyxVQUFVO1lBQ1gsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3RCLEtBQUssVUFBVTtZQUNYLE9BQU8sSUFBSSxDQUFDO1FBQ2hCO1lBQ0ksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3pCO0FBQ0wsQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQVMsV0FBVyxDQUFtQyxHQUFNLEVBQUUsS0FBNkI7SUFDeEYsTUFBTSxLQUFLLEdBQVEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDN0IsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDM0I7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdXN0b21GaWVsZHNPYmplY3QsIEN1c3RvbUZpZWxkVHlwZSB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXR5cGVzJztcbmltcG9ydCB7IGFzc2VydE5ldmVyIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuXG5pbXBvcnQgeyBDdXN0b21GaWVsZENvbmZpZywgTGFuZ3VhZ2VDb2RlIH0gZnJvbSAnLi4vZ2VuZXJhdGVkLXR5cGVzJztcblxuaW1wb3J0IHsgZmluZFRyYW5zbGF0aW9uIH0gZnJvbSAnLi9maW5kLXRyYW5zbGF0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGFibGVVcGRhdGVPcHRpb25zPFQgZXh0ZW5kcyB7IHRyYW5zbGF0aW9uczogYW55W10gfSAmIE1heUhhdmVDdXN0b21GaWVsZHM+IHtcbiAgICB0cmFuc2xhdGFibGU6IFQ7XG4gICAgdXBkYXRlZEZpZWxkczogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbiAgICBsYW5ndWFnZUNvZGU6IExhbmd1YWdlQ29kZTtcbiAgICBjdXN0b21GaWVsZENvbmZpZz86IEN1c3RvbUZpZWxkQ29uZmlnW107XG4gICAgZGVmYXVsdFRyYW5zbGF0aW9uPzogUGFydGlhbDxUWyd0cmFuc2xhdGlvbnMnXVtudW1iZXJdPjtcbn1cblxuZXhwb3J0IHR5cGUgTWF5SGF2ZUN1c3RvbUZpZWxkcyA9IHtcbiAgICBjdXN0b21GaWVsZHM/OiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xufTtcblxuLyoqXG4gKiBXaGVuIHVwZGF0aW5nIGFuIGVudGl0eSB3aGljaCBoYXMgdHJhbnNsYXRpb25zLCB0aGUgdmFsdWUgZnJvbSB0aGUgZm9ybSB3aWxsIHBlcnRhaW4gdG8gdGhlIGN1cnJlbnRcbiAqIGxhbmd1YWdlQ29kZS4gVGhpcyBmdW5jdGlvbiBlbnN1cmVzIHRoYXQgdGhlIFwidHJhbnNsYXRpb25zXCIgYXJyYXkgaXMgY29ycmVjdGx5IHNldCBiYXNlZCBvbiB0aGVcbiAqIGV4aXN0aW5nIGxhbmd1YWdlcyBhbmQgdGhlIHVwZGF0ZWQgdmFsdWVzIGluIHRoZSBzcGVjaWZpZWQgbGFuZ3VhZ2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVcGRhdGVkVHJhbnNsYXRhYmxlPFQgZXh0ZW5kcyB7IHRyYW5zbGF0aW9uczogYW55W10gfSAmIE1heUhhdmVDdXN0b21GaWVsZHM+KFxuICAgIG9wdGlvbnM6IFRyYW5zbGF0YWJsZVVwZGF0ZU9wdGlvbnM8VD4sXG4pOiBUIHtcbiAgICBjb25zdCB7IHRyYW5zbGF0YWJsZSwgdXBkYXRlZEZpZWxkcywgbGFuZ3VhZ2VDb2RlLCBjdXN0b21GaWVsZENvbmZpZywgZGVmYXVsdFRyYW5zbGF0aW9uIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGN1cnJlbnRUcmFuc2xhdGlvbiA9XG4gICAgICAgIGZpbmRUcmFuc2xhdGlvbih0cmFuc2xhdGFibGUsIGxhbmd1YWdlQ29kZSkgfHwgZGVmYXVsdFRyYW5zbGF0aW9uIHx8ICh7fSBhcyBhbnkpO1xuICAgIGNvbnN0IGluZGV4ID0gdHJhbnNsYXRhYmxlLnRyYW5zbGF0aW9ucy5pbmRleE9mKGN1cnJlbnRUcmFuc2xhdGlvbik7XG4gICAgY29uc3QgbmV3VHJhbnNsYXRpb24gPSBwYXRjaE9iamVjdChjdXJyZW50VHJhbnNsYXRpb24sIHVwZGF0ZWRGaWVsZHMpO1xuICAgIGNvbnN0IG5ld0N1c3RvbUZpZWxkczogQ3VzdG9tRmllbGRzT2JqZWN0ID0ge307XG4gICAgY29uc3QgbmV3VHJhbnNsYXRlZEN1c3RvbUZpZWxkczogQ3VzdG9tRmllbGRzT2JqZWN0ID0ge307XG4gICAgaWYgKGN1c3RvbUZpZWxkQ29uZmlnICYmIHVwZGF0ZWRGaWVsZHMuaGFzT3duUHJvcGVydHkoJ2N1c3RvbUZpZWxkcycpKSB7XG4gICAgICAgIGZvciAoY29uc3QgZmllbGQgb2YgY3VzdG9tRmllbGRDb25maWcpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdXBkYXRlZEZpZWxkcy5jdXN0b21GaWVsZHNbZmllbGQubmFtZV07XG4gICAgICAgICAgICBpZiAoZmllbGQudHlwZSA9PT0gJ2xvY2FsZVN0cmluZycpIHtcbiAgICAgICAgICAgICAgICBuZXdUcmFuc2xhdGVkQ3VzdG9tRmllbGRzW2ZpZWxkLm5hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0N1c3RvbUZpZWxkc1tmaWVsZC5uYW1lXSA9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID09PSAnJyA/IGdldERlZmF1bHRWYWx1ZShmaWVsZC50eXBlIGFzIEN1c3RvbUZpZWxkVHlwZSkgOiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBuZXdUcmFuc2xhdGlvbi5jdXN0b21GaWVsZHMgPSBuZXdUcmFuc2xhdGVkQ3VzdG9tRmllbGRzO1xuICAgIH1cbiAgICBjb25zdCBuZXdUcmFuc2xhdGFibGUgPSB7XG4gICAgICAgIC4uLihwYXRjaE9iamVjdCh0cmFuc2xhdGFibGUsIHVwZGF0ZWRGaWVsZHMpIGFzIGFueSksXG4gICAgICAgIC4uLnsgdHJhbnNsYXRpb25zOiB0cmFuc2xhdGFibGUudHJhbnNsYXRpb25zLnNsaWNlKCkgfSxcbiAgICB9O1xuICAgIGlmIChjdXN0b21GaWVsZENvbmZpZykge1xuICAgICAgICBuZXdUcmFuc2xhdGFibGUuY3VzdG9tRmllbGRzID0gbmV3Q3VzdG9tRmllbGRzO1xuICAgIH1cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIG5ld1RyYW5zbGF0YWJsZS50cmFuc2xhdGlvbnMuc3BsaWNlKGluZGV4LCAxLCBuZXdUcmFuc2xhdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV3VHJhbnNsYXRhYmxlLnRyYW5zbGF0aW9ucy5wdXNoKG5ld1RyYW5zbGF0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1RyYW5zbGF0YWJsZTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlKHR5cGU6IEN1c3RvbUZpZWxkVHlwZSk6IGFueSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2xvY2FsZVN0cmluZyc6XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIGNhc2UgJ2ludCc6XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgY2FzZSAnZGF0ZXRpbWUnOlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCk7XG4gICAgICAgIGNhc2UgJ3JlbGF0aW9uJzpcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYXNzZXJ0TmV2ZXIodHlwZSk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgYSBzaGFsbG93IGNsb25lIG9mIGBvYmpgIHdpdGggYW55IHByb3BlcnRpZXMgY29udGFpbmVkIGluIGBwYXRjaGAgb3ZlcndyaXRpbmdcbiAqIHRob3NlIG9mIGBvYmpgLlxuICovXG5mdW5jdGlvbiBwYXRjaE9iamVjdDxUIGV4dGVuZHMgeyBba2V5OiBzdHJpbmddOiBhbnkgfT4ob2JqOiBULCBwYXRjaDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IFQge1xuICAgIGNvbnN0IGNsb25lOiBhbnkgPSBPYmplY3QuYXNzaWduKHt9LCBvYmopO1xuICAgIE9iamVjdC5rZXlzKGNsb25lKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChwYXRjaC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBjbG9uZVtrZXldID0gcGF0Y2hba2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjbG9uZTtcbn1cbiJdfQ==