import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Collection } from '@vendure/admin-ui/core';
import { RootNode } from './array-to-tree';
export declare type RearrangeEvent = {
    collectionId: string;
    parentId: string;
    index: number;
};
export declare type CollectionPartial = Pick<Collection.Fragment, 'id' | 'parent' | 'name'>;
export declare class CollectionTreeComponent implements OnChanges {
    collections: CollectionPartial[];
    activeCollectionId: string;
    expandAll: boolean;
    rearrange: EventEmitter<RearrangeEvent>;
    deleteCollection: EventEmitter<string>;
    collectionTree: RootNode<CollectionPartial>;
    ngOnChanges(changes: SimpleChanges): void;
    onDrop(event: CdkDragDrop<CollectionPartial | RootNode<CollectionPartial>>): void;
    onMove(event: RearrangeEvent): void;
    onDelete(id: string): void;
    private isRootNode;
}
