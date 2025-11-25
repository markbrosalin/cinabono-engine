import { LogicValueBase } from "@cnbn/schema/shared";
export type GlobalConfig = typeof globalConfig;
export declare const globalConfig: {
    readonly api: {
        readonly maxLoopDepth: number;
    };
    readonly pins: {
        readonly initialDisplayValue: LogicValueBase;
        readonly initialBaseInputValue: LogicValueBase;
        readonly initialCircuitInputValue: LogicValueBase;
        readonly initialGeneratorValue: LogicValueBase;
        readonly initialBaseOutputValue: LogicValueBase;
        readonly initialCircuitOutputValue: LogicValueBase;
        readonly numOfGeneratorOutputs: number;
        readonly numOfDisplayInputs: number;
        readonly numOfBaseLogicInputs: number;
    };
    readonly itemDelay: {
        readonly rise: number;
        readonly fall: number;
    };
    readonly useBakedFirst: boolean;
};
//# sourceMappingURL=config.d.ts.map