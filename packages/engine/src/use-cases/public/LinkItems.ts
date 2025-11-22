import { ApiFactories } from "@engine/api";
import {
    ApiLinkSingleItem_Payload,
    ApiLinkSingleItem_Result,
} from "@engine/use-cases/internal/link-single-item";
import { MaybeArray } from "@cnbn/schema";
import { toArray } from "@cnbn/utils";
import { ResultOfMaybeArray } from "../types";

export interface ApiLinkItems_Fn {
    <P extends MaybeArray<ApiLinkSingleItem_Payload>>(
        payload: P
    ): ResultOfMaybeArray<P, ApiLinkSingleItem_Result>;
}

export const linkItemsUC = ApiFactories.config((tokens) => ({
    token: tokens.item.link,
    factory: (ctx) => {
        const linkItems = ((p) => {
            const tasks = toArray(p);

            const buildRes = tasks.map((p) => ctx.api.item._linkSingle(p));

            if (!Array.isArray(p)) return buildRes[0];
            return buildRes;
        }) as ApiLinkItems_Fn;

        return linkItems;
    },
}));
