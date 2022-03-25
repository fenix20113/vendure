import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare type SystemStatus = 'ok' | 'error';
export interface HealthCheckResult {
    status: SystemStatus;
    info: {
        [name: string]: HealthCheckSuccessResult;
    };
    details: {
        [name: string]: HealthCheckSuccessResult | HealthCheckErrorResult;
    };
    error: {
        [name: string]: HealthCheckErrorResult;
    };
}
export interface HealthCheckSuccessResult {
    status: 'up';
}
export interface HealthCheckErrorResult {
    status: 'down';
    message: string;
}
export declare class HealthCheckService {
    private httpClient;
    status$: Observable<SystemStatus>;
    details$: Observable<Array<{
        key: string;
        result: HealthCheckSuccessResult | HealthCheckErrorResult;
    }>>;
    lastCheck$: Observable<Date>;
    private readonly pollingDelayMs;
    private readonly healthCheckEndpoint;
    private readonly _refresh;
    constructor(httpClient: HttpClient);
    refresh(): void;
    private checkHealth;
}
