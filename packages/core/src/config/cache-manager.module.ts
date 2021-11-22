import { CacheModule, Module } from '@nestjs/common';

import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';

/**
 * The coreCacheModule is imported internally by the CacheManagerModule. It is arranged in this way so that
 * there is only a single instance of this module being instantiated, and thus the lifecycle hooks will
 * only run a single time.
 */
const coreCacheModule = CacheModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
        return configService.cacheOptions;
    },
    inject: [ConfigService],
})

@Module({
    imports: [coreCacheModule],
    exports: [coreCacheModule],
})
export class CacheManagerModule {}
