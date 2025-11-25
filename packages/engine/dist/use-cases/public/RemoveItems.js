import { ApiFactories } from "../../api/helpers";
import { toArray } from "@cnbn/utils";
export const removeItemsUC = ApiFactories.config((tokens) => ({
    token: tokens.item.remove,
    factory: (ctx) => {
        const removeItems = ((p) => {
            const tasks = toArray(p);
            const results = tasks.map((task) => ctx.api.item._removeSingle(task));
            if (!Array.isArray(p))
                return results[0];
            return results;
        });
        return removeItems;
    },
}));
