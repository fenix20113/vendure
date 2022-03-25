import { CreateCustomerGroupInput, CustomerGroupListOptions, CustomerListOptions, DeletionResponse, MutationAddCustomersToGroupArgs, MutationRemoveCustomersFromGroupArgs, UpdateCustomerGroupInput } from '@vendure/common/lib/generated-types';
import { ID, PaginatedList } from '@vendure/common/lib/shared-types';
import { RequestContext } from '../../api/common/request-context';
import { CustomerGroup } from '../../entity/customer-group/customer-group.entity';
import { Customer } from '../../entity/customer/customer.entity';
import { EventBus } from '../../event-bus/event-bus';
import { ListQueryBuilder } from '../helpers/list-query-builder/list-query-builder';
import { TransactionalConnection } from '../transaction/transactional-connection';
import { HistoryService } from './history.service';
export declare class CustomerGroupService {
    private connection;
    private listQueryBuilder;
    private historyService;
    private eventBus;
    constructor(connection: TransactionalConnection, listQueryBuilder: ListQueryBuilder, historyService: HistoryService, eventBus: EventBus);
    findAll(ctx: RequestContext, options?: CustomerGroupListOptions): Promise<PaginatedList<CustomerGroup>>;
    findOne(ctx: RequestContext, customerGroupId: ID): Promise<CustomerGroup | undefined>;
    getGroupCustomers(ctx: RequestContext, customerGroupId: ID, options?: CustomerListOptions): Promise<PaginatedList<Customer>>;
    create(ctx: RequestContext, input: CreateCustomerGroupInput): Promise<CustomerGroup>;
    update(ctx: RequestContext, input: UpdateCustomerGroupInput): Promise<CustomerGroup>;
    delete(ctx: RequestContext, id: ID): Promise<DeletionResponse>;
    addCustomersToGroup(ctx: RequestContext, input: MutationAddCustomersToGroupArgs): Promise<CustomerGroup>;
    removeCustomersFromGroup(ctx: RequestContext, input: MutationRemoveCustomersFromGroupArgs): Promise<CustomerGroup>;
    private getCustomersFromIds;
}
