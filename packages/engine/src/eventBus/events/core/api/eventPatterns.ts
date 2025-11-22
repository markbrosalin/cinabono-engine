export const API_EVENT_PATTERNS = {
    useCase: {
        start: "api.useCase.start",
        finish: "api.useCase.finish",
        error: "api.useCase.error",
        any: "api.useCase.*",
    },
    wrapper: {
        start: "api.wrapper.start",
        finish: "api.wrapper.finish",
        error: "api.wrapper.error",
        any: "api.wrapper.*",
    },
    useCaseFn: {
        start: "api.useCaseFn.start",
        finish: "api.useCaseFn.finish",
        error: "api.useCaseFn.error",
        any: "api.useCaseFn.*",
    },
    step: {
        start: "api.step.start",
        finish: "api.step.finish",
        error: "api.step.error",
        any: "api.step.*",
    },
    rollback: {
        start: "api.rollback.start",
        finish: "api.rollback.finish",
        error: "api.rollback.error",
        any: "api.rollback.*",
    },
    any: {
        start: "api.*.start",
        finish: "api.*.finish",
        error: "api.*.error",
        event: "api.*.*",
    },
} as const;
