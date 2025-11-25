import { ItemOfKind, KindKey, WithInputPins, WithOutputPins } from "@repo/schema";
export declare const ensureDriverItem: <K extends KindKey, T extends ItemOfKind<K>>(item: T) => T & WithOutputPins<"item">;
export declare const ensureReceiverItem: <K extends KindKey, T extends ItemOfKind<K>>(item: T) => T & WithInputPins<"item">;
export declare const ensureSameScope: (itemA: ItemOfKind, itemB: ItemOfKind) => void;
//# sourceMappingURL=guards.d.ts.map