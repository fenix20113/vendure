import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dialog } from '../../../../providers/modal/modal.service';
export interface ExternalImageAttrs {
    src: string;
    title: string;
    alt: string;
}
export declare class ExternalImageDialogComponent implements OnInit, Dialog<ExternalImageAttrs> {
    form: FormGroup;
    resolveWith: (result?: ExternalImageAttrs) => void;
    previewLoaded: boolean;
    existing?: ExternalImageAttrs;
    ngOnInit(): void;
    select(): void;
    onImageLoad(event: Event): void;
    onImageError(event: Event): void;
}
