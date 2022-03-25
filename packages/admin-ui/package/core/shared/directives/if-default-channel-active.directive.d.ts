import { ChangeDetectorRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { IfDirectiveBase } from './if-directive-base';
export declare class IfDefaultChannelActiveDirective extends IfDirectiveBase<[]> {
    private dataService;
    private changeDetectorRef;
    constructor(_viewContainer: ViewContainerRef, templateRef: TemplateRef<any>, dataService: DataService, changeDetectorRef: ChangeDetectorRef);
    /**
     * A template to show if the current user does not have the speicified permission.
     */
    set vdrIfMultichannelElse(templateRef: TemplateRef<any> | null);
    private defaultChannelIsActive;
}
