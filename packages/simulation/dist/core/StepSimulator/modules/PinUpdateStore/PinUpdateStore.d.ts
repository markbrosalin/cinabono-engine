import { PinUpdate } from "../../../../model/index.js";
import { PinUpdateStoreContract, UpdateParams } from "./contract.js";
export declare class DefaultPinUpdateStore implements PinUpdateStoreContract {
    private readonly _updates;
    getAll(): PinUpdate[];
    saveInput({ itemId, pin, value, t }: UpdateParams): void;
    saveOutput({ itemId, pin, value, t }: UpdateParams): void;
    clear(): void;
    private _save;
    private _makeKey;
}
//# sourceMappingURL=PinUpdateStore.d.ts.map