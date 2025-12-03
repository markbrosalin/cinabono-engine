import { ICoreEvents } from "../core";

export interface IEngineEvents extends ICoreEvents, IUserEvents {}

interface IUserEvents extends Record<`engine.user.${string}`, Record<string, unknown>> {}
