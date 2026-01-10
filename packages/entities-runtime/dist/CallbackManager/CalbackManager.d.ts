import { PayloadMap, CallbacksMap, Callback } from "./types.js";
export declare class CallbackManager<P extends PayloadMap> {
    protected readonly cbs: CallbacksMap<P>;
    run<C extends keyof P>(cbName: C, payload: P[C]): this;
    add<C extends keyof P>(cbName: C, cbs: Callback<P[C]>[]): this;
}
//# sourceMappingURL=CalbackManager.d.ts.map