import { ApiFactories } from "@engine/api";
import {
    ApiUnlinkSingleItem_Payload,
    ApiUnlinkSingleItem_Result,
} from "@engine/use-cases/internal/unlink-single-item";
import { MaybeArray } from "@cnbn/schema";
import { toArray } from "@cnbn/utils";
import { ResultOfMaybeArray } from "../types";

export interface ApiUnlinkItems_Fn {
    <P extends MaybeArray<ApiUnlinkSingleItem_Payload>>(
        payload: P
    ): ResultOfMaybeArray<P, ApiUnlinkSingleItem_Result>;
}

export const unlinkItemsUC = ApiFactories.config((tokens) => ({
    token: tokens.item.unlink,
    factory: (ctx) => {
        const unlinkItems = ((p) => {
            const tasks = toArray(p);

            const buildRes = tasks.map((p) => ctx.api.item._unlinkSingle(p));

            if (!Array.isArray(p)) return buildRes[0];
            return buildRes;
        }) as ApiUnlinkItems_Fn;

        return unlinkItems;
    },
}));
