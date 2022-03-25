import { OnInit } from '@angular/core';
import { CancelOrderInput, Dialog, I18nService, OrderDetailFragment } from '@vendure/admin-ui/core';
export declare class CancelOrderDialogComponent implements OnInit, Dialog<CancelOrderInput> {
    private i18nService;
    order: OrderDetailFragment;
    resolveWith: (result?: CancelOrderInput) => void;
    reason: string;
    lineQuantities: {
        [lineId: string]: number;
    };
    reasons: string[];
    get selectionCount(): number;
    constructor(i18nService: I18nService);
    ngOnInit(): void;
    select(): void;
    cancel(): void;
    private getLineInputs;
}
