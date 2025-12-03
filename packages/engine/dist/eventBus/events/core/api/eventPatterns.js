export const ApiEngineEvents = {
    useCase: {
        start: "engine.api.useCase.start",
        finish: "engine.api.useCase.finish",
        error: "engine.api.useCase.error",
        any: "engine.api.useCase.*",
    },
    wrapper: {
        start: "engine.api.wrapper.start",
        finish: "engine.api.wrapper.finish",
        error: "engine.api.wrapper.error",
        any: "engine.api.wrapper.*",
    },
    useCaseFn: {
        start: "engine.api.useCaseFn.start",
        finish: "engine.api.useCaseFn.finish",
        error: "engine.api.useCaseFn.error",
        any: "engine.api.useCaseFn.*",
    },
    step: {
        start: "engine.api.step.start",
        finish: "engine.api.step.finish",
        error: "engine.api.step.error",
        any: "engine.api.step.*",
    },
    rollback: {
        start: "engine.api.rollback.start",
        finish: "engine.api.rollback.finish",
        error: "engine.api.rollback.error",
        any: "engine.api.rollback.*",
    },
    any: {
        start: "api.*.start",
        finish: "api.*.finish",
        error: "api.*.error",
        event: "api.*.*",
    },
};
