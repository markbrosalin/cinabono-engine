import {
    ApiRemoveSingleItem_Payload,
    ApiRemoveSingleItem_Result,
} from "@engine/use-cases/internal/remove-single-item";
import { MaybeArray } from "@cnbn/schema";
import { ApiFactories } from "@engine/api/helpers";
import { toArray } from "@cnbn/utils";
import { ResultOfMaybeArray } from "../types";

export interface ApiRemoveItems_Fn {
    <P extends MaybeArray<ApiRemoveSingleItem_Payload>>(
        payload: P
    ): ResultOfMaybeArray<P, ApiRemoveSingleItem_Result>;
}

export const removeItemsUC = ApiFactories.config((tokens) => ({
    token: tokens.item.remove,
    factory: (ctx) => {
        const removeItems = ((p) => {
            const tasks = toArray(p);

            const results = tasks.map((task) => ctx.api.item._removeSingle(task));

            if (!Array.isArray(p)) return results[0];

            return results;
        }) as ApiRemoveItems_Fn;

        return removeItems;
    },
}));
