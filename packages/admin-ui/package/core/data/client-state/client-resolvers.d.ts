import { InMemoryCache } from '@apollo/client/core';
export declare type ResolverContext = {
    cache: InMemoryCache;
    optimisticResponse: any;
    getCacheKey: (storeObj: any) => string;
};
export declare type ResolverDefinition = {
    Mutation: {
        [name: string]: (rootValue: any, args: any, context: ResolverContext, info?: any) => any;
    };
};
export declare const clientResolvers: ResolverDefinition;
