import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ExtensionHostService } from './extension-host.service';
/**
 * This component uses an iframe to embed an external url into the Admin UI, and uses the PostMessage
 * protocol to allow cross-frame communication between the two frames.
 */
export class ExtensionHostComponent {
    constructor(route, sanitizer, extensionHostService) {
        this.route = route;
        this.sanitizer = sanitizer;
        this.extensionHostService = extensionHostService;
        this.openInIframe = true;
        this.extensionWindowIsOpen = false;
    }
    ngOnInit() {
        const { data } = this.route.snapshot;
        if (!this.isExtensionHostConfig(data.extensionHostConfig)) {
            throw new Error(`Expected an ExtensionHostConfig object, got ${JSON.stringify(data.extensionHostConfig)}`);
        }
        this.config = data.extensionHostConfig;
        this.openInIframe = !this.config.openInNewTab;
        this.extensionUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.config.extensionUrl || 'about:blank');
    }
    ngAfterViewInit() {
        if (this.openInIframe) {
            const extensionWindow = this.extensionFrame.nativeElement.contentWindow;
            if (extensionWindow) {
                this.extensionHostService.init(extensionWindow);
            }
        }
    }
    ngOnDestroy() {
        if (this.extensionWindow) {
            this.extensionWindow.close();
        }
    }
    launchExtensionWindow() {
        const extensionWindow = window.open(this.config.extensionUrl);
        if (!extensionWindow) {
            return;
        }
        this.extensionHostService.init(extensionWindow);
        this.extensionWindowIsOpen = true;
        this.extensionWindow = extensionWindow;
        let timer;
        function pollWindowState(extwindow, onClosed) {
            if (extwindow.closed) {
                window.clearTimeout(timer);
                onClosed();
            }
            else {
                timer = window.setTimeout(() => pollWindowState(extwindow, onClosed), 250);
            }
        }
        pollWindowState(extensionWindow, () => {
            this.extensionWindowIsOpen = false;
            this.extensionHostService.destroy();
        });
    }
    isExtensionHostConfig(input) {
        return input.hasOwnProperty('extensionUrl');
    }
}
ExtensionHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-extension-host',
                template: "<ng-template [ngIf]=\"openInIframe\" [ngIfElse]=\"launchExtension\">\n    <iframe [src]=\"extensionUrl\" #extensionFrame></iframe>\n</ng-template>\n<ng-template #launchExtension>\n    <div class=\"launch-button\" [class.launched]=\"extensionWindowIsOpen\">\n        <div>\n            <button\n                class=\"btn btn-lg btn-primary\"\n                [disabled]=\"extensionWindowIsOpen\"\n                (click)=\"launchExtensionWindow()\"\n            >\n                <clr-icon shape=\"pop-out\"></clr-icon>\n                {{ 'common.launch-extension' | translate }}\n            </button>\n            <h3 class=\"window-hint\" [class.visible]=\"extensionWindowIsOpen\">\n                {{ 'common.extension-running-in-separate-window' | translate }}\n            </h3>\n        </div>\n    </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.Default,
                providers: [ExtensionHostService],
                styles: [".launch-button,iframe{position:absolute;left:0;top:0;bottom:0;right:0;width:100%;height:100%;border:none}.launch-button{padding:24px;display:flex;align-items:center;justify-content:center;transition:background-color .3s;text-align:center}.launch-button.launched{background-color:var(--color-component-bg-300)}.window-hint{visibility:hidden;opacity:0;transition:visibility .3s 0,opacity .3s}.window-hint.visible{visibility:visible;opacity:1;transition:visibility 0,opacity .3s}"]
            },] }
];
ExtensionHostComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: DomSanitizer },
    { type: ExtensionHostService }
];
ExtensionHostComponent.propDecorators = {
    extensionFrame: [{ type: ViewChild, args: ['extensionFrame',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLWhvc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9leHRlbnNpb24taG9zdC9leHRlbnNpb24taG9zdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUdWLFNBQVMsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUdqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRTs7O0dBR0c7QUFRSCxNQUFNLE9BQU8sc0JBQXNCO0lBUS9CLFlBQ1ksS0FBcUIsRUFDckIsU0FBdUIsRUFDdkIsb0JBQTBDO1FBRjFDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQVR0RCxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQiwwQkFBcUIsR0FBRyxLQUFLLENBQUM7SUFTM0IsQ0FBQztJQUVKLFFBQVE7UUFDSixNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUN2RCxNQUFNLElBQUksS0FBSyxDQUNYLCtDQUErQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQzVGLENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQzdELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFJLGFBQWEsQ0FDNUMsQ0FBQztJQUNOLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztZQUN4RSxJQUFJLGVBQWUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNuRDtTQUNKO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFRCxxQkFBcUI7UUFDakIsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDbEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBRXZDLElBQUksS0FBYSxDQUFDO1FBQ2xCLFNBQVMsZUFBZSxDQUFDLFNBQWlCLEVBQUUsUUFBb0I7WUFDNUQsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO2dCQUNsQixNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixRQUFRLEVBQUUsQ0FBQzthQUNkO2lCQUFNO2dCQUNILEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDOUU7UUFDTCxDQUFDO1FBRUQsZUFBZSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7WUFDbEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztZQUNuQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8scUJBQXFCLENBQUMsS0FBVTtRQUNwQyxPQUFPLEtBQUssQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7O1lBN0VKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5Qiw2MEJBQThDO2dCQUU5QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztnQkFDaEQsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUM7O2FBQ3BDOzs7WUFmUSxjQUFjO1lBRGQsWUFBWTtZQUlaLG9CQUFvQjs7OzZCQW1CeEIsU0FBUyxTQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBFeHRlbnNpb25Ib3N0Q29uZmlnIH0gZnJvbSAnLi9leHRlbnNpb24taG9zdC1jb25maWcnO1xuaW1wb3J0IHsgRXh0ZW5zaW9uSG9zdFNlcnZpY2UgfSBmcm9tICcuL2V4dGVuc2lvbi1ob3N0LnNlcnZpY2UnO1xuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IHVzZXMgYW4gaWZyYW1lIHRvIGVtYmVkIGFuIGV4dGVybmFsIHVybCBpbnRvIHRoZSBBZG1pbiBVSSwgYW5kIHVzZXMgdGhlIFBvc3RNZXNzYWdlXG4gKiBwcm90b2NvbCB0byBhbGxvdyBjcm9zcy1mcmFtZSBjb21tdW5pY2F0aW9uIGJldHdlZW4gdGhlIHR3byBmcmFtZXMuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWV4dGVuc2lvbi1ob3N0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZXh0ZW5zaW9uLWhvc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2V4dGVuc2lvbi1ob3N0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICAgIHByb3ZpZGVyczogW0V4dGVuc2lvbkhvc3RTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgRXh0ZW5zaW9uSG9zdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBleHRlbnNpb25Vcmw6IFNhZmVSZXNvdXJjZVVybDtcbiAgICBvcGVuSW5JZnJhbWUgPSB0cnVlO1xuICAgIGV4dGVuc2lvbldpbmRvd0lzT3BlbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgY29uZmlnOiBFeHRlbnNpb25Ib3N0Q29uZmlnO1xuICAgIHByaXZhdGUgZXh0ZW5zaW9uV2luZG93PzogV2luZG93O1xuICAgIEBWaWV3Q2hpbGQoJ2V4dGVuc2lvbkZyYW1lJykgcHJpdmF0ZSBleHRlbnNpb25GcmFtZTogRWxlbWVudFJlZjxIVE1MSUZyYW1lRWxlbWVudD47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgICAgIHByaXZhdGUgZXh0ZW5zaW9uSG9zdFNlcnZpY2U6IEV4dGVuc2lvbkhvc3RTZXJ2aWNlLFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXMucm91dGUuc25hcHNob3Q7XG4gICAgICAgIGlmICghdGhpcy5pc0V4dGVuc2lvbkhvc3RDb25maWcoZGF0YS5leHRlbnNpb25Ib3N0Q29uZmlnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBFeHBlY3RlZCBhbiBFeHRlbnNpb25Ib3N0Q29uZmlnIG9iamVjdCwgZ290ICR7SlNPTi5zdHJpbmdpZnkoZGF0YS5leHRlbnNpb25Ib3N0Q29uZmlnKX1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpZyA9IGRhdGEuZXh0ZW5zaW9uSG9zdENvbmZpZztcbiAgICAgICAgdGhpcy5vcGVuSW5JZnJhbWUgPSAhdGhpcy5jb25maWcub3BlbkluTmV3VGFiO1xuICAgICAgICB0aGlzLmV4dGVuc2lvblVybCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLmV4dGVuc2lvblVybCB8fCAnYWJvdXQ6YmxhbmsnLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3BlbkluSWZyYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBleHRlbnNpb25XaW5kb3cgPSB0aGlzLmV4dGVuc2lvbkZyYW1lLm5hdGl2ZUVsZW1lbnQuY29udGVudFdpbmRvdztcbiAgICAgICAgICAgIGlmIChleHRlbnNpb25XaW5kb3cpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4dGVuc2lvbkhvc3RTZXJ2aWNlLmluaXQoZXh0ZW5zaW9uV2luZG93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5leHRlbnNpb25XaW5kb3cpIHtcbiAgICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uV2luZG93LmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsYXVuY2hFeHRlbnNpb25XaW5kb3coKSB7XG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbldpbmRvdyA9IHdpbmRvdy5vcGVuKHRoaXMuY29uZmlnLmV4dGVuc2lvblVybCk7XG4gICAgICAgIGlmICghZXh0ZW5zaW9uV2luZG93KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5leHRlbnNpb25Ib3N0U2VydmljZS5pbml0KGV4dGVuc2lvbldpbmRvdyk7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uV2luZG93SXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5leHRlbnNpb25XaW5kb3cgPSBleHRlbnNpb25XaW5kb3c7XG5cbiAgICAgICAgbGV0IHRpbWVyOiBudW1iZXI7XG4gICAgICAgIGZ1bmN0aW9uIHBvbGxXaW5kb3dTdGF0ZShleHR3aW5kb3c6IFdpbmRvdywgb25DbG9zZWQ6ICgpID0+IHZvaWQpIHtcbiAgICAgICAgICAgIGlmIChleHR3aW5kb3cuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgICAgICAgb25DbG9zZWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBwb2xsV2luZG93U3RhdGUoZXh0d2luZG93LCBvbkNsb3NlZCksIDI1MCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwb2xsV2luZG93U3RhdGUoZXh0ZW5zaW9uV2luZG93LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4dGVuc2lvbldpbmRvd0lzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5leHRlbnNpb25Ib3N0U2VydmljZS5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNFeHRlbnNpb25Ib3N0Q29uZmlnKGlucHV0OiBhbnkpOiBpbnB1dCBpcyBFeHRlbnNpb25Ib3N0Q29uZmlnIHtcbiAgICAgICAgcmV0dXJuIGlucHV0Lmhhc093blByb3BlcnR5KCdleHRlbnNpb25VcmwnKTtcbiAgICB9XG59XG4iXX0=