import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { arrayToTree } from './array-to-tree';
export class CollectionTreeComponent {
    constructor() {
        this.expandAll = false;
        this.rearrange = new EventEmitter();
        this.deleteCollection = new EventEmitter();
    }
    ngOnChanges(changes) {
        if ('collections' in changes && this.collections) {
            this.collectionTree = arrayToTree(this.collections, this.collectionTree);
        }
    }
    onDrop(event) {
        const item = event.item.data;
        const newParent = event.container.data;
        const newParentId = newParent.id;
        if (newParentId == null) {
            throw new Error(`Could not determine the ID of the root Collection`);
        }
        this.rearrange.emit({
            collectionId: item.id,
            parentId: newParentId,
            index: event.currentIndex,
        });
    }
    onMove(event) {
        this.rearrange.emit(event);
    }
    onDelete(id) {
        this.deleteCollection.emit(id);
    }
    isRootNode(node) {
        return !node.hasOwnProperty('parent');
    }
}
CollectionTreeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-collection-tree',
                template: "<vdr-collection-tree-node\n    *ngIf=\"collectionTree\"\n    cdkDropListGroup\n    [expandAll]=\"expandAll\"\n    [collectionTree]=\"collectionTree\"\n    [activeCollectionId]=\"activeCollectionId\"\n></vdr-collection-tree-node>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CollectionTreeComponent.propDecorators = {
    collections: [{ type: Input }],
    activeCollectionId: [{ type: Input }],
    expandAll: [{ type: Input }],
    rearrange: [{ type: Output }],
    deleteCollection: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi10cmVlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY2F0YWxvZy9zcmMvY29tcG9uZW50cy9jb2xsZWN0aW9uLXRyZWUvY29sbGVjdGlvbi10cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sR0FFVCxNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsV0FBVyxFQUF1QixNQUFNLGlCQUFpQixDQUFDO0FBV25FLE1BQU0sT0FBTyx1QkFBdUI7SUFOcEM7UUFTYSxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUMvQyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBa0M1RCxDQUFDO0lBL0JHLFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLGFBQWEsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM1RTtJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBbUU7UUFDdEUsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUF5QixDQUFDO1FBQ2xELE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDakMsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztTQUN4RTtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2hCLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNyQixRQUFRLEVBQUUsV0FBVztZQUNyQixLQUFLLEVBQUUsS0FBSyxDQUFDLFlBQVk7U0FDNUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFxQjtRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsUUFBUSxDQUFDLEVBQVU7UUFDZixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTyxVQUFVLENBQXNCLElBQXFCO1FBQ3pELE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7OztZQTVDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0Isa1BBQTZDO2dCQUU3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDbEQ7OzswQkFFSSxLQUFLO2lDQUNMLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxNQUFNOytCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtEcmFnRHJvcCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uIH0gZnJvbSAnQHZlbmR1cmUvYWRtaW4tdWkvY29yZSc7XG5cbmltcG9ydCB7IGFycmF5VG9UcmVlLCBIYXNQYXJlbnQsIFJvb3ROb2RlIH0gZnJvbSAnLi9hcnJheS10by10cmVlJztcblxuZXhwb3J0IHR5cGUgUmVhcnJhbmdlRXZlbnQgPSB7IGNvbGxlY3Rpb25JZDogc3RyaW5nOyBwYXJlbnRJZDogc3RyaW5nOyBpbmRleDogbnVtYmVyIH07XG5leHBvcnQgdHlwZSBDb2xsZWN0aW9uUGFydGlhbCA9IFBpY2s8Q29sbGVjdGlvbi5GcmFnbWVudCwgJ2lkJyB8ICdwYXJlbnQnIHwgJ25hbWUnPjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItY29sbGVjdGlvbi10cmVlJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2NvbGxlY3Rpb24tdHJlZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29sbGVjdGlvbi10cmVlLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25UcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBjb2xsZWN0aW9uczogQ29sbGVjdGlvblBhcnRpYWxbXTtcbiAgICBASW5wdXQoKSBhY3RpdmVDb2xsZWN0aW9uSWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBleHBhbmRBbGwgPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgcmVhcnJhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxSZWFycmFuZ2VFdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgZGVsZXRlQ29sbGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAgIGNvbGxlY3Rpb25UcmVlOiBSb290Tm9kZTxDb2xsZWN0aW9uUGFydGlhbD47XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICgnY29sbGVjdGlvbnMnIGluIGNoYW5nZXMgJiYgdGhpcy5jb2xsZWN0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uVHJlZSA9IGFycmF5VG9UcmVlKHRoaXMuY29sbGVjdGlvbnMsIHRoaXMuY29sbGVjdGlvblRyZWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ecm9wKGV2ZW50OiBDZGtEcmFnRHJvcDxDb2xsZWN0aW9uUGFydGlhbCB8IFJvb3ROb2RlPENvbGxlY3Rpb25QYXJ0aWFsPj4pIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGV2ZW50Lml0ZW0uZGF0YSBhcyBDb2xsZWN0aW9uUGFydGlhbDtcbiAgICAgICAgY29uc3QgbmV3UGFyZW50ID0gZXZlbnQuY29udGFpbmVyLmRhdGE7XG4gICAgICAgIGNvbnN0IG5ld1BhcmVudElkID0gbmV3UGFyZW50LmlkO1xuICAgICAgICBpZiAobmV3UGFyZW50SWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZGV0ZXJtaW5lIHRoZSBJRCBvZiB0aGUgcm9vdCBDb2xsZWN0aW9uYCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWFycmFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBjb2xsZWN0aW9uSWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgICBwYXJlbnRJZDogbmV3UGFyZW50SWQsXG4gICAgICAgICAgICBpbmRleDogZXZlbnQuY3VycmVudEluZGV4LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbk1vdmUoZXZlbnQ6IFJlYXJyYW5nZUV2ZW50KSB7XG4gICAgICAgIHRoaXMucmVhcnJhbmdlLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uRGVsZXRlKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kZWxldGVDb2xsZWN0aW9uLmVtaXQoaWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNSb290Tm9kZTxUIGV4dGVuZHMgSGFzUGFyZW50Pihub2RlOiBUIHwgUm9vdE5vZGU8VD4pOiBub2RlIGlzIFJvb3ROb2RlPFQ+IHtcbiAgICAgICAgcmV0dXJuICFub2RlLmhhc093blByb3BlcnR5KCdwYXJlbnQnKTtcbiAgICB9XG59XG4iXX0=