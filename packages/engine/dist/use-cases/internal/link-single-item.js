import { ApiFactories } from "../../api/index.js";
import { ensureDriverItem, ensureReceiverItem, ensureSameScope } from "../../use-cases/guards/index.js";
import { buildLinkId, getScopeIdFromPath, pinOps } from "@cnbn/helpers";
export const _linkSingleItemUC = ApiFactories.config((tokens) => ({
    token: tokens.item._linkSingle,
    factory: (ctx) => {
        const { tools } = ctx;
        let tab;
        let driver;
        let payload;
        const linkItem = ((p) => {
            payload = p;
            tab = tools.global.getTab(p.tabId);
            const { get, save } = tools.tab(tab);
            // get 'from' and 'to' items
            const from = get.item(p.link.fromItemId);
            const to = get.item(p.link.toItemId);
            driver = ensureDriverItem(from); //must have outputs
            const receiver = ensureReceiverItem(to); //must have inputs
            ensureSameScope(driver, receiver);
            // save link to store
            save.link(p.link);
            // save link to parent scope
            const parentScope = get.scope(getScopeIdFromPath(driver.path));
            tools.scope.reg.linkToScope(p.link, parentScope);
            // propagate value from output to input
            const inputEvents = scheduleInputEvent();
            return { linkId: buildLinkId(p.link), tabId: p.tabId, inputEvents };
        });
        const scheduleInputEvent = () => {
            const value = pinOps(driver).output.value.get(payload.link.fromPin);
            return tab.ctx.simulation.updateInput({
                itemId: payload.link.toItemId,
                pin: payload.link.toPin,
                value,
            });
        };
        return linkItem;
    },
}));
