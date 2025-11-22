import { EngineApi } from "@engine/api/types";
import { EngineEventMap, EVENT_PATTERN_GROUPS } from "@engine/eventBus";
import { NarrowReturn } from "@cnbn/entities-runtime";

export interface ApiBuilderContract {
    buildApi(): EngineApi;
}

export type ApiBuilderEventBus = NarrowReturn<
    EngineEventMap,
    typeof EVENT_PATTERN_GROUPS.apiBuilder
>;
