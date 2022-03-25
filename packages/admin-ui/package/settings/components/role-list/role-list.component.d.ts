import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from '@vendure/admin-ui/core';
import { GetRoles, Role } from '@vendure/admin-ui/core';
import { NotificationService } from '@vendure/admin-ui/core';
import { DataService } from '@vendure/admin-ui/core';
import { ModalService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class RoleListComponent extends BaseListComponent<GetRoles.Query, GetRoles.Items> implements OnInit {
    private modalService;
    private notificationService;
    private dataService;
    readonly initialLimit = 3;
    displayLimit: {
        [id: string]: number;
    };
    visibleRoles$: Observable<GetRoles.Items[]>;
    constructor(modalService: ModalService, notificationService: NotificationService, dataService: DataService, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    toggleDisplayLimit(role: GetRoles.Items): void;
    isDefaultRole(role: Role): boolean;
    deleteRole(id: string): void;
}
