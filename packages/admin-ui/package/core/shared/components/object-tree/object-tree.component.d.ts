import { OnInit } from '@angular/core';
/**
 * This component displays a plain JavaScript object as an expandable tree.
 */
export declare class ObjectTreeComponent implements OnInit {
    value: {
        [key: string]: any;
    } | string;
    isArrayItem: boolean;
    depth: number;
    expanded: boolean;
    valueIsArray: boolean;
    entries: Array<{
        key: string;
        value: any;
    }>;
    constructor(parent: ObjectTreeComponent);
    ngOnInit(): void;
    isObject(value: any): boolean;
    private getEntries;
}
