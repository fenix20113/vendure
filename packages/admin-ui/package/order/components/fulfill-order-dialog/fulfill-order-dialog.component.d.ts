import { ChangeDetectorRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfigurableOperation, ConfigurableOperationDefinition, DataService, Dialog, FulfillOrderInput, OrderDetail, OrderDetailFragment } from '@vendure/admin-ui/core';
export declare class FulfillOrderDialogComponent implements Dialog<FulfillOrderInput>, OnInit {
    private dataService;
    private changeDetector;
    resolveWith: (result?: FulfillOrderInput) => void;
    fulfillmentHandlerDef: ConfigurableOperationDefinition;
    fulfillmentHandler: ConfigurableOperation;
    fulfillmentHandlerControl: FormControl;
    fulfillmentQuantities: {
        [lineId: string]: {
            fulfillCount: number;
            max: number;
        };
    };
    order: OrderDetailFragment;
    constructor(dataService: DataService, changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    getFulfillableCount(line: OrderDetail.Lines, globalTrackInventory: boolean): number;
    getUnfulfilledCount(line: OrderDetail.Lines): number;
    canSubmit(): boolean;
    select(): void;
    cancel(): void;
}
