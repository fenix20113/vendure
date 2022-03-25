import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent, DataService, GetAllJobs, GetJobQueueList, ModalService, NotificationService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
export declare class JobListComponent extends BaseListComponent<GetAllJobs.Query, GetAllJobs.Items> implements OnInit {
    private dataService;
    private modalService;
    private notificationService;
    queues$: Observable<GetJobQueueList.JobQueues[]>;
    liveUpdate: FormControl;
    hideSettled: FormControl;
    queueFilter: FormControl;
    constructor(dataService: DataService, modalService: ModalService, notificationService: NotificationService, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    hasResult(job: GetAllJobs.Items): boolean;
    cancelJob(id: string): void;
}
