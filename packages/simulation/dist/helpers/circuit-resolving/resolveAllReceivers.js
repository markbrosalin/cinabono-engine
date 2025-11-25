import { getScopeIdFromPath } from "@cnbn/helpers/path";
import { hasItemOutputPins } from "@cnbn/schema";
import { pinOps, scopeLinks } from "@cnbn/helpers";
const mapLinksToReceivers = (links) => links.map((l) => ({ itemId: l.toItemId, pin: l.toPin }));
const collectLinks = (ctx, linkIds) => {
    const out = [];
    for (const id of linkIds) {
        const link = ctx.getLink(id);
        if (link)
            out.push(link);
    }
    return out;
};
const resolveInternalReceivers = (ctx, { itemId, pin }) => {
    const driver = ctx.getItem(itemId);
    if (!driver)
        return [];
    const parentScope = ctx.getScope(getScopeIdFromPath(driver.path));
    if (!parentScope)
        return [];
    const linkIds = scopeLinks(parentScope).listOutputsBy(itemId, pin).flat;
    const links = collectLinks(ctx, linkIds);
    return mapLinksToReceivers(links);
};
const resolveExternalReceivers = (ctx, { itemId: innerDriverId, pin }) => {
    // get output item connected to circuit output pin
    const inner = ctx.getItem(innerDriverId);
    if (!inner || !hasItemOutputPins(inner))
        return [];
    // get all circuits connected to this item
    const cop = pinOps(inner).output.circuitPin.listByPin(pin);
    if (!cop.length)
        return [];
    // get all links from all circuits' pins
    const out = [];
    for (const { circuitId, circuitPin } of cop) {
        const circuit = ctx.getItem(circuitId);
        if (!circuit)
            continue;
        const outerScope = ctx.getScope(getScopeIdFromPath(circuit.path));
        if (!outerScope)
            continue;
        const linkIds = scopeLinks(outerScope).listOutputsBy(circuitId, circuitPin).flat;
        const links = collectLinks(ctx, linkIds);
        out.push(...mapLinksToReceivers(links));
    }
    return out;
};
export const resolveAllReceivers = (ctx, params) => {
    const internal = resolveInternalReceivers(ctx, params);
    const external = resolveExternalReceivers(ctx, params);
    return internal.concat(external);
};
