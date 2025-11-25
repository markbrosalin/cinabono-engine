import { EngineCtx } from "../types";
import { DefaultEngineUCTree, UCTree } from "../../use-cases/uc-registry/types";
export interface EnginePlugin<AddDeps = {}, AddUC extends UCTree = {}> {
    extendDeps?<D extends EngineCtx>(deps: D): D & AddDeps;
    extendUseCases?<U extends DefaultEngineUCTree>(usecases: U): U & AddUC;
}
type PluginDeps<P> = P extends EnginePlugin<infer D, any> ? D : {};
type PluginUCTree<P> = P extends EnginePlugin<unknown, infer U> ? U : {};
export type PluginsDeps<P extends readonly EnginePlugin[]> = P extends readonly [
    infer A,
    ...infer R,
]
    ? A extends EnginePlugin
        ? PluginDeps<A> & PluginsDeps<Extract<R, readonly EnginePlugin[]>>
        : {}
    : {};
export type PluginsUCTree<P extends readonly EnginePlugin[]> = P extends readonly [
    infer A,
    ...infer R,
]
    ? A extends EnginePlugin
        ? PluginUCTree<A> & PluginsUCTree<Extract<R, readonly EnginePlugin[]>>
        : {}
    : {};
export type PluginsResult<P extends readonly EnginePlugin[]> = {
    deps: PluginsDeps<P>;
    usecases: PluginsUCTree<P>;
};
export type AppliedPlugins<P extends readonly EnginePlugin[]> = readonly [
    EngineCtx & PluginsResult<P>["deps"],
    DefaultEngineUCTree & PluginsResult<P>["usecases"],
];
export {};
//# sourceMappingURL=plugin.d.ts.map
