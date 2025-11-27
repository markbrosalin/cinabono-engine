import { EngineApi } from "../../../api/types/index.js";
import { EngineEventMap, EVENT_PATTERN_GROUPS } from "../../../eventBus/index.js";
import { NarrowReturn } from "@cnbn/entities-runtime";
export interface ApiBuilderContract {
    buildApi(): EngineApi;
}
export type ApiBuilderEventBus = NarrowReturn<EngineEventMap, typeof EVENT_PATTERN_GROUPS.apiBuilder>;
//# sourceMappingURL=contracts.d.ts.map