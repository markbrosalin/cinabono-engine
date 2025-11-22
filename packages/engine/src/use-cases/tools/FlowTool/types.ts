import { EngineEventMap, EVENT_PATTERN_GROUPS } from "@engine/eventBus";
import { NarrowReturn } from "@cnbn/entities-runtime";

export type StepName = string;
export type StepAction<T> = () => T;
export type StepRollback<T> = (value: T) => void;
export type RollbackStack = Array<{ name: StepName; undo: () => void }>;

export interface FlowToolContract {
    addStep<T>(name: StepName, action: StepAction<T>, rollback?: StepRollback<T>): T;
    addFail(name: StepName, error: unknown): never;
    rollbackSteps(): void;
    getTimeline(): IFlowStepData[];
    clear(): void;
}

export type FlowToolEventBus = NarrowReturn<EngineEventMap, typeof EVENT_PATTERN_GROUPS.flowTool>;

export type FlowToolFactory = (ucName: string, bus?: FlowToolEventBus) => FlowToolContract;

export interface IFlowStepData {
    name: StepName;
    startMs: number;
    endMs: number;
    duration: number;
    error?: unknown;
}
