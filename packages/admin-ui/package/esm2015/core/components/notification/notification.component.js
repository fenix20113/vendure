import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
export class NotificationComponent {
    constructor() {
        this.offsetTop = 0;
        this.message = '';
        this.translationVars = {};
        this.type = 'info';
        this.isVisible = true;
        this.onClickFn = () => {
            /* */
        };
    }
    registerOnClickFn(fn) {
        this.onClickFn = fn;
    }
    onClick() {
        if (this.isVisible) {
            this.onClickFn();
        }
    }
    /**
     * Fade out the toast. When promise resolves, toast is invisible and
     * can be removed.
     */
    fadeOut() {
        this.isVisible = false;
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
    /**
     * Returns the height of the toast element in px.
     */
    getHeight() {
        if (!this.wrapper) {
            return 0;
        }
        const el = this.wrapper.nativeElement;
        return el.getBoundingClientRect().height;
    }
    getIcon() {
        switch (this.type) {
            case 'info':
                return 'info-circle';
            case 'success':
                return 'check-circle';
            case 'error':
                return 'exclamation-circle';
            case 'warning':
                return 'exclamation-triangle';
        }
    }
    stringifyMessage(message) {
        if (typeof message === 'string') {
            return message;
        }
        else {
            return JSON.stringify(message, null, 2);
        }
    }
}
NotificationComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-notification',
                template: "<div\n    class=\"notification-wrapper\"\n    #wrapper\n    [style.top.px]=\"offsetTop\"\n    [ngClass]=\"{\n        visible: isVisible,\n        info: type === 'info',\n        success: type === 'success',\n        error: type === 'error',\n        warning: type === 'warning'\n    }\"\n>\n    <clr-icon [attr.shape]=\"getIcon()\" size=\"24\"></clr-icon>\n    {{ stringifyMessage(message) | translate: translationVars }}\n</div>\n",
                styles: ["@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:.95}}@keyframes fadeIn{0%{opacity:0}to{opacity:.95}}:host{position:relative;z-index:1050}:host>.notification-wrapper{display:block;position:fixed;z-index:1001;top:0;right:10px;border-radius:3px;max-width:98vw;word-wrap:break-word;padding:10px;background-color:var(--color-grey-500);color:#fff;transition:opacity 1s,top .3s;opacity:0;white-space:pre-line}:host>.notification-wrapper.success{background-color:var(--color-success-500)}:host>.notification-wrapper.error{background-color:var(--color-error-500)}:host>.notification-wrapper.warning{background-color:var(--color-warning-500)}:host>.notification-wrapper.info{background-color:var(--color-secondary-500)}:host>.notification-wrapper.visible{opacity:.95;-webkit-animation:fadeIn .3s .3s backwards;animation:fadeIn .3s .3s backwards}"]
            },] }
];
NotificationComponent.propDecorators = {
    wrapper: [{ type: ViewChild, args: ['wrapper', { static: true },] }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvY29tcG9uZW50cy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUy9FLE1BQU0sT0FBTyxxQkFBcUI7SUFMbEM7UUFPSSxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLG9CQUFlLEdBQXVDLEVBQUUsQ0FBQztRQUN6RCxTQUFJLEdBQXFCLE1BQU0sQ0FBQztRQUNoQyxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ1QsY0FBUyxHQUFlLEdBQUcsRUFBRTtZQUNqQyxLQUFLO1FBQ1QsQ0FBQyxDQUFBO0lBcURMLENBQUM7SUFuREcsaUJBQWlCLENBQUMsRUFBYztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBR0QsT0FBTztRQUNILElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsT0FBTztRQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUztRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsT0FBTyxDQUFDLENBQUM7U0FDWjtRQUNELE1BQU0sRUFBRSxHQUFnQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUNuRCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUM3QyxDQUFDO0lBRUQsT0FBTztRQUNILFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNmLEtBQUssTUFBTTtnQkFDUCxPQUFPLGFBQWEsQ0FBQztZQUN6QixLQUFLLFNBQVM7Z0JBQ1YsT0FBTyxjQUFjLENBQUM7WUFDMUIsS0FBSyxPQUFPO2dCQUNSLE9BQU8sb0JBQW9CLENBQUM7WUFDaEMsS0FBSyxTQUFTO2dCQUNWLE9BQU8sc0JBQXNCLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsT0FBZ0I7UUFDN0IsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxPQUFPLENBQUM7U0FDbEI7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQzs7O1lBbEVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QiwyYkFBNEM7O2FBRS9DOzs7c0JBRUksU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7c0JBY3JDLFlBQVksU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOb3RpZmljYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLW5vdGlmaWNhdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25vdGlmaWNhdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbm90aWZpY2F0aW9uLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkNvbXBvbmVudCB7XG4gICAgQFZpZXdDaGlsZCgnd3JhcHBlcicsIHsgc3RhdGljOiB0cnVlIH0pIHdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gICAgb2Zmc2V0VG9wID0gMDtcbiAgICBtZXNzYWdlID0gJyc7XG4gICAgdHJhbnNsYXRpb25WYXJzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB9ID0ge307XG4gICAgdHlwZTogTm90aWZpY2F0aW9uVHlwZSA9ICdpbmZvJztcbiAgICBpc1Zpc2libGUgPSB0cnVlO1xuICAgIHByaXZhdGUgb25DbGlja0ZuOiAoKSA9PiB2b2lkID0gKCkgPT4ge1xuICAgICAgICAvKiAqL1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DbGlja0ZuKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DbGlja0ZuID0gZm47XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICAgIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrRm4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZhZGUgb3V0IHRoZSB0b2FzdC4gV2hlbiBwcm9taXNlIHJlc29sdmVzLCB0b2FzdCBpcyBpbnZpc2libGUgYW5kXG4gICAgICogY2FuIGJlIHJlbW92ZWQuXG4gICAgICovXG4gICAgZmFkZU91dCgpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBoZWlnaHQgb2YgdGhlIHRvYXN0IGVsZW1lbnQgaW4gcHguXG4gICAgICovXG4gICAgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIGlmICghdGhpcy53cmFwcGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbDogSFRNTEVsZW1lbnQgPSB0aGlzLndyYXBwZXIubmF0aXZlRWxlbWVudDtcbiAgICAgICAgcmV0dXJuIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICB9XG5cbiAgICBnZXRJY29uKCk6IHN0cmluZyB7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbmZvJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2luZm8tY2lyY2xlJztcbiAgICAgICAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnY2hlY2stY2lyY2xlJztcbiAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2V4Y2xhbWF0aW9uLWNpcmNsZSc7XG4gICAgICAgICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2V4Y2xhbWF0aW9uLXRyaWFuZ2xlJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0cmluZ2lmeU1lc3NhZ2UobWVzc2FnZTogdW5rbm93bikge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShtZXNzYWdlLCBudWxsLCAyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==