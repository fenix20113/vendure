import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { RootNode, TreeNode } from './array-to-tree';
import { CollectionPartial, CollectionTreeComponent } from './collection-tree.component';
export declare class CollectionTreeNodeComponent implements OnInit, OnChanges {
    private parent;
    private root;
    private dataService;
    depth: number;
    parentName: string;
    collectionTree: TreeNode<CollectionPartial>;
    activeCollectionId: string;
    expandAll: boolean;
    hasUpdatePermission$: Observable<boolean>;
    hasDeletePermission$: Observable<boolean>;
    constructor(parent: CollectionTreeNodeComponent, root: CollectionTreeComponent, dataService: DataService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    trackByFn(index: number, item: CollectionPartial): string;
    getMoveListItems(collection: CollectionPartial): Array<{
        path: string;
        id: string;
    }>;
    move(collection: CollectionPartial, parentId: string): void;
    moveUp(collection: CollectionPartial, currentIndex: number): void;
    moveDown(collection: CollectionPartial, currentIndex: number): void;
    drop(event: CdkDragDrop<CollectionPartial | RootNode<CollectionPartial>>): void;
    delete(id: string): void;
}
