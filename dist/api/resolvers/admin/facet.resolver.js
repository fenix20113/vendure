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
exports.FacetResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const generated_types_1 = require("@vendure/common/lib/generated-types");
const errors_1 = require("../../../common/error/errors");
const config_service_1 = require("../../../config/config.service");
const facet_value_service_1 = require("../../../service/services/facet-value.service");
const facet_service_1 = require("../../../service/services/facet.service");
const request_context_1 = require("../../common/request-context");
const allow_decorator_1 = require("../../decorators/allow.decorator");
const request_context_decorator_1 = require("../../decorators/request-context.decorator");
const transaction_decorator_1 = require("../../decorators/transaction.decorator");
let FacetResolver = class FacetResolver {
    constructor(facetService, facetValueService, configService) {
        this.facetService = facetService;
        this.facetValueService = facetValueService;
        this.configService = configService;
    }
    facets(ctx, args) {
        return this.facetService.findAll(ctx, args.options || undefined);
    }
    async facet(ctx, args) {
        return this.facetService.findOne(ctx, args.id);
    }
    async createFacet(ctx, args) {
        const { input } = args;
        const facet = await this.facetService.create(ctx, args.input);
        if (input.values && input.values.length) {
            for (const value of input.values) {
                const newValue = await this.facetValueService.create(ctx, facet, value);
                facet.values.push(newValue);
            }
        }
        return facet;
    }
    async updateFacet(ctx, args) {
        const { input } = args;
        return this.facetService.update(ctx, args.input);
    }
    async deleteFacet(ctx, args) {
        return this.facetService.delete(ctx, args.id, args.force || false);
    }
    async createFacetValues(ctx, args) {
        const { input } = args;
        const facetId = input[0].facetId;
        const facet = await this.facetService.findOne(ctx, facetId);
        if (!facet) {
            throw new errors_1.EntityNotFoundError('Facet', facetId);
        }
        const facetValues = [];
        for (const facetValue of input) {
            const res = await this.facetValueService.create(ctx, facet, facetValue);
            facetValues.push(res);
        }
        return facetValues;
    }
    async updateFacetValues(ctx, args) {
        const { input } = args;
        return Promise.all(input.map(facetValue => this.facetValueService.update(ctx, facetValue)));
    }
    async deleteFacetValues(ctx, args) {
        // return Promise.all(args.ids.map(id => this.facetValueService.delete(ctx, id, args.force || false)));
        const results = [];
        for (const id of args.ids) {
            results.push(await this.facetValueService.delete(ctx, id, args.force || false));
        }
        return results;
    }
};
__decorate([
    graphql_1.Query(),
    allow_decorator_1.Allow(generated_types_1.Permission.ReadCatalog, generated_types_1.Permission.ReadProduct, generated_types_1.Permission.ReadFacet),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], FacetResolver.prototype, "facets", null);
__decorate([
    graphql_1.Query(),
    allow_decorator_1.Allow(generated_types_1.Permission.ReadCatalog, generated_types_1.Permission.ReadProduct, generated_types_1.Permission.ReadFacet),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], FacetResolver.prototype, "facet", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.CreateCatalog, generated_types_1.Permission.CreateFacet),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], FacetResolver.prototype, "createFacet", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.UpdateCatalog, generated_types_1.Permission.UpdateFacet),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], FacetResolver.prototype, "updateFacet", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.DeleteCatalog, generated_types_1.Permission.DeleteFacet),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], FacetResolver.prototype, "deleteFacet", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.CreateCatalog, generated_types_1.Permission.CreateFacet),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], FacetResolver.prototype, "createFacetValues", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.UpdateCatalog, generated_types_1.Permission.UpdateFacet),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], FacetResolver.prototype, "updateFacetValues", null);
__decorate([
    transaction_decorator_1.Transaction(),
    graphql_1.Mutation(),
    allow_decorator_1.Allow(generated_types_1.Permission.DeleteCatalog, generated_types_1.Permission.DeleteFacet),
    __param(0, request_context_decorator_1.Ctx()),
    __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_context_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], FacetResolver.prototype, "deleteFacetValues", null);
FacetResolver = __decorate([
    graphql_1.Resolver('Facet'),
    __metadata("design:paramtypes", [facet_service_1.FacetService,
        facet_value_service_1.FacetValueService,
        config_service_1.ConfigService])
], FacetResolver);
exports.FacetResolver = FacetResolver;
//# sourceMappingURL=facet.resolver.js.map