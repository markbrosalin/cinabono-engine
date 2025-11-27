import { PinIndex, Id } from "@cnbn/schema";
import { GenerationTrackerContract } from "./contract.js";
export declare class DefaultGenerationTracker implements GenerationTrackerContract {
    private readonly _outputGens;
    get(itemId: Id, outPin: PinIndex): number;
    bump(itemId: Id, outPin: PinIndex): number;
    same(evGen: number | undefined, itemId: Id, outPin: PinIndex): boolean;
    reset(): void;
    private _key;
}
//# sourceMappingURL=GenerationTracker.d.ts.map