import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { IfDirectiveBase } from './if-directive-base';
export class IfMultichannelDirective extends IfDirectiveBase {
    constructor(_viewContainer, templateRef, dataService) {
        super(_viewContainer, templateRef, () => {
            return this.dataService.client
                .userStatus()
                .mapStream(({ userStatus }) => 1 < userStatus.channels.length);
        });
        this.dataService = dataService;
    }
    /**
     * A template to show if the current user does not have the speicified permission.
     */
    set vdrIfMultichannelElse(templateRef) {
        this.setElseTemplate(templateRef);
    }
}
IfMultichannelDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrIfMultichannel]',
            },] }
];
IfMultichannelDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef },
    { type: DataService }
];
IfMultichannelDirective.propDecorators = {
    vdrIfMultichannelElse: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWYtbXVsdGljaGFubmVsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2RpcmVjdGl2ZXMvaWYtbXVsdGljaGFubmVsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRWhFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUt0RCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsZUFBbUI7SUFDNUQsWUFDSSxjQUFnQyxFQUNoQyxXQUE2QixFQUNyQixXQUF3QjtRQUVoQyxLQUFLLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUU7WUFDcEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07aUJBQ3pCLFVBQVUsRUFBRTtpQkFDWixTQUFTLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RSxDQUFDLENBQUMsQ0FBQztRQU5LLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBT3BDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQ0kscUJBQXFCLENBQUMsV0FBb0M7UUFDMUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7WUF0QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7YUFDbEM7OztZQVJ1QyxnQkFBZ0I7WUFBN0IsV0FBVztZQUU3QixXQUFXOzs7b0NBdUJmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4uLy4uL2RhdGEvcHJvdmlkZXJzL2RhdGEuc2VydmljZSc7XG5cbmltcG9ydCB7IElmRGlyZWN0aXZlQmFzZSB9IGZyb20gJy4vaWYtZGlyZWN0aXZlLWJhc2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t2ZHJJZk11bHRpY2hhbm5lbF0nLFxufSlcbmV4cG9ydCBjbGFzcyBJZk11bHRpY2hhbm5lbERpcmVjdGl2ZSBleHRlbmRzIElmRGlyZWN0aXZlQmFzZTxbXT4ge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBfdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICBzdXBlcihfdmlld0NvbnRhaW5lciwgdGVtcGxhdGVSZWYsICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFTZXJ2aWNlLmNsaWVudFxuICAgICAgICAgICAgICAgIC51c2VyU3RhdHVzKClcbiAgICAgICAgICAgICAgICAubWFwU3RyZWFtKCh7IHVzZXJTdGF0dXMgfSkgPT4gMSA8IHVzZXJTdGF0dXMuY2hhbm5lbHMubGVuZ3RoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSB0ZW1wbGF0ZSB0byBzaG93IGlmIHRoZSBjdXJyZW50IHVzZXIgZG9lcyBub3QgaGF2ZSB0aGUgc3BlaWNpZmllZCBwZXJtaXNzaW9uLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZkcklmTXVsdGljaGFubmVsRWxzZSh0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PiB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5zZXRFbHNlVGVtcGxhdGUodGVtcGxhdGVSZWYpO1xuICAgIH1cbn1cbiJdfQ==