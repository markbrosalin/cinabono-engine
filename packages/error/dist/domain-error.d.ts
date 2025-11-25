export declare class DomainError<C extends string = string> extends Error {
    readonly module: string;
    readonly code: C;
    readonly message: string;
    readonly details?: Record<string, unknown> | undefined;
    readonly cause?: unknown | undefined;
    constructor(module: string, code: C, message: string, details?: Record<string, unknown> | undefined, cause?: unknown | undefined);
}
//# sourceMappingURL=domain-error.d.ts.map