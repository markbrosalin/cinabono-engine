import { Id } from "@cnbn/schema";
import { DefaultTabCreator } from "./creator";
import { TabCreatorDeps, TabFactory, TabFactoryOverrides } from "./types";

export class TabFactorySetup {
    static init(deps: TabCreatorDeps, overrides: TabFactoryOverrides = {}): TabFactory {
        const itemStore = deps.makeItemStore();
        const scopeStore = deps.makeScopeStore();
        const linkStore = deps.makeLinkStore();
        const computeService = deps.itemCompute;

        const simulation = deps.makeSimulation({
            getItem: (id: Id) => itemStore.get(id),
            getLink: (id: Id) => linkStore.get(id),
            getScope: (id: Id) => scopeStore.get(id),
            computeService,
        });

        const creator = overrides.makeTabCreator?.() ?? new DefaultTabCreator();

        return (tabId) => creator.create({ itemStore, scopeStore, linkStore, simulation }, tabId);
    }
}
