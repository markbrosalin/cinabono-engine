import { InputCore, OutputCore } from "../../model/index.js";
export declare const makeInputParams: (target: InputCore) => {
    kind: "input";
    itemId: string;
    pin: string;
    srcItemId: string | undefined;
    srcOutPin: string | undefined;
    t: number | undefined;
    value: import("@cnbn/schema").LogicValue;
    gen: number | undefined;
};
export declare const makeOutputParams: (target: OutputCore) => {
    kind: "output";
    itemId: string;
    pin: string;
    t: number | undefined;
    value: import("@cnbn/schema").LogicValue;
    gen: number | undefined;
};
//# sourceMappingURL=makeEventParams.d.ts.map