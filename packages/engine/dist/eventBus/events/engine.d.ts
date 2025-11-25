import { ApiEventMap } from "../../eventBus/events";
export type EngineEventMap = CoreEventMap & UserEventMap;
export interface CoreEventMap extends ApiEventMap {
}
type UserEventMap = Record<`user.${string}`, Record<string, unknown>>;
export {};
//# sourceMappingURL=engine.d.ts.map