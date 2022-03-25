import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { JobInfoFragment } from '../../common/generated-types';
import { DataService } from '../../data/providers/data.service';
export declare class JobQueueService implements OnDestroy {
    private dataService;
    activeJobs$: Observable<JobInfoFragment[]>;
    private updateJob$;
    private onCompleteHandlers;
    private readonly subscription;
    constructor(dataService: DataService);
    ngOnDestroy(): void;
    /**
     * After a given delay, checks the server for any active jobs.
     */
    checkForJobs(delay?: number): void;
    addJob(jobId: string, onComplete?: (job: JobInfoFragment) => void): void;
    private handleJob;
}
