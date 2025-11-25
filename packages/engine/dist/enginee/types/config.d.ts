import { ItemBuilderFactoryOverride } from "../../item-builder/setup";
import { TabFactoryOverrides } from "../../tab-factory";
import { TabStoreFactoryOverrides } from "../../tab-store";
import { TemplateBuilderFactoryOverride } from "../../template-builder";
import { ScopeFactoryOverrides, ComputeFactoriesOverrides, InMemoryLibraryStoreFactoryOverrides, ItemFactoryOverrides, ItemStoreFactoryOverrides, LinkStoreFactoryOverrides, ScopeStoreFactoryOverrides } from "@repo/modules-runtime";
import { SimulationFactoriesOverrides } from "@repo/simulation";
import { EnginePlugin } from "../../enginee/plugin";
import { EngineEventBusFactoryOverrides } from "@engine/eventBus/contracts";
export type EngineOverrides = EngineConfig["overrides"];
export interface EngineConfig<P extends readonly EnginePlugin[] = []> {
    overrides?: {
        itemBuilderFactory?: ItemBuilderFactoryOverride;
        tplBuilderFactory?: TemplateBuilderFactoryOverride;
        itemFactory?: ItemFactoryOverrides;
        itemStore?: ItemStoreFactoryOverrides;
        scopeFactory?: ScopeFactoryOverrides;
        scopeStore?: ScopeStoreFactoryOverrides;
        tabFactory?: TabFactoryOverrides;
        tabStore?: TabStoreFactoryOverrides;
        linkStore?: LinkStoreFactoryOverrides;
        libraryStore?: InMemoryLibraryStoreFactoryOverrides;
        computeService?: ComputeFactoriesOverrides;
        simulation?: SimulationFactoriesOverrides;
        eventBus?: EngineEventBusFactoryOverrides;
    };
    plugins?: P;
}
//# sourceMappingURL=config.d.ts.map