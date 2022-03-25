import { EventEmitter } from '@angular/core';
import { FacetValue } from '../../../common/generated-types';
export declare class FacetValueChipComponent {
    facetValue: FacetValue.Fragment;
    removable: boolean;
    displayFacetName: boolean;
    remove: EventEmitter<void>;
}
