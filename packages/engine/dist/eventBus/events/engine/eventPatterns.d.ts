import { PatternBuilder } from "@cnbn/entities-runtime";
export declare const patternBuilder: PatternBuilder<"engine">;
export declare const EngineEvents: {
    readonly engine: {
        readonly api: {
            step: import("@cnbn/entities-runtime").EventPatternFor<"engine.api", "step">;
            useCase: import("@cnbn/entities-runtime").EventPatternFor<"engine.api", "useCase">;
            wrapper: import("@cnbn/entities-runtime").EventPatternFor<"engine.api", "wrapper">;
            useCaseFn: import("@cnbn/entities-runtime").EventPatternFor<"engine.api", "useCaseFn">;
            rollback: import("@cnbn/entities-runtime").EventPatternFor<"engine.api", "rollback">;
        } & {
            anyType: import("@cnbn/entities-runtime").EventPatternFor<"engine.api", "*">;
        };
        readonly anyType: import("@cnbn/entities-runtime").EventPatternFor<"engine.*", "*">;
    };
    readonly anyType: import("@cnbn/entities-runtime").EventPatternFor<"*.*", "*">;
};
export declare const EngineEventGroups: {
    readonly flowTool: readonly ["engine.api.step.*", "engine.api.rollback.*"];
    readonly apiBuilder: readonly ["engine.api.useCase.*", "engine.api.wrapper.*", "engine.api.useCaseFn.*"];
};
//# sourceMappingURL=eventPatterns.d.ts.map