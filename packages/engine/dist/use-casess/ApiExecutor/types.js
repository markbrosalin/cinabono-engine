"use strict";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { EngineCtx } from "../../engine";
// import { ApiExecutorEvents } from "../../eventBus";
// import { openGlobalOperations, openTabOperations } from "../../use-cases/steps-helpers";
// import { openScopeOperations } from "../../use-cases/steps-helpers/scope.operations";
// import { FlowToolContract, FlowToolFactory } from "../../use-cases/tools/FlowTool";
// import {
//     ApiPath,
//     ApiTree,
//     ApiFnPayloadUnionAtPath,
//     ApiFnResultUnionAtPath,
//     ApiUseCaseAtPath,
// } from "../../use-cases/api-registry";
// import { EventBus } from "@repo/entities-runtime/eventBus";
// import { ApiUseCaseFn } from "../../use-cases/api-core/types/usecase-core";
// // type PluginsConfig<Tree extends ApiTree> = NonNullable<EngineCtx<Tree>["plugins"]>;
// // export type ApiExecutorBus = EventBus<ApiExecutorEvents>;
// // export interface ApiExecutorDeps<Tree extends ApiTree> {
// //     core: Omit<EngineCtx<Tree>["core"], "bus"> & { bus: ApiExecutorBus };
// //     factories: EngineCtx<Tree>["factories"];
// //     stores: EngineCtx<Tree>["stores"];
// //     extras?: PluginsConfig<Tree>["extras"];
// //     globalMiddlewares?: PluginsConfig<Tree>["globalMiddlewares"];
// //     infra: {
// //         makeFlow: FlowToolFactory;
// //     };
// // }
// // export type CallApi<Tree extends ApiTree> = <
// //     Path extends ApiPath<Tree>,
// //     A extends ApiFnPayloadUnionAtPath<Tree, Path>,
// // >(
// //     path: Path,
// //     ...payload: A
// // ) => ApiFnResultUnionAtPath<Tree, Path, A>;
// // export type ApiCtx<
// //     Tree extends ApiTree,
// //     Deps extends Record<string, unknown> = Record<string, unknown>,
// // > = Pick<ApiExecutorDeps<Tree>, "core" | "factories" | "stores" | "extras"> & {
// //     tools: ApiCtxTools<Tree>;
// //     meta: ApiCtxMeta;
// //     deps: Readonly<Deps>;
// // };
// // export interface ApiCtxTools<Tree extends ApiTree> {
// //     flow: FlowToolContract;
// //     callApi: CallApi<Tree>;
// //     globalOps: ReturnType<typeof openGlobalOperations>;
// //     tabOps: ReturnType<typeof openTabOperations>;
// //     scopeOps: ReturnType<typeof openScopeOperations>;
// // }
// // export interface ApiCtxMeta {
// //     path?: string;
// //     ucName?: string;
// //     traceId: string;
// //     spanId: string;
// //     parentId?: string;
// // }
// export interface ApiExecutorContract<Tree extends ApiTree> {
//     call<Path extends ApiPath<Tree>, A extends ApiFnPayloadUnionAtPath<Tree, Path>>(
//         path: Path,
//         parentCtx?: Partial<ApiCtx<Tree>>,
//         ...payload: A
//     ): ApiFnResultUnionAtPath<Tree, Path, A>;
// }
// export type DepsAtNode<N> = N extends ApiUseCaseFn<any, infer D, any> ? D : never;
// export type FnAtNode<N> =
//     N extends ApiUseCaseFn<any, Record<string, unknown>, infer Fn> ? Fn : never;
// export type ApiCtxForPath<
//     Tree extends ApiTree,
//     Path extends ApiPath<Tree>,
//     Deps = DepsAtNode<ApiUseCaseAtPath<Tree, Path>>,
// > = ApiCtx<Tree, Readonly<Deps>>;
