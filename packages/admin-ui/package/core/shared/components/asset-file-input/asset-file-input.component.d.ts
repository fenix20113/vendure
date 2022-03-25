import { EventEmitter, OnInit } from '@angular/core';
import { ServerConfigService } from '../../../data/server-config';
/**
 * A component for selecting files to upload as new Assets.
 */
export declare class AssetFileInputComponent implements OnInit {
    private serverConfig;
    /**
     * CSS selector of the DOM element which will be masked by the file
     * drop zone. Defaults to `body`.
     */
    dropZoneTarget: string;
    uploading: boolean;
    selectFiles: EventEmitter<File[]>;
    dragging: boolean;
    overDropZone: boolean;
    dropZoneStyle: {
        'width.px': number;
        'height.px': number;
        'top.px': number;
        'left.px': number;
    };
    accept: string;
    constructor(serverConfig: ServerConfigService);
    ngOnInit(): void;
    onDragEnter(): void;
    onDragLeave(event: any): void;
    /**
     * Preventing this event is required to make dropping work.
     * See https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#Define_a_drop_zone
     */
    onDragOver(event: any): void;
    onDrop(event: any): void;
    select(event: Event): void;
    private fitDropZoneToTarget;
}
