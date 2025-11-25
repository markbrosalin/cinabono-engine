import { Id, ScopeChildItem, ItemLink, TemplateOfKind, Scope, ScopeArgsOfKind, ScopeKind, ItemOfKind, ScopeOfKind, WithId, WithHash } from "@cnbn/schema";
export declare const mkLamp: (args: WithId & Partial<ItemOfKind<"base:display">>) => ItemOfKind<"base:display">;
export declare const mkToggle: (args: WithId & Partial<ItemOfKind<"base:generator">>) => ItemOfKind<"base:generator">;
export declare const mkLogic: (args: WithId & WithHash & Partial<ItemOfKind<"base:logic">>) => ItemOfKind<"base:logic">;
export declare const mkCircuit: (args: WithId & WithHash & Pick<ItemOfKind<"circuit:logic">, "meta" | "options" | "inputPins" | "outputPins">) => ItemOfKind<"circuit:logic">;
export declare const mkScopeChild: ({ inputLinks, outputLinks }?: ScopeChildItem) => ScopeChildItem;
export declare const mkScope: <T extends ScopeKind>(args: Partial<ScopeArgsOfKind<T>> & Pick<ScopeArgsOfKind<T>, "kind">) => Scope;
export declare const mkDeps: (items?: Record<Id, ItemOfKind>, scopes?: Record<Id, ScopeOfKind>, links?: Record<Id, ItemLink>, library?: Record<string, TemplateOfKind>) => {
    getItem: (id: Id) => import("@cnbn/schema").GeneratorItem | import("@cnbn/schema").DisplayItem | import("@cnbn/schema").LogicItem | import("@cnbn/schema").CircuitItem;
    getScope: (id: Id) => import("@cnbn/schema").CircuitScope | import("@cnbn/schema").TabScope;
    getLink: (id: Id) => ItemLink;
    getTemplate: (strHash: string) => import("@cnbn/schema").GeneratorTemplate | import("@cnbn/schema").DisplayTemplate | import("@cnbn/schema").LogicTemplate | import("@cnbn/schema").CircuitTemplate;
};
//# sourceMappingURL=mkReadyToUse.d.ts.map