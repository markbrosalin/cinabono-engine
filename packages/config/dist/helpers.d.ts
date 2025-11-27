import { GlobalConfig } from "./config.js";
export declare const getGlobalCfg: () => {
    readonly api: {
        readonly maxLoopDepth: number;
    };
    readonly pins: {
        readonly initialDisplayValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialBaseInputValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialCircuitInputValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialGeneratorValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialBaseOutputValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialCircuitOutputValue: import("@cnbn/schema/shared").LogicValueBase;
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
export declare const updateGlobalCfg: (update: Partial<GlobalConfig>) => {
    readonly api: {
        readonly maxLoopDepth: number;
    };
    readonly pins: {
        readonly initialDisplayValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialBaseInputValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialCircuitInputValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialGeneratorValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialBaseOutputValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialCircuitOutputValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly numOfGeneratorOutputs: number;
        readonly numOfDisplayInputs: number;
        readonly numOfBaseLogicInputs: number;
    };
    readonly itemDelay: {
        readonly rise: number;
        readonly fall: number;
    };
    readonly useBakedFirst: boolean;
} & Partial<{
    readonly api: {
        readonly maxLoopDepth: number;
    };
    readonly pins: {
        readonly initialDisplayValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialBaseInputValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialCircuitInputValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialGeneratorValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialBaseOutputValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly initialCircuitOutputValue: import("@cnbn/schema/shared").LogicValueBase;
        readonly numOfGeneratorOutputs: number;
        readonly numOfDisplayInputs: number;
        readonly numOfBaseLogicInputs: number;
    };
    readonly itemDelay: {
        readonly rise: number;
        readonly fall: number;
    };
    readonly useBakedFirst: boolean;
}>;
//# sourceMappingURL=helpers.d.ts.map