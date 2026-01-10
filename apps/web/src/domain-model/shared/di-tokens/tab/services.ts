import { createToken } from "@repo/di/helpers";
import { ItemServiceContract } from "@repo/modules-runtime/item/contracts";
import { ScopeServiceContract } from "@repo/modules-runtime/scope/contracts";
import { LinkServiceContract } from "@repo/modules-runtime/link/contracts";
import { SimulationServiceContract } from "@gately/domain-model/shared/simulation";

export const ItemServiceToken = createToken<ItemServiceContract>("ItemService");
export const ScopeServiceToken = createToken<ScopeServiceContract>("ScopeService");
export const LinkServiceToken = createToken<LinkServiceContract>("LinkService");
export const SimulationServiceToken = createToken<SimulationServiceContract>("SimulationService");
