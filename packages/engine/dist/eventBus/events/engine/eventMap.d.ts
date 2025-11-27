import { CoreEventMap } from "../../../eventBus/events/core/index.js";
export type EngineEventMap = CoreEventMap & UserEventMap;
type UserEventMap = Record<`user.${string}`, Record<string, unknown>>;
export {};
//# sourceMappingURL=eventMap.d.ts.map