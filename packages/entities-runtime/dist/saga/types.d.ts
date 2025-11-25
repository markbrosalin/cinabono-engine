export interface SagaRollback {
    name: string;
    undo: () => Promise<unknown> | unknown;
}
export interface SagaLogger {
    info?(msg: string, data?: unknown): void;
    warn?(msg: string, data?: unknown): void;
    error?(msg: string, data?: unknown): void;
}
//# sourceMappingURL=types.d.ts.map