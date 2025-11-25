import { EngineApi } from "../../../api/types";
import { EngineEventMap, EVENT_PATTERN_GROUPS } from "../../../eventBus";
import { NarrowReturn } from "@cnbn/entities-runtime";
export interface ApiBuilderContract {
    buildApi(): EngineApi;
}
export type ApiBuilderEventBus = NarrowReturn<EngineEventMap, typeof EVENT_PATTERN_GROUPS.apiBuilder>;
//# sourceMappingURL=contracts.d.ts.map