export type RunnerState = "interactive:paused" | "interactive:running" | "testbench";
export interface ResultMeta {
    ticksExecuted: number;
    eventsProcessed: number;
    state: RunnerState;
}
export interface SimulationStatus {
    state: RunnerState;
    ticksExecuted: number;
    eventsProcessed: number;
    now: number;
    isFinished: boolean;
}
//# sourceMappingURL=RunnerStats.types.d.ts.map