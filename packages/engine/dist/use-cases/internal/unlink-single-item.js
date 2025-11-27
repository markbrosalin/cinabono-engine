import { ApiFactories } from "../../api/index.js";
import { ensureReceiverItem } from "../../use-cases/guards/index.js";
import { getGlobalCfg } from "@cnbn/config";
import { getScopeIdFromPath, parseLinkId } from "@cnbn/helpers";
import { isDisplayItem, isLogicItem } from "@cnbn/schema";
export const _unlinkSingleItemUC = ApiFactories.config((tokens) => ({
    token: tokens.item._unlinkSingle,
    factory: (ctx) => {
        let tab;
        let receiver;
        const unlinkSingleItem = ((p) => {
            tab = ctx.tools.global.getTab(p.tabId);
            const { get, remove } = ctx.tools.tab(tab);
            const link = get.link(p.linkId);
            const item = get.item(link.toItemId);
            receiver = ensureReceiverItem(item);
            // get parent scope
            const scope = get.scope(getScopeIdFromPath(receiver.path));
            // remove link from parent scope
            ctx.tools.scope.unreg.linkFromScope(link, scope);
            const inputEvents = scheduleInputEvent(p);
            const removedLink = remove.link(p.linkId);
            return { removedLink, inputEvents };
        });
        // propagate default value to receiver input
        const scheduleInputEvent = (p) => {
            tab = ctx.tools.global.getTab(p.tabId);
            const { toItemId, toPin } = parseLinkId(p.linkId);
            return tab.ctx.simulation.updateInput({
                itemId: toItemId,
                pin: toPin,
                value: getPropagatedValue(receiver),
            });
        };
        const getPropagatedValue = (item) => {
            const PinsCfg = getGlobalCfg().pins; // Global Settings
            return isDisplayItem(item)
                ? PinsCfg.initialDisplayValue
                : isLogicItem(item)
                    ? PinsCfg.initialBaseInputValue
                    : PinsCfg.initialCircuitInputValue;
        };
        return unlinkSingleItem;
    },
}));
