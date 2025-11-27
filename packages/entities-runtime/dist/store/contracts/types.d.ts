import { CrudStore, ReadonlyStore, ReadUpdateStore } from "./stores.js";
export type AsReadonly<T extends ReadonlyStore<unknown, unknown>> = ReadonlyStore<Parameters<T["get"]>[0], ReturnType<T["get"]>>;
export type AsReadUpdate<T extends ReadUpdateStore<unknown, unknown>> = ReadUpdateStore<Parameters<T["get"]>[0], ReturnType<T["get"]>>;
export type AsCrud<T extends CrudStore<unknown, unknown>> = CrudStore<Parameters<T["get"]>[0], ReturnType<T["get"]>>;
//# sourceMappingURL=types.d.ts.map