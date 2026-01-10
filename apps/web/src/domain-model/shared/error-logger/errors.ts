import { LogLevel } from ".";

interface AppErrorConstructor {
    message: string;
    level: LogLevel;
    data?: unknown;
}

export class AppError extends Error {
    level: LogLevel;
    data: unknown;
    constructor({ message, level, data }: AppErrorConstructor) {
        super(message);

        this.name = `[${level}]`;
        this.message = message;
        this.level = level;
        this.data = data;

        Error.captureStackTrace?.(this, AppError);
        Object.setPrototypeOf(this, new.target.prototype);
    }

    public toErrorFormat() {
        let output = this.toLogFormat();
        if (this.data) {
            output += `Data: ${JSON.stringify(this.data, null, 2)}\n`;
        }
        output += `Class: ${this.constructor.name ?? "unknown"}`;
        output += `Stack:\n${this.formatStack()}`;
        return output;
    }

    public toLogFormat() {
        return `${this.name}: ${this.message}\n`;
    }

    private formatStack() {
        if (!this.stack) return "";

        const stackLines = this.stack.split("\n");
        return stackLines.slice(1).join("\n");
    }
}

export class SagaError extends Error {
    constructor(public readonly step: string, public readonly cause?: unknown) {
        super();
        this.name = "SagaError";
    }
}

export class DomainServiceError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            message,
            level: LogLevel.ERROR,
            data,
        });
    }
}
