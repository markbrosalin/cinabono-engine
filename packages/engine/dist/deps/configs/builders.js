import { DepsFactories } from "../../deps/api-factories.js";
import { DEPS_SPEC } from "../../deps/token-spec/spec.js";
import { ItemBuilderSetup } from "../../item-builder/index.js";
export const BuildersDepsCongis = [
    DepsFactories.config((tokens) => ({
        token: tokens.builders.item,
        useFactory: (get) => {
            const { stores, factories } = DEPS_SPEC;
            const templateStore = get(stores.template);
            return ItemBuilderSetup.init({
                getTemplate: templateStore.get.bind(templateStore),
                scopeFactory: get(factories.scope),
                itemFactory: get(factories.item),
            });
        },
    })),
];
