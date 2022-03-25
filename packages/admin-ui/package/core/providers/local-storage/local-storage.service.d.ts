import { Location } from '@angular/common';
import { LanguageCode } from '../../common/generated-types';
import { WidgetLayoutDefinition } from '../dashboard-widget/dashboard-widget-types';
export declare type LocalStorageTypeMap = {
    activeChannelToken: string;
    authToken: string;
    uiLanguageCode: LanguageCode;
    orderListLastCustomFilters: any;
    dashboardWidgetLayout: WidgetLayoutDefinition;
    activeTheme: string;
};
export declare type LocalStorageLocationBasedTypeMap = {
    shippingTestOrder: any;
    shippingTestAddress: any;
};
/**
 * Wrapper around the browser's LocalStorage / SessionStorage object, for persisting data to the browser.
 */
export declare class LocalStorageService {
    private location;
    constructor(location: Location);
    /**
     * Set a key-value pair in the browser's LocalStorage
     */
    set<K extends keyof LocalStorageTypeMap>(key: K, value: LocalStorageTypeMap[K]): void;
    /**
     * Set a key-value pair specific to the current location (url)
     */
    setForCurrentLocation<K extends keyof LocalStorageLocationBasedTypeMap>(key: K, value: LocalStorageLocationBasedTypeMap[K]): void;
    /**
     * Set a key-value pair in the browser's SessionStorage
     */
    setForSession<K extends keyof LocalStorageTypeMap>(key: K, value: LocalStorageTypeMap[K]): void;
    /**
     * Get the value of the given key from the SessionStorage or LocalStorage.
     */
    get<K extends keyof LocalStorageTypeMap>(key: K): LocalStorageTypeMap[K] | null;
    /**
     * Get the value of the given key for the current location (url)
     */
    getForCurrentLocation<K extends keyof LocalStorageLocationBasedTypeMap>(key: K): LocalStorageLocationBasedTypeMap[K];
    remove(key: keyof LocalStorageTypeMap): void;
    private getLocationBasedKey;
    private keyName;
}
