import { FanoutReceiver } from "../../model/SimulatorStep.types.js";
import { TargetParams } from "./types.js";
import { SimulationCtx } from "../../model/index.js";
type StoresCtx = Pick<SimulationCtx, "getItem" | "getLink" | "getScope">;
export declare const resolveAllReceivers: (ctx: StoresCtx, params: TargetParams) => FanoutReceiver[];
export {};
//# sourceMappingURL=resolveAllReceivers.d.ts.map