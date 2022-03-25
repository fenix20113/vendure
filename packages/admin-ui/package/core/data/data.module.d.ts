import { Injector } from '@angular/core';
import { ApolloClientOptions } from '@apollo/client/core';
import { LocalStorageService } from '../providers/local-storage/local-storage.service';
import { FetchAdapter } from './providers/fetch-adapter';
export declare function createApollo(localStorageService: LocalStorageService, fetchAdapter: FetchAdapter, injector: Injector): ApolloClientOptions<any>;
/**
 * The DataModule is responsible for all API calls *and* serves as the source of truth for global app
 * state via the apollo-link-state package.
 */
export declare class DataModule {
}
