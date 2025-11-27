import { isLogicItem } from "@cnbn/schema";
import { isBakedItem } from "../model/guards.js";
export class DefaultComputeEngine {
    constructor(_compute, _bake) {
        this._compute = _compute;
        this._bake = _bake;
    }
    computeOuts(item) {
        if (isBakedItem(item))
            return this._computeBaked(item);
        if (isLogicItem(item))
            return this._computeLogic(item);
        throw new Error(`Unsupported type of item kind: "${item.kind}" (hash: ${item.hash})`);
    }
    _computeLogic(item) {
        const fn = this._compute.get(item.hash);
        if (fn)
            return fn(item);
        throw new Error(`Missing compute function for item name: "${item.name}" (hash: ${item.hash})`);
    }
    _computeBaked(item) {
        const truthTable = this._bake.get(item.hash);
        if (!truthTable)
            throw new Error(`Missing bake table for item name: "${item.name}" (hash: ${item.hash})`);
        const inputPattern = Object.values(item.inputPins)
            .map((pin) => pin.value)
            .join("");
        const rowIndex = parseInt(inputPattern, 2);
        const outputPattern = truthTable[rowIndex];
        if (outputPattern === undefined) {
            throw new Error(`No row #${rowIndex} in bake table for item name: "${item.name}"`);
        }
        const outputBits = outputPattern.split("");
        return outputBits;
    }
}
