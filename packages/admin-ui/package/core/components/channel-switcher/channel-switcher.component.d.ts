import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CurrentUserChannel } from '../../common/generated-types';
import { DataService } from '../../data/providers/data.service';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';
export declare class ChannelSwitcherComponent implements OnInit {
    private dataService;
    private localStorageService;
    readonly displayFilterThreshold = 10;
    channels$: Observable<CurrentUserChannel[]>;
    channelCount$: Observable<number>;
    filterControl: FormControl;
    activeChannelCode$: Observable<string>;
    constructor(dataService: DataService, localStorageService: LocalStorageService);
    ngOnInit(): void;
    setActiveChannel(channelId: string): void;
}
