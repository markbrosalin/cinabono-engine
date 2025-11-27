import { ApiFactories } from "../../api/helpers/index.js";
export const createTabUC = ApiFactories.config((tokens) => ({
    token: tokens.tab.create,
    factory: (ctx) => {
        const { tools, deps } = ctx;
        const fctr = deps.factories;
        const createTab = ((payload) => {
            const tab = tools.flow.addStep("createTab", () => fctr.tab(payload?.id));
            const scope = tools.flow.addStep("createTabScope", () => fctr.scope({ ...payload, id: tab.id, kind: "tab" }));
            ctx.tools.global.saveTab(tab);
            ctx.tools.tab(tab).save.scope(scope);
            return { tabId: tab.id };
        });
        return createTab;
    },
}));
