import { AsyncCacheValue } from "@repo/entities-runtime/async-cache";
import { AppCtxProviderContract } from "@gately/domain-model/shared/context-provider/app/contracts";
import { AppCtx } from "@gately/domain-model/shared/context-provider/app/types";
import { EventBusToken, LoggerToken } from "@gately/domain-model/shared/di-tokens/app/infra";
import {
    ComputeServiceToken,
    LibraryServiceToken,
    TabServiceToken,
} from "@gately/domain-model/shared/di-tokens/app/services";
import {
    ItemBuilderFactoryToken,
    StructureTemplateHasherFactoryToken,
} from "@gately/domain-model/shared/di-tokens/app/tools";
import type { Resolve } from "@repo/di/types";
import { injectable } from "@repo/di/decorators";

@injectable()
export class AppCtxProvider extends AsyncCacheValue<AppCtx> implements AppCtxProviderContract {
    constructor(private readonly _resolver: Resolve) {
        super(async () => {
            const libraryService = await this._resolver(LibraryServiceToken);
            const computeService = await this._resolver(ComputeServiceToken);
            const tabService = await this._resolver(TabServiceToken);

            const itemBuilderFactory = await this._resolver(ItemBuilderFactoryToken);
            const structureTemplateHasherFactory = await this._resolver(
                StructureTemplateHasherFactoryToken
            );

            const eventBus = await this._resolver(EventBusToken);
            const logger = await this._resolver(LoggerToken);

            return {
                services: {
                    libraryService,
                    computeService,
                    tabService,
                },
                infra: {
                    eventBus,
                    logger,
                },
                tools: {
                    itemBuilderFactory,
                    structureTemplateHasherFactory,
                },
            };
        });
    }
}
