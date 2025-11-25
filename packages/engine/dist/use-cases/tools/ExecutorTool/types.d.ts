import { ExecutorToolEvents } from "../../eventBus";
import { FlowToolContract } from "../tools/FlowTool";
import { EventBus } from "@repo/entities-runtime/eventBus";
export type ExecutorCtx<P = any, R = any> = {
    name: string;
    payload: P;
    run: (payload: P) => R;
    flow: FlowToolContract;
    result?: R;
    error?: unknown;
    bus?: EventBus<ExecutorToolEvents>;
};
export type ExecutorInterceptor<P = any, R = any> = (
    ctx: ExecutorCtx<P, R>,
    next: () => void
) => void;
export interface ExecutorToolContract {
    addInterceptor<P, R>(fn: ExecutorInterceptor<P, R>): void;
    execute<P, R>(useCaseName: string, run: (payload: P) => R, payload: P): R;
}
export type ExecutorToolEventBus = EventBus<ExecutorToolEvents>;
export type ExecutorToolFactoryOverride = (
    flow: FlowToolContract,
    bus?: ExecutorToolEventBus
) => ExecutorToolContract;
//# sourceMappingURL=types.d.ts.map
