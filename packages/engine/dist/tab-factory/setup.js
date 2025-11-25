import { DefaultTabCreator } from "./creator";
export class TabFactorySetup {
    static init(deps, overrides = {}) {
        const itemStore = deps.makeItemStore();
        const scopeStore = deps.makeScopeStore();
        const linkStore = deps.makeLinkStore();
        const computeService = deps.itemCompute;
        const simulation = deps.makeSimulation({
            getItem: (id) => itemStore.get(id),
            getLink: (id) => linkStore.get(id),
            getScope: (id) => scopeStore.get(id),
            computeService,
        });
        const creator = overrides.makeTabCreator?.() ?? new DefaultTabCreator();
        return (tabId) => creator.create({ itemStore, scopeStore, linkStore, simulation }, tabId);
    }
}
