import { PatternBuilder } from "@cnbn/entities-runtime";
export const patternBuilder = new PatternBuilder("engine");
export const EngineEvents = {
    engine: {
        api: patternBuilder
            .cd("api")
            .group(true, "useCase", "wrapper", "useCaseFn", "step", "rollback"),
        anyType: patternBuilder.cd().wildcard(),
    },
    anyType: new PatternBuilder().cd().wildcard(),
};
export const EngineEventGroups = {
    flowTool: [
        EngineEvents.engine.api.step.anyPhase,
        EngineEvents.engine.api.rollback.anyPhase,
    ],
    apiBuilder: [
        EngineEvents.engine.api.useCase.anyPhase,
        EngineEvents.engine.api.wrapper.anyPhase,
        EngineEvents.engine.api.useCaseFn.anyPhase,
    ],
};
