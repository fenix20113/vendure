import { MenuItem } from 'prosemirror-menu';
import { Schema } from 'prosemirror-model';
export interface SetupOptions {
    schema: Schema;
    mapKeys?: Keymap;
    menuBar?: boolean;
    history?: boolean;
    floatingMenu?: boolean;
    menuContent?: MenuItem[][];
}
export declare type Keymap = Record<string, string | false>;
