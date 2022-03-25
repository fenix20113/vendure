"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerGroupResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const generated_types_1 = require("@vendure/common/lib/generated-types");
const customer_group_service_1 = require("../../../service/services/customer-group.service");
const request_context_1 = require("../../common/request-context");
const allow_decorator_1 = require("../../decorators/allow.decorator");
const request_context_decorator_1 = require("../../decorators/request-context.decorator");
const transaction_decorator_1 = require("../../decorators/transaction.decorator");
let CustomerGroupResolver = class CustomerGroupResolver {
    constructor(customerGroupService) {
        this.customerGroupService = customerGroupService;
    }
    customerGroups(ctx, args) {
        return this.customerGroupService.findAll(ctx, args.options || undefined);
    }
    async customerGroup(ctx, args) {
        return this.customerGroupService.findOne(ctx, args.id);
    }
    async createCustomerGroup(ctx, args) {
        return this.customerGroupService.create(ctx, args.input);
    }
    async updateCustomerGroup(ctx, args) {
        return this.customerGroupService.update(ctx, args.input);
    }
    async deleteCustomerGroup(ctx, args) {
        return this.customerGroupService.delete(ctx, args.id);
    }
    async addCustomersToGroup(ctx, args) {
        return this.customerGroupService.addCustomersToGroup(ctx, args);
    }
    async removeCustomersFromGroup(ctx, args) {
        return this.customerGroupService.removeCustomersFromGroup(ctx, args);
    }
};
__decorate([
    graphql_1.Query(),
    allow_decorator_1.Allow(generated_types_1.Permission.ReadCustomer, generated_types_1.Permission.ReadCustomerGroup),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CustomerGroupResolver.prototype, "customerGroups", null);
__decorate([
    graphql_1.Query(),
    allow_decorator_1.Allow(generated_types_1.Permission.ReadCustomer, generated_types_1.Permission.ReadCustomerGroup),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CustomerGroupResolver.prototype, "customerGroup", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.CreateCustomerGroup),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CustomerGroupResolver.prototype, "createCustomerGroup", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.UpdateCustomerGroup),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CustomerGroupResolver.prototype, "updateCustomerGroup", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.DeleteCustomerGroup),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CustomerGroupResolver.prototype, "deleteCustomerGroup", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.UpdateCustomerGroup),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CustomerGroupResolver.prototype, "addCustomersToGroup", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.UpdateCustomerGroup),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], CustomerGroupResolver.prototype, "removeCustomersFromGroup", null);
CustomerGroupResolver = __decorate([
    graphql_1.Resolver('CustomerGroup'),
    __metadata("design:paramtypes", [customer_group_service_1.CustomerGroupService])
], CustomerGroupResolver);
exports.CustomerGroupResolver = CustomerGroupResolver;
//# sourceMappingURL=customer-group.resolver.js.map