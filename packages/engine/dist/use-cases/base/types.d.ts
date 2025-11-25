import { UCBase } from "../../use-cases/base/UCBase";
export type UCInstFactory<P, R> = (name: string, payload: P) => R;
export type PayloadOfInst<K extends UCBase> = Parameters<K["run"]>;
export type ResultOfInst<K extends UCBase> = ReturnType<K["run"]>;
//# sourceMappingURL=types.d.ts.map