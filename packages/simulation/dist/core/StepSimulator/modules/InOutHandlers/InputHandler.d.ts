import { SimInputEvent } from "../../../../model";
import { InputHandlerContract, InOutHandlerDeps } from "./contracts";
export declare class DefaultInputHandler implements InputHandlerContract {
    private readonly _ctx;
    constructor(_ctx: InOutHandlerDeps);
    handle(ev: SimInputEvent): boolean;
    private _isOldInput;
    private _updateInput;
}
//# sourceMappingURL=InputHandler.d.ts.map