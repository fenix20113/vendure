import { OnInit } from '@angular/core';
import { Dialog, OrderProcessState, ServerConfigService } from '@vendure/admin-ui/core';
export declare class OrderProcessGraphDialogComponent implements OnInit, Dialog<void> {
    private serverConfigService;
    activeState: string;
    states: OrderProcessState[];
    constructor(serverConfigService: ServerConfigService);
    ngOnInit(): void;
    resolveWith: (result: void | undefined) => void;
}
