/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiFactories } from "@engine/api";
import { ItemBuilderResult } from "@engine/item-builder/types/ItemBuilder";
import { getScopeIdFromPath, getTabIdFromPath, parseLinkId } from "@cnbn/helpers";
import { ItemArgsOfKind, KindKey, PartialExcept } from "@cnbn/schema";

export type ApiCreateSingleItem_Fn = {
    <K extends KindKey>(
        payload: ApiCreateSingleItem_Data<K>["payload"]
    ): ApiCreateSingleItem_Data<K>["result"];
};

export interface ApiCreateSingleItem_Data<K extends KindKey> {
    payload: PartialExcept<ItemArgsOfKind<K>, "path" | "hash"> & { kind: K };
    result: ItemBuilderResult<K>;
}

export const _createSingleItemUC = ApiFactories.config((tokens) => ({
    token: tokens.item._createSingle,
    factory: (ctx) => {
        const { tools, deps, api } = ctx;

        let payload: ApiCreateSingleItem_Data<any>["payload"];

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
        }) as ApiCreateSingleItem_Fn;

        const buildItemStep = (() => {
            const template = tools.global.getTemplate(payload.hash);
            const args = Object.assign(template, payload);

            const res = tools.flow.addStep("Build item", () => deps.builders.item(args));
            return res;
        }) as ApiCreateSingleItem_Fn;

        return createItem;
    },
}));
