import { AfterViewInit, ChangeDetectorRef, OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { OrderProcessState } from '@vendure/admin-ui/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderProcessNodeComponent } from './order-process-node.component';
import { StateNode } from './types';
export declare class OrderProcessGraphComponent implements OnInit, OnChanges, AfterViewInit {
    private changeDetector;
    states: OrderProcessState[];
    initialState?: string;
    setActiveState$: BehaviorSubject<string | undefined>;
    activeState$: Observable<string | undefined>;
    nodes: StateNode[];
    edges: Array<{
        from: OrderProcessNodeComponent;
        to: OrderProcessNodeComponent;
        index: number;
    }>;
    nodeComponents: QueryList<OrderProcessNodeComponent>;
    constructor(changeDetector: ChangeDetectorRef);
    get outerHeight(): number;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    onMouseOver(stateName: string): void;
    onMouseOut(): void;
    getNodeFor(state: string): OrderProcessNodeComponent | undefined;
    private populateNodes;
    private populateEdges;
}
