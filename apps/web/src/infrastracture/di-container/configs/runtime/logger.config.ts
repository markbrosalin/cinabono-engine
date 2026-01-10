import { DIConfig } from "@repo/di/types";
import { LoggerToken } from "@gately/domain-model/shared/di-tokens/app/infra";
import { Logger, LoggerContract } from "@gately/domain-model/shared/error-logger";

export const report = new Logger();

export const loggerConfig = {
    token: LoggerToken,
    useClass: Logger,
} satisfies DIConfig<LoggerContract>;
