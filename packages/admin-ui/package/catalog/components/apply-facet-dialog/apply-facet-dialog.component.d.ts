import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Dialog, FacetValue, FacetWithValues } from '@vendure/admin-ui/core';
export declare class ApplyFacetDialogComponent implements Dialog<FacetValue[]>, AfterViewInit {
    private changeDetector;
    private selector;
    resolveWith: (result?: FacetValue[]) => void;
    selectedValues: FacetValue[];
    facets: FacetWithValues.Fragment[];
    constructor(changeDetector: ChangeDetectorRef);
    ngAfterViewInit(): void;
    selectValues(): void;
    cancel(): void;
}
