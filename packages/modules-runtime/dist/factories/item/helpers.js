import { getGlobalCfg } from "@cnbn/config";
import { mkDefaultPins } from "@cnbn/helpers";
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
    };
};
export const normalizeBasePin = (count, defaultValue, override) => {
    return mkDefaultPins(count, (i) => ({
        value: override?.[i].value ?? defaultValue,
    }));
};
export const normalizeCircuitPins = (pins, defaultValue, type) => {
    const clone = { ...pins[type] };
    for (const key in clone) {
        const pin = clone[key];
        if (pin.value == null)
            pin.value = defaultValue;
    }
    return clone;
};
