import { getOrCreateId } from "@cnbn/helpers/id";
import { buildLinkId, parseLinkId, pinOps } from "@cnbn/helpers";
export class RemapService {
    createRemap() {
        return {
            itemIdMap: new Map(),
            linkIdMap: new Map(),
        };
    }
    remapItemId(oldId, remap) {
        return getOrCreateId(oldId, remap.itemIdMap);
    }
    remapSingleLink(linkId, remap) {
        const existing = remap.linkIdMap.get(linkId);
        if (existing)
            return existing;
        const cloned = { ...parseLinkId(linkId) };
        cloned.fromItemId = this.remapItemId(cloned.fromItemId, remap);
        cloned.toItemId = this.remapItemId(cloned.toItemId, remap);
        const newLinkId = buildLinkId(cloned);
        remap.linkIdMap.set(linkId, newLinkId);
        return newLinkId;
    }
    remapLinks(item, remap) {
        const result = new Set();
        const remapGroup = (conns) => {
            if (!conns)
                return;
            for (const pin in conns) {
                const linkIds = conns[pin];
                // output links
                if (Array.isArray(linkIds)) {
                    linkIds.forEach((id) => result.add(this.remapSingleLink(id, remap)));
                    //input links
                }
                else {
                    result.add(this.remapSingleLink(linkIds, remap));
                }
            }
        };
        remapGroup(item.inputLinks);
        remapGroup(item.outputLinks);
        return result;
    }
    remapCircuitInOutPins(circuit, remap) {
        const ops = pinOps(circuit);
        for (const inputPinIdx in circuit.inputPins) {
            const inputItems = ops.input.items.get(inputPinIdx);
            if (!inputItems)
                continue;
            const remapped = inputItems.map(({ itemId, pin }) => ({
                itemId: this.remapItemId(itemId, remap),
                pin,
            }));
            ops.input.items.set(inputPinIdx, remapped);
        }
        for (const outputPinIdx in circuit.outputPins) {
            const outputItem = ops.output.items.get(outputPinIdx);
            if (!outputItem)
                continue;
            ops.output.items.set(outputPinIdx, {
                itemId: this.remapItemId(outputItem.itemId, remap),
                pin: outputItem.pin,
            });
        }
    }
}
