import { KindKey, TemplateOfKind } from "../shared/index.js";
import { BaseTemplate } from "./types.js";
export declare const isTemplate: (value: unknown) => value is TemplateOfKind;
export declare const isTemplateOf: <K extends KindKey>(value: unknown, kind: K) => value is Extract<TemplateOfKind, {
    kind: K;
}>;
export declare const isLogicTemplate: (v: unknown) => v is import("./types.js").LogicTemplate;
export declare const isGeneratorTemplate: (v: unknown) => v is import("./types.js").GeneratorTemplate;
export declare const isDisplayTemplate: (v: unknown) => v is import("./types.js").DisplayTemplate;
export declare const isCircuitLogicTemplate: (v: unknown) => v is import("./types.js").CircuitTemplate;
export declare const isBaseTemplate: (i: unknown) => i is BaseTemplate;
//# sourceMappingURL=guards.d.ts.map