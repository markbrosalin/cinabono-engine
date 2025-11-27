import { isCircuitItem, } from "@cnbn/schema";
import { scopeLinks } from "@cnbn/helpers/scope";
import { E } from "../../errors";
import { pinOps, ensureLamp, ensureToggle } from "@cnbn/helpers";
export class IOBuilder {
    deps;
    constructor(deps) {
        this.deps = deps;
    }
    buildInputPins(inputIds, scope) {
        return this._buildPins({
            itemIds: inputIds,
            scope,
            getItemSafely: (id) => {
                const item = ensureToggle(id, this.deps.getItem);
                if (!item)
                    throw E.item.NotToggle(id);
                return item;
            },
            getPinsCount: (toggle) => {
                return Object.keys(toggle.outputPins).length;
            },
            extractLinks: (itemId, scope) => {
                return scopeLinks(scope).listOutputsBy(itemId).byPin;
            },
            mapLink: (linkId) => {
                const link = this.deps.getLink(linkId);
                if (link) {
                    const innerItem = this._ensureToggleLinkedToCircuit(link);
                    return innerItem ? innerItem : [{ itemId: link.toItemId, pin: link.toPin }];
                }
                else
                    return null;
            },
            makePin: (items) => ({ inputItems: items }),
        });
    }
    buildOutputPins(outputIds, scope) {
        return this._buildPins({
            itemIds: outputIds,
            scope,
            getItemSafely: (id) => {
                const item = ensureLamp(id, this.deps.getItem);
                if (!item)
                    throw E.item.NotLamp(id);
                return item;
            },
            getPinsCount: (lamp) => {
                return Object.keys(lamp.inputPins).length;
            },
            extractLinks: (itemId, scope) => {
                return scopeLinks(scope).listInputsBy(itemId).byPin;
            },
            mapLink: (linkId) => {
                const link = this.deps.getLink(linkId);
                if (link) {
                    const innerItem = this._ensureLampLinkedToCircuit(link);
                    return innerItem
                        ? [innerItem]
                        : [{ itemId: link.fromItemId, pin: link.fromPin }];
                }
                else
                    return null;
            },
            makePin: (items) => ({ outputItem: items[0] }), //Only 1 inner item can be linked to circuit output pin
        });
    }
    _buildPins(ctx) {
        const pins = {};
        let circuitPinIndex = 0;
        for (const id of ctx.itemIds) {
            const item = ctx.getItemSafely(id);
            const linksByPin = ctx.extractLinks(id, ctx.scope);
            const pinCount = ctx.getPinsCount(item);
            for (let localPin = 0; localPin < pinCount; localPin++) {
                const linkIds = linksByPin.find(([p]) => p === String(localPin))?.[1] ?? [];
                const items = linkIds.flatMap((id) => ctx.mapLink(id) ?? []);
                pins[circuitPinIndex++] = ctx.makePin(items) ?? {};
            }
        }
        return pins;
    }
    _ensureToggleLinkedToCircuit(link) {
        const item = this.deps.getItem(link.toItemId);
        if (!item)
            throw E.item.NotFound(link.toItemId);
        return isCircuitItem(item) ? pinOps(item).input.items.get(link.toPin) : null;
    }
    _ensureLampLinkedToCircuit(link) {
        const item = this.deps.getItem(link.fromItemId);
        if (!item)
            throw E.item.NotFound(link.fromItemId);
        if (isCircuitItem(item)) {
            const inner = pinOps(item).output.items.get(link.fromPin);
            return inner ? inner : null;
        }
        return null;
    }
}
