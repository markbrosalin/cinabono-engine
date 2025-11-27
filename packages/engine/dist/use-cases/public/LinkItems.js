import { ApiFactories } from "@engine/api";
import { toArray } from "@cnbn/utils";
export const linkItemsUC = ApiFactories.config((tokens) => ({
    token: tokens.item.link,
    factory: (ctx) => {
        const linkItems = ((p) => {
            const tasks = toArray(p);
            const buildRes = tasks.map((p) => ctx.api.item._linkSingle(p));
            if (!Array.isArray(p))
                return buildRes[0];
            return buildRes;
        });
        return linkItems;
    },
}));
