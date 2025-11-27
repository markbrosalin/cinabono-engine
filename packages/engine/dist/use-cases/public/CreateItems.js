import { ApiFactories } from "@engine/api";
import { toArray } from "@cnbn/utils";
export const createItemsUC = ApiFactories.config((tokens) => ({
    token: tokens.item.create,
    factory: (ctx) => {
        const createItems = ((payload) => {
            const tasks = toArray(payload);
            const buildRes = tasks.map((p) => ctx.api.item._createSingle(p));
            if (!Array.isArray(payload))
                return buildRes[0];
            return buildRes;
        });
        return createItems;
    },
}));
