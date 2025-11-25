import { saveInStoreById } from "@repo/entities-runtime/store";
import { parseLinkId } from "@repo/helpers";
import { saveChildToScope } from "@repo/helpers/scope";
import { processMany } from "@repo/utils";
export function fakeItem(buildArgs, ctx, tab) {
    const res = ctx.itemBuilder(buildArgs);
    const item = res.buildItem;
    const scope = tab.ctx.scopeStore.get(tab.id);
    saveInStoreById(tab.ctx.itemStore, res.items);
    saveInStoreById(tab.ctx.scopeStore, res.scopes);
    processMany(res.linkIds, (id) => tab.ctx.linkStore.insert(id, parseLinkId(id)));
    // insertManyItemOpts(tab.ctx.itemOptionsStore, res.itemOptions, res.items);
    saveChildToScope(scope, item);
    return item;
}
