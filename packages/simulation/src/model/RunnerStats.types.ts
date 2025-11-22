export type RunnerState = "interactive:paused" | "interactive:running" | "testbench";

export interface ResultMeta {
    ticksExecuted: number;
    eventsProcessed: number;
    state: RunnerState;
}
