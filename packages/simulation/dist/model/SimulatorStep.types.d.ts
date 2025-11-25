import { Id, LogicValue, PinIndex } from "@cnbn/schema";
export type SimEventKind = "input" | "output";
export type Tick = number;
interface ScheduleBase {
    itemId: Id;
    pin: PinIndex;
    value: LogicValue;
    t?: Tick;
    gen?: number;
    srcItemId?: Id;
    srcOutPin?: PinIndex;
}
export type ScheduleParams = ScheduleInputParams | ScheduleOutputParams;
export type ScheduleInputParams = Pick<ScheduleBase, "itemId" | "pin" | "value" | "t" | "gen" | "srcItemId" | "srcOutPin"> & {
    kind: "input";
};
export type ScheduleOutputParams = Pick<ScheduleBase, "itemId" | "pin" | "value" | "t" | "gen"> & {
    kind: "output";
};
export type InputCore = Omit<ScheduleInputParams, "kind">;
export type OutputCore = Omit<ScheduleOutputParams, "kind">;
export type PropagateOutputParams = Pick<OutputCore, "itemId" | "pin" | "t">;
export type SimEvent = ScheduleParams & {
    t: Tick;
    delta: number;
    seq: number;
};
export type SimInputEvent = Extract<SimEvent, {
    kind: "input";
}>;
export type SimOutputEvent = Extract<SimEvent, {
    kind: "output";
}>;
export type FanoutReceiver = Pick<ScheduleBase, "itemId" | "pin">;
export interface PinUpdate extends Pick<ScheduleBase, "itemId" | "pin" | "value"> {
    kind: SimEventKind;
    t: Tick;
}
export {};
//# sourceMappingURL=SimulatorStep.types.d.ts.map