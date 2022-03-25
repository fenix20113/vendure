import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ModalDialogComponent } from '../../shared/components/modal-dialog/modal-dialog.component';
import { SimpleDialogComponent } from '../../shared/components/simple-dialog/simple-dialog.component';
import { OverlayHostService } from '../overlay-host/overlay-host.service';
import * as i0 from "@angular/core";
import * as i1 from "../overlay-host/overlay-host.service";
/**
 * This service is responsible for instantiating a ModalDialog component and
 * embedding the specified component within.
 */
export class ModalService {
    constructor(componentFactoryResolver, overlayHostService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.overlayHostService = overlayHostService;
    }
    /**
     * Create a modal from a component. The component must implement the {@link Dialog} interface.
     * Additionally, the component should include templates for the title and the buttons to be
     * displayed in the modal dialog. See example:
     *
     * @example
     * ```
     * class MyDialog implements Dialog {
     *  resolveWith: (result?: any) => void;
     *
     *  okay() {
     *    doSomeWork().subscribe(result => {
     *      this.resolveWith(result);
     *    })
     *  }
     *
     *  cancel() {
     *    this.resolveWith(false);
     *  }
     * }
     * ```
     *
     * ```
     * <ng-template vdrDialogTitle>Title of the modal</ng-template>
     *
     * <p>
     *     My Content
     * </p>
     *
     * <ng-template vdrDialogButtons>
     *     <button type="button"
     *             class="btn"
     *             (click)="cancel()">Cancel</button>
     *     <button type="button"
     *             class="btn btn-primary"
     *             (click)="okay()">Okay</button>
     * </ng-template>
     * ```
     */
    fromComponent(component, options) {
        const modalFactory = this.componentFactoryResolver.resolveComponentFactory(ModalDialogComponent);
        return from(this.overlayHostService.getHostView()).pipe(mergeMap((hostView) => {
            const modalComponentRef = hostView.createComponent(modalFactory);
            const modalInstance = modalComponentRef.instance;
            modalInstance.childComponentType = component;
            modalInstance.options = options;
            return new Observable((subscriber) => {
                modalInstance.closeModal = (result) => {
                    modalComponentRef.destroy();
                    subscriber.next(result);
                    subscriber.complete();
                };
            });
        }));
    }
    /**
     * Displays a modal dialog with the provided title, body and buttons.
     */
    dialog(config) {
        return this.fromComponent(SimpleDialogComponent, {
            locals: config,
        });
    }
}
ModalService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ModalService_Factory() { return new ModalService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i1.OverlayHostService)); }, token: ModalService, providedIn: "root" });
ModalService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ModalService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: OverlayHostService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvcHJvdmlkZXJzL21vZGFsL21vZGFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDbkcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDdEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7OztBQWtEMUU7OztHQUdHO0FBSUgsTUFBTSxPQUFPLFlBQVk7SUFDckIsWUFDWSx3QkFBa0QsRUFDbEQsa0JBQXNDO1FBRHRDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtJQUMvQyxDQUFDO0lBRUo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0NHO0lBQ0gsYUFBYSxDQUNULFNBQW9DLEVBQ3BDLE9BQXlCO1FBRXpCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRWpHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDbkQsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbEIsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sYUFBYSxHQUE4QixpQkFBaUIsQ0FBQyxRQUFRLENBQUM7WUFDNUUsYUFBYSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztZQUM3QyxhQUFhLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUVoQyxPQUFPLElBQUksVUFBVSxDQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQ3BDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxNQUFTLEVBQUUsRUFBRTtvQkFDckMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzVCLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFJLE1BQXVCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRTtZQUM3QyxNQUFNLEVBQUUsTUFBTTtTQUNqQixDQUFDLENBQUM7SUFDUCxDQUFDOzs7O1lBL0VKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7O1lBL0RRLHdCQUF3QjtZQU94QixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFR5cGUgfSBmcm9tICdAdmVuZHVyZS9jb21tb24vbGliL3NoYXJlZC10eXBlcyc7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTW9kYWxEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9tb2RhbC1kaWFsb2cvbW9kYWwtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaW1wbGVEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zaW1wbGUtZGlhbG9nL3NpbXBsZS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IE92ZXJsYXlIb3N0U2VydmljZSB9IGZyb20gJy4uL292ZXJsYXktaG9zdC9vdmVybGF5LWhvc3Quc2VydmljZSc7XG5cbi8qKlxuICogQW55IGNvbXBvbmVudCBpbnRlbmRlZCB0byBiZSB1c2VkIHdpdGggdGhlIE1vZGFsU2VydmljZS5mcm9tQ29tcG9uZW50KCkgbWV0aG9kIG11c3QgaW1wbGVtZW50XG4gKiB0aGlzIGludGVyZmFjZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEaWFsb2c8UiA9IGFueT4ge1xuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGJlIGludm9rZWQgaW4gb3JkZXIgdG8gY2xvc2UgdGhlIGRpYWxvZyB3aGVuIHRoZSBhY3Rpb24gaXMgY29tcGxldGUuXG4gICAgICogVGhlIE9ic2VydmFibGUgcmV0dXJuZWQgZnJvbSB0aGUgLmZyb21Db21wb25lbnQoKSBtZXRob2Qgd2lsbCBlbWl0IHRoZSB2YWx1ZSBwYXNzZWRcbiAgICAgKiB0byB0aGlzIG1ldGhvZCBhbmQgdGhlbiBjb21wbGV0ZS5cbiAgICAgKi9cbiAgICByZXNvbHZlV2l0aDogKHJlc3VsdD86IFIpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlhbG9nQnV0dG9uQ29uZmlnPFQ+IHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHR5cGU6ICdzZWNvbmRhcnknIHwgJ3ByaW1hcnknIHwgJ2Rhbmdlcic7XG4gICAgcmV0dXJuVmFsdWU/OiBUO1xufVxuXG4vKipcbiAqIENvbmZpZ3VyZXMgYSBnZW5lcmljIG1vZGFsIGRpYWxvZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEaWFsb2dDb25maWc8VD4ge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgYm9keT86IHN0cmluZztcbiAgICB0cmFuc2xhdGlvblZhcnM/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB9O1xuICAgIGJ1dHRvbnM6IEFycmF5PERpYWxvZ0J1dHRvbkNvbmZpZzxUPj47XG59XG5cbi8qKlxuICogT3B0aW9ucyB0byBjb25maWd1cmUgdGhlIGJlaGF2aW91ciBvZiB0aGUgbW9kYWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxPcHRpb25zPFQ+IHtcbiAgICAvKiogU2V0cyB0aGUgd2lkdGggb2YgdGhlIGRpYWxvZyAqL1xuICAgIHNpemU/OiAnc20nIHwgJ21kJyB8ICdsZycgfCAneGwnO1xuICAgIC8qKiBTZXRzIHRoZSB2ZXJ0aWNhbCBhbGlnbm1lbnQgb2YgdGhlIGRpYWxvZyAqL1xuICAgIHZlcnRpY2FsQWxpZ24/OiAndG9wJyB8ICdjZW50ZXInIHwgJ2JvdHRvbSc7XG4gICAgLyoqXG4gICAgICogV2hlbiB0cnVlLCB0aGUgXCJ4XCIgaWNvbiBpcyBzaG93blxuICAgICAqIGFuZCBjbGlja2luZyBpdCBvciB0aGUgbWFzayB3aWxsIGNsb3NlIHRoZSBkaWFsb2dcbiAgICAgKi9cbiAgICBjbG9zYWJsZT86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVmFsdWVzIHRvIGJlIHBhc3NlZCBkaXJlY3RseSB0byB0aGUgY29tcG9uZW50LlxuICAgICAqL1xuICAgIGxvY2Fscz86IFBhcnRpYWw8VD47XG59XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGlzIHJlc3BvbnNpYmxlIGZvciBpbnN0YW50aWF0aW5nIGEgTW9kYWxEaWFsb2cgY29tcG9uZW50IGFuZFxuICogZW1iZWRkaW5nIHRoZSBzcGVjaWZpZWQgY29tcG9uZW50IHdpdGhpbi5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5SG9zdFNlcnZpY2U6IE92ZXJsYXlIb3N0U2VydmljZSxcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBtb2RhbCBmcm9tIGEgY29tcG9uZW50LiBUaGUgY29tcG9uZW50IG11c3QgaW1wbGVtZW50IHRoZSB7QGxpbmsgRGlhbG9nfSBpbnRlcmZhY2UuXG4gICAgICogQWRkaXRpb25hbGx5LCB0aGUgY29tcG9uZW50IHNob3VsZCBpbmNsdWRlIHRlbXBsYXRlcyBmb3IgdGhlIHRpdGxlIGFuZCB0aGUgYnV0dG9ucyB0byBiZVxuICAgICAqIGRpc3BsYXllZCBpbiB0aGUgbW9kYWwgZGlhbG9nLiBTZWUgZXhhbXBsZTpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgXG4gICAgICogY2xhc3MgTXlEaWFsb2cgaW1wbGVtZW50cyBEaWFsb2cge1xuICAgICAqICByZXNvbHZlV2l0aDogKHJlc3VsdD86IGFueSkgPT4gdm9pZDtcbiAgICAgKlxuICAgICAqICBva2F5KCkge1xuICAgICAqICAgIGRvU29tZVdvcmsoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgKiAgICAgIHRoaXMucmVzb2x2ZVdpdGgocmVzdWx0KTtcbiAgICAgKiAgICB9KVxuICAgICAqICB9XG4gICAgICpcbiAgICAgKiAgY2FuY2VsKCkge1xuICAgICAqICAgIHRoaXMucmVzb2x2ZVdpdGgoZmFsc2UpO1xuICAgICAqICB9XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogPG5nLXRlbXBsYXRlIHZkckRpYWxvZ1RpdGxlPlRpdGxlIG9mIHRoZSBtb2RhbDwvbmctdGVtcGxhdGU+XG4gICAgICpcbiAgICAgKiA8cD5cbiAgICAgKiAgICAgTXkgQ29udGVudFxuICAgICAqIDwvcD5cbiAgICAgKlxuICAgICAqIDxuZy10ZW1wbGF0ZSB2ZHJEaWFsb2dCdXR0b25zPlxuICAgICAqICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAqICAgICAgICAgICAgIGNsYXNzPVwiYnRuXCJcbiAgICAgKiAgICAgICAgICAgICAoY2xpY2spPVwiY2FuY2VsKClcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgKiAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgKiAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiXG4gICAgICogICAgICAgICAgICAgKGNsaWNrKT1cIm9rYXkoKVwiPk9rYXk8L2J1dHRvbj5cbiAgICAgKiA8L25nLXRlbXBsYXRlPlxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGZyb21Db21wb25lbnQ8VCBleHRlbmRzIERpYWxvZzxhbnk+LCBSPihcbiAgICAgICAgY29tcG9uZW50OiBUeXBlPFQ+ICYgVHlwZTxEaWFsb2c8Uj4+LFxuICAgICAgICBvcHRpb25zPzogTW9kYWxPcHRpb25zPFQ+LFxuICAgICk6IE9ic2VydmFibGU8UiB8IHVuZGVmaW5lZD4ge1xuICAgICAgICBjb25zdCBtb2RhbEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShNb2RhbERpYWxvZ0NvbXBvbmVudCk7XG5cbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5vdmVybGF5SG9zdFNlcnZpY2UuZ2V0SG9zdFZpZXcoKSkucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKChob3N0VmlldykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGFsQ29tcG9uZW50UmVmID0gaG9zdFZpZXcuY3JlYXRlQ29tcG9uZW50KG1vZGFsRmFjdG9yeSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kYWxJbnN0YW5jZTogTW9kYWxEaWFsb2dDb21wb25lbnQ8YW55PiA9IG1vZGFsQ29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgICAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UuY2hpbGRDb21wb25lbnRUeXBlID0gY29tcG9uZW50O1xuICAgICAgICAgICAgICAgIG1vZGFsSW5zdGFuY2Uub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Uj4oKHN1YnNjcmliZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5jbG9zZU1vZGFsID0gKHJlc3VsdDogUikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxDb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5cyBhIG1vZGFsIGRpYWxvZyB3aXRoIHRoZSBwcm92aWRlZCB0aXRsZSwgYm9keSBhbmQgYnV0dG9ucy5cbiAgICAgKi9cbiAgICBkaWFsb2c8VD4oY29uZmlnOiBEaWFsb2dDb25maWc8VD4pOiBPYnNlcnZhYmxlPFQgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbUNvbXBvbmVudChTaW1wbGVEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICAgIGxvY2FsczogY29uZmlnLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=