import { LogicValueBase } from "@cnbn/schema/shared";

export type GlobalConfig = typeof globalConfig;

export const globalConfig = {
    api: {
        maxLoopDepth: 64 as number,
    },
    pins: {
        initialDisplayValue: "Z" as LogicValueBase,
        initialBaseInputValue: "Z" as LogicValueBase,
        initialCircuitInputValue: "Z" as LogicValueBase,

        initialGeneratorValue: "0" as LogicValueBase,
        initialBaseOutputValue: "X" as LogicValueBase,
        initialCircuitOutputValue: "X" as LogicValueBase,

        numOfGeneratorOutputs: 1 as number,
        numOfDisplayInputs: 1 as number,
        numOfBaseLogicInputs: 2 as number,
    },

    itemDelay: {
        rise: 2 as number,
        fall: 2 as number,
    },

    useBakedFirst: false as boolean,
} as const;
