import { Id, PinIndex } from "@cnbn/schema";

export interface GenerationTrackerContract {
    get(itemId: Id, outPin: PinIndex): number;
    bump(itemId: Id, outPin: PinIndex): number;
    same(evGen: number | undefined, itemId: Id, outPin: PinIndex): boolean;
    reset(): void;
}
