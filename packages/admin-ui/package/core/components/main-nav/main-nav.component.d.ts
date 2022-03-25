import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data/providers/data.service';
import { HealthCheckService } from '../../providers/health-check/health-check.service';
import { JobQueueService } from '../../providers/job-queue/job-queue.service';
import { NavMenuItem } from '../../providers/nav-builder/nav-builder-types';
import { NavBuilderService } from '../../providers/nav-builder/nav-builder.service';
export declare class MainNavComponent implements OnInit, OnDestroy {
    private route;
    private router;
    navBuilderService: NavBuilderService;
    private healthCheckService;
    private jobQueueService;
    private dataService;
    constructor(route: ActivatedRoute, router: Router, navBuilderService: NavBuilderService, healthCheckService: HealthCheckService, jobQueueService: JobQueueService, dataService: DataService);
    private userPermissions;
    private subscription;
    shouldDisplayLink(menuItem: Pick<NavMenuItem, 'requiresPermission'>): boolean | undefined;
    ngOnInit(): void;
    ngOnDestroy(): void;
    getRouterLink(item: NavMenuItem): import("../../common/generated-types").Maybe<string[]>;
    private defineNavMenu;
}
