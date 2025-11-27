import { API_EVENT_PATTERNS } from "@engine/eventBus/events/core";
export const EVENT_PATTERNS = {
    api: API_EVENT_PATTERNS,
    any: {
        start: "*.*.start",
        finish: "*.*.finish",
        error: "*.*.error",
        event: "*.*.*",
    },
};
export const EVENT_PATTERN_GROUPS = {
    flowTool: [EVENT_PATTERNS.api.step.any, EVENT_PATTERNS.api.rollback.any],
    apiBuilder: [
        EVENT_PATTERNS.api.useCase.any,
        EVENT_PATTERNS.api.wrapper.any,
        EVENT_PATTERNS.api.useCaseFn.any,
    ],
};
