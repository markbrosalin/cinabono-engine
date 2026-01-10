import { DIConfig } from "@repo/di/types";
import { ItemBuilder } from "@gately/application-services/itemBuilder/itemBuilder";
import { ItemBuilderFactoryToken } from "@gately/domain-model/shared/di-tokens/app/tools";
import { ItemBuilderFactory } from "@gately/domain-model/shared/item-builder";

export const itemBuilderConfig = {
    token: ItemBuilderFactoryToken,
    useFactory: () => {
        return (args) => new ItemBuilder(args);
    },
} satisfies DIConfig<ItemBuilderFactory>;
