import { AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ProsemirrorService } from './prosemirror/prosemirror.service';
/**
 * A rich text (HTML) editor based on Trix (https://github.com/basecamp/trix)
 */
export declare class RichTextEditorComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
    private changeDetector;
    private prosemirrorService;
    label: string;
    set readonly(value: any);
    _readonly: boolean;
    onChange: (val: any) => void;
    onTouch: () => void;
    private value;
    private editorEl;
    constructor(changeDetector: ChangeDetectorRef, prosemirrorService: ProsemirrorService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(value: any): void;
}
