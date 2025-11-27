import { ApiFactories } from "@engine/api";
import { toArray } from "@cnbn/utils";
export const unlinkItemsUC = ApiFactories.config((tokens) => ({
    token: tokens.item.unlink,
    factory: (ctx) => {
        const unlinkItems = ((p) => {
            const tasks = toArray(p);
            const buildRes = tasks.map((p) => ctx.api.item._unlinkSingle(p));
            if (!Array.isArray(p))
                return buildRes[0];
            return buildRes;
        });
        return unlinkItems;
    },
}));
