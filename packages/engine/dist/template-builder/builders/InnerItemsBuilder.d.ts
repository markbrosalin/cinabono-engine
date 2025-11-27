import { Id, InnerItem, Scope } from "@cnbn/schema";
import { TemplateBuilderDeps } from "../types/index.js";
export declare class InnerItemsBuilder {
    private readonly deps;
    constructor(deps: TemplateBuilderDeps);
    buildInnerItem(itemId: Id, scope: Scope): InnerItem;
    private _buildInputLinks;
    private _buildOutputLinks;
    private _shouldIncludeLink;
}
//# sourceMappingURL=InnerItemsBuilder.d.ts.map