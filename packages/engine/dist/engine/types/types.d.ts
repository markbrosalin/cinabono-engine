import { DefaultApiTree, InstantiateTree, ApiTree } from "../../use-cases";
export type EngineApiTree = typeof DefaultApiTree;
export type EngineApi<T extends ApiTree> = InstantiateTree<T & EngineApiTree>;
//# sourceMappingURL=types.d.ts.map