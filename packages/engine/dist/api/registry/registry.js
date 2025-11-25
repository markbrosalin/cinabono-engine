import { isUseCaseSpec, getByPath } from "../../api/helpers";
import { buildApiTree } from "../../api/registry/helpers/buildApiTree";
export class ApiRegistry {
    constructor(_deps) {
        this._deps = _deps;
        this.reg = new Map();
    }
    register(path, usecase, opts = {}) {
        const exists = this.reg.get(path);
        const allowOverride = opts.override ?? this._deps.options?.allowOverride ?? false;
        if (exists != null && !allowOverride) {
            throw new Error(`Dublicate use case registration: ${path} (override disabled)`);
        }
        const resolved = this._resolveUseCaseSpec(path);
        const entry = {
            override: allowOverride,
            factory: usecase.factory,
            wrappers: usecase.wrappers,
            path,
            visibility: resolved.visibility,
            name: resolved.name,
        };
        this.reg.set(path, entry);
    }
    _resolveUseCaseSpec(path) {
        const node = getByPath(this._deps.apiSpec, path);
        if (!isUseCaseSpec(node))
            throw new Error(`Invalid use case path: "${path}" — node is not a UseCaseSpec`);
        return node;
    }
    buildApi() {
        const { bus, globalWrappers } = this._deps;
        const entries = Array.from(this.reg.values());
        const env = { entries, bus, globalWrappers, options: this._deps.options };
        return buildApiTree(env);
    }
}
