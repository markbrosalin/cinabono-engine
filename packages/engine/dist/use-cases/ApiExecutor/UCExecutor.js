export const makeDefaultExecutorTool = (flow, bus) => new DefaultExecutorTool(flow, bus);
export class DefaultExecutorTool {
    constructor(_flow, _bus) {
        this._flow = _flow;
        this._bus = _bus;
        this._interceptors = [];
    }
    addInterceptor(fn) {
        this._interceptors.push(fn);
    }
    execute(name, run, payload) {
        const ctx = {
            name,
            run,
            payload,
            bus: this._bus,
            flow: this._flow,
        };
        const composed = this._composed(this._interceptors);
        composed(ctx);
        if (ctx.error)
            throw ctx.error;
        return ctx.result;
    }
    _composed(middlewares) {
        return (ctx) => {
            let idx = -1;
            const dispatch = (i) => {
                if (i <= idx)
                    throw new Error("next() called multiple times");
                idx = i;
                const fn = middlewares[i];
                if (!fn) {
                    ctx.result = ctx.run(ctx.payload);
                    return;
                }
                fn(ctx, () => dispatch(i + 1));
            };
            dispatch(0);
        };
    }
}
