import { ICoreEvents } from "../core/index.js";
export interface IEngineEvents extends ICoreEvents, IUserEvents {
}
interface IUserEvents extends Record<`engine.user.${string}`, Record<string, unknown>> {
}
export {};
//# sourceMappingURL=eventMap.d.ts.map