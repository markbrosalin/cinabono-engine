import { CORE_API_SPEC } from "../../api/spec";
import { ApiFromSpec, PublicApiFromSpec, SpecPaths, UseCaseCtx } from "../../api/types";
export type CoreApiSpec = typeof CORE_API_SPEC;
export type AllCoreApiPaths = SpecPaths<CoreApiSpec>;
export type CoreApi = ApiFromSpec<CoreApiSpec>;
export type PublicCoreAPI = PublicApiFromSpec<CoreApiSpec>;
export type CoreApiCtx = UseCaseCtx<CoreApiSpec>;
//# sourceMappingURL=core.d.ts.map