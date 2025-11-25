import { RuntimeEnv } from "../../../api/registry/types/env";
import { Spec, UseCaseCtx } from "../../../api/types";
import { BaseFn } from "@repo/schema";
export declare function composeUseCase<S extends Spec, Fn extends BaseFn>(env: RuntimeEnv<S>, ctx: UseCaseCtx<S>, factory: () => Fn): Fn;
//# sourceMappingURL=compose.d.ts.map