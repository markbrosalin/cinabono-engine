import { PinUpdate } from "../../../../model";
import { PinUpdateStoreContract, UpdateParams } from "./contract";
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