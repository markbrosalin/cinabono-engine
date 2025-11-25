export declare const API_EVENT_PATTERNS: {
    readonly useCase: {
        readonly start: "api.useCase.start";
        readonly finish: "api.useCase.finish";
        readonly error: "api.useCase.error";
        readonly any: "api.useCase.*";
    };
    readonly wrapper: {
        readonly start: "api.wrapper.start";
        readonly finish: "api.wrapper.finish";
        readonly error: "api.wrapper.error";
        readonly any: "api.wrapper.*";
    };
    readonly useCaseFn: {
        readonly start: "api.useCaseFn.start";
        readonly finish: "api.useCaseFn.finish";
        readonly error: "api.useCaseFn.error";
        readonly any: "api.useCaseFn.*";
    };
    readonly step: {
        readonly start: "api.step.start";
        readonly finish: "api.step.finish";
        readonly error: "api.step.error";
        readonly any: "api.step.*";
    };
    readonly rollback: {
        readonly start: "api.rollback.start";
        readonly finish: "api.rollback.finish";
        readonly error: "api.rollback.error";
        readonly any: "api.rollback.*";
    };
    readonly any: {
        readonly start: "api.*.start";
        readonly finish: "api.*.finish";
        readonly error: "api.*.error";
        readonly event: "api.*.*";
    };
};
//# sourceMappingURL=eventPatterns.d.ts.map