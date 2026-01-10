import { ApiFactories } from "@engine/api/helpers";
import { Id, TabScopeArgs } from "@cnbn/schema";

export interface CreateTabUC_Fn {
    (payload?: Partial<Pick<TabScopeArgs, "id" | "storedItems" | "storedScopes">>): { tabId: Id };
}

export const createTabUC = ApiFactories.config((tokens) => ({
    token: tokens.tab.create,
    factory: (ctx) => {
        const { tools, deps } = ctx;

        const fctr = deps.factories;

        const createTab = ((payload) => {
            const tab = tools.flow.addStep("createTab", () => fctr.tab(payload?.id));

            const scope = tools.flow.addStep("createTabScope", () =>
                fctr.scope<"tab">({ ...payload, id: tab.id, kind: "tab" })
            );

            ctx.tools.global.saveTab(tab);

            ctx.tools.tab(tab).save.scope(scope);
            return { tabId: tab.id };
        }) as CreateTabUC_Fn;

        return createTab;
    },
}));
