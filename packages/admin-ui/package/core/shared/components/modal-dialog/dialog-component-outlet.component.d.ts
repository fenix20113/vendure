import { ComponentFactoryResolver, EventEmitter, OnInit, Type, ViewContainerRef } from '@angular/core';
/**
 * A helper component used to embed a component instance into the {@link ModalDialogComponent}
 */
export declare class DialogComponentOutletComponent implements OnInit {
    private viewContainerRef;
    private componentFactoryResolver;
    component: Type<any>;
    create: EventEmitter<any>;
    constructor(viewContainerRef: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
}
