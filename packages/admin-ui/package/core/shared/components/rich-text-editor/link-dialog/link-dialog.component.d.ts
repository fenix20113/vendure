import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dialog } from '../../../../providers/modal/modal.service';
export interface LinkAttrs {
    href: string;
    title: string;
}
export declare class LinkDialogComponent implements OnInit, Dialog<LinkAttrs> {
    form: FormGroup;
    resolveWith: (result?: LinkAttrs) => void;
    existing?: LinkAttrs;
    ngOnInit(): void;
    remove(): void;
    select(): void;
}
