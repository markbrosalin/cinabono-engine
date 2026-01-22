import { DefaultTabCreator } from "./creator.js";
export class TabFactorySetup {
    static init(deps, overrides = {}) {
        const computeService = deps.itemCompute;
        const creator = overrides.makeTabCreator?.() ?? new DefaultTabCreator();
        return (tabId) => {
            const itemStore = deps.makeItemStore();
            const scopeStore = deps.makeScopeStore();
            const linkStore = deps.makeLinkStore();
            const simulation = deps.makeSimulation({
                getItem: (id) => itemStore.get(id),
                getLink: (id) => linkStore.get(id),
                getScope: (id) => scopeStore.get(id),
                computeService,
            });
            return creator.create({ itemStore, scopeStore, linkStore, simulation }, tabId);
        };
    }
}
