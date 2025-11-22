import { KindKey, WithId, WithPath } from "../shared";
import { Template } from "../template";

export type BaseArgs = GeneratorArgs | DisplayArgs | LogicArgs;
export type AnyArgs = BaseArgs | CircuitArgs;

export type GeneratorArgs = Args<"base:generator">;
export type LogicArgs = Args<"base:logic">;
export type DisplayArgs = Args<"base:display">;
export type CircuitArgs = Args<"circuit:logic">;

export type Args<K extends KindKey = KindKey> = Template<K> &
    WithPath &
    Partial<WithId>;
