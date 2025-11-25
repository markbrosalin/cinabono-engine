import { Id, LogicValue, PinIndex, Read } from "@cnbn/schema";
import { InputCore, OutputCore, PinUpdate } from "./SimulatorStep.types";
import { ResultMeta } from "./RunnerStats.types";
import { ComputeServiceContract } from "@cnbn/modules-runtime";
interface EventSimulationCore {
    time: number;
    sequence: number;
    itemId: Id;
    value: LogicValue;
}
export type EventDriver = EventSimulationCore & {
    fromPin: PinIndex;
};
export type EventReceiver = EventSimulationCore & {
    toPin: PinIndex;
};
export type EventSimulation = EventDriver | EventReceiver;
export interface SimulationCtx {
    getItem: Read<"item">;
    getScope: Read<"scope">;
    getLink: Read<"link">;
    computeService: ComputeServiceContract;
}
export type PickFromCtx<T extends keyof SimulationCtx> = Pick<SimulationCtx, T>;
export interface RunnerResult {
    meta: ResultMeta;
    updatesPerTick: PinUpdate[];
    updatesPerBatch: PinUpdate[];
}
export type UpdateIOParams = Pick<InputCore | OutputCore, "itemId" | "pin" | "t" | "value">;
export {};
//# sourceMappingURL=SimulatorRunner.types.d.ts.map