import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { ElementRef, EventEmitter } from '@angular/core';
export declare type Point = {
    x: number;
    y: number;
};
export declare class FocalPointControlComponent {
    visible: boolean;
    editable: boolean;
    width: number;
    height: number;
    fpx: number;
    fpy: number;
    focalPointChange: EventEmitter<Point>;
    frame: ElementRef<HTMLDivElement>;
    dot: ElementRef<HTMLDivElement>;
    get initialPosition(): Point;
    onDragEnded(event: CdkDragEnd): void;
    private getCurrentFocalPoint;
    private focalPointToOffset;
}
