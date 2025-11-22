import { ApiFactories } from "@engine/api";
import { ensureReceiverItem } from "@engine/use-cases/guards";
import { getGlobalCfg } from "@cnbn/config";
import { getScopeIdFromPath, parseLinkId } from "@cnbn/helpers";
import { Id, isDisplayItem, isLogicItem, ItemLink, ItemOfKind, LogicValueBase } from "@cnbn/schema";
import { SimInputEvent } from "@cnbn/simulation";

export interface ApiUnlinkSingleItem_Fn {
    (payload: ApiUnlinkSingleItem_Payload): ApiUnlinkSingleItem_Result;
}
export type ApiUnlinkSingleItem_Payload = {
    tabId: Id;
    linkId: Id;
};
export type ApiUnlinkSingleItem_Result = {
    removedLink: ItemLink | undefined;
    inputEvents: SimInputEvent[];
};

export const _unlinkSingleItemUC = ApiFactories.config((tokens) => ({
    token: tokens.item._unlinkSingle,
    factory: (ctx) => {
        let tab: ReturnType<typeof ctx.tools.global.getTab>;
        let receiver: ReturnType<typeof ensureReceiverItem>;

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
        }) as ApiUnlinkSingleItem_Fn;

        // propagate default value to receiver input
        const scheduleInputEvent = (p: ApiUnlinkSingleItem_Payload): SimInputEvent[] => {
            tab = ctx.tools.global.getTab(p.tabId);

            const { toItemId, toPin } = parseLinkId(p.linkId);

            return tab.ctx.simulation.updateInput({
                itemId: toItemId,
                pin: toPin,
                value: getPropagatedValue(receiver),
            });
        };

        const getPropagatedValue = (item: ItemOfKind): LogicValueBase => {
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
