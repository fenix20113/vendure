import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../../../data/providers/data.service';
import { ActionBarItem } from '../../../providers/nav-builder/nav-builder-types';
import { NavBuilderService } from '../../../providers/nav-builder/nav-builder.service';
import { NotificationService } from '../../../providers/notification/notification.service';
export declare class ActionBarItemsComponent implements OnInit, OnChanges {
    private navBuilderService;
    private route;
    private dataService;
    private notificationService;
    locationId: string;
    items$: Observable<ActionBarItem[]>;
    private locationId$;
    constructor(navBuilderService: NavBuilderService, route: ActivatedRoute, dataService: DataService, notificationService: NotificationService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    handleClick(event: MouseEvent, item: ActionBarItem): void;
    getRouterLink(item: ActionBarItem): any[] | null;
    getButtonStyles(item: ActionBarItem): string[];
    private getButtonColorClass;
}
