import { OnDestroy } from '@angular/core';
import { DataService } from '../../../data/providers/data.service';
import { NotificationService } from '../../../providers/notification/notification.service';
export declare class ExtensionHostService implements OnDestroy {
    private dataService;
    private notificationService;
    private extensionWindow;
    private cancellationMessage$;
    private destroyMessage$;
    constructor(dataService: DataService, notificationService: NotificationService);
    init(extensionWindow: Window): void;
    destroy(): void;
    ngOnDestroy(): void;
    private handleMessage;
    private createObserver;
    private sendMessage;
    private isExtensionMessage;
}
