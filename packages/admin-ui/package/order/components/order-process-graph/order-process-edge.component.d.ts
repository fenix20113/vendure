import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderProcessNodeComponent } from './order-process-node.component';
export declare class OrderProcessEdgeComponent implements OnInit {
    from: OrderProcessNodeComponent;
    to: OrderProcessNodeComponent;
    index: number;
    active$: Observable<boolean>;
    ngOnInit(): void;
    getStyle(): {
        transform?: string;
        'transform-origin'?: string;
        'top.px': number;
        'left.px': number;
        'height.px': number;
        'width.px': number;
    };
}
