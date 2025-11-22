import * as Schema from "@cnbn/schema";
import { getOrCreateId } from "@cnbn/helpers/id";
import { RemapState } from "../types/ItemBuilder";
import { buildLinkId, parseLinkId, pinOps } from "@cnbn/helpers";

export class RemapService {
    public createRemap(): RemapState {
        return {
            itemIdMap: new Map(),
            linkIdMap: new Map(),
        };
    }

    public remapItemId(oldId: Schema.Id, remap: RemapState): Schema.Id {
        return getOrCreateId(oldId, remap.itemIdMap);
    }

    public remapSingleLink(linkId: Schema.Id, remap: RemapState): Schema.Id {
        const existing = remap.linkIdMap.get(linkId);
        if (existing) return existing;

        const cloned = { ...parseLinkId(linkId) };
        cloned.fromItemId = this.remapItemId(cloned.fromItemId, remap);
        cloned.toItemId = this.remapItemId(cloned.toItemId, remap);

        const newLinkId = buildLinkId(cloned);
        remap.linkIdMap.set(linkId, newLinkId);

        return newLinkId;
    }

    public remapLinks(
        item: Partial<Schema.WithInnerItemInOutLinks>,
        remap: RemapState
    ): Set<Schema.Id> {
        const result: Set<Schema.Id> = new Set();

        const remapGroup = (conns: Schema.InnerItemInOutLinks | undefined) => {
            if (!conns) return;
            for (const pin in conns) {
                const linkIds = conns[pin];

                // output links
                if (Array.isArray(linkIds)) {
                    linkIds.forEach((id) => result.add(this.remapSingleLink(id, remap)));
                    //input links
                } else {
                    result.add(this.remapSingleLink(linkIds, remap));
                }
            }
        };

        remapGroup(item.inputLinks);
        remapGroup(item.outputLinks);

        return result;
    }

    public remapCircuitInOutPins(circuit: Schema.ItemOfKind<"circuit:logic">, remap: RemapState) {
        const ops = pinOps(circuit);

        for (const inputPinIdx in circuit.inputPins) {
            const inputItems = ops.input.items.get(inputPinIdx);
            if (!inputItems) continue;

            const remapped = inputItems.map(({ itemId, pin }) => ({
                itemId: this.remapItemId(itemId, remap),
                pin,
            }));

            ops.input.items.set(inputPinIdx, remapped);
        }

        for (const outputPinIdx in circuit.outputPins) {
            const outputItem = ops.output.items.get(outputPinIdx);
            if (!outputItem) continue;

            ops.output.items.set(outputPinIdx, {
                itemId: this.remapItemId(outputItem.itemId, remap),
                pin: outputItem.pin,
            });
        }
    }
}
