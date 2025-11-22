import { CircuitItem, isLogicItem, LogicItem, LogicValue } from "@cnbn/schema";
import { ComputableItem } from "../model/types";
import { BakeStoreContract, Computable, ComputeStoreContract } from "../model/contracts";
import { isBakedItem } from "../model/guards";

export class DefaultComputeEngine implements Computable {
    constructor(
        private readonly _compute: ComputeStoreContract,
        private readonly _bake: BakeStoreContract
    ) {}

    public computeOuts(item: ComputableItem): LogicValue[] {
        if (isBakedItem(item)) return this._computeBaked(item);
        if (isLogicItem(item)) return this._computeLogic(item);

        throw new Error(`Unsupported type of item kind: "${item.kind}" (hash: ${item.hash})`);
    }

    private _computeLogic(item: LogicItem): LogicValue[] {
        const fn = this._compute.get(item.hash);
        if (fn) return fn(item);

        throw new Error(
            `Missing compute function for item name: "${item.name}" (hash: ${item.hash})`
        );
    }

    private _computeBaked(item: CircuitItem): LogicValue[] {
        const truthTable = this._bake.get(item.hash);
        if (!truthTable)
            throw new Error(
                `Missing bake table for item name: "${item.name}" (hash: ${item.hash})`
            );

        const inputPattern = Object.values(item.inputPins)
            .map((pin) => pin.value)
            .join("");
        const rowIndex = parseInt(inputPattern, 2);
        const outputPattern = truthTable[rowIndex];

        if (outputPattern === undefined) {
            throw new Error(`No row #${rowIndex} in bake table for item name: "${item.name}"`);
        }

        const outputBits = outputPattern.split("") as LogicValue[];
        return outputBits;
    }
}
