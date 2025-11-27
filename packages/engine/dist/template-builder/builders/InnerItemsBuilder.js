import { E } from "@engine/errors";
import { buildLinkId, ensureLamp, ensureToggle, scopeLinks } from "@cnbn/helpers";
import { ConditionalMerger } from "@cnbn/entities-runtime";
import { isEmptyValue } from "@cnbn/utils";
export class InnerItemsBuilder {
    deps;
    constructor(deps) {
        this.deps = deps;
    }
    buildInnerItem(itemId, scope) {
        const item = this.deps.getItem(itemId);
        if (!item)
            throw E.item.NotFound(itemId);
        const inputLinks = this._buildInputLinks(itemId, scope);
        const outputLinks = this._buildOutputLinks(itemId, scope);
        const defaultTemp = {
            hash: item.hash,
            kind: item.kind,
            name: item.name,
        };
        return new ConditionalMerger(defaultTemp, (v) => !isEmptyValue(v))
            .add("inputLinks", inputLinks)
            .add("outputLinks", outputLinks)
            .add("options", item.options)
            .add("meta", item.meta)
            .build();
    }
    _buildInputLinks(itemId, scope) {
        const stored = scopeLinks(scope).listInputsBy(itemId).byPin;
        const result = {};
        for (const [pin, linkIds] of stored) {
            const linkId = linkIds[0]; // Item has only one input link
            const link = this.deps.getLink(linkId);
            if (link && this._shouldIncludeLink(link, this.deps.getItem)) {
                result[pin] = buildLinkId(link);
            }
        }
        return result;
    }
    _buildOutputLinks(itemId, scope) {
        const stored = scopeLinks(scope).listOutputsBy(itemId).byPin;
        const result = {};
        for (const [pin, linkIds] of stored) {
            const links = linkIds
                .map((id) => this.deps.getLink(id))
                .filter((l) => !!l && this._shouldIncludeLink(l, this.deps.getItem))
                .map(buildLinkId);
            if (links.length)
                result[pin] = links;
        }
        return result;
    }
    _shouldIncludeLink(link, getItem) {
        if (ensureToggle(link.fromItemId, getItem) !== undefined)
            return false;
        if (ensureLamp(link.toItemId, getItem) !== undefined)
            return false;
        return true;
    }
}
