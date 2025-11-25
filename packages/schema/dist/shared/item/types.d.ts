import { ItemRegistry, LogicItemNameList } from "./constants";
export type Category = keyof typeof ItemRegistry;
export type RoleOfCategory<C extends Category> = (typeof ItemRegistry)[C][number];
export type KindKey = {
    [C in Category]: `${C}:${RoleOfCategory<C>}`;
}[Category];
export type KindsWithoutRole<R extends RoleOf<KindKey>> = Exclude<KindKey, {
    [K in KindKey]: RoleOf<K> extends R ? K : never;
}[KindKey]>;
export type KindsWithRole<R extends RoleOf<KindKey>> = Extract<KindKey, {
    [K in KindKey]: RoleOf<K> extends R ? K : never;
}[KindKey]>;
export type CategoryOf<K extends KindKey> = K extends `${infer C}:${string}` ? C & Category : never;
export type RoleOf<K extends KindKey> = K extends `${string}:${infer R}` ? R : never;
export type LogicItemName = (typeof LogicItemNameList)[number];
export type Id = string;
export type Hash = string;
export type HierarchyPath = Id[];
export type PinIndex = string;
export type PinDelay = {
    rise: number;
    fall: number;
};
export type LogicValue = LogicValueBase | "C";
export type LogicValueBase = "0" | "1" | "Z" | "X";
export type SignalKind = "logic" | "data";
export type ItemOrTemp = "template" | "item";
export type CircuitPinRef = {
    circuitId: Id;
    circuitPin: PinIndex;
};
export type Pin = {
    value: LogicValue;
    circuitPins?: CircuitPinRef[];
};
//# sourceMappingURL=types.d.ts.map