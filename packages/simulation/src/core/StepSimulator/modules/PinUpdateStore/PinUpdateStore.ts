import { PinUpdate } from "@sim/model";
import { PinUpdateStoreContract, UpdateParams } from "./contract";
import { uniqueKeyByData } from "@cnbn/utils";

type MakeKeyParams = Pick<PinUpdate, "itemId" | "pin" | "kind">;

export class DefaultPinUpdateStore implements PinUpdateStoreContract {
    private readonly _updates: Map<string, PinUpdate> = new Map();

    public getAll(): PinUpdate[] {
        return Array.from(this._updates.values());
    }

    public saveInput({ itemId, pin, value, t }: UpdateParams): void {
        this._save({ kind: "input", itemId, pin, value, t });
    }

    public saveOutput({ itemId, pin, value, t }: UpdateParams): void {
        this._save({ kind: "output", itemId, pin, value, t });
    }

    public clear(): void {
        this._updates.clear();
    }

    private _save(update: PinUpdate): void {
        this._updates.set(this._makeKey(update), update);
    }

    private _makeKey(u: MakeKeyParams): string {
        return uniqueKeyByData(u.itemId, u.pin, u.kind);
    }
}
