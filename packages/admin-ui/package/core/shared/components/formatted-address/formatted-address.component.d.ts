import { AddressFragment, OrderAddress } from '../../../common/generated-types';
export declare class FormattedAddressComponent {
    address: AddressFragment | OrderAddress;
    getCountryName(): string;
    getCustomFields(): Array<{
        key: string;
        value: any;
    }>;
    private isAddressFragment;
}
