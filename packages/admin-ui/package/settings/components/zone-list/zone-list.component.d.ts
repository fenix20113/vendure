import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, GetZones, ModalService, NotificationService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class ZoneListComponent implements OnInit {
    private dataService;
    private notificationService;
    private modalService;
    private route;
    private router;
    activeZone$: Observable<GetZones.Zones | undefined>;
    zones$: Observable<GetZones.Zones[]>;
    members$: Observable<GetZones.Members[]>;
    selectedMemberIds: string[];
    constructor(dataService: DataService, notificationService: NotificationService, modalService: ModalService, route: ActivatedRoute, router: Router);
    ngOnInit(): void;
    create(): void;
    delete(zoneId: string): void;
    update(zone: GetZones.Zones): void;
    closeMembers(): void;
    addToZone(zone: GetZones.Zones): void;
    removeFromZone(zone: GetZones.Zones, memberIds: string[]): void;
}
