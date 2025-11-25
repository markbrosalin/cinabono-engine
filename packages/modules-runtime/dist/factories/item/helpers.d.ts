import { LogicValueBase, WithCircuitPins, BasePin } from "@cnbn/schema";
export declare const getDefaultSettings: () => {
    readonly displayValue: () => LogicValueBase;
    readonly generatorValue: () => LogicValueBase;
    readonly baseInputValue: () => LogicValueBase;
    readonly baseOutputValue: () => LogicValueBase;
    readonly circInputValue: () => LogicValueBase;
    readonly circOutputValue: () => LogicValueBase;
    readonly logicInputsNum: () => number;
    readonly displayInputsNum: () => number;
    readonly genOutputsNum: () => number;
};
export declare const normalizeBasePin: (count: number, defaultValue: LogicValueBase, override?: BasePin<"template">) => BasePin<"item">;
export declare const normalizeCircuitPins: <T extends keyof WithCircuitPins<"template">>(pins: WithCircuitPins<"template">, defaultValue: LogicValueBase, type: T) => WithCircuitPins<"item">[T];
//# sourceMappingURL=helpers.d.ts.map