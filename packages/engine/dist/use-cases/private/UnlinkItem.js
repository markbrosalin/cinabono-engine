import { UCBaseExtended } from "../../use-cases/use-case/UCBaseExtended";
import { getGlobalCfg } from "@repo/config";
import { getScopeIdFromPath, parseLinkId } from "@repo/helpers";
import { isDisplayItem, isLogicItem } from "@repo/schema";
export class UCUnlinkItem extends UCBaseExtended {
    constructor() {
        super(...arguments);
        this.name = "unlinkTwoItems";
    }
    run({ tabId, linkId }) {
        const tab = this.ctx.globalOps.getTab(tabId);
        const { get, remove } = this.ctx.tabOps(tab);
        const link = get.link(linkId);
        const item = get.item(link.fromItemId);
        const scope = get.scope(getScopeIdFromPath(item.path));
        this.ctx.scopeOps.unreg.linkFromScope(link, scope);
        // propagate driver's output value to receiver's input
        const inputEvents = this._scheduleInputEvent(linkId, tab);
        const removedLink = remove.link(linkId);
        return { removedLink, inputEvents };
    }
    // propagate default value to receiver input by receiver's kind
    _scheduleInputEvent(linkId, tab) {
        const { toItemId, toPin } = parseLinkId(linkId);
        const receiver = this.ctx.tabOps(tab).get.item(toItemId);
        return tab.ctx.simulation.updateInput({
            itemId: toItemId,
            pin: toPin,
            value: this._getPropagatedValue(receiver),
        });
    }
    _getPropagatedValue(item) {
        const PinsCfg = getGlobalCfg().pins; // Global settings
        return isDisplayItem(item)
            ? PinsCfg.initialDisplayValue
            : isLogicItem(item)
                ? PinsCfg.initialBaseInputValue
                : PinsCfg.initialCircuitInputValue;
    }
}
