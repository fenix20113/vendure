import { ATTEMPT_LOGIN, GET_CURRENT_USER, LOG_OUT } from '../definitions/auth-definitions';
export class AuthDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    currentUser() {
        return this.baseDataService.query(GET_CURRENT_USER);
    }
    attemptLogin(username, password, rememberMe) {
        return this.baseDataService.mutate(ATTEMPT_LOGIN, {
            username,
            password,
            rememberMe,
        });
    }
    logOut() {
        return this.baseDataService.mutate(LOG_OUT);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1kYXRhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvcmUvc3JjL2RhdGEvcHJvdmlkZXJzL2F1dGgtZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFJM0YsTUFBTSxPQUFPLGVBQWU7SUFDeEIsWUFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQUcsQ0FBQztJQUV4RCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBdUIsZ0JBQWdCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsWUFBWSxDQUFDLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxVQUFtQjtRQUNoRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFnRCxhQUFhLEVBQUU7WUFDN0YsUUFBUTtZQUNSLFFBQVE7WUFDUixVQUFVO1NBQ2IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFrQixPQUFPLENBQUMsQ0FBQztJQUNqRSxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdHRlbXB0TG9naW4sIEdldEN1cnJlbnRVc2VyLCBMb2dPdXQgfSBmcm9tICcuLi8uLi9jb21tb24vZ2VuZXJhdGVkLXR5cGVzJztcbmltcG9ydCB7IEFUVEVNUFRfTE9HSU4sIEdFVF9DVVJSRU5UX1VTRVIsIExPR19PVVQgfSBmcm9tICcuLi9kZWZpbml0aW9ucy9hdXRoLWRlZmluaXRpb25zJztcblxuaW1wb3J0IHsgQmFzZURhdGFTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLWRhdGEuc2VydmljZSc7XG5cbmV4cG9ydCBjbGFzcyBBdXRoRGF0YVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFzZURhdGFTZXJ2aWNlOiBCYXNlRGF0YVNlcnZpY2UpIHt9XG5cbiAgICBjdXJyZW50VXNlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLnF1ZXJ5PEdldEN1cnJlbnRVc2VyLlF1ZXJ5PihHRVRfQ1VSUkVOVF9VU0VSKTtcbiAgICB9XG5cbiAgICBhdHRlbXB0TG9naW4odXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgcmVtZW1iZXJNZTogYm9vbGVhbikge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPEF0dGVtcHRMb2dpbi5NdXRhdGlvbiwgQXR0ZW1wdExvZ2luLlZhcmlhYmxlcz4oQVRURU1QVF9MT0dJTiwge1xuICAgICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgIHJlbWVtYmVyTWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvZ091dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxMb2dPdXQuTXV0YXRpb24+KExPR19PVVQpO1xuICAgIH1cbn1cbiJdfQ==