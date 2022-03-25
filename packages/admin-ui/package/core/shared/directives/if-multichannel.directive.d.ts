import { TemplateRef, ViewContainerRef } from '@angular/core';
import { DataService } from '../../data/providers/data.service';
import { IfDirectiveBase } from './if-directive-base';
export declare class IfMultichannelDirective extends IfDirectiveBase<[]> {
    private dataService;
    constructor(_viewContainer: ViewContainerRef, templateRef: TemplateRef<any>, dataService: DataService);
    /**
     * A template to show if the current user does not have the speicified permission.
     */
    set vdrIfMultichannelElse(templateRef: TemplateRef<any> | null);
}
