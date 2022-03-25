import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Injector, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { FormInputComponent } from '../../../common/component-registry-types';
import { ConfigArgDefinition, CustomFieldConfig } from '../../../common/generated-types';
import { ComponentRegistryService } from '../../../providers/component-registry/component-registry.service';
declare type InputListItem = {
    id: number;
    componentRef?: ComponentRef<FormInputComponent>;
    control: FormControl;
};
/**
 * A host component which delegates to an instance or list of FormInputComponent components.
 */
export declare class DynamicFormInputComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy, ControlValueAccessor {
    private componentRegistryService;
    private componentFactoryResolver;
    private changeDetectorRef;
    private injector;
    def: ConfigArgDefinition | CustomFieldConfig;
    readonly: boolean;
    control: FormControl;
    singleViewContainer: ViewContainerRef;
    listItemContainers: QueryList<ViewContainerRef>;
    renderAsList: boolean;
    listItems: InputListItem[];
    private singleComponentRef;
    private listId;
    private listFormArray;
    private componentType;
    private onChange;
    private onTouch;
    private renderList$;
    private destroy$;
    constructor(componentRegistryService: ComponentRegistryService, componentFactoryResolver: ComponentFactoryResolver, changeDetectorRef: ChangeDetectorRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private updateBindings;
    trackById(index: number, item: {
        id: number;
    }): number;
    addListItem(): void;
    moveListItem(event: CdkDragDrop<InputListItem>): void;
    removeListItem(item: InputListItem): void;
    private renderInputComponent;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    writeValue(obj: any): void;
    private getInputComponentConfig;
    private isConfigArgDef;
    private hasUiConfig;
}
export {};
