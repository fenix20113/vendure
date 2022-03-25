export declare type HasParent = {
    id: string;
    parent?: {
        id: string;
    } | null;
};
export declare type TreeNode<T extends HasParent> = T & {
    children: Array<TreeNode<T>>;
    expanded: boolean;
};
export declare type RootNode<T extends HasParent> = {
    id?: string;
    children: Array<TreeNode<T>>;
};
/**
 * Builds a tree from an array of nodes which have a parent.
 * Based on https://stackoverflow.com/a/31247960/772859, modified to preserve ordering.
 */
export declare function arrayToTree<T extends HasParent>(nodes: T[], currentState?: RootNode<T>): RootNode<T>;
