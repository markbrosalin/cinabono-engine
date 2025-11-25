import { KindKey } from "../shared";
import { Args, BaseArgs } from "./types";
export declare const isArgs: (args: unknown) => args is Args;
export declare function isArgsOf<K extends KindKey>(value: unknown, kind: K): value is Args<K>;
export declare const isBaseArgs: (args: unknown) => args is BaseArgs;
export declare const isCircuitArgs: (args: unknown) => args is Args<"circuit:logic">;
export declare const isGeneratorArgs: (args: unknown) => args is Args<"base:generator">;
export declare const isLogicArgs: (args: unknown) => args is Args<"base:logic">;
export declare const isDisplayArgs: (args: unknown) => args is Args<"base:display">;
//# sourceMappingURL=guards.d.ts.map