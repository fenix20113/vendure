import { Observable } from 'rxjs';
import { Channel } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ModalService } from '@vendure/admin-ui/core';
export declare class ChannelListComponent {
    private dataService;
    private modalService;
    private notificationService;
    channels$: Observable<Channel.Fragment[]>;
    private refresh$;
    constructor(dataService: DataService, modalService: ModalService, notificationService: NotificationService);
    isDefaultChannel(channelCode: string): boolean;
    deleteChannel(id: string): void;
}
