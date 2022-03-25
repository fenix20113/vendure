import { MutationUpdaterFn, WatchQueryFetchPolicy } from '@apollo/client/core';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';
import { QueryResult } from '../query-result';
import { AdministratorDataService } from './administrator-data.service';
import { AuthDataService } from './auth-data.service';
import { BaseDataService } from './base-data.service';
import { ClientDataService } from './client-data.service';
import { CollectionDataService } from './collection-data.service';
import { CustomerDataService } from './customer-data.service';
import { FacetDataService } from './facet-data.service';
import { OrderDataService } from './order-data.service';
import { ProductDataService } from './product-data.service';
import { PromotionDataService } from './promotion-data.service';
import { SettingsDataService } from './settings-data.service';
import { ShippingMethodDataService } from './shipping-method-data.service';
export declare class DataService {
    private baseDataService;
    promotion: PromotionDataService;
    administrator: AdministratorDataService;
    auth: AuthDataService;
    collection: CollectionDataService;
    product: ProductDataService;
    client: ClientDataService;
    facet: FacetDataService;
    order: OrderDataService;
    settings: SettingsDataService;
    customer: CustomerDataService;
    shippingMethod: ShippingMethodDataService;
    constructor(baseDataService: BaseDataService);
    /**
     * Perform a GraphQL query.
     */
    query<T, V = Record<string, any>>(query: DocumentNode, variables?: V, fetchPolicy?: WatchQueryFetchPolicy): QueryResult<T, V>;
    /**
     * Perform a GraphQL mutation.
     */
    mutate<T, V = Record<string, any>>(mutation: DocumentNode, variables?: V, update?: MutationUpdaterFn<T>): Observable<T>;
}
