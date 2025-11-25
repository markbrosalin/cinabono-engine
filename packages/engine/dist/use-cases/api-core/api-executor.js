import { buildAllApi, buildContextOps, buildPublicApi, genSpanId, genTraceId, } from "../../use-cases/api-core/helpers";
export class DefaultApiExecutor {
    constructor(_deps) {
        this._deps = _deps;
        this._globalMws = _deps.plugins?.globalMiddlewares ?? [];
    }
    buildPublicApi() {
        return buildPublicApi(this._deps.api, (path, uc) => this._wrap(path, uc));
    }
    _wrap(path, uc, parentCtx) {
        const invoke = (...args) => {
            const ctx = this._makeCtx(uc, path, parentCtx);
            const chain = [
                ...this._globalMws,
                ...uc.__meta__.middlewares,
            ].reverse();
            const fn = this._compose(chain, ctx, () => uc(ctx));
            return fn(...args);
        };
        return invoke;
    }
    _makeCtx(uc, path, parentCtx) {
        const parentMeta = parentCtx?.meta;
        const depth = (parentMeta?.depth ?? 0) + 1;
        const maxDepth = this._deps.config.maxDepth ?? 64;
        if (depth > maxDepth)
            throw new Error(`Max depth ${maxDepth} exceeded at ${path}`);
        const flow = this._deps.infra.makeFlow(path);
        const { globalOps, tabOps, scopeOps } = buildContextOps(flow, this._deps.stores);
        const ctx = {
            core: this._deps.core,
            factories: this._deps.factories,
            stores: this._deps.stores,
            pluginExtras: this._deps.plugins?.extras,
            deps: uc.__meta__.deps,
            meta: {
                path,
                ucName: uc.__meta__.name ?? "unnamed",
                traceId: parentMeta?.traceId ?? genTraceId(),
                spanId: genSpanId(),
                depth,
                maxDepth,
                parentId: parentMeta?.spanId,
            },
            tools: { flow, globalOps, tabOps, scopeOps },
            usecases: {},
        };
        ctx.usecases = buildAllApi(this._deps.api, (path, childIc) => this._wrap(path, childIc, ctx));
        return ctx;
    }
    _compose(mws, ctx, factory) {
        const bus = this._deps.core.bus;
        const meta = ctx.meta;
        const emit = (event, data) => {
            bus.emit(event, { ...meta, ...data });
        };
        const wrapped = ((...payload) => {
            let idx = -1;
            const dispatch = (i, ...args) => {
                if (i <= idx)
                    throw new Error("next() called multiple times");
                idx = i;
                // Core logic
                if (i === mws.length) {
                    emit("core.usecase.coreFn.start", { payload: args });
                    const coreFn = factory();
                    const result = coreFn(...args);
                    emit("core.usecase.coreFn.finish", { result });
                    return result;
                }
                // Middleware layer
                const mw = mws[i];
                const mwName = mw.__meta__.name ?? `mw-${i}`;
                emit("core.middleware.before", { mwName, payload: args });
                const next = (...nextArgs) => dispatch(i + 1, ...(nextArgs.length ? nextArgs : args));
                const out = mw(ctx, next);
                emit("core.middleware.after", { mwName, result: out });
                return out;
            };
            try {
                emit("core.usecase.start", { payload });
                const result = dispatch(0, ...payload);
                emit("core.usecase.finish", { result });
                return result;
            }
            catch (error) {
                emit("core.usecase.error", { error });
                throw error;
            }
        });
        return wrapped;
    }
}
