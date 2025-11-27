import { PinUpdate } from "../../../../model/SimulatorStep.types.js";
export type UpdateParams = Pick<PinUpdate, "itemId" | "pin" | "value" | "t">;
export interface PinUpdateStoreContract {
    getAll(): PinUpdate[];
    saveInput({ itemId, pin, value }: UpdateParams): void;
    saveOutput({ itemId, pin, value }: UpdateParams): void;
    clear(): void;
}
//# sourceMappingURL=contract.d.ts.map