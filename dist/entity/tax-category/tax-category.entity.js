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
exports.TaxCategory = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
/**
 * @description
 * A TaxCategory defines what type of taxes to apply to a {@link ProductVariant}.
 *
 * @docsCategory entities
 */
let TaxCategory = class TaxCategory extends base_entity_1.VendureEntity {
    constructor(input) {
        super(input);
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TaxCategory.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], TaxCategory.prototype, "isDefault", void 0);
TaxCategory = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], TaxCategory);
exports.TaxCategory = TaxCategory;
//# sourceMappingURL=tax-category.entity.js.map