import { PayloadMap, CallbacksMap, Callback } from "./types";

export class CallbackManager<P extends PayloadMap> {
    protected readonly cbs: CallbacksMap<P> = {} as CallbacksMap<P>;

    public run<C extends keyof P>(cbName: C, payload: P[C]) {
        const callbacks = (this.cbs[cbName] ??= []);
        callbacks.forEach((cb) => cb(payload));
        return this;
    }

    public add<C extends keyof P>(cbName: C, cbs: Callback<P[C]>[]) {
        const callbacks = (this.cbs[cbName] ??= []);
        callbacks.push(...cbs);
        return this;
    }
}
