import { LoggerContract } from "./contracts";
import { AppError } from "./errors";

export enum LogLevel {
    FATAL = "FATAL",
    ERROR = "ERROR",
    WARN = "WARN",
    DEBUG = "DEBUG",
    INFO = "INFO",
}

interface LoggerOptions {
    isDev?: boolean;
}

export class Logger implements LoggerContract {
    private readonly isDev: boolean;

    private static readonly errorMap: Record<LogLevel, (err: AppError) => void | never> = {
        [LogLevel.INFO]: (err) =>
            console.info(err.toLogFormat(), ...(err.data !== undefined ? [err.data] : [])),
        [LogLevel.WARN]: (err) => console.warn(err.toErrorFormat()),
        [LogLevel.DEBUG]: (err) =>
            console.debug(err.message, ...(err.data !== undefined ? [err.data] : [])),
        [LogLevel.ERROR]: (err) => console.error(err.toErrorFormat()),
        [LogLevel.FATAL]: (err) => {
            console.error(err.toErrorFormat());
            throw err;
        },
    };

    constructor(options: LoggerOptions = {}) {
        this.isDev = options.isDev ?? import.meta.env.DEV;
    }

    public info(message: string, data?: unknown): void {
        this.reportCore(message, LogLevel.INFO, data);
    }

    public warn(message: string, data?: unknown): void {
        this.reportCore(message, LogLevel.WARN, data);
    }

    public error(message: string, data?: unknown): void {
        this.reportCore(message, LogLevel.ERROR, data);
    }

    public fatal(message: string, data?: unknown): AppError {
        throw this.reportCore(message, LogLevel.FATAL, data);
    }

    public debug(message: string, data?: unknown): void {
        this.reportCore(message, LogLevel.DEBUG, data);
    }

    public unknown(err: unknown, data?: unknown): void {
        if (err instanceof AppError) {
            this.reportCore(err.message, err.level, err.data);
        } else {
            const message = err instanceof Error ? err.message : String(err);
            this.reportCore(message, LogLevel.ERROR, {
                ...(data || {}),
            });
        }
    }

    private reportCore(message: string, level: LogLevel, data?: unknown): void | AppError {
        const error = new AppError({ message, level, data });
        const logFn = Logger.errorMap[level];

        if (this.shouldLog(level)) {
            logFn(error);
        }

        //Здесь будет будущий логгер, напр. Sentry
        //Sentry.captureException(error, { level });
    }

    private shouldLog(level: LogLevel): boolean {
        if (this.isDev) return true;
        return level === LogLevel.ERROR || level === LogLevel.FATAL || level === LogLevel.WARN;
    }
}

// logger.ts
// import consola, { Consola } from "consola";
// import * as SentryBrowser from "@sentry/browser";
// import * as SentryNode from "@sentry/node";

// export enum LogLevel {
//   INFO = "info",
//   WARN = "warn",
//   DEBUG = "debug",
//   ERROR = "error",
//   FATAL = "fatal",
// }

// export interface LoggerOptions {
//   env: "dev" | "prod";
//   isBrowser?: boolean;
//   sentryDsn?: string;
// }

// export class Logger {
//   private consola: Consola;
//   private env: "dev" | "prod";
//   private isBrowser: boolean;

//   constructor(options: LoggerOptions) {
//     this.env = options.env;
//     this.isBrowser = options.isBrowser ?? typeof window !== "undefined";
//     this.consola = consola.withTag("app");

//     // Инициализация Sentry
//     if (options.sentryDsn) {
//       const sentryInit = this.isBrowser ? SentryBrowser.init : SentryNode.init;
//       sentryInit({
//         dsn: options.sentryDsn,
//         tracesSampleRate: 1.0,
//       });
//     }
//   }

//   info(message: string, data?: unknown) {
//     this.consola.info(message, ...(data !== undefined ? [data] : []));
//   }

//   warn(message: string, data?: unknown) {
//     this.consola.warn(message, ...(data !== undefined ? [data] : []));
//   }

//   debug(message: string, data?: unknown) {
//     this.consola.debug(message, ...(data !== undefined ? [data] : []));
//   }

//   error(message: string, data?: unknown) {
//     this.consola.error(message, ...(data !== undefined ? [data] : []));
//     this.sendToSentry(message, data);
//   }

//   fatal(message: string, data?: unknown): never {
//     this.consola.error(`[FATAL] ${message}`, ...(data !== undefined ? [data] : []));
//     this.sendToSentry(message, data, LogLevel.FATAL);
//     throw new Error(message); // теперь можно просто logger.fatal()
//   }

//   private sendToSentry(message: string, data?: unknown, level: LogLevel = LogLevel.ERROR) {
//     if (this.env !== "prod") return;

//     const Sentry = this.isBrowser ? SentryBrowser : SentryNode;
//     Sentry.captureException(new Error(message), {
//       level,
//       extra: data ? { data } : {},
//     });
//   }
// }
