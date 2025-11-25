"use strict";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//     ApiCtx,
//     ApiExecutorContract,
//     ApiExecutorDeps,
//     CallApi,
//     DepsAtNode,
//     FnAtNode,
// } from "../../use-cases/tools";
// import {
//     ApiPath,
//     ApiTree,
//     ApiFlatMap,
//     ApiUseCaseAtPath,
//     ApiFnPayloadUnionAtPath,
//     ApiFnResultUnionAtPath,
// } from "../../use-cases/api-registry";
// import { ApiUseCaseFn, ApiUseCaseMiddleware } from "../../use-cases/api-core";
// import { genSpanId, genTraceId } from "../../use-cases/api-core/helpers/generators";
// import { openGlobalOperations, openTabOperations } from "../../use-cases/steps-helpers";
// import { openScopeOperations } from "../../use-cases/steps-helpers/scope.operations";
// import { BaseFn, BaseObj } from "@repo/schema";
// export class DefaultApiExecutor<Tree extends ApiTree> implements ApiExecutorContract<Tree> {
//     private readonly _global: ApiUseCaseMiddleware<Tree, any>[];
//     constructor(
//         private readonly apiMap: ApiFlatMap<Tree>,
//         private readonly _deps: ApiExecutorDeps<Tree>
//     ) {
//         this._global = _deps.globalMiddlewares ?? ([] as ApiUseCaseMiddleware<Tree, any>[]);
//     }
//     public call<Path extends ApiPath<Tree>, A extends ApiFnPayloadUnionAtPath<Tree, Path>>(
//         path: Path,
//         parentCtx: Partial<ApiCtx<Tree>> = {},
//         ...payload: A
//     ): ApiFnResultUnionAtPath<Tree, Path, A> {
//         type Node = ApiUseCaseAtPath<Tree, Path>;
//         type Deps = DepsAtNode<Node>;
//         type Fn = FnAtNode<Node>;
//         const apiFn = this.apiMap[path] as ApiUseCaseFn<Tree, Deps, Fn>;
//         const ctx = this._makeCtx<Deps>(path, apiFn, parentCtx as ApiCtx<Tree, Deps> | undefined);
//         const chain = [
//             ...apiFn.__meta__.middlewares,
//             ...this._global,
//         ].reverse() as ApiUseCaseMiddleware<Tree, Deps>[];
//         const outputFn = this._compose<Deps, Fn>(chain, ctx, () => apiFn(ctx));
//         return (outputFn as (...args: A) => ApiFnResultUnionAtPath<Tree, Path, A>)(...payload);
//     }
//     private _makeCtx<Deps extends BaseObj>(
//         path: ApiPath<Tree>,
//         child: ApiUseCaseFn<Tree, Deps>,
//         parentCtx: Partial<ApiCtx<Tree, Deps>> = {}
//     ): ApiCtx<Tree, Deps> {
//         // ctx factory to avoid circular ref in callAPI
//         return (() => {
//             const flow = this._deps.infra.makeFlow(path);
//             const meta = {
//                 path,
//                 ucName: child.__meta__.ucName ?? "unnamed-usecase",
//                 traceId: parentCtx?.meta?.traceId ?? genTraceId(),
//                 spanId: genSpanId(),
//                 parentId: parentCtx?.meta?.spanId,
//             } as const;
//             const base: Omit<ApiCtx<Tree, Deps>, "ops" | "tools" | "meta"> = {
//                 core: this._deps.core,
//                 factories: this._deps.factories,
//                 stores: this._deps.stores,
//                 extras: this._deps.extras,
//                 deps: child.__meta__.deps ?? ({} as Readonly<Deps>),
//             } as const;
//             const callApi: CallApi<Tree> = (path, ...payload) =>
//                 this.call(path, ctxRef, ...payload);
//             const tools = {
//                 flow,
//                 callApi,
//                 globalOps: openGlobalOperations(flow, base.stores),
//                 tabOps: openTabOperations(flow),
//                 scopeOps: openScopeOperations(flow),
//             } as const;
//             const ctxRef = {
//                 ...base,
//                 tools,
//                 meta,
//             } as const;
//             return ctxRef;
//         })();
//     }
//     // wrap middlewares around use case fn
//     private _compose<Deps extends Record<string, unknown>, Fn extends BaseFn<unknown[], unknown>>(
//         middlewares: ApiUseCaseMiddleware<Tree, Deps>[],
//         ctx: ApiCtx<Tree, Deps>,
//         getFn: () => Fn
//     ): Fn {
//         const core = getFn() as BaseFn;
//         const wrapped = ((...payload: unknown[]) => {
//             let idx = -1;
//             const bus = this._deps.core.bus;
//             bus.emit("core.usecase.start", { ...ctx.meta, payload });
//             try {
//                 const result = dispatch(0, ...payload);
//                 bus.emit("core.usecase.finish", { ...ctx.meta, result });
//                 return result;
//             } catch (error) {
//                 bus.emit("core.usecase.error", { ...ctx.meta, error });
//                 throw error;
//             }
//             function dispatch(i: number, ...args: unknown[]): Fn {
//                 if (i <= idx) throw new Error("next() called multiple times");
//                 idx = i;
//                 // end of chain -> reached core fn
//                 if (i === middlewares.length) {
//                     bus.emit("core.usecase.coreFn.start", { ...ctx.meta, payload: args });
//                     const out = core(...args);
//                     bus.emit("core.usecase.coreFn.finish", { ...ctx.meta, result: out });
//                     return out;
//                 }
//                 // middleware
//                 const mw = middlewares[i];
//                 const mvName = mw.__meta__?.mwName ?? `mw-${i}`;
//                 bus.emit("core.middleware.before", { ...ctx.meta, mvName, payload: args });
//                 const output = mw(ctx, (...nextArgs) =>
//                     nextArgs.length > 0 ? dispatch(i + 1, ...nextArgs) : dispatch(i + 1, ...args)
//                 );
//                 bus.emit("core.middleware.after", { ...ctx.meta, mvName, result: output });
//                 return output as Fn;
//             }
//         }) as Fn;
//         return wrapped;
//     }
// }
