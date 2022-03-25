import { Component, ComponentFactoryResolver, EventEmitter, Input, Output, Type, ViewContainerRef, } from '@angular/core';
/**
 * A helper component used to embed a component instance into the {@link ModalDialogComponent}
 */
export class DialogComponentOutletComponent {
    constructor(viewContainerRef, componentFactoryResolver) {
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.create = new EventEmitter();
    }
    ngOnInit() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
        const componentRef = this.viewContainerRef.createComponent(factory);
        this.create.emit(componentRef.instance);
    }
}
DialogComponentOutletComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dialog-component-outlet',
                template: ``
            },] }
];
DialogComponentOutletComponent.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver }
];
DialogComponentOutletComponent.propDecorators = {
    component: [{ type: Input }],
    create: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbXBvbmVudC1vdXRsZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9zaGFyZWQvY29tcG9uZW50cy9tb2RhbC1kaWFsb2cvZGlhbG9nLWNvbXBvbmVudC1vdXRsZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1Qsd0JBQXdCLEVBQ3hCLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLElBQUksRUFDSixnQkFBZ0IsR0FDbkIsTUFBTSxlQUFlLENBQUM7QUFFdkI7O0dBRUc7QUFLSCxNQUFNLE9BQU8sOEJBQThCO0lBSXZDLFlBQ1ksZ0JBQWtDLEVBQ2xDLHdCQUFrRDtRQURsRCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFKcEQsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7SUFLeEMsQ0FBQztJQUVKLFFBQVE7UUFDSixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7OztZQWpCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsUUFBUSxFQUFFLEVBQUU7YUFDZjs7O1lBVEcsZ0JBQWdCO1lBTmhCLHdCQUF3Qjs7O3dCQWlCdkIsS0FBSztxQkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFR5cGUsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQSBoZWxwZXIgY29tcG9uZW50IHVzZWQgdG8gZW1iZWQgYSBjb21wb25lbnQgaW5zdGFuY2UgaW50byB0aGUge0BsaW5rIE1vZGFsRGlhbG9nQ29tcG9uZW50fVxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Zkci1kaWFsb2ctY29tcG9uZW50LW91dGxldCcsXG4gICAgdGVtcGxhdGU6IGBgLFxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb21wb25lbnRPdXRsZXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGNvbXBvbmVudDogVHlwZTxhbnk+O1xuICAgIEBPdXRwdXQoKSBjcmVhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmNvbXBvbmVudCk7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgICAgIHRoaXMuY3JlYXRlLmVtaXQoY29tcG9uZW50UmVmLmluc3RhbmNlKTtcbiAgICB9XG59XG4iXX0=