import { saveInStoreById } from "@repo/entities-runtime";
import { makeCtx } from "../useCaseHelpers";
export function fakeTab(ctx = makeCtx(), tabId = "fake-tab-id") {
    const tab = ctx.tabFactory(tabId);
    const scope = ctx.scopeFactory({ id: tabId, kind: "tab" });
    saveInStoreById(ctx.tabStore, tab);
    saveInStoreById(tab.ctx.scopeStore, scope);
    return { ctx, tab, scope };
}
