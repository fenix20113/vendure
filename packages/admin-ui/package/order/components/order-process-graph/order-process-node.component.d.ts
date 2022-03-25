import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateNode } from './types';
export declare class OrderProcessNodeComponent implements OnChanges {
    private elementRef;
    node: StateNode;
    index: number;
    active: boolean;
    active$: BehaviorSubject<boolean>;
    activeTarget$: BehaviorSubject<boolean>;
    isCancellable: boolean;
    cancelledState: string;
    constructor(elementRef: ElementRef<HTMLDivElement>);
    ngOnChanges(changes: SimpleChanges): void;
    getPos(origin?: 'top' | 'bottom'): {
        x: number;
        y: number;
    };
    getStyle(): {
        'top.px': number;
        'left.px': number;
    };
}
