import { UCFlatMap, ApiTree } from "./types";
import { ApiExecutorContract } from "../../use-cases/ApiExecutor";
export declare const buildApiFromTree: <Tree extends ApiTree, ExecTree extends ApiTree = Tree>(executor: ApiExecutorContract<ExecTree>, tree: Tree, prefix?: string) => UCFlatMap<Tree>;
//# sourceMappingURL=api-registry.d.ts.map