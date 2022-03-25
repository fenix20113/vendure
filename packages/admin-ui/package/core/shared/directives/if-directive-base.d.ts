import { OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * A base class for implementing custom *ngIf-style structural directives based on custom conditions.
 *
 * @dynamic
 */
export declare class IfDirectiveBase<Args extends any[]> implements OnInit, OnDestroy {
    private _viewContainer;
    private updateViewFn;
    protected updateArgs$: BehaviorSubject<Args>;
    private readonly _thenTemplateRef;
    private _elseTemplateRef;
    private _thenViewRef;
    private _elseViewRef;
    private subscription;
    constructor(_viewContainer: ViewContainerRef, templateRef: TemplateRef<any>, updateViewFn: (...args: Args) => Observable<boolean>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected setElseTemplate(templateRef: TemplateRef<any> | null): void;
    private showThen;
    private showElse;
    private assertTemplate;
}
