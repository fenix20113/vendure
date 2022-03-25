import { BaseDataService } from './base-data.service';
export declare class AuthDataService {
    private baseDataService;
    constructor(baseDataService: BaseDataService);
    currentUser(): import("../query-result").QueryResult<import("../../common/generated-types").GetCurrentUserQuery, Record<string, any>>;
    attemptLogin(username: string, password: string, rememberMe: boolean): import("rxjs").Observable<import("../../common/generated-types").AttemptLoginMutation>;
    logOut(): import("rxjs").Observable<import("../../common/generated-types").LogOutMutation>;
}
