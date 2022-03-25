import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyCode, DataService, DeactivateAware, GetProductVariantOptions, ModalService, NotificationService } from '@vendure/admin-ui/core';
import { ProductDetailService } from '../../providers/product-detail/product-detail.service';
export declare class GeneratedVariant {
    isDefault: boolean;
    options: Array<{
        name: string;
        id?: string;
    }>;
    productVariantId?: string;
    enabled: boolean;
    existing: boolean;
    sku: string;
    price: number;
    stock: number;
    constructor(config: Partial<GeneratedVariant>);
}
export declare class ProductVariantsEditorComponent implements OnInit, DeactivateAware {
    private route;
    private dataService;
    private productDetailService;
    private notificationService;
    private modalService;
    formValueChanged: boolean;
    generatedVariants: GeneratedVariant[];
    optionGroups: Array<{
        id?: string;
        isNew: boolean;
        name: string;
        values: Array<{
            id?: string;
            name: string;
            locked: boolean;
        }>;
    }>;
    product: GetProductVariantOptions.Product;
    currencyCode: CurrencyCode;
    private languageCode;
    constructor(route: ActivatedRoute, dataService: DataService, productDetailService: ProductDetailService, notificationService: NotificationService, modalService: ModalService);
    ngOnInit(): void;
    onFormChanged(variantInfo: GeneratedVariant): void;
    canDeactivate(): boolean;
    getVariantsToAdd(): GeneratedVariant[];
    getVariantName(variant: GeneratedVariant): string;
    addOption(): void;
    generateVariants(): void;
    /**
     * Returns one of the existing variants to base the newly-generated variant's
     * details off.
     */
    private getVariantPrototype;
    deleteVariant(id: string): void;
    save(): void;
    private confirmDeletionOfDefault;
    private hasOnlyDefaultVariant;
    private addOptionGroupsToProduct;
    private addNewOptionsToGroups;
    private fetchOptionGroups;
    private createNewProductVariants;
    private deleteDefaultVariant;
    private reFetchProduct;
    initOptionsAndVariants(): void;
    private optionsAreEqual;
}
