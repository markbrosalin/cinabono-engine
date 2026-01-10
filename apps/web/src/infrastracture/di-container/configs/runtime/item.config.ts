import { DIConfig } from "@repo/di/types";
import { ItemServiceToken } from "@gately/domain-model/shared/di-tokens/tab/services";
import { makeItemService } from "@repo/modules-runtime/item/factory";
import { ItemServiceContract } from "@repo/modules-runtime/item/contracts";

export const itemServiceConfig = {
    token: ItemServiceToken,
    useFactory: () => makeItemService(),
} satisfies DIConfig<ItemServiceContract>;
