import { AdministratorService } from './services/administrator.service';
import { ChannelService } from './services/channel.service';
import { GlobalSettingsService } from './services/global-settings.service';
import { RoleService } from './services/role.service';
import { ShippingMethodService } from './services/shipping-method.service';
/**
 * Only used internally to run the various service init methods in the correct
 * sequence on bootstrap.
 */
export declare class InitializerService {
    private channelService;
    private roleService;
    private administratorService;
    private shippingMethodService;
    private globalSettingsService;
    constructor(channelService: ChannelService, roleService: RoleService, administratorService: AdministratorService, shippingMethodService: ShippingMethodService, globalSettingsService: GlobalSettingsService);
    onModuleInit(): Promise<void>;
}
