import { FlowToolContract } from "../../use-cases/tools";
export declare const openScopeOperations: (flow: FlowToolContract) => {
    reg: {
        itemToScope: (item: import("@repo/schema").WithId & import("@repo/schema").WithItemKind & import("@repo/schema").ScopeChildItem, scope: import("@repo/schema").Scope, stepName?: string) => void;
        scopeToScope: (childId: import("@repo/schema").Id, scope: import("@repo/schema").Scope, stepName?: string) => void;
        linkToScope: (link: import("@repo/schema").ItemLink, scope: import("@repo/schema").Scope, stepName?: string) => void;
    };
    unreg: {
        itemFromScope: (item: import("@repo/schema").WithId & import("@repo/schema").WithItemKind & import("@repo/schema").ScopeChildItem, scope: import("@repo/schema").Scope, stepName?: string) => void;
        scopeFromScope: (childId: import("@repo/schema").Id, scope: import("@repo/schema").Scope, stepName?: string) => void;
        linkFromScope: (link: import("@repo/schema").ItemLink, scope: import("@repo/schema").Scope, stepName?: string) => void;
    };
};
//# sourceMappingURL=scope.operations.d.ts.map