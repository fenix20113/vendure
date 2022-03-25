import { FetchPolicy } from '@apollo/client';
import { CreateAdministratorInput, CreateRoleInput, UpdateActiveAdministratorInput, UpdateAdministratorInput, UpdateRoleInput } from '../../common/generated-types';
import { BaseDataService } from './base-data.service';
export declare class AdministratorDataService {
    private baseDataService;
    constructor(baseDataService: BaseDataService);
    getAdministrators(take?: number, skip?: number): import("../query-result").QueryResult<import("../../common/generated-types").GetAdministratorsQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").AdministratorListOptions | null | undefined;
    }>>;
    getActiveAdministrator(fetchPolicy?: FetchPolicy): import("../query-result").QueryResult<import("../../common/generated-types").GetActiveAdministratorQuery, Record<string, any>>;
    getAdministrator(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetAdministratorQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    createAdministrator(input: CreateAdministratorInput): import("rxjs").Observable<import("../../common/generated-types").CreateAdministratorMutation>;
    updateAdministrator(input: UpdateAdministratorInput): import("rxjs").Observable<import("../../common/generated-types").UpdateAdministratorMutation>;
    updateActiveAdministrator(input: UpdateActiveAdministratorInput): import("rxjs").Observable<import("../../common/generated-types").UpdateActiveAdministratorMutation>;
    deleteAdministrator(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteAdministratorMutation>;
    getRoles(take?: number, skip?: number): import("../query-result").QueryResult<import("../../common/generated-types").GetRolesQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").RoleListOptions | null | undefined;
    }>>;
    getRole(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetRoleQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    createRole(input: CreateRoleInput): import("rxjs").Observable<import("../../common/generated-types").CreateRoleMutation>;
    updateRole(input: UpdateRoleInput): import("rxjs").Observable<import("../../common/generated-types").UpdateRoleMutation>;
    deleteRole(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteRoleMutation>;
}
