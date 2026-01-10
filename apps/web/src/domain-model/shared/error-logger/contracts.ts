import { AppError } from ".";

export interface LoggerContract {
    info(msg: string, data?: unknown): void;
    warn(msg: string, data?: unknown): void;
    error(msg: string, data?: unknown): void;
    fatal(msg: string, data?: unknown): AppError;
    debug(msg: string, data?: unknown): void;
    unknown(err: unknown): void;
}
