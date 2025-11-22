import { CoreEventMap } from "@engine/eventBus/events/core";

export type EngineEventMap = CoreEventMap & UserEventMap;

type UserEventMap = Record<`user.${string}`, Record<string, unknown>>;
