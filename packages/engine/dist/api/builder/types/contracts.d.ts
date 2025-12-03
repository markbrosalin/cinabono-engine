import { EngineApi } from "../../../api/types/index.js";
import { IEngineEvents, EngineEventGroups } from "../../../eventBus/index.js";
import { NarrowReturn } from "@cnbn/entities-runtime";
export interface ApiBuilderContract {
    buildApi(): EngineApi;
}
export type ApiBuilderEventBus = NarrowReturn<IEngineEvents, typeof EngineEventGroups.apiBuilder>;
//# sourceMappingURL=contracts.d.ts.map