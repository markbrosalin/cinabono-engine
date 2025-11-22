import { ItemOfKind, ScopeOfKind, Id } from "@cnbn/schema";

export interface StructureBuilderResult {
    items: ItemOfKind[];
    scopes: ScopeOfKind[];
    linkIds: Set<Id>;
}
