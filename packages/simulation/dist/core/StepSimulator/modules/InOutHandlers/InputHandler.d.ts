import { SimInputEvent } from "../../../../model/index.js";
import { InputHandlerContract, InOutHandlerDeps } from "./contracts.js";
export declare class DefaultInputHandler implements InputHandlerContract {
    private readonly _ctx;
    constructor(_ctx: InOutHandlerDeps);
    handle(ev: SimInputEvent): boolean;
    private _isOldInput;
    private _updateInput;
}
//# sourceMappingURL=InputHandler.d.ts.map