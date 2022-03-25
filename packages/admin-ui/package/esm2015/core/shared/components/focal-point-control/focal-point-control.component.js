import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild, } from '@angular/core';
export class FocalPointControlComponent {
    constructor() {
        this.visible = false;
        this.editable = false;
        this.fpx = 0.5;
        this.fpy = 0.5;
        this.focalPointChange = new EventEmitter();
    }
    get initialPosition() {
        return this.focalPointToOffset(this.fpx == null ? 0.5 : this.fpx, this.fpy == null ? 0.5 : this.fpy);
    }
    onDragEnded(event) {
        const { x, y } = this.getCurrentFocalPoint();
        this.fpx = x;
        this.fpy = y;
        this.focalPointChange.emit({ x, y });
    }
    getCurrentFocalPoint() {
        const { left: dotLeft, top: dotTop, width, height } = this.dot.nativeElement.getBoundingClientRect();
        const { left: frameLeft, top: frameTop } = this.frame.nativeElement.getBoundingClientRect();
        const xInPx = dotLeft - frameLeft + width / 2;
        const yInPx = dotTop - frameTop + height / 2;
        return {
            x: xInPx / this.width,
            y: yInPx / this.height,
        };
    }
    focalPointToOffset(x, y) {
        const { width, height } = this.dot.nativeElement.getBoundingClientRect();
        return {
            x: x * this.width - width / 2,
            y: y * this.height - height / 2,
        };
    }
}
FocalPointControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-focal-point-control',
                template: "<ng-content></ng-content>\n<div class=\"frame\" #frame [style.width.px]=\"width\" [style.height.px]=\"height\">\n    <div\n        #dot\n        class=\"dot\"\n        [class.visible]=\"visible\"\n        [class.editable]=\"editable\"\n        cdkDrag\n        [cdkDragDisabled]=\"!editable\"\n        cdkDragBoundary=\".frame\"\n        (cdkDragEnded)=\"onDragEnded($event)\"\n        [cdkDragFreeDragPosition]=\"initialPosition\"\n    ></div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{position:relative;display:block}.frame{top:0}.dot,.frame{position:absolute}.dot{width:20px;height:20px;border-radius:50%;border:2px solid #fff;visibility:hidden;transition:opacity .3s;box-shadow:0 0 4px 4px rgba(0,0,0,.42)}.dot.visible{visibility:visible;opacity:.7}.dot.editable{cursor:move;visibility:visible;opacity:1;-webkit-animation:pulse;animation:pulse;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-iteration-count:4;animation-iteration-count:4}@-webkit-keyframes pulse{0%{border-color:#fff}50%{border-color:var(--color-warning-500)}to{border-color:#fff}}@keyframes pulse{0%{border-color:#fff}50%{border-color:var(--color-warning-500)}to{border-color:#fff}}"]
            },] }
];
FocalPointControlComponent.propDecorators = {
    visible: [{ type: Input }],
    editable: [{ type: Input }],
    width: [{ type: HostBinding, args: ['style.width.px',] }, { type: Input }],
    height: [{ type: HostBinding, args: ['style.height.px',] }, { type: Input }],
    fpx: [{ type: Input }],
    fpy: [{ type: Input }],
    focalPointChange: [{ type: Output }],
    frame: [{ type: ViewChild, args: ['frame', { static: true },] }],
    dot: [{ type: ViewChild, args: ['dot', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jYWwtcG9pbnQtY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2ZvY2FsLXBvaW50LWNvbnRyb2wvZm9jYWwtcG9pbnQtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFVdkIsTUFBTSxPQUFPLDBCQUEwQjtJQU52QztRQU9hLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQU9qQixRQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ1YsUUFBRyxHQUFHLEdBQUcsQ0FBQztRQUNULHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7SUFrQzNELENBQUM7SUE3QkcsSUFBSSxlQUFlO1FBQ2YsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFpQjtRQUN6QixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVPLG9CQUFvQjtRQUN4QixNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3JHLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzVGLE1BQU0sS0FBSyxHQUFHLE9BQU8sR0FBRyxTQUFTLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUM5QyxNQUFNLEtBQUssR0FBRyxNQUFNLEdBQUcsUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDN0MsT0FBTztZQUNILENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUs7WUFDckIsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTTtTQUN6QixDQUFDO0lBQ04sQ0FBQztJQUVPLGtCQUFrQixDQUFDLENBQVMsRUFBRSxDQUFTO1FBQzNDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUN6RSxPQUFPO1lBQ0gsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDO1lBQzdCLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQztTQUNsQyxDQUFDO0lBQ04sQ0FBQzs7O1lBbERKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxrZEFBbUQ7Z0JBRW5ELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7O3NCQUVJLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxXQUFXLFNBQUMsZ0JBQWdCLGNBQzVCLEtBQUs7cUJBRUwsV0FBVyxTQUFDLGlCQUFpQixjQUM3QixLQUFLO2tCQUVMLEtBQUs7a0JBQ0wsS0FBSzsrQkFDTCxNQUFNO29CQUVOLFNBQVMsU0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2tCQUNuQyxTQUFTLFNBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0RyYWdFbmQgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgdHlwZSBQb2ludCA9IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2ZHItZm9jYWwtcG9pbnQtY29udHJvbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ZvY2FsLXBvaW50LWNvbnRyb2wuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2ZvY2FsLXBvaW50LWNvbnRyb2wuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRm9jYWxQb2ludENvbnRyb2xDb21wb25lbnQge1xuICAgIEBJbnB1dCgpIHZpc2libGUgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBlZGl0YWJsZSA9IGZhbHNlO1xuICAgIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgucHgnKVxuICAgIEBJbnB1dCgpXG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodC5weCcpXG4gICAgQElucHV0KClcbiAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICBASW5wdXQoKSBmcHggPSAwLjU7XG4gICAgQElucHV0KCkgZnB5ID0gMC41O1xuICAgIEBPdXRwdXQoKSBmb2NhbFBvaW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQb2ludD4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2ZyYW1lJywgeyBzdGF0aWM6IHRydWUgfSkgZnJhbWU6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuICAgIEBWaWV3Q2hpbGQoJ2RvdCcsIHsgc3RhdGljOiB0cnVlIH0pIGRvdDogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG5cbiAgICBnZXQgaW5pdGlhbFBvc2l0aW9uKCk6IFBvaW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9jYWxQb2ludFRvT2Zmc2V0KHRoaXMuZnB4ID09IG51bGwgPyAwLjUgOiB0aGlzLmZweCwgdGhpcy5mcHkgPT0gbnVsbCA/IDAuNSA6IHRoaXMuZnB5KTtcbiAgICB9XG5cbiAgICBvbkRyYWdFbmRlZChldmVudDogQ2RrRHJhZ0VuZCkge1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMuZ2V0Q3VycmVudEZvY2FsUG9pbnQoKTtcbiAgICAgICAgdGhpcy5mcHggPSB4O1xuICAgICAgICB0aGlzLmZweSA9IHk7XG4gICAgICAgIHRoaXMuZm9jYWxQb2ludENoYW5nZS5lbWl0KHsgeCwgeSB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEN1cnJlbnRGb2NhbFBvaW50KCk6IFBvaW50IHtcbiAgICAgICAgY29uc3QgeyBsZWZ0OiBkb3RMZWZ0LCB0b3A6IGRvdFRvcCwgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5kb3QubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgeyBsZWZ0OiBmcmFtZUxlZnQsIHRvcDogZnJhbWVUb3AgfSA9IHRoaXMuZnJhbWUubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgeEluUHggPSBkb3RMZWZ0IC0gZnJhbWVMZWZ0ICsgd2lkdGggLyAyO1xuICAgICAgICBjb25zdCB5SW5QeCA9IGRvdFRvcCAtIGZyYW1lVG9wICsgaGVpZ2h0IC8gMjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHhJblB4IC8gdGhpcy53aWR0aCxcbiAgICAgICAgICAgIHk6IHlJblB4IC8gdGhpcy5oZWlnaHQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb2NhbFBvaW50VG9PZmZzZXQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBQb2ludCB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5kb3QubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHggKiB0aGlzLndpZHRoIC0gd2lkdGggLyAyLFxuICAgICAgICAgICAgeTogeSAqIHRoaXMuaGVpZ2h0IC0gaGVpZ2h0IC8gMixcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=