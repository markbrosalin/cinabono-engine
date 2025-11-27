import { ApiCtx } from "../../api/types/index.js";
import { BaseFn, ResultOf } from "@cnbn/schema";
/**
 *  use-case core
 */
export type Visibility = "public" | "internal";
export type ApiFactory<Fn extends BaseFn> = (ctx: ApiCtx) => Fn;
export type ApiWrapper = {
    <Fn extends BaseFn>(ctx: ApiCtx, next: Fn): ResultOf<Fn>;
} & {
    __name__?: string;
};
//# sourceMappingURL=api-core.d.ts.map