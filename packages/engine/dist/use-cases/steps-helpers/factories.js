import { E } from "../../errors";
import { makeReadStep } from "./makeRead";
import { makeRemoveStep } from "./makeRemove";
import { makeInsertStep } from "./makeInsert";
import { buildLinkId } from "@repo/helpers";
export const openGlobalOperations = (flow, stores) => ({
    getTab: makeReadStep("tab", flow, stores.tab, E.tab.NotFound),
    getTemplate: makeReadStep("template", flow, stores.library, E.template.NotFound),
    removeTab: makeRemoveStep("tab", flow, stores.tab),
    removeTemplate: makeRemoveStep("template", flow, stores.library),
    saveTab: makeInsertStep("tab", flow, stores.tab),
    saveTemplate: makeInsertStep("template", flow, stores.library, () => "hash"),
});
export const openTabOperations = (flow) => (tab) => {
    return {
        get: {
            item: makeReadStep("item", flow, tab.ctx.itemStore, E.item.NotFound),
            scope: makeReadStep("scope", flow, tab.ctx.scopeStore, E.scope.NotFound),
            link: makeReadStep("link", flow, tab.ctx.linkStore, E.link.NotFound),
        },
        remove: {
            item: makeRemoveStep("item", flow, tab.ctx.itemStore),
            scope: makeRemoveStep("scope", flow, tab.ctx.scopeStore),
            link: makeRemoveStep("link", flow, tab.ctx.linkStore),
        },
        save: {
            item: makeInsertStep("item", flow, tab.ctx.itemStore),
            scope: makeInsertStep("scope", flow, tab.ctx.scopeStore),
            link: makeInsertStep("link", flow, tab.ctx.linkStore, (link) => buildLinkId(link)),
        },
    };
};
