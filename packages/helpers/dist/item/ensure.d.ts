import { Id, ItemOfKind, KindKey, Read, WithMeta } from "@cnbn/schema";
export declare const ensureToggle: (id: Id, getItem: Read<"item">) => (ItemOfKind<"base:generator"> & {
    hash: "TOGGLE";
}) | undefined;
export declare const ensureLamp: (id: Id, getItem: Read<"item">) => (ItemOfKind<"base:display"> & {
    hash: "LAMP";
}) | undefined;
export declare const ensureMeta: <K extends KindKey, T extends WithMeta<K>>(args: T) => NonNullable<T["meta"]>;
//# sourceMappingURL=ensure.d.ts.map