import { ItemOfKind, LogicValue } from "@cnbn/schema/shared";
import { TargetParams } from "../../helpers/circuit-resolving/index.js";
import { SimulationCtx } from "../../model/index.js";
export declare const countItemDelay: (item: ItemOfKind, oldValue: LogicValue, newValue: LogicValue) => number;
export declare const countLampDelay: (target: TargetParams, ctx: Pick<SimulationCtx, "getItem">, newValue: LogicValue) => number;
//# sourceMappingURL=countItemDelay.d.ts.map