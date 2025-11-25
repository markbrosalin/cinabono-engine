import { SimOutputEvent } from "../../../../model";
import { InOutHandlerDeps, OutputHandlerContract } from "./contracts";
export declare class DefaultOutputHandler implements OutputHandlerContract {
    private readonly _ctx;
    constructor(_ctx: InOutHandlerDeps);
    handle(ev: SimOutputEvent): boolean;
    private _isOldGeneration;
    private _updateOutput;
}
//# sourceMappingURL=OutputHandler.d.ts.map