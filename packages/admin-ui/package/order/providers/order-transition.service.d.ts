import { DataService, I18nService, ModalService, NotificationService } from '@vendure/admin-ui/core';
export declare class OrderTransitionService {
    private dataService;
    private modalService;
    private notificationService;
    private i18nService;
    constructor(dataService: DataService, modalService: ModalService, notificationService: NotificationService, i18nService: I18nService);
    /**
     * Attempts to transition the Order to the last state it was in before it was transitioned
     * to the "Modifying" state. If this fails, a manual prompt is used.
     */
    transitionToPreModifyingState(orderId: string, nextStates: string[]): import("rxjs").Observable<string | undefined>;
    /**
     * Displays a modal for manually selecting the next state.
     */
    manuallyTransitionToState(options: {
        orderId: string;
        nextStates: string[];
        message: string;
        cancellable: boolean;
        retry: number;
    }): import("rxjs").Observable<string | undefined>;
    /**
     * Attempts to get the last state the Order was in before it was transitioned
     * to the "Modifying" state.
     */
    private getPreModifyingState;
    private transitionToStateOrThrow;
}
