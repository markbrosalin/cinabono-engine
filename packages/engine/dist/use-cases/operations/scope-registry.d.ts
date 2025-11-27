import { Id, ItemLink, Scope, ScopeChildItem, WithId, WithItemKind } from "@cnbn/schema";
import { FlowToolContract } from "../../use-cases/tools/index.js";
export declare const makeScopeRegistry: (flow: FlowToolContract) => {
    item: {
        reg(item: WithId & WithItemKind & ScopeChildItem, scope: Scope, stepName?: string): void;
        unreg(item: WithId & WithItemKind & ScopeChildItem, scope: Scope, stepName?: string): void;
    };
    link: {
        reg(link: ItemLink, scope: Scope, stepName?: string): void;
        unreg(link: ItemLink, scope: Scope, stepName?: string): void;
    };
    scope: {
        reg(childId: Id, scope: Scope, stepName?: string): void;
        unreg(childId: Id, scope: Scope, stepName?: string): void;
    };
};
//# sourceMappingURL=scope-registry.d.ts.map