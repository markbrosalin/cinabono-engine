import { SagaLogger } from "./types.js";
export declare abstract class Saga<Ctx, Payload> {
    private readonly _logger?;
    private _ctx?;
    private readonly _rollbackList;
    constructor(_logger?: SagaLogger | undefined);
    protected abstract buildContext(): Promise<Ctx>;
    protected abstract run(payload: Payload): Promise<void>;
    protected get ctx(): Promise<Ctx>;
    execute(payload: Payload): Promise<void>;
    protected step<T>(name: string, action: () => Promise<T> | T, rollback?: (result: T) => Promise<unknown> | unknown): Promise<T>;
    private _rollback;
    private _handleError;
}
//# sourceMappingURL=saga.d.ts.map