"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharpAssetPreviewStrategy = void 0;
const generated_types_1 = require("@vendure/common/lib/generated-types");
const core_1 = require("@vendure/core");
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
class SharpAssetPreviewStrategy {
    constructor(config) {
        this.config = config;
    }
    async generatePreviewImage(ctx, mimeType, data) {
        const assetType = core_1.getAssetType(mimeType);
        const { maxWidth, maxHeight } = this.config;
        if (assetType === generated_types_1.AssetType.IMAGE) {
            const image = sharp_1.default(data);
            const metadata = await image.metadata();
            const width = metadata.width || 0;
            const height = metadata.height || 0;
            if (maxWidth < width || maxHeight < height) {
                return image.resize(maxWidth, maxHeight, { fit: 'inside' }).toBuffer();
            }
            else {
                if (mimeType === 'image/svg+xml') {
                    // Convert the SVG to a raster for the preview
                    return image.toBuffer();
                }
                else {
                    return data;
                }
            }
        }
        else {
            return sharp_1.default(path_1.default.join(__dirname, 'file-icon.png'))
                .resize(800, 800, { fit: 'outside' })
                .composite([
                {
                    input: this.generateMimeTypeOverlay(mimeType),
                    gravity: sharp_1.default.gravity.center,
                },
            ])
                .toBuffer();
        }
    }
    generateMimeTypeOverlay(mimeType) {
        return Buffer.from(`
            <svg xmlns="http://www.w3.org/2000/svg" height="150" width="800">
            <style>
                text {
                   font-size: 64px;
                   font-family: Arial, sans-serif;
                   fill: #666;
                }
              </style>

              <text x="400" y="110"  text-anchor="middle" width="800">${mimeType}</text>
            </svg>`);
    }
}
exports.SharpAssetPreviewStrategy = SharpAssetPreviewStrategy;
//# sourceMappingURL=sharp-asset-preview-strategy.js.map