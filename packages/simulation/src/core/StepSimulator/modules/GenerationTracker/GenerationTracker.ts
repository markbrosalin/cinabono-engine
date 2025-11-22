import { PinIndex, Id } from "@cnbn/schema";
import { GenerationTrackerContract } from "./contract";
import { uniqueKeyByData } from "@cnbn/utils";

export class DefaultGenerationTracker implements GenerationTrackerContract {
    private readonly _outputGens: Map<string, number> = new Map();

    public get(itemId: Id, outPin: PinIndex): number {
        return this._outputGens.get(`${itemId}:${outPin}`) ?? 0;
    }

    public bump(itemId: Id, outPin: PinIndex): number {
        const key = this._key(itemId, outPin);
        const next = this.get(itemId, outPin) + 1;
        this._outputGens.set(key, next);
        return next;
    }

    public same(evGen: number | undefined, itemId: Id, outPin: PinIndex): boolean {
        return evGen === this.get(itemId, outPin);
    }

    public reset(): void {
        this._outputGens.clear();
    }

    private _key(itemId: Id, outPin: PinIndex): string {
        return uniqueKeyByData(itemId, outPin);
    }
}
