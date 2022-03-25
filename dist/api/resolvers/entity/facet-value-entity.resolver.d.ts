import { FacetValue } from '../../../entity/facet-value/facet-value.entity';
import { Facet } from '../../../entity/facet/facet.entity';
import { LocaleStringHydrator } from '../../../service/helpers/locale-string-hydrator/locale-string-hydrator';
import { FacetService } from '../../../service/services/facet.service';
import { RequestContext } from '../../common/request-context';
export declare class FacetValueEntityResolver {
    private facetService;
    private localeStringHydrator;
    constructor(facetService: FacetService, localeStringHydrator: LocaleStringHydrator);
    name(ctx: RequestContext, facetValue: FacetValue): Promise<string>;
    facet(ctx: RequestContext, facetValue: FacetValue): Promise<Facet | undefined>;
}
