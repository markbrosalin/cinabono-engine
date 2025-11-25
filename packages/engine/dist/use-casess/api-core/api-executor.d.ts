import { ApiExecutorDeps, ApiTree, PublicApi } from "../../use-casess/api-core/types";
export declare class DefaultApiExecutor<T extends ApiTree> {
    private readonly _deps;
    private readonly _globalMws;
    constructor(_deps: ApiExecutorDeps<T>);
    buildPublicApi(): PublicApi<T>;
    private _wrap;
    private _makeCtx;
    private _compose;
}
//# sourceMappingURL=api-executor.d.ts.map