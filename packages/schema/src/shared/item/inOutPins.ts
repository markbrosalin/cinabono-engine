import { WithOf } from "../shared";
import { KindKey, Id, ItemOrTemp, Pin, PinIndex } from "./types";

export type WithInOutPins<K extends KindKey, T extends ItemOrTemp> = WithOf<
    K,
    InOutPinsMap<T>
>;

export type InOutPinsMap<T extends ItemOrTemp> = {
    base: {
        generator: Pick<WithBasePins<T>, "outputPins">;
        logic: WithBasePins<T>;
        display: Pick<WithBasePins<T>, "inputPins">;
    };
    circuit: { logic: WithCircuitPins<T> };
};

export type BasePin<T extends ItemOrTemp = "item"> = T extends "template"
    ? Record<PinIndex, Pick<Partial<Pin>, "value">>
    : Record<PinIndex, Pin>;

export type WithBasePins<T extends ItemOrTemp = "item"> = T extends "template"
    ? { outputPins?: BasePin<"template">; inputPins?: BasePin<"template"> }
    : { outputPins: BasePin<"item">; inputPins: BasePin<"item"> };

// circuit template
export type TemplateInputPins = Record<
    PinIndex,
    Pick<Partial<Pin>, "value"> & WithInputItems
>;
export type TemplateOutputPins = Record<
    PinIndex,
    Pick<Partial<Pin>, "value"> & WithOutputItem
>;

// circuit item
export type ItemInputPins = Record<PinIndex, Pin & WithInputItems>;
export type ItemOutputPins = Record<PinIndex, Pin & WithOutputItem>;

type CircuitPinsByType<T extends ItemOrTemp> = T extends "template"
    ? { in: TemplateInputPins; out: TemplateOutputPins }
    : { in: ItemInputPins; out: ItemOutputPins };

export type CircuitPins<
    D extends "in" | "out" | "all",
    T extends ItemOrTemp = "item",
> = D extends "all"
    ? CircuitPinsByType<T>["in"] | CircuitPinsByType<T>["out"]
    : D extends "in" | "out"
      ? CircuitPinsByType<T>[D]
      : never;

export type WithCircuitPins<T extends ItemOrTemp = "item"> = {
    inputPins: CircuitPins<"in", T>;
    outputPins: CircuitPins<"out", T>;
};

export type InnerInOutItem = { itemId: Id; pin: PinIndex };

export type InputItems = InnerInOutItem[];
export type OutputItem = InnerInOutItem;

export type WithInputItems = { inputItems?: InputItems };
export type WithOutputItem = { outputItem?: OutputItem };

export type WithInputPins<T extends ItemOrTemp> =
    | Pick<WithBasePins<T>, "inputPins">
    | Pick<WithCircuitPins<T>, "inputPins">;

export type WithOutputPins<T extends ItemOrTemp> =
    | Pick<WithBasePins<T>, "outputPins">
    | Pick<WithCircuitPins<T>, "outputPins">;
