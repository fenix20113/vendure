import { __awaiter } from "tslib";
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { NotificationComponent } from '../../components/notification/notification.component';
import { I18nService } from '../i18n/i18n.service';
import { OverlayHostService } from '../overlay-host/overlay-host.service';
import * as i0 from "@angular/core";
import * as i1 from "../i18n/i18n.service";
import * as i2 from "../overlay-host/overlay-host.service";
// How many ms before the toast is dismissed.
const TOAST_DURATION = 3000;
/**
 * Provides toast notification functionality.
 */
export class NotificationService {
    constructor(i18nService, resolver, overlayHostService) {
        this.i18nService = i18nService;
        this.resolver = resolver;
        this.overlayHostService = overlayHostService;
        this.openToastRefs = [];
    }
    get hostView() {
        return this.overlayHostService.getHostView();
    }
    /**
     * Display a success toast notification
     */
    success(message, translationVars) {
        this.notify({
            message,
            translationVars,
            type: 'success',
        });
    }
    /**
     * Display an info toast notification
     */
    info(message, translationVars) {
        this.notify({
            message,
            translationVars,
            type: 'info',
        });
    }
    /**
     * Display a warning toast notification
     */
    warning(message, translationVars) {
        this.notify({
            message,
            translationVars,
            type: 'warning',
        });
    }
    /**
     * Display an error toast notification
     */
    error(message, translationVars) {
        this.notify({
            message,
            translationVars,
            type: 'error',
            duration: 20000,
        });
    }
    /**
     * Display a toast notification.
     */
    notify(config) {
        this.createToast(config);
    }
    /**
     * Load a ToastComponent into the DOM host location.
     */
    createToast(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const toastFactory = this.resolver.resolveComponentFactory(NotificationComponent);
            const hostView = yield this.hostView;
            const ref = hostView.createComponent(toastFactory);
            const toast = ref.instance;
            const dismissFn = this.createDismissFunction(ref);
            toast.type = config.type || 'info';
            toast.message = config.message;
            toast.translationVars = this.translateTranslationVars(config.translationVars || {});
            toast.registerOnClickFn(dismissFn);
            let timerId;
            if (!config.duration || 0 < config.duration) {
                timerId = setTimeout(dismissFn, config.duration || TOAST_DURATION);
            }
            this.openToastRefs.unshift({ ref, timerId });
            setTimeout(() => this.calculatePositions());
        });
    }
    /**
     * Returns a function which will destroy the toast component and
     * remove it from the openToastRefs array.
     */
    createDismissFunction(ref) {
        return () => {
            const toast = ref.instance;
            const index = this.openToastRefs.map(o => o.ref).indexOf(ref);
            if (this.openToastRefs[index]) {
                clearTimeout(this.openToastRefs[index].timerId);
            }
            toast.fadeOut().then(() => {
                ref.destroy();
                this.openToastRefs.splice(index, 1);
                this.calculatePositions();
            });
        };
    }
    /**
     * Calculate and set the top offsets for each of the open toasts.
     */
    calculatePositions() {
        let cumulativeHeight = 10;
        this.openToastRefs.forEach(obj => {
            const toast = obj.ref.instance;
            toast.offsetTop = cumulativeHeight;
            cumulativeHeight += toast.getHeight() + 6;
        });
    }
    translateTranslationVars(translationVars) {
        for (const [key, val] of Object.entries(translationVars)) {
            if (typeof val === 'string') {
                translationVars[key] = this.i18nService.translate(val);
            }
        }
        return translationVars;
    }
}
NotificationService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NotificationService_Factory() { return new NotificationService(i0.ɵɵinject(i1.I18nService), i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i2.OverlayHostService)); }, token: NotificationService, providedIn: "root" });
NotificationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
NotificationService.ctorParameters = () => [
    { type: I18nService },
    { type: ComponentFactoryResolver },
    { type: OverlayHostService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL3Byb3ZpZGVycy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSx3QkFBd0IsRUFBZ0IsVUFBVSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUVyRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUM3RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7QUFVMUUsNkNBQTZDO0FBQzdDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQztBQUU1Qjs7R0FFRztBQUlILE1BQU0sT0FBTyxtQkFBbUI7SUFNNUIsWUFDWSxXQUF3QixFQUN4QixRQUFrQyxFQUNsQyxrQkFBc0M7UUFGdEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUwxQyxrQkFBYSxHQUFzRSxFQUFFLENBQUM7SUFNM0YsQ0FBQztJQVRKLElBQVksUUFBUTtRQUNoQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBU0Q7O09BRUc7SUFDSCxPQUFPLENBQUMsT0FBZSxFQUFFLGVBQW9EO1FBQ3pFLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixPQUFPO1lBQ1AsZUFBZTtZQUNmLElBQUksRUFBRSxTQUFTO1NBQ2xCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksQ0FBQyxPQUFlLEVBQUUsZUFBb0Q7UUFDdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNSLE9BQU87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QUFDLENBQUM7UUFDUCxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSyxrQkFBa0I7UUFDdEIsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFFMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDN0IsTUFBTSxLQUFLLEdBQTBCLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQ3RELEtBQUssQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUM7WUFDbkMsZ0JBQWdCLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyx3QkFBd0IsQ0FBQyxlQUVoQztRQUNHLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ3RELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO2dCQUN6QixlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDMUQ7U0FDSjtRQUNELE9BQU8sZUFBZSxDQUFDO0lBQzNCLENBQUM7Ozs7WUFySUosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7WUFuQlEsV0FBVztZQUhYLHdCQUF3QjtZQUl4QixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgSW5qZWN0YWJsZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOb3RpZmljYXRpb25Db21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IEkxOG5TZXJ2aWNlIH0gZnJvbSAnLi4vaTE4bi9pMThuLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3ZlcmxheUhvc3RTZXJ2aWNlIH0gZnJvbSAnLi4vb3ZlcmxheS1ob3N0L292ZXJsYXktaG9zdC5zZXJ2aWNlJztcblxuZXhwb3J0IHR5cGUgTm90aWZpY2F0aW9uVHlwZSA9ICdpbmZvJyB8ICdzdWNjZXNzJyB8ICdlcnJvcicgfCAnd2FybmluZyc7XG5leHBvcnQgaW50ZXJmYWNlIFRvYXN0Q29uZmlnIHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdHJhbnNsYXRpb25WYXJzPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfTtcbiAgICB0eXBlPzogTm90aWZpY2F0aW9uVHlwZTtcbiAgICBkdXJhdGlvbj86IG51bWJlcjtcbn1cblxuLy8gSG93IG1hbnkgbXMgYmVmb3JlIHRoZSB0b2FzdCBpcyBkaXNtaXNzZWQuXG5jb25zdCBUT0FTVF9EVVJBVElPTiA9IDMwMDA7XG5cbi8qKlxuICogUHJvdmlkZXMgdG9hc3Qgbm90aWZpY2F0aW9uIGZ1bmN0aW9uYWxpdHkuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICAgIHByaXZhdGUgZ2V0IGhvc3RWaWV3KCk6IFByb21pc2U8Vmlld0NvbnRhaW5lclJlZj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5SG9zdFNlcnZpY2UuZ2V0SG9zdFZpZXcoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvcGVuVG9hc3RSZWZzOiBBcnJheTx7IHJlZjogQ29tcG9uZW50UmVmPE5vdGlmaWNhdGlvbkNvbXBvbmVudD47IHRpbWVySWQ6IGFueSB9PiA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaTE4blNlcnZpY2U6IEkxOG5TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheUhvc3RTZXJ2aWNlOiBPdmVybGF5SG9zdFNlcnZpY2UsXG4gICAgKSB7fVxuXG4gICAgLyoqXG4gICAgICogRGlzcGxheSBhIHN1Y2Nlc3MgdG9hc3Qgbm90aWZpY2F0aW9uXG4gICAgICovXG4gICAgc3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcsIHRyYW5zbGF0aW9uVmFycz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIH0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uVmFycyxcbiAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzcGxheSBhbiBpbmZvIHRvYXN0IG5vdGlmaWNhdGlvblxuICAgICAqL1xuICAgIGluZm8obWVzc2FnZTogc3RyaW5nLCB0cmFuc2xhdGlvblZhcnM/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB9KTogdm9pZCB7XG4gICAgICAgIHRoaXMubm90aWZ5KHtcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICB0cmFuc2xhdGlvblZhcnMsXG4gICAgICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc3BsYXkgYSB3YXJuaW5nIHRvYXN0IG5vdGlmaWNhdGlvblxuICAgICAqL1xuICAgIHdhcm5pbmcobWVzc2FnZTogc3RyaW5nLCB0cmFuc2xhdGlvblZhcnM/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB9KTogdm9pZCB7XG4gICAgICAgIHRoaXMubm90aWZ5KHtcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICB0cmFuc2xhdGlvblZhcnMsXG4gICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc3BsYXkgYW4gZXJyb3IgdG9hc3Qgbm90aWZpY2F0aW9uXG4gICAgICovXG4gICAgZXJyb3IobWVzc2FnZTogc3RyaW5nLCB0cmFuc2xhdGlvblZhcnM/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB9KTogdm9pZCB7XG4gICAgICAgIHRoaXMubm90aWZ5KHtcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICB0cmFuc2xhdGlvblZhcnMsXG4gICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDAwLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IGEgdG9hc3Qgbm90aWZpY2F0aW9uLlxuICAgICAqL1xuICAgIG5vdGlmeShjb25maWc6IFRvYXN0Q29uZmlnKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3JlYXRlVG9hc3QoY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIGEgVG9hc3RDb21wb25lbnQgaW50byB0aGUgRE9NIGhvc3QgbG9jYXRpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVUb2FzdChjb25maWc6IFRvYXN0Q29uZmlnKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IHRvYXN0RmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTm90aWZpY2F0aW9uQ29tcG9uZW50KTtcbiAgICAgICAgY29uc3QgaG9zdFZpZXcgPSBhd2FpdCB0aGlzLmhvc3RWaWV3O1xuICAgICAgICBjb25zdCByZWYgPSBob3N0Vmlldy5jcmVhdGVDb21wb25lbnQ8Tm90aWZpY2F0aW9uQ29tcG9uZW50Pih0b2FzdEZhY3RvcnkpO1xuICAgICAgICBjb25zdCB0b2FzdDogTm90aWZpY2F0aW9uQ29tcG9uZW50ID0gcmVmLmluc3RhbmNlO1xuICAgICAgICBjb25zdCBkaXNtaXNzRm4gPSB0aGlzLmNyZWF0ZURpc21pc3NGdW5jdGlvbihyZWYpO1xuICAgICAgICB0b2FzdC50eXBlID0gY29uZmlnLnR5cGUgfHwgJ2luZm8nO1xuICAgICAgICB0b2FzdC5tZXNzYWdlID0gY29uZmlnLm1lc3NhZ2U7XG4gICAgICAgIHRvYXN0LnRyYW5zbGF0aW9uVmFycyA9IHRoaXMudHJhbnNsYXRlVHJhbnNsYXRpb25WYXJzKGNvbmZpZy50cmFuc2xhdGlvblZhcnMgfHwge30pO1xuICAgICAgICB0b2FzdC5yZWdpc3Rlck9uQ2xpY2tGbihkaXNtaXNzRm4pO1xuXG4gICAgICAgIGxldCB0aW1lcklkO1xuICAgICAgICBpZiAoIWNvbmZpZy5kdXJhdGlvbiB8fCAwIDwgY29uZmlnLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dChkaXNtaXNzRm4sIGNvbmZpZy5kdXJhdGlvbiB8fCBUT0FTVF9EVVJBVElPTik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wZW5Ub2FzdFJlZnMudW5zaGlmdCh7IHJlZiwgdGltZXJJZCB9KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9ucygpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2ggd2lsbCBkZXN0cm95IHRoZSB0b2FzdCBjb21wb25lbnQgYW5kXG4gICAgICogcmVtb3ZlIGl0IGZyb20gdGhlIG9wZW5Ub2FzdFJlZnMgYXJyYXkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVEaXNtaXNzRnVuY3Rpb24ocmVmOiBDb21wb25lbnRSZWY8Tm90aWZpY2F0aW9uQ29tcG9uZW50Pik6ICgpID0+IHZvaWQge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9hc3Q6IE5vdGlmaWNhdGlvbkNvbXBvbmVudCA9IHJlZi5pbnN0YW5jZTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vcGVuVG9hc3RSZWZzLm1hcChvID0+IG8ucmVmKS5pbmRleE9mKHJlZik7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wZW5Ub2FzdFJlZnNbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMub3BlblRvYXN0UmVmc1tpbmRleF0udGltZXJJZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvYXN0LmZhZGVPdXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZWYuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub3BlblRvYXN0UmVmcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb25zKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGUgYW5kIHNldCB0aGUgdG9wIG9mZnNldHMgZm9yIGVhY2ggb2YgdGhlIG9wZW4gdG9hc3RzLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY3VsYXRlUG9zaXRpb25zKCk6IHZvaWQge1xuICAgICAgICBsZXQgY3VtdWxhdGl2ZUhlaWdodCA9IDEwO1xuXG4gICAgICAgIHRoaXMub3BlblRvYXN0UmVmcy5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2FzdDogTm90aWZpY2F0aW9uQ29tcG9uZW50ID0gb2JqLnJlZi5pbnN0YW5jZTtcbiAgICAgICAgICAgIHRvYXN0Lm9mZnNldFRvcCA9IGN1bXVsYXRpdmVIZWlnaHQ7XG4gICAgICAgICAgICBjdW11bGF0aXZlSGVpZ2h0ICs9IHRvYXN0LmdldEhlaWdodCgpICsgNjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVUcmFuc2xhdGlvblZhcnModHJhbnNsYXRpb25WYXJzOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcjtcbiAgICB9KTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfSB7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyh0cmFuc2xhdGlvblZhcnMpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvblZhcnNba2V5XSA9IHRoaXMuaTE4blNlcnZpY2UudHJhbnNsYXRlKHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uVmFycztcbiAgICB9XG59XG4iXX0=