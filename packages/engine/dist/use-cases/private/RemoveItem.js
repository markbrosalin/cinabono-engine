import { isCircuitItem } from "@repo/schema";
import { getScopeIdFromPath, scopeItems, scopeLinks } from "@repo/helpers";
import { UCUnlinkItem } from "./UnlinkItem";
import { UCBaseExtended } from "../api-core/UCBaseExtended";
import { processMany } from "@repo/utils";
export class UCRemoveItem extends UCBaseExtended {
    constructor() {
        super(...arguments);
        this.name = "removeSingleItem";
    }
    run({ tabId, itemId, }) {
        const tab = this.ctx.globalOps.getTab(tabId);
        const { remove, get } = this.ctx.tabOps(tab);
        const { unreg } = this.ctx.scopeOps;
        const item = get.item(itemId);
        const parentScope = get.scope(getScopeIdFromPath(item.path));
        this._removeInOutLinksFromScopeStep(tabId, itemId, parentScope);
        if (isCircuitItem(item)) {
            this._removeCircuitInnerElemsStep(tab, item);
            remove.scope(item.id);
        }
        unreg.itemFromScope(item, parentScope);
        return { removedItem: remove.item(itemId), tabId };
    }
    _removeInOutLinksFromScopeStep(tabId, itemId, parentScope) {
        const unlinker = new UCUnlinkItem(this.ctx);
        const linkIds = scopeLinks(parentScope).listBy(itemId);
        return this.flow.addStep("RemoveInOutLinksFromScope", () => {
            const res = [];
            for (const linkId of linkIds) {
                const removed = unlinker.run({ linkId, tabId });
                res.push(removed);
            }
            return res;
        });
    }
    _removeCircuitInnerElemsStep(tab, circ) {
        const { get, remove } = this.ctx.tabOps(tab);
        return this.flow.addStep("RemoveCircuitInnerElems", () => {
            const scope = get.scope(circ.id);
            const childIds = scopeItems(scope).listIds();
            processMany(childIds, (id) => {
                const linkIds = scopeLinks(scope).listBy(id);
                remove.link(linkIds);
                remove.item(id);
            });
        });
    }
}
