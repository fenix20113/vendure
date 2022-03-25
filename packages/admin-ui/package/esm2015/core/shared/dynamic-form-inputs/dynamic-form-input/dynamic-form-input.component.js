import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, Input, QueryList, ViewChild, ViewChildren, ViewContainerRef, } from '@angular/core';
import { FormArray, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { assertNever } from '@vendure/common/lib/shared-utils';
import { simpleDeepClone } from '@vendure/common/lib/simple-deep-clone';
import { Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { getConfigArgValue } from '../../../common/utilities/configurable-operation-utils';
import { ComponentRegistryService } from '../../../providers/component-registry/component-registry.service';
/**
 * A host component which delegates to an instance or list of FormInputComponent components.
 */
export class DynamicFormInputComponent {
    constructor(componentRegistryService, componentFactoryResolver, changeDetectorRef, injector) {
        this.componentRegistryService = componentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.changeDetectorRef = changeDetectorRef;
        this.injector = injector;
        this.renderAsList = false;
        this.listItems = [];
        this.listId = 1;
        this.listFormArray = new FormArray([]);
        this.renderList$ = new Subject();
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        const componentId = this.getInputComponentConfig(this.def).component;
        const componentType = this.componentRegistryService.getInputComponent(componentId);
        if (componentType) {
            this.componentType = componentType;
        }
        else {
            // tslint:disable-next-line:no-console
            console.error(`No form input component registered with the id "${componentId}". Using the default input instead.`);
            const defaultComponentType = this.componentRegistryService.getInputComponent(this.getInputComponentConfig(Object.assign(Object.assign({}, this.def), { ui: undefined })).component);
            if (defaultComponentType) {
                this.componentType = defaultComponentType;
            }
        }
    }
    ngAfterViewInit() {
        var _a;
        if (this.componentType) {
            const factory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
            // create a temp instance to check the value of `isListInput`
            const cmpRef = factory.create(this.injector);
            const isListInputComponent = (_a = cmpRef.instance.isListInput) !== null && _a !== void 0 ? _a : false;
            cmpRef.destroy();
            if (this.def.list === false && isListInputComponent) {
                throw new Error(`The ${this.componentType.name} component is a list input, but the definition for ${this.def.name} does not expect a list`);
            }
            this.renderAsList = this.def.list && !isListInputComponent;
            if (!this.renderAsList) {
                this.singleComponentRef = this.renderInputComponent(factory, this.singleViewContainer, this.control);
            }
            else {
                let formArraySub;
                const renderListInputs = (viewContainerRefs) => {
                    if (viewContainerRefs.length) {
                        if (formArraySub) {
                            formArraySub.unsubscribe();
                        }
                        this.listFormArray = new FormArray([]);
                        this.listItems.forEach(i => { var _a; return (_a = i.componentRef) === null || _a === void 0 ? void 0 : _a.destroy(); });
                        viewContainerRefs.forEach((ref, i) => {
                            var _a;
                            const listItem = (_a = this.listItems) === null || _a === void 0 ? void 0 : _a[i];
                            if (listItem) {
                                this.listFormArray.push(listItem.control);
                                listItem.componentRef = this.renderInputComponent(factory, ref, listItem.control);
                            }
                        });
                        formArraySub = this.listFormArray.valueChanges
                            .pipe(takeUntil(this.destroy$))
                            .subscribe(val => {
                            this.control.markAsTouched();
                            this.control.markAsDirty();
                            this.onChange(val);
                            this.control.patchValue(val, { emitEvent: false });
                        });
                    }
                };
                // initial render
                this.listItemContainers.changes
                    .pipe(take(1))
                    .subscribe(val => renderListInputs(this.listItemContainers));
                // render on changes to the list
                this.renderList$
                    .pipe(switchMap(() => this.listItemContainers.changes.pipe(take(1))), takeUntil(this.destroy$))
                    .subscribe(() => {
                    renderListInputs(this.listItemContainers);
                });
            }
        }
        setTimeout(() => this.changeDetectorRef.markForCheck());
    }
    ngOnChanges(changes) {
        if (this.listItems) {
            for (const item of this.listItems) {
                if (item.componentRef) {
                    this.updateBindings(changes, item.componentRef);
                }
            }
        }
        if (this.singleComponentRef) {
            this.updateBindings(changes, this.singleComponentRef);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    updateBindings(changes, componentRef) {
        if ('def' in changes) {
            componentRef.instance.config = this.isConfigArgDef(this.def) ? this.def.ui : this.def;
        }
        if ('readonly' in changes) {
            componentRef.instance.readonly = this.readonly;
        }
        componentRef.injector.get(ChangeDetectorRef).markForCheck();
    }
    trackById(index, item) {
        return item.id;
    }
    addListItem() {
        var _a;
        if (!this.listItems) {
            this.listItems = [];
        }
        this.listItems.push({
            id: this.listId++,
            control: new FormControl((_a = this.def.defaultValue) !== null && _a !== void 0 ? _a : null),
        });
        this.renderList$.next();
    }
    moveListItem(event) {
        if (this.listItems) {
            moveItemInArray(this.listItems, event.previousIndex, event.currentIndex);
            this.listFormArray.removeAt(event.previousIndex);
            this.listFormArray.insert(event.currentIndex, event.item.data.control);
            this.renderList$.next();
        }
    }
    removeListItem(item) {
        var _a;
        if (this.listItems) {
            const index = this.listItems.findIndex(i => i === item);
            (_a = item.componentRef) === null || _a === void 0 ? void 0 : _a.destroy();
            this.listFormArray.removeAt(index);
            this.listItems = this.listItems.filter(i => i !== item);
            this.renderList$.next();
        }
    }
    renderInputComponent(factory, viewContainerRef, formControl) {
        const componentRef = viewContainerRef.createComponent(factory);
        const { instance } = componentRef;
        instance.config = simpleDeepClone(this.isConfigArgDef(this.def) ? this.def.ui : this.def);
        instance.formControl = formControl;
        instance.readonly = this.readonly;
        componentRef.injector.get(ChangeDetectorRef).markForCheck();
        return componentRef;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    writeValue(obj) {
        if (Array.isArray(obj)) {
            if (obj.length === this.listItems.length) {
                obj.forEach((value, index) => {
                    var _a;
                    const control = (_a = this.listItems[index]) === null || _a === void 0 ? void 0 : _a.control;
                    control.patchValue(getConfigArgValue(value), { emitEvent: false });
                });
            }
            else {
                this.listItems = obj.map(value => ({
                    id: this.listId++,
                    control: new FormControl(getConfigArgValue(value)),
                }));
                this.renderList$.next();
            }
        }
        else {
            this.listItems = [];
            this.renderList$.next();
        }
        this.changeDetectorRef.markForCheck();
    }
    getInputComponentConfig(argDef) {
        var _a;
        if (this.hasUiConfig(argDef) && argDef.ui.component) {
            return argDef.ui;
        }
        const type = argDef === null || argDef === void 0 ? void 0 : argDef.type;
        switch (type) {
            case 'string':
            case 'localeString': {
                const hasOptions = !!(this.isConfigArgDef(argDef) && ((_a = argDef.ui) === null || _a === void 0 ? void 0 : _a.options)) ||
                    !!argDef.options;
                if (hasOptions) {
                    return { component: 'select-form-input' };
                }
                else {
                    return { component: 'text-form-input' };
                }
            }
            case 'int':
            case 'float':
                return { component: 'number-form-input' };
            case 'boolean':
                return { component: 'boolean-form-input' };
            case 'datetime':
                return { component: 'date-form-input' };
            case 'ID':
                return { component: 'text-form-input' };
            case 'relation':
                return { component: 'relation-form-input' };
            default:
                assertNever(type);
        }
    }
    isConfigArgDef(def) {
        var _a;
        return ((_a = def) === null || _a === void 0 ? void 0 : _a.__typename) === 'ConfigArgDefinition';
    }
    hasUiConfig(def) {
        var _a, _b;
        return typeof def === 'object' && typeof ((_b = (_a = def) === null || _a === void 0 ? void 0 : _a.ui) === null || _b === void 0 ? void 0 : _b.component) === 'string';
    }
}
DynamicFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dynamic-form-input',
                template: "<ng-container *ngIf=\"!renderAsList; else list\">\n    <ng-container #single></ng-container>\n</ng-container>\n<ng-template #list>\n    <div class=\"list-container\" cdkDropList (cdkDropListDropped)=\"moveListItem($event)\">\n        <div class=\"list-item-row\" *ngFor=\"let item of listItems; trackBy: trackById\" cdkDrag [cdkDragData]=\"item\">\n            <ng-container #listItem></ng-container>\n            <button class=\"btn btn-link btn-sm btn-warning\" (click)=\"removeListItem(item)\" [title]=\"'common.remove-item-from-list' | translate\">\n                <clr-icon shape=\"times\"></clr-icon>\n            </button>\n            <div class=\"flex-spacer\"></div>\n            <div class=\"drag-handle\" cdkDragHandle *ngIf=\"!readonly\">\n                <clr-icon shape=\"drag-handle\" size=\"24\"></clr-icon>\n            </div>\n        </div>\n        <button class=\"btn btn-secondary btn-sm\" (click)=\"addListItem()\">\n            <clr-icon shape=\"plus\"></clr-icon> {{ 'common.add-item-to-list' | translate }}\n        </button>\n    </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: DynamicFormInputComponent,
                        multi: true,
                    },
                ],
                styles: [".list-container{border:1px solid var(--color-component-border-200);border-radius:3px;padding:12px}.list-item-row{font-size:13px;display:flex;align-items:center;margin:3px 0}.drag-placeholder{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drag-preview{font-size:13px;background-color:var(--color-component-bg-100);opacity:.8;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:.1}.cdk-drag-animating,.cdk-drop-list-dragging .list-item-row:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"]
            },] }
];
DynamicFormInputComponent.ctorParameters = () => [
    { type: ComponentRegistryService },
    { type: ComponentFactoryResolver },
    { type: ChangeDetectorRef },
    { type: Injector }
];
DynamicFormInputComponent.propDecorators = {
    def: [{ type: Input }],
    readonly: [{ type: Input }],
    control: [{ type: Input }],
    singleViewContainer: [{ type: ViewChild, args: ['single', { read: ViewContainerRef },] }],
    listItemContainers: [{ type: ViewChildren, args: ['listItem', { read: ViewContainerRef },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29yZS9zcmMvc2hhcmVkL2R5bmFtaWMtZm9ybS1pbnB1dHMvZHluYW1pYy1mb3JtLWlucHV0L2R5bmFtaWMtZm9ybS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFlLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RFLE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCx3QkFBd0IsRUFFeEIsUUFBUSxFQUNSLEtBQUssRUFJTCxTQUFTLEVBR1QsU0FBUyxFQUNULFlBQVksRUFDWixnQkFBZ0IsR0FDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixTQUFTLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHakcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQVE1Rzs7R0FFRztBQWNILE1BQU0sT0FBTyx5QkFBeUI7SUFrQmxDLFlBQ1ksd0JBQWtELEVBQ2xELHdCQUFrRCxFQUNsRCxpQkFBb0MsRUFDcEMsUUFBa0I7UUFIbEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCw2QkFBd0IsR0FBeEIsd0JBQXdC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T0FBTyxFQUFFLFNBQVMsRUFBRSxxQkFBcUIsRUFBRSxDQUFDO1lBQ2hEO2dCQUNJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFFTyxjQUFjLENBQUMsR0FBNEM7O1FBQy9ELE9BQU8sT0FBQyxHQUEyQiwwQ0FBRSxVQUFVLE1BQUsscUJBQXFCLENBQUM7SUFDOUUsQ0FBQztJQUVPLFdBQVcsQ0FBQyxHQUFZOztRQUM1QixPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxvQkFBUSxHQUFXLDBDQUFFLEVBQUUsMENBQUUsU0FBUyxDQUFBLEtBQUssUUFBUSxDQUFDO0lBQ3RGLENBQUM7OztZQXRSSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsdWtDQUFrRDtnQkFFbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRTtvQkFDUDt3QkFDSSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUseUJBQXlCO3dCQUN0QyxLQUFLLEVBQUUsSUFBSTtxQkFDZDtpQkFDSjs7YUFDSjs7O1lBdkJRLHdCQUF3QjtZQXpCN0Isd0JBQXdCO1lBSHhCLGlCQUFpQjtZQUtqQixRQUFROzs7a0JBaURQLEtBQUs7dUJBQ0wsS0FBSztzQkFDTCxLQUFLO2tDQUNMLFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7aUNBQzlDLFlBQVksU0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZGtEcmFnRHJvcCwgbW92ZUl0ZW1JbkFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBJbmplY3RvcixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBRdWVyeUxpc3QsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUeXBlLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUFycmF5LCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdHJpbmdDdXN0b21GaWVsZENvbmZpZyB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IENvbmZpZ0FyZ1R5cGUsIEN1c3RvbUZpZWxkVHlwZSwgRGVmYXVsdEZvcm1Db21wb25lbnRJZCB9IGZyb20gJ0B2ZW5kdXJlL2NvbW1vbi9saWIvc2hhcmVkLXR5cGVzJztcbmltcG9ydCB7IGFzc2VydE5ldmVyIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaGFyZWQtdXRpbHMnO1xuaW1wb3J0IHsgc2ltcGxlRGVlcENsb25lIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9zaW1wbGUtZGVlcC1jbG9uZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBGb3JtSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vY29tcG9uZW50LXJlZ2lzdHJ5LXR5cGVzJztcbmltcG9ydCB7IENvbmZpZ0FyZ0RlZmluaXRpb24sIEN1c3RvbUZpZWxkQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2dlbmVyYXRlZC10eXBlcyc7XG5pbXBvcnQgeyBnZXRDb25maWdBcmdWYWx1ZSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi91dGlsaXRpZXMvY29uZmlndXJhYmxlLW9wZXJhdGlvbi11dGlscyc7XG5pbXBvcnQgeyBDb21wb25lbnRSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9wcm92aWRlcnMvY29tcG9uZW50LXJlZ2lzdHJ5L2NvbXBvbmVudC1yZWdpc3RyeS5zZXJ2aWNlJztcblxudHlwZSBJbnB1dExpc3RJdGVtID0ge1xuICAgIGlkOiBudW1iZXI7XG4gICAgY29tcG9uZW50UmVmPzogQ29tcG9uZW50UmVmPEZvcm1JbnB1dENvbXBvbmVudD47XG4gICAgY29udHJvbDogRm9ybUNvbnRyb2w7XG59O1xuXG4vKipcbiAqIEEgaG9zdCBjb21wb25lbnQgd2hpY2ggZGVsZWdhdGVzIHRvIGFuIGluc3RhbmNlIG9yIGxpc3Qgb2YgRm9ybUlucHV0Q29tcG9uZW50IGNvbXBvbmVudHMuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmRyLWR5bmFtaWMtZm9ybS1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2R5bmFtaWMtZm9ybS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZHluYW1pYy1mb3JtLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IER5bmFtaWNGb3JtSW5wdXRDb21wb25lbnQsXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUlucHV0Q29tcG9uZW50XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgQElucHV0KCkgZGVmOiBDb25maWdBcmdEZWZpbml0aW9uIHwgQ3VzdG9tRmllbGRDb25maWc7XG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG4gICAgQElucHV0KCkgY29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgQFZpZXdDaGlsZCgnc2luZ2xlJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pIHNpbmdsZVZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG4gICAgQFZpZXdDaGlsZHJlbignbGlzdEl0ZW0nLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgbGlzdEl0ZW1Db250YWluZXJzOiBRdWVyeUxpc3Q8Vmlld0NvbnRhaW5lclJlZj47XG4gICAgcmVuZGVyQXNMaXN0ID0gZmFsc2U7XG4gICAgbGlzdEl0ZW1zOiBJbnB1dExpc3RJdGVtW10gPSBbXTtcbiAgICBwcml2YXRlIHNpbmdsZUNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPEZvcm1JbnB1dENvbXBvbmVudD47XG4gICAgcHJpdmF0ZSBsaXN0SWQgPSAxO1xuICAgIHByaXZhdGUgbGlzdEZvcm1BcnJheSA9IG5ldyBGb3JtQXJyYXkoW10pO1xuICAgIHByaXZhdGUgY29tcG9uZW50VHlwZTogVHlwZTxGb3JtSW5wdXRDb21wb25lbnQ+O1xuICAgIHByaXZhdGUgb25DaGFuZ2U6ICh2YWw6IGFueSkgPT4gdm9pZDtcbiAgICBwcml2YXRlIG9uVG91Y2g6ICgpID0+IHZvaWQ7XG4gICAgcHJpdmF0ZSByZW5kZXJMaXN0JCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRSZWdpc3RyeVNlcnZpY2U6IENvbXBvbmVudFJlZ2lzdHJ5U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zdCBjb21wb25lbnRJZCA9IHRoaXMuZ2V0SW5wdXRDb21wb25lbnRDb25maWcodGhpcy5kZWYpLmNvbXBvbmVudDtcbiAgICAgICAgY29uc3QgY29tcG9uZW50VHlwZSA9IHRoaXMuY29tcG9uZW50UmVnaXN0cnlTZXJ2aWNlLmdldElucHV0Q29tcG9uZW50KGNvbXBvbmVudElkKTtcbiAgICAgICAgaWYgKGNvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50VHlwZSA9IGNvbXBvbmVudFR5cGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICBgTm8gZm9ybSBpbnB1dCBjb21wb25lbnQgcmVnaXN0ZXJlZCB3aXRoIHRoZSBpZCBcIiR7Y29tcG9uZW50SWR9XCIuIFVzaW5nIHRoZSBkZWZhdWx0IGlucHV0IGluc3RlYWQuYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0Q29tcG9uZW50VHlwZSA9IHRoaXMuY29tcG9uZW50UmVnaXN0cnlTZXJ2aWNlLmdldElucHV0Q29tcG9uZW50KFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SW5wdXRDb21wb25lbnRDb25maWcoeyAuLi50aGlzLmRlZiwgdWk6IHVuZGVmaW5lZCB9IGFzIGFueSkuY29tcG9uZW50LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChkZWZhdWx0Q29tcG9uZW50VHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50VHlwZSA9IGRlZmF1bHRDb21wb25lbnRUeXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRUeXBlKSB7XG4gICAgICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5jb21wb25lbnRUeXBlKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgdGVtcCBpbnN0YW5jZSB0byBjaGVjayB0aGUgdmFsdWUgb2YgYGlzTGlzdElucHV0YFxuICAgICAgICAgICAgY29uc3QgY21wUmVmID0gZmFjdG9yeS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG4gICAgICAgICAgICBjb25zdCBpc0xpc3RJbnB1dENvbXBvbmVudCA9IGNtcFJlZi5pbnN0YW5jZS5pc0xpc3RJbnB1dCA/PyBmYWxzZTtcbiAgICAgICAgICAgIGNtcFJlZi5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRlZi5saXN0ID09PSBmYWxzZSAmJiBpc0xpc3RJbnB1dENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgYFRoZSAke3RoaXMuY29tcG9uZW50VHlwZS5uYW1lfSBjb21wb25lbnQgaXMgYSBsaXN0IGlucHV0LCBidXQgdGhlIGRlZmluaXRpb24gZm9yICR7dGhpcy5kZWYubmFtZX0gZG9lcyBub3QgZXhwZWN0IGEgbGlzdGAsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVuZGVyQXNMaXN0ID0gdGhpcy5kZWYubGlzdCAmJiAhaXNMaXN0SW5wdXRDb21wb25lbnQ7XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVuZGVyQXNMaXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaW5nbGVDb21wb25lbnRSZWYgPSB0aGlzLnJlbmRlcklucHV0Q29tcG9uZW50KFxuICAgICAgICAgICAgICAgICAgICBmYWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpbmdsZVZpZXdDb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZm9ybUFycmF5U3ViOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyTGlzdElucHV0cyA9ICh2aWV3Q29udGFpbmVyUmVmczogUXVlcnlMaXN0PFZpZXdDb250YWluZXJSZWY+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3Q29udGFpbmVyUmVmcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtQXJyYXlTdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtQXJyYXlTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdEZvcm1BcnJheSA9IG5ldyBGb3JtQXJyYXkoW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbXMuZm9yRWFjaChpID0+IGkuY29tcG9uZW50UmVmPy5kZXN0cm95KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZnMuZm9yRWFjaCgocmVmLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0aGlzLmxpc3RJdGVtcz8uW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0SXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RGb3JtQXJyYXkucHVzaChsaXN0SXRlbS5jb250cm9sKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW0uY29tcG9uZW50UmVmID0gdGhpcy5yZW5kZXJJbnB1dENvbXBvbmVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY3RvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5jb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtQXJyYXlTdWIgPSB0aGlzLmxpc3RGb3JtQXJyYXkudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sLnBhdGNoVmFsdWUodmFsLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gaW5pdGlhbCByZW5kZXJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtQ29udGFpbmVycy5jaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUodmFsID0+IHJlbmRlckxpc3RJbnB1dHModGhpcy5saXN0SXRlbUNvbnRhaW5lcnMpKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlbmRlciBvbiBjaGFuZ2VzIHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJMaXN0JFxuICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmxpc3RJdGVtQ29udGFpbmVycy5jaGFuZ2VzLnBpcGUodGFrZSgxKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyTGlzdElucHV0cyh0aGlzLmxpc3RJdGVtQ29udGFpbmVycyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLmxpc3RJdGVtcykge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJpbmRpbmdzKGNoYW5nZXMsIGl0ZW0uY29tcG9uZW50UmVmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlQ29tcG9uZW50UmVmKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJpbmRpbmdzKGNoYW5nZXMsIHRoaXMuc2luZ2xlQ29tcG9uZW50UmVmKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQmluZGluZ3MoY2hhbmdlczogU2ltcGxlQ2hhbmdlcywgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8Rm9ybUlucHV0Q29tcG9uZW50Pikge1xuICAgICAgICBpZiAoJ2RlZicgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmNvbmZpZyA9IHRoaXMuaXNDb25maWdBcmdEZWYodGhpcy5kZWYpID8gdGhpcy5kZWYudWkgOiB0aGlzLmRlZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJ3JlYWRvbmx5JyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UucmVhZG9ubHkgPSB0aGlzLnJlYWRvbmx5O1xuICAgICAgICB9XG4gICAgICAgIGNvbXBvbmVudFJlZi5pbmplY3Rvci5nZXQoQ2hhbmdlRGV0ZWN0b3JSZWYpLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHRyYWNrQnlJZChpbmRleDogbnVtYmVyLCBpdGVtOiB7IGlkOiBudW1iZXIgfSkge1xuICAgICAgICByZXR1cm4gaXRlbS5pZDtcbiAgICB9XG5cbiAgICBhZGRMaXN0SXRlbSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxpc3RJdGVtcykge1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiB0aGlzLmxpc3RJZCsrLFxuICAgICAgICAgICAgY29udHJvbDogbmV3IEZvcm1Db250cm9sKCh0aGlzLmRlZiBhcyBDb25maWdBcmdEZWZpbml0aW9uKS5kZWZhdWx0VmFsdWUgPz8gbnVsbCksXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbmRlckxpc3QkLm5leHQoKTtcbiAgICB9XG5cbiAgICBtb3ZlTGlzdEl0ZW0oZXZlbnQ6IENka0RyYWdEcm9wPElucHV0TGlzdEl0ZW0+KSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtcykge1xuICAgICAgICAgICAgbW92ZUl0ZW1JbkFycmF5KHRoaXMubGlzdEl0ZW1zLCBldmVudC5wcmV2aW91c0luZGV4LCBldmVudC5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5saXN0Rm9ybUFycmF5LnJlbW92ZUF0KGV2ZW50LnByZXZpb3VzSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5saXN0Rm9ybUFycmF5Lmluc2VydChldmVudC5jdXJyZW50SW5kZXgsIGV2ZW50Lml0ZW0uZGF0YS5jb250cm9sKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdCQubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlTGlzdEl0ZW0oaXRlbTogSW5wdXRMaXN0SXRlbSkge1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5saXN0SXRlbXMuZmluZEluZGV4KGkgPT4gaSA9PT0gaXRlbSk7XG4gICAgICAgICAgICBpdGVtLmNvbXBvbmVudFJlZj8uZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5saXN0Rm9ybUFycmF5LnJlbW92ZUF0KGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMubGlzdEl0ZW1zID0gdGhpcy5saXN0SXRlbXMuZmlsdGVyKGkgPT4gaSAhPT0gaXRlbSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpc3QkLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVySW5wdXRDb21wb25lbnQoXG4gICAgICAgIGZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8Rm9ybUlucHV0Q29tcG9uZW50PixcbiAgICAgICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sLFxuICAgICkge1xuICAgICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgICAgY29uc3QgeyBpbnN0YW5jZSB9ID0gY29tcG9uZW50UmVmO1xuICAgICAgICBpbnN0YW5jZS5jb25maWcgPSBzaW1wbGVEZWVwQ2xvbmUodGhpcy5pc0NvbmZpZ0FyZ0RlZih0aGlzLmRlZikgPyB0aGlzLmRlZi51aSA6IHRoaXMuZGVmKTtcbiAgICAgICAgaW5zdGFuY2UuZm9ybUNvbnRyb2wgPSBmb3JtQ29udHJvbDtcbiAgICAgICAgaW5zdGFuY2UucmVhZG9ubHkgPSB0aGlzLnJlYWRvbmx5O1xuICAgICAgICBjb21wb25lbnRSZWYuaW5qZWN0b3IuZ2V0KENoYW5nZURldGVjdG9yUmVmKS5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFJlZjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoID0gZm47XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICBpZiAob2JqLmxlbmd0aCA9PT0gdGhpcy5saXN0SXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgb2JqLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gdGhpcy5saXN0SXRlbXNbaW5kZXhdPy5jb250cm9sO1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sLnBhdGNoVmFsdWUoZ2V0Q29uZmlnQXJnVmFsdWUodmFsdWUpLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW1zID0gb2JqLm1hcChcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMubGlzdElkKyssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbDogbmV3IEZvcm1Db250cm9sKGdldENvbmZpZ0FyZ1ZhbHVlKHZhbHVlKSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGFzIElucHV0TGlzdEl0ZW0pLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJMaXN0JC5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RJdGVtcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJMaXN0JC5uZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldElucHV0Q29tcG9uZW50Q29uZmlnKFxuICAgICAgICBhcmdEZWY6IENvbmZpZ0FyZ0RlZmluaXRpb24gfCBDdXN0b21GaWVsZENvbmZpZyxcbiAgICApOiB7IGNvbXBvbmVudDogRGVmYXVsdEZvcm1Db21wb25lbnRJZCB9IHtcbiAgICAgICAgaWYgKHRoaXMuaGFzVWlDb25maWcoYXJnRGVmKSAmJiBhcmdEZWYudWkuY29tcG9uZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gYXJnRGVmLnVpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHR5cGUgPSBhcmdEZWY/LnR5cGUgYXMgQ29uZmlnQXJnVHlwZSB8IEN1c3RvbUZpZWxkVHlwZTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgY2FzZSAnbG9jYWxlU3RyaW5nJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhc09wdGlvbnMgPVxuICAgICAgICAgICAgICAgICAgICAhISh0aGlzLmlzQ29uZmlnQXJnRGVmKGFyZ0RlZikgJiYgYXJnRGVmLnVpPy5vcHRpb25zKSB8fFxuICAgICAgICAgICAgICAgICAgICAhIShhcmdEZWYgYXMgU3RyaW5nQ3VzdG9tRmllbGRDb25maWcpLm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgaWYgKGhhc09wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgY29tcG9uZW50OiAnc2VsZWN0LWZvcm0taW5wdXQnIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgY29tcG9uZW50OiAndGV4dC1mb3JtLWlucHV0JyB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2ludCc6XG4gICAgICAgICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgY29tcG9uZW50OiAnbnVtYmVyLWZvcm0taW5wdXQnIH07XG4gICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICByZXR1cm4geyBjb21wb25lbnQ6ICdib29sZWFuLWZvcm0taW5wdXQnIH07XG4gICAgICAgICAgICBjYXNlICdkYXRldGltZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgY29tcG9uZW50OiAnZGF0ZS1mb3JtLWlucHV0JyB9O1xuICAgICAgICAgICAgY2FzZSAnSUQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7IGNvbXBvbmVudDogJ3RleHQtZm9ybS1pbnB1dCcgfTtcbiAgICAgICAgICAgIGNhc2UgJ3JlbGF0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4geyBjb21wb25lbnQ6ICdyZWxhdGlvbi1mb3JtLWlucHV0JyB9O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBhc3NlcnROZXZlcih0eXBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNDb25maWdBcmdEZWYoZGVmOiBDb25maWdBcmdEZWZpbml0aW9uIHwgQ3VzdG9tRmllbGRDb25maWcpOiBkZWYgaXMgQ29uZmlnQXJnRGVmaW5pdGlvbiB7XG4gICAgICAgIHJldHVybiAoZGVmIGFzIENvbmZpZ0FyZ0RlZmluaXRpb24pPy5fX3R5cGVuYW1lID09PSAnQ29uZmlnQXJnRGVmaW5pdGlvbic7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNVaUNvbmZpZyhkZWY6IHVua25vd24pOiBkZWYgaXMgeyB1aTogeyBjb21wb25lbnQ6IHN0cmluZyB9IH0ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGRlZiA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIChkZWYgYXMgYW55KT8udWk/LmNvbXBvbmVudCA9PT0gJ3N0cmluZyc7XG4gICAgfVxufVxuIl19