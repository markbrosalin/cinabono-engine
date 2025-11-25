export declare const EVENT_PATTERNS: {
    readonly api: {
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
    readonly any: {
        readonly start: "*.*.start";
        readonly finish: "*.*.finish";
        readonly error: "*.*.error";
        readonly event: "*.*.*";
    };
};
export declare const EVENT_PATTERN_GROUPS: {
    flowTool: readonly ["api.step.*", "api.rollback.*"];
    apiBuilder: readonly ["api.useCase.*", "api.wrapper.*", "api.useCaseFn.*"];
};
//# sourceMappingURL=eventPatterns.d.ts.map