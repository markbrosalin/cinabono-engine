import { CoreApiTree, EngineApi } from "../enginee/types";
import { ApiExecutorContract } from "../use-casess";
import { ApiFnPayloadUnionAtPath, ApiFnResultUnionAtPath, ApiPath, ApiTree } from "@engine/use-casess/api-registry/types";
export interface EngineContract<Tree extends ApiTree = CoreApiTree> {
    callApi<Path extends ApiPath<Tree>, A extends ApiFnPayloadUnionAtPath<Tree, Path>>(path: Path, ...payload: A): ApiFnResultUnionAtPath<Tree, Path, A>;
}
export declare class DefaultEngine<const Tree extends ApiTree = CoreApiTree> implements EngineContract<Tree> {
    private readonly _exec;
    private readonly _api;
    constructor(_exec: ApiExecutorContract<Tree>, _api: EngineApi<Tree>);
    callApi<Path extends ApiPath<Tree>, A extends ApiFnPayloadUnionAtPath<Tree, Path>>(path: Path, ...payload: A): ApiFnResultUnionAtPath<Tree, Path, A>;
    get api(): EngineApi<Tree>;
}
//# sourceMappingURL=engine.d.ts.map