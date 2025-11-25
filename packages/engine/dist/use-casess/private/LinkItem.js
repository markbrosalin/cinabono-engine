import { buildLinkId, getScopeIdFromPath, parseLinkId, pinOps } from "@repo/helpers";
import { ensureDriverItem, ensureReceiverItem, ensureSameScope } from "../../use-cases/guards";
import { UCBaseExtended } from "../../use-cases/use-case/UCBaseExtended";
export class UCLinkItem extends UCBaseExtended {
    constructor() {
        super(...arguments);
        this.name = "linkTwoItems";
    }
    run({ tabId, link }) {
        const tab = this.ctx.globalOps.getTab(tabId);
        const { get, save } = this.ctx.tabOps(tab);
        const A = get.item(link.fromItemId);
        const B = get.item(link.toItemId);
        const driver = ensureDriverItem(A);
        const receiver = ensureReceiverItem(B);
        ensureSameScope(driver, receiver);
        // saving link to parent scope
        const parentScope = get.scope(getScopeIdFromPath(driver.path));
        this.ctx.scopeOps.reg.linkToScope(link, parentScope);
        // saving link to linkStore
        save.link(link);
        const linkId = buildLinkId(link);
        // propagate driver's output value to receiver's input
        const inputEvents = this._scheduleInputEvent(linkId, tabId);
        return { linkId, tabId, inputEvents };
    }
    // propagate driver's output value to his receiver input
    _scheduleInputEvent(linkId, tabId) {
        const { globalOps, tabOps } = this.ctx;
        const tab = globalOps.getTab(tabId);
        const { fromItemId, fromPin, toItemId, toPin } = parseLinkId(linkId);
        const driver = tabOps(tab).get.item(fromItemId);
        const propagatedValue = pinOps(driver).output.value.get(fromPin);
        return tab.ctx.simulation.updateInput({
            itemId: toItemId,
            pin: toPin,
            value: propagatedValue,
        });
    }
}
