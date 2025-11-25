import { CoreApiTree, EngineCtx } from "../../engine/types";
import { ApiTree } from "../../use-cases/api-registry/types";
export interface EnginePlugin<PluginDeps = {}, PluginAPI extends ApiTree = {}> {
    extendDeps?<D extends EngineCtx>(deps: D): D & PluginDeps;
    extendUseCases?<U extends CoreApiTree>(usecases: U): U & PluginAPI;
}
type PluginDeps<P> = P extends EnginePlugin<infer D, {}> ? D : {};
type PluginApiTree<P> = P extends EnginePlugin<unknown, infer U> ? U : {};
export type PluginsDeps<P extends readonly EnginePlugin[]> = P extends readonly [
    infer A,
    ...infer R
] ? A extends EnginePlugin ? PluginDeps<A> & PluginsDeps<Extract<R, readonly EnginePlugin[]>> : {} : {};
export type PluginsApiTree<P extends readonly EnginePlugin[]> = P extends readonly [
    infer A,
    ...infer R
] ? A extends EnginePlugin ? PluginApiTree<A> & PluginsApiTree<Extract<R, readonly EnginePlugin[]>> : {} : {};
export type PluginsResult<P extends readonly EnginePlugin[]> = {
    deps: PluginsDeps<P>;
    usecases: PluginsApiTree<P>;
};
export type AppliedPlugins<P extends readonly EnginePlugin[]> = readonly [
    EngineCtx & PluginsResult<P>["deps"],
    CoreApiTree & PluginsResult<P>["usecases"]
];
export type PluginToken<_T> = {
    key: symbol;
    description: string;
};
export interface PluginExtras {
    get<T>(t: PluginToken<T>): T | undefined;
    set<T>(t: PluginToken<T>, value: T): void;
    has<T>(t: PluginToken<T>): boolean;
}
export {};
//# sourceMappingURL=types.d.ts.map