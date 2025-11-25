import { ItemOfKind, KindKey, WithInputPins, WithOutputPins } from "@cnbn/schema";
export declare const ensureDriverItem: <K extends KindKey, T extends ItemOfKind<K>>(item: T) => T & WithOutputPins<"item">;
export declare const ensureReceiverItem: <K extends KindKey, T extends ItemOfKind<K>>(item: T) => T & WithInputPins<"item">;
export declare const ensureSameScope: (itemA: ItemOfKind, itemB: ItemOfKind) => void;
//# sourceMappingURL=item.d.ts.map