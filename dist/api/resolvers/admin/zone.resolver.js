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
exports.ZoneResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const generated_types_1 = require("@vendure/common/lib/generated-types");
const zone_service_1 = require("../../../service/services/zone.service");
const request_context_1 = require("../../common/request-context");
const allow_decorator_1 = require("../../decorators/allow.decorator");
const request_context_decorator_1 = require("../../decorators/request-context.decorator");
const transaction_decorator_1 = require("../../decorators/transaction.decorator");
let ZoneResolver = class ZoneResolver {
    constructor(zoneService) {
        this.zoneService = zoneService;
    }
    zones(ctx) {
        return this.zoneService.findAll(ctx);
    }
    async zone(ctx, args) {
        return this.zoneService.findOne(ctx, args.id);
    }
    async createZone(ctx, args) {
        return this.zoneService.create(ctx, args.input);
    }
    async updateZone(ctx, args) {
        return this.zoneService.update(ctx, args.input);
    }
    async deleteZone(ctx, args) {
        return this.zoneService.delete(ctx, args.id);
    }
    async addMembersToZone(ctx, args) {
        return this.zoneService.addMembersToZone(ctx, args);
    }
    async removeMembersFromZone(ctx, args) {
        return this.zoneService.removeMembersFromZone(ctx, args);
    }
};
__decorate([
    graphql_1.Query(),
    allow_decorator_1.Allow(generated_types_1.Permission.ReadSettings, generated_types_1.Permission.ReadZone),
    __param(0, request_context_decorator_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext]),
    __metadata("design:returntype", Array)
], ZoneResolver.prototype, "zones", null);
__decorate([
    graphql_1.Query(),
    allow_decorator_1.Allow(generated_types_1.Permission.ReadSettings, generated_types_1.Permission.ReadZone),
    __param(0, request_context_decorator_1.Ctx()), __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], ZoneResolver.prototype, "zone", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.CreateSettings, generated_types_1.Permission.CreateZone),
    __param(0, request_context_decorator_1.Ctx()), __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], ZoneResolver.prototype, "createZone", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.UpdateSettings, generated_types_1.Permission.UpdateZone),
    __param(0, request_context_decorator_1.Ctx()), __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], ZoneResolver.prototype, "updateZone", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.DeleteSettings, generated_types_1.Permission.DeleteZone),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], ZoneResolver.prototype, "deleteZone", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.UpdateSettings, generated_types_1.Permission.UpdateZone),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], ZoneResolver.prototype, "addMembersToZone", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.UpdateSettings, generated_types_1.Permission.UpdateZone),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], ZoneResolver.prototype, "removeMembersFromZone", null);
ZoneResolver = __decorate([
    graphql_1.Resolver('Zone'),
    __metadata("design:paramtypes", [zone_service_1.ZoneService])
], ZoneResolver);
exports.ZoneResolver = ZoneResolver;
//# sourceMappingURL=zone.resolver.js.map