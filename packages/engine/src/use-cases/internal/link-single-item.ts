import { ApiFactories } from "@engine/api";
import { ensureDriverItem, ensureReceiverItem, ensureSameScope } from "@engine/use-cases/guards";
import { buildLinkId, getScopeIdFromPath, pinOps } from "@cnbn/helpers";
import { Id, ItemLink } from "@cnbn/schema";
import { SimInputEvent } from "@cnbn/simulation";

export type ApiLinkSingleItem_Payload = { link: ItemLink; tabId: Id };
export type ApiLinkSingleItem_Result = { linkId: Id; tabId: Id; inputEvents: SimInputEvent[] };

export interface ApiLinkSingleItem_Fn {
    (payload: ApiLinkSingleItem_Payload): ApiLinkSingleItem_Result;
}

export const _linkSingleItemUC = ApiFactories.config((tokens) => ({
    token: tokens.item._linkSingle,
    factory: (ctx) => {
        const { tools } = ctx;

        let tab: ReturnType<typeof ctx.tools.global.getTab>;
        let driver: ReturnType<typeof ensureDriverItem>;
        let payload: ApiLinkSingleItem_Payload;

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
        }) as ApiLinkSingleItem_Fn;

        const scheduleInputEvent = (): SimInputEvent[] => {
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
