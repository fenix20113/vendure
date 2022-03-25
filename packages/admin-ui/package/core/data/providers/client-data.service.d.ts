import { CurrentUserChannel, CurrentUserChannelInput, LanguageCode } from '../../common/generated-types';
import { BaseDataService } from './base-data.service';
/**
 * Note: local queries all have a fetch-policy of "cache-first" explicitly specified due to:
 * https://github.com/apollographql/apollo-link-state/issues/236
 */
export declare class ClientDataService {
    private baseDataService;
    constructor(baseDataService: BaseDataService);
    startRequest(): import("rxjs").Observable<Pick<import("../../common/generated-types").Mutation, "requestStarted">>;
    completeRequest(): import("rxjs").Observable<Pick<import("../../common/generated-types").Mutation, "requestCompleted">>;
    getNetworkStatus(): import("../query-result").QueryResult<import("../../common/generated-types").GetNetworkStatusQuery, Record<string, any>>;
    loginSuccess(username: string, activeChannelId: string, channels: CurrentUserChannel[]): import("rxjs").Observable<import("../../common/generated-types").SetAsLoggedInMutation>;
    logOut(): import("rxjs").Observable<unknown>;
    userStatus(): import("../query-result").QueryResult<import("../../common/generated-types").GetUserStatusQuery, Record<string, any>>;
    uiState(): import("../query-result").QueryResult<import("../../common/generated-types").GetUiStateQuery, Record<string, any>>;
    setUiLanguage(languageCode: LanguageCode): import("rxjs").Observable<Pick<import("../../common/generated-types").Mutation, "setUiLanguage">>;
    setUiTheme(theme: string): import("rxjs").Observable<Pick<import("../../common/generated-types").Mutation, "setUiTheme">>;
    setActiveChannel(channelId: string): import("rxjs").Observable<import("../../common/generated-types").SetActiveChannelMutation>;
    updateUserChannels(channels: CurrentUserChannelInput[]): import("rxjs").Observable<import("../../common/generated-types").UpdateUserChannelsMutation>;
}
