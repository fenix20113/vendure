import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
export declare function blockQuoteRule(nodeType: any): any;
export declare function orderedListRule(nodeType: any): any;
export declare function bulletListRule(nodeType: any): any;
export declare function codeBlockRule(nodeType: any): any;
export declare function headingRule(nodeType: any, maxLevel: any): any;
export declare function buildInputRules(schema: Schema): Plugin;
