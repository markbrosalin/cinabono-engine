import { LoggerContract } from "@gately/domain-model/shared/error-logger";
import { EventBusContract } from "@gately/domain-model/shared/event-bus";
import { createToken } from "@repo/di/helpers";

export const EventBusToken = createToken<EventBusContract>("EventBus");
export const LoggerToken = createToken<LoggerContract>("Logger");
