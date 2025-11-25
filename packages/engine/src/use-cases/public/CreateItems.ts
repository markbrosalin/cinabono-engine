import { ApiFactories } from "@engine/api";
import { ItemBuilderResult } from "@engine/item-builder/types/ItemBuilder";
import { ApiCreateSingleItem_Data } from "@engine/use-cases/internal/create-single-item";
import { KindKey, MaybeArray } from "@cnbn/schema";
import { toArray } from "@cnbn/utils";
import { KindFromPayload, ResultOfMaybeArray } from "../types";

export interface ApiCreateItems_Fn {
    <P extends MaybeArray<ApiCreateSingleItem_Data<KindKey>["payload"]>>(
        payload: P
    ): ResultOfMaybeArray<P, ItemBuilderResult<KindFromPayload<P>>>;
}

export const createItemsUC = ApiFactories.config((tokens) => ({
    token: tokens.item.create,
    factory: (ctx) => {
        const createItems = ((payload) => {
            const tasks = toArray(payload);

            const buildRes = tasks.map((p) => ctx.api.item._createSingle(p));

            if (!Array.isArray(payload)) return buildRes[0];
            return buildRes;
        }) as ApiCreateItems_Fn;

        return createItems;
    },
}));
