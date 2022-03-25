import { EventEmitter } from '@angular/core';
import { TemplateRef } from '@angular/core';
export declare class RelationCardPreviewDirective {
}
export declare class RelationCardDetailDirective {
}
export declare class RelationCardComponent {
    entity: any;
    placeholderIcon: string;
    selectLabel: string;
    readonly: boolean;
    removable: boolean;
    select: EventEmitter<any>;
    remove: EventEmitter<any>;
    previewTemplate: TemplateRef<any>;
    detailTemplate: TemplateRef<any>;
}
