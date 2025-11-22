import { InputCore, OutputCore, ScheduleInputParams, ScheduleOutputParams } from "../../model";

export const makeInputParams = (target: InputCore) => {
    return {
        kind: "input",
        itemId: target.itemId,
        pin: target.pin,
        srcItemId: target.srcItemId,
        srcOutPin: target.srcOutPin,
        t: target.t,
        value: target.value,
        gen: target.gen,
    } satisfies ScheduleInputParams;
};

export const makeOutputParams = (target: OutputCore) => {
    return {
        kind: "output",
        itemId: target.itemId,
        pin: target.pin,
        t: target.t,
        value: target.value,
        gen: target.gen,
    } satisfies ScheduleOutputParams;
};
