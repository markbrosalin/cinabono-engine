import { EngineApi } from "@engine/api/types";
import { IEngineEvents, EngineEventGroups } from "@engine/eventBus";
import { NarrowReturn } from "@cnbn/entities-runtime";

export interface ApiBuilderContract {
    buildApi(): EngineApi;
}

export type ApiBuilderEventBus = NarrowReturn<IEngineEvents, typeof EngineEventGroups.apiBuilder>;
