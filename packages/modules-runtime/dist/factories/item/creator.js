import { isOnePinBaseLogic } from "@cnbn/schema";
import { isEmptyValue, uniqueId } from "@cnbn/utils";
import { getDefaultSettings, normalizeBasePin, normalizeCircuitPins } from "./helpers.js";
import { ensureMeta } from "@cnbn/helpers";
import { ConditionalMerger } from "@cnbn/entities-runtime";
export class DefaultItemCreator {
    constructor() {
        this._get = getDefaultSettings();
    }
    create(args) {
        switch (args.kind) {
            case "base:generator":
                return this._buildGenerator(args);
            case "base:logic":
                return this._buildLogic(args);
            case "base:display":
                return this._buildDisplay(args);
            case "circuit:logic":
                return this._buildCircuit(args);
        }
    }
    _baseFields(args) {
        return new ConditionalMerger({
            id: args.id ?? uniqueId(),
            hash: args.hash,
            kind: args.kind,
            name: args.name,
            path: args.path,
        }, (v) => !isEmptyValue(v))
            .add("meta", args.meta)
            .add("options", args.options)
            .build();
    }
    _buildGenerator(args) {
        const numOfOuts = args.meta?.numOfOutputs ?? this._get.genOutputsNum();
        return {
            ...this._baseFields(args),
            outputPins: normalizeBasePin(numOfOuts, this._get.generatorValue(), args.outputPins),
        };
    }
    _buildLogic(args) {
        const defaultNum = this._get.logicInputsNum();
        // BUFFER and NOT have only 1 input pin
        const numOfInputs = isOnePinBaseLogic(args) ? 1 : (args.meta?.numOfInputs ?? defaultNum);
        if (numOfInputs !== defaultNum)
            ensureMeta(args).numOfInputs = numOfInputs;
        return {
            ...this._baseFields(args),
            inputPins: normalizeBasePin(numOfInputs, this._get.baseInputValue(), args.inputPins),
            outputPins: normalizeBasePin(1, this._get.baseOutputValue(), args.outputPins),
        };
    }
    _buildDisplay(args) {
        const numOfInputs = args.meta?.numOfInputs ?? this._get.displayInputsNum();
        return {
            ...this._baseFields(args),
            inputPins: normalizeBasePin(numOfInputs, this._get.displayValue(), args.inputPins),
        };
    }
    _buildCircuit(args) {
        return {
            ...this._baseFields(args),
            inputPins: normalizeCircuitPins(args, this._get.circInputValue(), "inputPins"),
            outputPins: normalizeCircuitPins(args, this._get.circOutputValue(), "outputPins"),
        };
    }
}
