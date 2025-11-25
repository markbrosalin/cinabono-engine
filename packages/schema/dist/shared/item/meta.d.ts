import { WithOf } from "../shared";
import { KindKey, LogicValue, PinIndex } from "./types";
export type isSymmetric = boolean;
export type AutoTriggers = Record<PinIndex, AutoTrigger>;
export type AutoTrigger = {
    initialValue: LogicValue;
};
export type WithMeta<K extends KindKey = KindKey> = {
    meta?: WithOf<K, MetaMap>;
};
export type MetaMap = {
    base: {
        generator: {
            autoTriggers?: AutoTriggers;
            numOfOutputs?: number;
        };
        logic: {
            isSymmetric?: boolean;
            numOfInputs?: number;
        };
        display: {
            numOfInputs?: number;
        };
    };
    circuit: {
        logic: {
            isSymmetric?: boolean;
        };
    };
};
//# sourceMappingURL=meta.d.ts.map