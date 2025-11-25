import { ItemBuilderSetup } from "../../../item-builder/setup";
import { TabFactorySetup } from "../../../tab-factory";
import { TabStoreSetup } from "../../../tab-store";
import { TemplateBuilderSetup } from "../../../template-builder";
import { makeDefaultFlowTool, makeDefaultExecutorTool } from "@engine/use-casess/tools";
import { ComputeSetup, InMemoryLibraryStoreSetup, ItemFactorySetup, ItemStoreSetup, LinkStoreSetup, ScopeFactorySetup, ScopeStoreSetup, } from "@repo/modules-runtime";
export const makeUseCaseCtx = () => {
    const computeService = ComputeSetup.init();
    const scopeFactory = ScopeFactorySetup.init();
    return {
        computeService: ComputeSetup.init(),
        itemBuilder: ItemBuilderSetup.init({
            itemFactory: ItemFactorySetup.init(),
            getTemplate: InMemoryLibraryStoreSetup.init().get,
            scopeFactory,
        }),
        tabStore: TabStoreSetup.init(),
        tplBuilder: TemplateBuilderSetup.init(),
        libraryStore: InMemoryLibraryStoreSetup.init(),
        scopeFactory: ScopeFactorySetup.init(),
        tabFactory: TabFactorySetup.init({
            itemCompute: computeService,
            // makeItemOptionsStore: () => ItemOptionsStoreSetup.init(),
            makeItemStore: () => ItemStoreSetup.init(),
            makeScopeStore: () => ScopeStoreSetup.init(),
            makeLinkStore: () => LinkStoreSetup.init(),
            makeSimulation: () => { },
            // SimulationRunnerSetup.init({
            // 	computeService,
            // 	// itemOptionsStore: ItemOptionsStoreSetup.init(),
            // 	itemStore: ItemStoreSetup.init(),
            // 	linkStore: LinkStoreSetup.init(),
            // 	scopeStore: ScopeStoreSetup.init(),
            // }),
        }),
        useCaseInfra: {
            makeFlowTool: makeDefaultFlowTool,
            makeExecutorTool: makeDefaultExecutorTool,
        },
    };
};
