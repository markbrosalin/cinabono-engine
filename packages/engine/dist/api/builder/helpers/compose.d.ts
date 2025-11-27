import { RuntimeEnv } from "../../../api/builder/types/env.js";
import { ApiCtx } from "../../../api/types/index.js";
import { BaseFn } from "@cnbn/schema";
export declare function composeUseCase<Fn extends BaseFn>(env: RuntimeEnv, ctx: ApiCtx, factory: () => Fn): Fn;
//# sourceMappingURL=compose.d.ts.map