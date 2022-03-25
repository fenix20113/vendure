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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMovement = void 0;
const generated_types_1 = require("@vendure/common/lib/generated-types");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
const product_variant_entity_1 = require("../product-variant/product-variant.entity");
/**
 * @description
 * A StockMovement is created whenever stock of a particular ProductVariant goes in
 * or out.
 *
 * @docsCategory entities
 */
let StockMovement = class StockMovement extends base_entity_1.VendureEntity {
};
__decorate([
    typeorm_1.Column({ nullable: false, type: 'varchar' }),
    __metadata("design:type", String)
], StockMovement.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(type => product_variant_entity_1.ProductVariant, variant => variant.stockMovements),
    __metadata("design:type", product_variant_entity_1.ProductVariant)
], StockMovement.prototype, "productVariant", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], StockMovement.prototype, "quantity", void 0);
StockMovement = __decorate([
    typeorm_1.Entity(),
    typeorm_1.TableInheritance({ column: { type: 'varchar', name: 'discriminator' } })
], StockMovement);
exports.StockMovement = StockMovement;
//# sourceMappingURL=stock-movement.entity.js.map