import { FanoutReceiver } from "../../model/SimulatorStep.types";
import { TargetParams } from "./types";
import { SimulationCtx } from "../../model";
type StoresCtx = Pick<SimulationCtx, "getItem" | "getLink" | "getScope">;
export declare const resolveAllReceivers: (ctx: StoresCtx, params: TargetParams) => FanoutReceiver[];
export {};
//# sourceMappingURL=resolveAllReceivers.d.ts.map