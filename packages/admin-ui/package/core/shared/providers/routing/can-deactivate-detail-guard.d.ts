import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DeactivateAware } from '../../../common/deactivate-aware';
import { ModalService } from '../../../providers/modal/modal.service';
export declare class CanDeactivateDetailGuard implements CanDeactivate<DeactivateAware> {
    private modalService;
    private router;
    constructor(modalService: ModalService, router: Router);
    canDeactivate(component: DeactivateAware, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean>;
}
