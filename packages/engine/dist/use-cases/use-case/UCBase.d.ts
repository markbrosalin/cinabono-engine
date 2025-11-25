import { ApiCtx } from "../../use-cases/ApiExecutor";
export declare abstract class UCBase {
    readonly ctx: ApiCtx;
    readonly name: string;
    constructor(ctx: ApiCtx, name?: string);
    abstract run(...payload: unknown[]): unknown;
}
//# sourceMappingURL=UCBase.d.ts.map