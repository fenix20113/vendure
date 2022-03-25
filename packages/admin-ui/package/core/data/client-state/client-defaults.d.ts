import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
export declare function getClientDefaults(localStorageService: LocalStorageService): {
    networkStatus: {
        __typename?: "NetworkStatus" | undefined;
    } & Pick<import("../../common/generated-types").NetworkStatus, "inFlightRequests">;
    userStatus: {
        __typename?: "UserStatus" | undefined;
    } & {
        __typename?: "UserStatus" | undefined;
    } & Pick<import("../../common/generated-types").UserStatus, "permissions" | "username" | "isLoggedIn" | "loginTime" | "activeChannelId"> & {
        channels: ({
            __typename?: "CurrentUserChannel" | undefined;
        } & Pick<import("../../common/generated-types").CurrentUserChannel, "id" | "code" | "permissions" | "token">)[];
    };
    uiState: {
        __typename?: "UiState" | undefined;
    } & Pick<import("../../common/generated-types").UiState, "language" | "theme">;
};
