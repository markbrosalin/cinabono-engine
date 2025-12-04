export declare const EngineWorkerEvents: {
    readonly workerEngine: {
        readonly rpc: import("@cnbn/entities-runtime").EventPatternFor<"workerEngine", "rpc">;
        readonly ready: "workerEngine.ready";
        readonly anyType: import("@cnbn/entities-runtime").EventPatternFor<"workerEngine", "*">;
    };
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
//# sourceMappingURL=patterns.d.ts.map