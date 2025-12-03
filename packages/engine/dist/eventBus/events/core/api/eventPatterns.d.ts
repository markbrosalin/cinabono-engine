export declare const ApiEngineEvents: {
    readonly useCase: {
        readonly start: "engine.api.useCase.start";
        readonly finish: "engine.api.useCase.finish";
        readonly error: "engine.api.useCase.error";
        readonly any: "engine.api.useCase.*";
    };
    readonly wrapper: {
        readonly start: "engine.api.wrapper.start";
        readonly finish: "engine.api.wrapper.finish";
        readonly error: "engine.api.wrapper.error";
        readonly any: "engine.api.wrapper.*";
    };
    readonly useCaseFn: {
        readonly start: "engine.api.useCaseFn.start";
        readonly finish: "engine.api.useCaseFn.finish";
        readonly error: "engine.api.useCaseFn.error";
        readonly any: "engine.api.useCaseFn.*";
    };
    readonly step: {
        readonly start: "engine.api.step.start";
        readonly finish: "engine.api.step.finish";
        readonly error: "engine.api.step.error";
        readonly any: "engine.api.step.*";
    };
    readonly rollback: {
        readonly start: "engine.api.rollback.start";
        readonly finish: "engine.api.rollback.finish";
        readonly error: "engine.api.rollback.error";
        readonly any: "engine.api.rollback.*";
    };
    readonly any: {
        readonly start: "api.*.start";
        readonly finish: "api.*.finish";
        readonly error: "api.*.error";
        readonly event: "api.*.*";
    };
};
//# sourceMappingURL=eventPatterns.d.ts.map
