import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetChannels } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { Dialog } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class AssignProductsToChannelDialogComponent implements OnInit, Dialog<any> {
    private dataService;
    private notificationService;
    selectedChannel: GetChannels.Channels | null | undefined;
    currentChannel: GetChannels.Channels;
    availableChannels: GetChannels.Channels[];
    resolveWith: (result?: any) => void;
    variantsPreview$: Observable<Array<{
        id: string;
        name: string;
        price: number;
        pricePreview: number;
    }>>;
    priceFactorControl: FormControl;
    selectedChannelIdControl: FormControl;
    productIds: string[];
    productVariantIds: string[] | undefined;
    currentChannelIds: string[];
    get isProductVariantMode(): boolean;
    constructor(dataService: DataService, notificationService: NotificationService);
    ngOnInit(): void;
    selectChannel(channelIds: string[]): void;
    assign(): void;
    cancel(): void;
    private getTopVariants;
}
