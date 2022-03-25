import { HttpClient } from '@angular/common/http';
import { MutationUpdaterFn, WatchQueryFetchPolicy } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql/language/ast';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
import { QueryResult } from '../query-result';
import { ServerConfigService } from '../server-config';
export declare class BaseDataService {
    private apollo;
    private httpClient;
    private localStorageService;
    private serverConfigService;
    constructor(apollo: Apollo, httpClient: HttpClient, localStorageService: LocalStorageService, serverConfigService: ServerConfigService);
    private get customFields();
    /**
     * Performs a GraphQL watch query
     */
    query<T, V = Record<string, any>>(query: DocumentNode, variables?: V, fetchPolicy?: WatchQueryFetchPolicy): QueryResult<T, V>;
    /**
     * Performs a GraphQL mutation
     */
    mutate<T, V = Record<string, any>>(mutation: DocumentNode, variables?: V, update?: MutationUpdaterFn<T>): Observable<T>;
    private prepareCustomFields;
}
