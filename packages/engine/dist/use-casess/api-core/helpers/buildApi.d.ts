import { BaseFn, BaseObj } from "@repo/schema";
import { ApiTree, UseCase, AllApi, PublicApi } from "../../../use-casess/api-core/types";
export type WrapInvoker<T extends ApiTree> = <Deps extends BaseObj, Fn extends BaseFn>(path: string, uc: UseCase<Deps, Fn, T, any>) => Fn;
/**
 *  Builds api tree with public and internal use cases
 */
export declare function buildAllApi<T extends ApiTree>(node: T, wrap: WrapInvoker<T>, pref?: string): AllApi<T>;
/**
 *  Builds api tree with all only public use cases
 */
export declare function buildPublicApi<T extends ApiTree>(node: T, wrap: WrapInvoker<T>, pref?: string): PublicApi<T>;
//# sourceMappingURL=buildApi.d.ts.map