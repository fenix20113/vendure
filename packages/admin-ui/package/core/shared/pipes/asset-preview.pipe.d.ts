import { PipeTransform } from '@angular/core';
import { AssetFragment } from '../../common/generated-types';
export declare class AssetPreviewPipe implements PipeTransform {
    transform(asset?: AssetFragment, preset?: string | number): string;
}
