import { KindKey, ItemArgsOfKind, ItemOfKind, WithId, isOnePinBaseLogic } from "@cnbn/schema";
import { isEmptyValue, uniqueId } from "@cnbn/utils";
import { getDefaultSettings, normalizeBasePin, normalizeCircuitPins } from "./helpers";
import { ensureMeta } from "@cnbn/helpers";
import { ConditionalMerger } from "@cnbn/entities-runtime";

type BaseFields<K extends KindKey> = Pick<
    ItemArgsOfKind<K>,
    "hash" | "kind" | "name" | "path" | "meta" | "options"
> &
    WithId;

export interface ItemCreatorContract {
    create<K extends KindKey>(args: ItemArgsOfKind<K>): ItemOfKind<K>;
}

export class DefaultItemCreator implements ItemCreatorContract {
    private readonly _get = getDefaultSettings();
    public create<K extends KindKey>(args: ItemArgsOfKind<K>): ItemOfKind<K> {
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

    private _baseFields<K extends KindKey>(args: ItemArgsOfKind<K>): BaseFields<K> {
        return new ConditionalMerger(
            {
                id: args.id ?? uniqueId(),
                hash: args.hash,
                kind: args.kind,
                name: args.name,
                path: args.path,
            },
            (v) => !isEmptyValue(v)
        )
            .add("meta", args.meta)
            .add("options", args.options)
            .build();
    }

    private _buildGenerator(args: ItemArgsOfKind<"base:generator">): ItemOfKind<"base:generator"> {
        const numOfOuts = args.meta?.numOfOutputs ?? this._get.genOutputsNum();

        return {
            ...this._baseFields<"base:generator">(args),
            outputPins: normalizeBasePin(numOfOuts, this._get.generatorValue(), args.outputPins),
        } as const;
    }

    private _buildLogic(args: ItemArgsOfKind<"base:logic">): ItemOfKind<"base:logic"> {
        const defaultNum = this._get.logicInputsNum();

        // BUFFER and NOT have only 1 input pin
        const numOfInputs = isOnePinBaseLogic(args) ? 1 : (args.meta?.numOfInputs ?? defaultNum);
        if (numOfInputs !== defaultNum) ensureMeta(args).numOfInputs = numOfInputs;

        return {
            ...this._baseFields<"base:logic">(args),
            inputPins: normalizeBasePin(numOfInputs, this._get.baseInputValue(), args.inputPins),
            outputPins: normalizeBasePin(1, this._get.baseOutputValue(), args.outputPins),
        } as const;
    }

    private _buildDisplay(args: ItemArgsOfKind<"base:display">): ItemOfKind<"base:display"> {
        const numOfInputs = args.meta?.numOfInputs ?? this._get.displayInputsNum();

        return {
            ...this._baseFields<"base:display">(args),
            inputPins: normalizeBasePin(numOfInputs, this._get.displayValue(), args.inputPins),
        } as const;
    }

    private _buildCircuit(args: ItemArgsOfKind<"circuit:logic">): ItemOfKind<"circuit:logic"> {
        return {
            ...this._baseFields<"circuit:logic">(args),
            inputPins: normalizeCircuitPins(args, this._get.circInputValue(), "inputPins"),
            outputPins: normalizeCircuitPins(args, this._get.circOutputValue(), "outputPins"),
        } as const;
    }
}
