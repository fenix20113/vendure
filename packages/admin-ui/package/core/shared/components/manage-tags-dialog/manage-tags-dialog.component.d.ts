import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetTagList } from '../../../common/generated-types';
import { DataService } from '../../../data/providers/data.service';
import { Dialog } from '../../../providers/modal/modal.service';
export declare class ManageTagsDialogComponent implements Dialog<boolean>, OnInit {
    private dataService;
    resolveWith: (result: boolean | undefined) => void;
    allTags$: Observable<GetTagList.Items[]>;
    toDelete: string[];
    toUpdate: Array<{
        id: string;
        value: string;
    }>;
    constructor(dataService: DataService);
    ngOnInit(): void;
    toggleDelete(id: string): void;
    markedAsDeleted(id: string): boolean;
    updateTagValue(id: string, value: string): void;
    saveChanges(): import("rxjs").Subscription;
}
