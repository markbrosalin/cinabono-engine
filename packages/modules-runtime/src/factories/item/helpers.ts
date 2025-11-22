import { getGlobalCfg } from "@cnbn/config";
import { mkDefaultPins } from "@cnbn/helpers";
import { LogicValueBase, WithCircuitPins, BasePin } from "@cnbn/schema";

export const getDefaultSettings = () => {
    return {
        displayValue: () => getGlobalCfg().pins.initialDisplayValue,
        generatorValue: () => getGlobalCfg().pins.initialGeneratorValue,
        baseInputValue: () => getGlobalCfg().pins.initialBaseInputValue,
        baseOutputValue: () => getGlobalCfg().pins.initialBaseOutputValue,
        circInputValue: () => getGlobalCfg().pins.initialCircuitInputValue,
        circOutputValue: () => getGlobalCfg().pins.initialCircuitOutputValue,
        logicInputsNum: () => getGlobalCfg().pins.numOfBaseLogicInputs,
        displayInputsNum: () => getGlobalCfg().pins.numOfDisplayInputs,
        genOutputsNum: () => getGlobalCfg().pins.numOfGeneratorOutputs,
    } as const;
};

export const normalizeBasePin = (
    count: number,
    defaultValue: LogicValueBase,
    override?: BasePin<"template">
): BasePin<"item"> => {
    return mkDefaultPins(count, (i) => ({
        value: override?.[i].value ?? defaultValue,
    }));
};

export const normalizeCircuitPins = <T extends keyof WithCircuitPins<"template">>(
    pins: WithCircuitPins<"template">,
    defaultValue: LogicValueBase,
    type: T
): WithCircuitPins<"item">[T] => {
    const clone = { ...pins[type] };

    for (const key in clone) {
        const pin = clone[key];
        if (pin.value == null) pin.value = defaultValue;
    }
    return clone;
};
