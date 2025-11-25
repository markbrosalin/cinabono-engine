export interface LoggerContract {
    info?(msg: string, data?: unknown): void;
    warn?(msg: string, data?: unknown): void;
    error?(msg: string, data?: unknown): void;
}
export interface ILogger {
    info?(...args: unknown[]): void;
    warn?(...args: unknown[]): void;
    error?(...args: unknown[]): void;
}
export type WithLogger = {
    logger?: LoggerContract;
};
//# sourceMappingURL=contract.d.ts.map