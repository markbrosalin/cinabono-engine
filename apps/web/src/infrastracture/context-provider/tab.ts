import { TabCtxProviderContract } from "@gately/domain-model/shared/context-provider/tab/contracts";
import { TabCtx } from "@gately/domain-model/shared/context-provider/tab/types";
import { AsyncCacheValue } from "@repo/entities-runtime/async-cache";
import type { Resolve } from "@repo/di/types";
import { injectable } from "@repo/di/decorators";
import {
    ItemServiceToken,
    LinkServiceToken,
    ScopeServiceToken,
    SimulationServiceToken,
} from "@gately/domain-model/shared/di-tokens/tab/services";
import { EventBusToken, LoggerToken } from "@gately/domain-model/shared/di-tokens/app/infra";

@injectable()
export class TabCtxProvider extends AsyncCacheValue<TabCtx> implements TabCtxProviderContract {
    constructor(private readonly _resolver: Resolve) {
        super(async () => {
            const itemService = await this._resolver(ItemServiceToken);
            const scopeService = await this._resolver(ScopeServiceToken);
            const linkService = await this._resolver(LinkServiceToken);
            const simulationService = await this._resolver(SimulationServiceToken);
            const eventBus = await this._resolver(EventBusToken);
            const logger = await this._resolver(LoggerToken);

            const services = { itemService, scopeService, linkService, simulationService };

            return {
                services,
                infra: { eventBus, logger },
                stores: pickStores(services),
            };
        });
    }
}

function pickStores(services: TabCtx["services"]) {
    const { itemService, scopeService, linkService } = services;
    return {
        items: itemService.store,
        scopes: scopeService.store,
        links: linkService.store,
    };
}
