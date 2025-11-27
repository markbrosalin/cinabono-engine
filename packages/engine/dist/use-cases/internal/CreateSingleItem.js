/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiFactories } from "@engine/api";
import { getScopeIdFromPath, getTabIdFromPath } from "@cnbn/helpers";
export const _createSingleItemUC = ApiFactories.config((tokens) => ({
    token: tokens.item._createSingle,
    factory: (ctx) => {
        const { tools, deps } = ctx;
        let payload;
        let tab;
        const createItem = ((p) => {
            payload = p;
            tab = tools.global.getTab(getTabIdFromPath(p.path));
            const result = buildItemStep(p);
            const parentScope = tools.tab(tab).get.scope(getScopeIdFromPath(p.path));
            tools.scope.reg.itemToScope(result.builtItem, parentScope);
            saveInStoresStep(result);
            return result;
        });
        const buildItemStep = (() => {
            const template = tools.global.getTemplate(payload.hash);
            const args = Object.assign(template, payload);
            const res = tools.flow.addStep("Build item", () => deps.builders.item(args));
            return res;
        });
        const saveInStoresStep = (result) => {
            return tools.flow.addStep("Save built result in stores", () => {
                const { save } = tools.tab(tab);
                const { items, scopes } = result;
                save.item(items);
                save.scope(scopes);
            });
        };
        return createItem;
    },
}));
