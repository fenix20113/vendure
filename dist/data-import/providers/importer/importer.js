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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Importer = void 0;
const common_1 = require("@nestjs/common");
const normalize_string_1 = require("@vendure/common/lib/normalize-string");
const progress_1 = __importDefault(require("progress"));
const rxjs_1 = require("rxjs");
const request_context_1 = require("../../../api/common/request-context");
const config_service_1 = require("../../../config/config.service");
const channel_service_1 = require("../../../service/services/channel.service");
const facet_value_service_1 = require("../../../service/services/facet-value.service");
const facet_service_1 = require("../../../service/services/facet.service");
const tax_category_service_1 = require("../../../service/services/tax-category.service");
const asset_importer_1 = require("../asset-importer/asset-importer");
const import_parser_1 = require("../import-parser/import-parser");
const fast_importer_service_1 = require("./fast-importer.service");
let Importer = class Importer {
    constructor(configService, importParser, channelService, facetService, facetValueService, taxCategoryService, assetImporter, fastImporter) {
        this.configService = configService;
        this.importParser = importParser;
        this.channelService = channelService;
        this.facetService = facetService;
        this.facetValueService = facetValueService;
        this.taxCategoryService = taxCategoryService;
        this.assetImporter = assetImporter;
        this.fastImporter = fastImporter;
        this.taxCategoryMatches = {};
        // These Maps are used to cache newly-created entities and prevent duplicates
        // from being created.
        this.facetMap = new Map();
        this.facetValueMap = new Map();
    }
    parseAndImport(input, ctxOrLanguageCode, reportProgress = false) {
        let bar;
        return new rxjs_1.Observable(subscriber => {
            const p = this.doParseAndImport(input, ctxOrLanguageCode, progress => {
                if (reportProgress) {
                    if (!bar) {
                        bar = new progress_1.default('  importing [:bar] :percent :etas  Importing: :prodName', {
                            complete: '=',
                            incomplete: ' ',
                            total: progress.processed,
                            width: 40,
                        });
                    }
                    bar.tick({ prodName: progress.currentProduct });
                }
                subscriber.next(progress);
            }).then(value => {
                subscriber.next(Object.assign(Object.assign({}, value), { currentProduct: 'Complete' }));
                subscriber.complete();
            });
        });
    }
    async doParseAndImport(input, ctxOrLanguageCode, onProgress) {
        const ctx = await this.getRequestContext(ctxOrLanguageCode);
        const parsed = await this.importParser.parseProducts(input);
        if (parsed && parsed.results.length) {
            try {
                const importErrors = await this.importProducts(ctx, parsed.results, progess => {
                    onProgress(Object.assign(Object.assign({}, progess), { processed: parsed.processed }));
                });
                return {
                    errors: parsed.errors.concat(importErrors),
                    imported: parsed.results.length,
                    processed: parsed.processed,
                };
            }
            catch (err) {
                return {
                    errors: [err.message],
                    imported: 0,
                    processed: parsed.processed,
                };
            }
        }
        else {
            return {
                errors: [],
                imported: 0,
                processed: parsed.processed,
            };
        }
    }
    async getRequestContext(ctxOrLanguageCode) {
        if (ctxOrLanguageCode instanceof request_context_1.RequestContext) {
            return ctxOrLanguageCode;
        }
        else {
            const channel = await this.channelService.getDefaultChannel();
            return new request_context_1.RequestContext({
                apiType: 'admin',
                isAuthorized: true,
                authorizedAsOwnerOnly: false,
                channel,
                languageCode: ctxOrLanguageCode,
            });
        }
    }
    /**
     * Imports the products specified in the rows object. Return an array of error messages.
     */
    async importProducts(ctx, rows, onProgress) {
        let errors = [];
        let imported = 0;
        const languageCode = ctx.languageCode;
        const taxCategories = await this.taxCategoryService.findAll(ctx);
        await this.fastImporter.initialize();
        for (const { product, variants } of rows) {
            const createProductAssets = await this.assetImporter.getAssets(product.assetPaths);
            const productAssets = createProductAssets.assets;
            if (createProductAssets.errors.length) {
                errors = errors.concat(createProductAssets.errors);
            }
            const createdProductId = await this.fastImporter.createProduct({
                featuredAssetId: productAssets.length ? productAssets[0].id : undefined,
                assetIds: productAssets.map(a => a.id),
                facetValueIds: await this.getFacetValueIds(product.facets, languageCode),
                translations: [
                    {
                        languageCode,
                        name: product.name,
                        description: product.description,
                        slug: product.slug,
                    },
                ],
                customFields: product.customFields,
            });
            const optionsMap = {};
            for (const optionGroup of product.optionGroups) {
                const code = normalize_string_1.normalizeString(`${product.name}-${optionGroup.name}`, '-');
                const groupId = await this.fastImporter.createProductOptionGroup({
                    code,
                    options: optionGroup.values.map(name => ({})),
                    translations: [
                        {
                            languageCode,
                            name: optionGroup.name,
                        },
                    ],
                });
                for (const option of optionGroup.values) {
                    const createdOptionId = await this.fastImporter.createProductOption({
                        productOptionGroupId: groupId,
                        code: normalize_string_1.normalizeString(option, '-'),
                        translations: [
                            {
                                languageCode,
                                name: option,
                            },
                        ],
                    });
                    optionsMap[option] = createdOptionId;
                }
                await this.fastImporter.addOptionGroupToProduct(createdProductId, groupId);
            }
            for (const variant of variants) {
                const createVariantAssets = await this.assetImporter.getAssets(variant.assetPaths);
                const variantAssets = createVariantAssets.assets;
                if (createVariantAssets.errors.length) {
                    errors = errors.concat(createVariantAssets.errors);
                }
                let facetValueIds = [];
                if (0 < variant.facets.length) {
                    facetValueIds = await this.getFacetValueIds(variant.facets, languageCode);
                }
                const createdVariant = await this.fastImporter.createProductVariant({
                    productId: createdProductId,
                    facetValueIds,
                    featuredAssetId: variantAssets.length ? variantAssets[0].id : undefined,
                    assetIds: variantAssets.map(a => a.id),
                    sku: variant.sku,
                    taxCategoryId: this.getMatchingTaxCategoryId(variant.taxCategory, taxCategories),
                    stockOnHand: variant.stockOnHand,
                    trackInventory: variant.trackInventory,
                    optionIds: variant.optionValues.map(v => optionsMap[v]),
                    translations: [
                        {
                            languageCode,
                            name: [product.name, ...variant.optionValues].join(' '),
                        },
                    ],
                    price: Math.round(variant.price * 100),
                    customFields: variant.customFields,
                });
            }
            imported++;
            onProgress({
                processed: 0,
                imported,
                errors,
                currentProduct: product.name,
            });
        }
        return errors;
    }
    async getFacetValueIds(facets, languageCode) {
        const facetValueIds = [];
        const ctx = new request_context_1.RequestContext({
            channel: this.channelService.getDefaultChannel(),
            apiType: 'admin',
            isAuthorized: true,
            authorizedAsOwnerOnly: false,
            session: {},
        });
        for (const item of facets) {
            const facetName = item.facet;
            const valueName = item.value;
            let facetEntity;
            const cachedFacet = this.facetMap.get(facetName);
            if (cachedFacet) {
                facetEntity = cachedFacet;
            }
            else {
                const existing = await this.facetService.findByCode(normalize_string_1.normalizeString(facetName), languageCode);
                if (existing) {
                    facetEntity = existing;
                }
                else {
                    facetEntity = await this.facetService.create(ctx, {
                        isPrivate: false,
                        code: normalize_string_1.normalizeString(facetName, '-'),
                        translations: [{ languageCode, name: facetName }],
                    });
                }
                this.facetMap.set(facetName, facetEntity);
            }
            let facetValueEntity;
            const facetValueMapKey = `${facetName}:${valueName}`;
            const cachedFacetValue = this.facetValueMap.get(facetValueMapKey);
            if (cachedFacetValue) {
                facetValueEntity = cachedFacetValue;
            }
            else {
                const existing = facetEntity.values.find(v => v.name === valueName);
                if (existing) {
                    facetValueEntity = existing;
                }
                else {
                    facetValueEntity = await this.facetValueService.create(request_context_1.RequestContext.empty(), facetEntity, {
                        code: normalize_string_1.normalizeString(valueName, '-'),
                        translations: [{ languageCode, name: valueName }],
                    });
                }
                this.facetValueMap.set(facetValueMapKey, facetValueEntity);
            }
            facetValueIds.push(facetValueEntity.id);
        }
        return facetValueIds;
    }
    /**
     * Attempts to match a TaxCategory entity against the name supplied in the import table. If no matches
     * are found, the first TaxCategory id is returned.
     */
    getMatchingTaxCategoryId(name, taxCategories) {
        if (this.taxCategoryMatches[name]) {
            return this.taxCategoryMatches[name];
        }
        const regex = new RegExp(name, 'i');
        const found = taxCategories.find(tc => !!tc.name.match(regex));
        const match = found ? found : taxCategories[0];
        this.taxCategoryMatches[name] = match.id;
        return match.id;
    }
};
Importer = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        import_parser_1.ImportParser,
        channel_service_1.ChannelService,
        facet_service_1.FacetService,
        facet_value_service_1.FacetValueService,
        tax_category_service_1.TaxCategoryService,
        asset_importer_1.AssetImporter,
        fast_importer_service_1.FastImporterService])
], Importer);
exports.Importer = Importer;
//# sourceMappingURL=importer.js.map