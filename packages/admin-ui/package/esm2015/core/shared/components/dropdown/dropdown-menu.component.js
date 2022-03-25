import { Overlay, } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild, ViewContainerRef, } from '@angular/core';
import { DropdownComponent } from './dropdown.component';
/**
 * A dropdown menu modelled on the Clarity Dropdown component (https://v1.clarity.design/dropdowns).
 *
 * This was created because the Clarity implementation (at this time) does not handle edge detection. Instead
 * we make use of the Angular CDK's Overlay module to manage the positioning.
 *
 * The API of this component (and its related Components & Directives) are based on the Clarity version,
 * albeit only a subset which is currently used in this application.
 */
export class DropdownMenuComponent {
    constructor(overlay, viewContainerRef, dropdown) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.dropdown = dropdown;
        this.position = 'bottom-left';
    }
    ngOnInit() {
        this.dropdown.onOpenChange(isOpen => {
            if (isOpen) {
                this.overlayRef.attach(this.menuPortal);
            }
            else {
                this.overlayRef.detach();
            }
        });
    }
    ngAfterViewInit() {
        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            backdropClass: 'clear-backdrop',
            positionStrategy: this.getPositionStrategy(),
            maxHeight: '70vh',
        });
        this.menuPortal = new TemplatePortal(this.menuTemplate, this.viewContainerRef);
        this.backdropClickSub = this.overlayRef.backdropClick().subscribe(() => {
            this.dropdown.toggleOpen();
        });
    }
    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        if (this.backdropClickSub) {
            this.backdropClickSub.unsubscribe();
        }
    }
    getPositionStrategy() {
        const position = {
            ['top-left']: {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
            },
            ['top-right']: {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom',
            },
            ['bottom-left']: {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            },
            ['bottom-right']: {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top',
            },
        };
        const pos = position[this.position];
        return this.overlay
            .position()
            .flexibleConnectedTo(this.dropdown.trigger)
            .withPositions([pos, this.invertPosition(pos)])
            .withViewportMargin(12)
            .withPush(true);
    }
    /** Inverts an overlay position. */
    invertPosition(pos) {
        const inverted = Object.assign({}, pos);
        inverted.originY = pos.originY === 'top' ? 'bottom' : 'top';
        inverted.overlayY = pos.overlayY === 'top' ? 'bottom' : 'top';
        return inverted;
    }
}
DropdownMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dropdown-menu',
                template: `
        <ng-template #menu>
            <div class="dropdown open">
                <div class="dropdown-menu">
                    <div class="dropdown-content-wrapper">
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </ng-template>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".clear-backdrop{background-color:#ff69b4}.dropdown.open>.dropdown-menu{position:relative;top:0;height:100%;overflow-y:auto}:host{opacity:1;transition:opacity .3s}"]
            },] }
];
DropdownMenuComponent.ctorParameters = () => [
    { type: Overlay },
    { type: ViewContainerRef },
    { type: DropdownComponent }
];
DropdownMenuComponent.propDecorators = {
    position: [{ type: Input, args: ['vdrPosition',] }],
    menuTemplate: [{ type: ViewChild, args: ['menu', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3NoYXJlZC9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHSCxPQUFPLEdBSVYsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBR1QsS0FBSyxFQUdMLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEdBQ25CLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBSXpEOzs7Ozs7OztHQVFHO0FBaUJILE1BQU0sT0FBTyxxQkFBcUI7SUFPOUIsWUFDWSxPQUFnQixFQUNoQixnQkFBa0MsRUFDbEMsUUFBMkI7UUFGM0IsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQW1CO1FBVFQsYUFBUSxHQUFxQixhQUFhLENBQUM7SUFVdEUsQ0FBQztJQUVKLFFBQVE7UUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoQyxJQUFJLE1BQU0sRUFBRTtnQkFDUixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDM0M7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUM1QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxP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Ozt1QkE4QnJCLEtBQUssU0FBQyxhQUFhOzJCQUNuQixTQUFTLFNBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29ubmVjdGVkUG9zaXRpb24sXG4gICAgSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3MsXG4gICAgT3ZlcmxheSxcbiAgICBPdmVybGF5UmVmLFxuICAgIFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgVmVydGljYWxDb25uZWN0aW9uUG9zLFxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEcm9wZG93blRyaWdnZXJEaXJlY3RpdmUgfSBmcm9tICcuL2Ryb3Bkb3duLXRyaWdnZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyb3Bkb3duQ29tcG9uZW50IH0gZnJvbSAnLi9kcm9wZG93bi5jb21wb25lbnQnO1xuXG5leHBvcnQgdHlwZSBEcm9wZG93blBvc2l0aW9uID0gJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JyB8ICdib3R0b20tcmlnaHQnO1xuXG4vKipcbiAqIEEgZHJvcGRvd24gbWVudSBtb2RlbGxlZCBvbiB0aGUgQ2xhcml0eSBEcm9wZG93biBjb21wb25lbnQgKGh0dHBzOi8vdjEuY2xhcml0eS5kZXNpZ24vZHJvcGRvd25zKS5cbiAqXG4gKiBUaGlzIHdhcyBjcmVhdGVkIGJlY2F1c2UgdGhlIENsYXJpdHkgaW1wbGVtZW50YXRpb24gKGF0IHRoaXMgdGltZSkgZG9lcyBub3QgaGFuZGxlIGVkZ2UgZGV0ZWN0aW9uLiBJbnN0ZWFkXG4gKiB3ZSBtYWtlIHVzZSBvZiB0aGUgQW5ndWxhciBDREsncyBPdmVybGF5IG1vZHVsZSB0byBtYW5hZ2UgdGhlIHBvc2l0aW9uaW5nLlxuICpcbiAqIFRoZSBBUEkgb2YgdGhpcyBjb21wb25lbnQgKGFuZCBpdHMgcmVsYXRlZCBDb21wb25lbnRzICYgRGlyZWN0aXZlcykgYXJlIGJhc2VkIG9uIHRoZSBDbGFyaXR5IHZlcnNpb24sXG4gKiBhbGJlaXQgb25seSBhIHN1YnNldCB3aGljaCBpcyBjdXJyZW50bHkgdXNlZCBpbiB0aGlzIGFwcGxpY2F0aW9uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1kcm9wZG93bi1tZW51JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctdGVtcGxhdGUgI21lbnU+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24gb3BlblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1jb250ZW50LXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogWycuL2Ryb3Bkb3duLW1lbnUuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRHJvcGRvd25NZW51Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgndmRyUG9zaXRpb24nKSBwcml2YXRlIHBvc2l0aW9uOiBEcm9wZG93blBvc2l0aW9uID0gJ2JvdHRvbS1sZWZ0JztcbiAgICBAVmlld0NoaWxkKCdtZW51JywgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSBtZW51VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgcHJpdmF0ZSBtZW51UG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDxhbnk+O1xuICAgIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcbiAgICBwcml2YXRlIGJhY2tkcm9wQ2xpY2tTdWI6IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBkcm9wZG93bjogRHJvcGRvd25Db21wb25lbnQsXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24ub25PcGVuQ2hhbmdlKGlzT3BlbiA9PiB7XG4gICAgICAgICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaCh0aGlzLm1lbnVQb3J0YWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6ICdjbGVhci1iYWNrZHJvcCcsXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLmdldFBvc2l0aW9uU3RyYXRlZ3koKSxcbiAgICAgICAgICAgIG1heEhlaWdodDogJzcwdmgnLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tZW51UG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMubWVudVRlbXBsYXRlLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmJhY2tkcm9wQ2xpY2tTdWIgPSB0aGlzLm92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duLnRvZ2dsZU9wZW4oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYmFja2Ryb3BDbGlja1N1Yikge1xuICAgICAgICAgICAgdGhpcy5iYWNrZHJvcENsaWNrU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBvc2l0aW9uU3RyYXRlZ3koKTogUG9zaXRpb25TdHJhdGVneSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uOiB7IFtLIGluIERyb3Bkb3duUG9zaXRpb25dOiBDb25uZWN0ZWRQb3NpdGlvbiB9ID0ge1xuICAgICAgICAgICAgWyd0b3AtbGVmdCddOiB7XG4gICAgICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgWyd0b3AtcmlnaHQnXToge1xuICAgICAgICAgICAgICAgIG9yaWdpblg6ICdlbmQnLFxuICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnZW5kJyxcbiAgICAgICAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgWydib3R0b20tbGVmdCddOiB7XG4gICAgICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgWydib3R0b20tcmlnaHQnXToge1xuICAgICAgICAgICAgICAgIG9yaWdpblg6ICdlbmQnLFxuICAgICAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnZW5kJyxcbiAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uW3RoaXMucG9zaXRpb25dO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlcbiAgICAgICAgICAgIC5wb3NpdGlvbigpXG4gICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmRyb3Bkb3duLnRyaWdnZXIpXG4gICAgICAgICAgICAud2l0aFBvc2l0aW9ucyhbcG9zLCB0aGlzLmludmVydFBvc2l0aW9uKHBvcyldKVxuICAgICAgICAgICAgLndpdGhWaWV3cG9ydE1hcmdpbigxMilcbiAgICAgICAgICAgIC53aXRoUHVzaCh0cnVlKTtcbiAgICB9XG5cbiAgICAvKiogSW52ZXJ0cyBhbiBvdmVybGF5IHBvc2l0aW9uLiAqL1xuICAgIHByaXZhdGUgaW52ZXJ0UG9zaXRpb24ocG9zOiBDb25uZWN0ZWRQb3NpdGlvbik6IENvbm5lY3RlZFBvc2l0aW9uIHtcbiAgICAgICAgY29uc3QgaW52ZXJ0ZWQgPSB7IC4uLnBvcyB9O1xuICAgICAgICBpbnZlcnRlZC5vcmlnaW5ZID0gcG9zLm9yaWdpblkgPT09ICd0b3AnID8gJ2JvdHRvbScgOiAndG9wJztcbiAgICAgICAgaW52ZXJ0ZWQub3ZlcmxheVkgPSBwb3Mub3ZlcmxheVkgPT09ICd0b3AnID8gJ2JvdHRvbScgOiAndG9wJztcblxuICAgICAgICByZXR1cm4gaW52ZXJ0ZWQ7XG4gICAgfVxufVxuIl19