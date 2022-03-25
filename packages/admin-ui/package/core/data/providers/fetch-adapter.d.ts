import { HttpClient } from '@angular/common/http';
/**
 * An adapter that allows the Angular HttpClient to be used as a replacement for the global `fetch` function.
 * This is used to supply a custom fetch function to the apollo-upload-client whilst also allowing the
 * use of Angular's http infrastructure such as interceptors.
 */
export declare class FetchAdapter {
    private httpClient;
    constructor(httpClient: HttpClient);
    fetch: (input: Request | string, init: RequestInit) => Promise<Response>;
}
