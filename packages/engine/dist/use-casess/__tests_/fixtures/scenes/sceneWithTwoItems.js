import { makeCtx } from "../useCaseHelpers";
import { fakeTab } from "../builders";
import { fakeItem } from "../builders/itemBuilder";
import { mkLogicArgs } from "../../../../__tests_/fixtures/mkArgs";
import { buildLink, buildLinkId, scopeLinks } from "@repo/helpers";
export const sceneWithTwoBuffers = (ctx = makeCtx()) => {
    const { tab, scope } = fakeTab(ctx);
    const bufferArgs = mkLogicArgs({ hash: "BUFFER", path: [tab.id] });
    const bufferA = fakeItem(bufferArgs, ctx, tab);
    const bufferB = fakeItem(bufferArgs, ctx, tab);
    return { ctx, tab, bufferA, bufferB, scope };
};
export const sceneWithTwoLinkedBuffers = (ctx = makeCtx()) => {
    const { tab, bufferA, bufferB, scope } = sceneWithTwoBuffers(ctx);
    const link = buildLink(bufferA.id, "0", bufferB.id, "0");
    tab.ctx.linkStore.insert(buildLinkId(link), link);
    scopeLinks(scope).add(link);
    return { ctx, tab, bufferA, bufferB, link, scope };
};
