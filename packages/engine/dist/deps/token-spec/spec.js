import { DepsFactories } from "../../deps/api-factories.js";
export const DEPS_SPEC = {
    core: {
        bus: DepsFactories.token("/core/bus"),
    },
    services: { itemCompute: DepsFactories.token("services/itemCompute") },
    factories: {
        itemStore: DepsFactories.token("/factories/itemStore"),
        scopeStore: DepsFactories.token("/factories/scopeStore"),
        linkStore: DepsFactories.token("/factories/linkStore"),
        simulation: DepsFactories.token("/factories/simulation"),
        tab: DepsFactories.token("/factories/tab"),
        scope: DepsFactories.token("factories/scope"),
        item: DepsFactories.token("/factories/item"),
    },
    builders: {
        item: DepsFactories.token("/builders/item"),
        // template: createToken('/factories/item')
    },
    stores: {
        tab: DepsFactories.token("/stores/tab"),
        template: DepsFactories.token("/stores/template"),
    },
    plugins: {},
};
