import { Id, ItemLink, ItemOfKind, ScopeOfKind, TemplateOfKind } from "@cnbn/schema";
import { mkDeps } from "../fixtures/mkReadyToUse";
export interface ReadyToUseScene {
    deps: ReturnType<typeof mkDeps>;
    items: Record<Id, ItemOfKind>;
    scopes: Record<Id, ScopeOfKind>;
    links: Record<Id, ItemLink>;
    templates: Record<Id, TemplateOfKind>;
    inputs: Id[];
    outputs: Id[];
    logic: Id[];
}
//# sourceMappingURL=types.d.ts.map