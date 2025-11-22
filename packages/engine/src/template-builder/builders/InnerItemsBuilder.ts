import { E } from "@engine/errors";
import { buildLinkId, ensureLamp, ensureToggle, scopeLinks } from "@cnbn/helpers";
import {
    Id,
    InnerItem,
    InnerItemInputLinks,
    InnerItemOutputLinks,
    ItemLink,
    Read,
    Scope,
} from "@cnbn/schema";
import { TemplateBuilderDeps } from "../types";
import { ConditionalMerger } from "@cnbn/entities-runtime";
import { isEmptyValue } from "@cnbn/utils";

export class InnerItemsBuilder {
    constructor(private readonly deps: TemplateBuilderDeps) {}

    public buildInnerItem(itemId: Id, scope: Scope): InnerItem {
        const item = this.deps.getItem(itemId);
        if (!item) throw E.item.NotFound(itemId);

        const inputLinks = this._buildInputLinks(itemId, scope);
        const outputLinks = this._buildOutputLinks(itemId, scope);

        const defaultTemp = {
            hash: item.hash,
            kind: item.kind,
            name: item.name,
        } satisfies InnerItem;

        return new ConditionalMerger(defaultTemp, (v) => !isEmptyValue(v))
            .add("inputLinks", inputLinks)
            .add("outputLinks", outputLinks)
            .add("options", item.options)
            .add("meta", item.meta)
            .build();
    }

    private _buildInputLinks(itemId: Id, scope: Scope): InnerItemInputLinks {
        const stored = scopeLinks(scope).listInputsBy(itemId).byPin;
        const result: InnerItemInputLinks = {};

        for (const [pin, linkIds] of stored) {
            const linkId = linkIds[0]; // Item has only one input link
            const link = this.deps.getLink(linkId);

            if (link && this._shouldIncludeLink(link, this.deps.getItem)) {
                result[pin] = buildLinkId(link);
            }
        }
        return result;
    }

    private _buildOutputLinks(itemId: Id, scope: Scope): InnerItemOutputLinks {
        const stored = scopeLinks(scope).listOutputsBy(itemId).byPin;
        const result: InnerItemOutputLinks = {};

        for (const [pin, linkIds] of stored) {
            const links = linkIds
                .map((id) => this.deps.getLink(id))
                .filter((l): l is ItemLink => !!l && this._shouldIncludeLink(l, this.deps.getItem))
                .map(buildLinkId);

            if (links.length) result[pin] = links;
        }
        return result;
    }

    private _shouldIncludeLink(link: ItemLink, getItem: Read<"item">): boolean {
        if (ensureToggle(link.fromItemId, getItem) !== undefined) return false;
        if (ensureLamp(link.toItemId, getItem) !== undefined) return false;
        return true;
    }
}
