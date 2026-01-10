import { SimulationServiceContract } from "../../simulation";
import { EventBusContract } from "../../event-bus";
import { LoggerContract } from "../../error-logger";
import { ItemServiceContract, ItemStoreContract } from "@repo/modules-runtime/item/contracts";
import { ScopeServiceContract, ScopeStoreContract } from "@repo/modules-runtime/scope/contracts";
import { LinkServiceContract, LinkStoreContract } from "@repo/modules-runtime/link/contracts";

export interface TabCtx {
    services: {
        simulationService: SimulationServiceContract;
        itemService: ItemServiceContract;
        scopeService: ScopeServiceContract;
        linkService: LinkServiceContract;
    };
    stores: { items: ItemStoreContract; scopes: ScopeStoreContract; links: LinkStoreContract };
    infra: { eventBus: EventBusContract; logger: LoggerContract };
}
