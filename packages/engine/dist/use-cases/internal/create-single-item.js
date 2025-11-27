/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiFactories } from "../../api/index.js";
import { getScopeIdFromPath, getTabIdFromPath, parseLinkId } from "@cnbn/helpers";
export const _createSingleItemUC = ApiFactories.config((tokens) => ({
    token: tokens.item._createSingle,
    factory: (ctx) => {
        const { tools, deps, api } = ctx;
        let payload;
        const createItem = ((p) => {
            payload = p;
            const tab = tools.global.getTab(getTabIdFromPath(p.path));
            const { save } = tools.tab(tab);
            // building item step
            const result = buildItemStep(p);
            // saving to scope
            const parentScope = tools.tab(tab).get.scope(getScopeIdFromPath(p.path));
            tools.scope.reg.itemToScope(result.builtItem, parentScope);
            // saving to stores
            save.item(result.items);
            save.scope(result.scopes);
            // linking items
            result.linkIds.forEach((id) => api.item.link({ link: parseLinkId(id), tabId: tab.id }));
            return result;
        });
        const buildItemStep = (() => {
            const template = tools.global.getTemplate(payload.hash);
            const args = Object.assign(template, payload);
            const res = tools.flow.addStep("Build item", () => deps.builders.item(args));
            return res;
        });
        return createItem;
    },
}));
