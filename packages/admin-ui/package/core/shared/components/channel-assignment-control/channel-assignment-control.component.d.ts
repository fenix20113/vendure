import { OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { Channel, CurrentUserChannel } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
export declare class ChannelAssignmentControlComponent implements OnInit, ControlValueAccessor {
    private dataService;
    multiple: boolean;
    includeDefaultChannel: boolean;
    disableChannelIds: string[];
    channels$: Observable<CurrentUserChannel[]>;
    value: CurrentUserChannel[];
    disabled: boolean;
    private onChange;
    private onTouched;
    private channels;
    constructor(dataService: DataService);
    ngOnInit(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(obj: unknown): void;
    focussed(): void;
    channelIsDisabled(id: string): boolean;
    valueChanged(value: CurrentUserChannel[] | CurrentUserChannel | undefined): void;
    compareFn(c1: Channel | string, c2: Channel | string): boolean;
}
