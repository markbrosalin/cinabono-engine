import { ItemOfKind } from "../shared/index.js";
import { KindKey, Pin, WithHash, WithInputItems, WithInputPins, WithOutputItem, WithOutputPins } from "../shared/item/index.js";
import { BaseItem } from "./types.js";
export declare const isItem: (value: unknown) => value is ItemOfKind;
export declare const isItemOf: <K extends KindKey>(value: unknown, kind: K) => value is ItemOfKind<K>;
export declare const isLogicItem: (i: unknown) => i is import("./types.js").LogicItem;
export declare const isGeneratorItem: (i: unknown) => i is import("./types.js").GeneratorItem;
export declare const isDisplayItem: (i: unknown) => i is import("./types.js").DisplayItem;
export declare const isCircuitItem: (i: unknown) => i is import("./types.js").CircuitItem;
export declare const isBaseItem: (i: unknown) => i is BaseItem;
export declare const hasItemInputPins: <T extends Record<string, unknown>>(entity: T) => entity is T & WithInputPins<"item">;
export declare const hasItemOutputPins: <T extends Record<string, unknown>>(entity: T) => entity is T & WithOutputPins<"item">;
export declare const hasPinInputItems: <T extends Pin>(pin: T) => pin is T & WithInputItems;
export declare const hasPinOutputItem: <T extends Pin>(pin: T) => pin is T & WithOutputItem;
export declare const isOnePinBaseLogic: <T extends WithHash>(i: T) => i is T & {
    hash: "BUFFER";
};
//# sourceMappingURL=guards.d.ts.map