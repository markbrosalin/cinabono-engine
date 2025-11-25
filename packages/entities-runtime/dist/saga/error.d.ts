export declare class SagaError extends Error {
    readonly step: string;
    readonly cause?: unknown | undefined;
    constructor(step: string, cause?: unknown | undefined);
}
//# sourceMappingURL=error.d.ts.map