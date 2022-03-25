import { Type } from '@angular/core';
import { FormInputComponent } from '../../common/component-registry-types';
export declare class ComponentRegistryService {
    private inputComponentMap;
    registerInputComponent(id: string, component: Type<FormInputComponent<any>>): void;
    getInputComponent(id: string): Type<FormInputComponent<any>> | undefined;
}
