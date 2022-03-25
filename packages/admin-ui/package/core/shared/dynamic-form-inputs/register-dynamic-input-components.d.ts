import { FactoryProvider, Type } from '@angular/core';
import { FormInputComponent } from '../../common/component-registry-types';
import { CustomFieldControl, CustomFieldEntityName } from '../../providers/custom-field-component/custom-field-component.service';
import { CurrencyFormInputComponent } from './currency-form-input/currency-form-input.component';
import { CustomerGroupFormInputComponent } from './customer-group-form-input/customer-group-form-input.component';
import { FacetValueFormInputComponent } from './facet-value-form-input/facet-value-form-input.component';
import { ProductSelectorFormInputComponent } from './product-selector-form-input/product-selector-form-input.component';
import { TextFormInputComponent } from './text-form-input/text-form-input.component';
export declare const defaultFormInputs: (typeof ProductSelectorFormInputComponent | typeof CustomerGroupFormInputComponent | typeof TextFormInputComponent | typeof CurrencyFormInputComponent | typeof FacetValueFormInputComponent)[];
/**
 * @description
 * Registers a custom FormInputComponent which can be used to control the argument inputs
 * of a {@link ConfigurableOperationDef} (e.g. CollectionFilter, ShippingMethod etc)
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   declarations: [MyCustomFieldControl],
 *   providers: [
 *       registerFormInputComponent('my-custom-input', MyCustomFieldControl),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 */
export declare function registerFormInputComponent(id: string, component: Type<FormInputComponent>): FactoryProvider;
/**
 * @description
 * Registers a custom component to act as the form input control for the given custom field.
 * This should be used in the NgModule `providers` array of your ui extension module.
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   declarations: [MyCustomFieldControl],
 *   providers: [
 *       registerCustomFieldComponent('Product', 'someCustomField', MyCustomFieldControl),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 */
export declare function registerCustomFieldComponent(entity: CustomFieldEntityName, fieldName: string, component: Type<CustomFieldControl>): FactoryProvider;
/**
 * Registers the default form input components.
 */
export declare function registerDefaultFormInputs(): FactoryProvider[];
