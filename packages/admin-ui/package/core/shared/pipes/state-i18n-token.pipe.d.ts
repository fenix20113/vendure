import { PipeTransform } from '@angular/core';
export declare class StateI18nTokenPipe implements PipeTransform {
    private readonly stateI18nTokens;
    transform<T extends unknown>(value: T): T;
}
