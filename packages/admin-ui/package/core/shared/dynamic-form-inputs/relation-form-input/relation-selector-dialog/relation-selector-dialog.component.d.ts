import { TemplateRef } from '@angular/core';
import { Dialog } from '../../../../providers/modal/modal.service';
export declare class RelationSelectorDialogComponent implements Dialog<string[]> {
    resolveWith: (result?: string[]) => void;
    title: string;
    selectorTemplate: TemplateRef<any>;
}
