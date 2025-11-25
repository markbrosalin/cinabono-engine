import { ExecutionEnv } from "../../../api/registry/types";
import { ApiFromSpec, PublicApiFromSpec, Spec, UseCaseCtx } from "../../../api/types";
export declare function buildApiTree<S extends Spec>(env: ExecutionEnv<S>, parentCtx?: UseCaseCtx<S>): {
    api: ApiFromSpec<S>;
    publicApi: PublicApiFromSpec<S>;
};
//# sourceMappingURL=buildApiTree.d.ts.map