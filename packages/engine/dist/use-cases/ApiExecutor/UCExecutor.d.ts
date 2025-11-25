import { ApiMiddleware, ExecutorToolEventBus, ExecutorToolFactoryOverride } from "../../use-cases/ApiExecutor/types";
import { FlowToolContract } from "../../use-cases/tools/FlowTool";
export declare const makeDefaultExecutorTool: ExecutorToolFactoryOverride;
export declare class DefaultExecutorTool {
    private readonly _flow;
    private readonly _bus?;
    private _interceptors;
    constructor(_flow: FlowToolContract, _bus?: ExecutorToolEventBus | undefined);
    addInterceptor<P, R>(fn: ApiMiddleware<P, R>): void;
    execute<P, R>(name: string, run: (payload: P) => R, payload: P): R;
    private _composed;
}
//# sourceMappingURL=UCExecutor.d.ts.map