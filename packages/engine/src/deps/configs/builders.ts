import { DepsFactories } from "@engine/deps/api-factories";
import { DEPS_SPEC } from "@engine/deps/token-spec/spec";
import { ItemBuilderSetup } from "@engine/item-builder";

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
