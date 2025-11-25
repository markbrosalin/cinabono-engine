import { toArray } from "@cnbn/utils";
const INJECT_META = "di:inject-tokens";
export class DIContainer {
    constructor(_parentResolve) {
        this._parentResolve = _parentResolve;
        this._regs = new Map();
    }
    register(cfg) {
        const { token, lifetime = "singleton" } = cfg;
        const registry = this._regs.get(token.id);
        const allowOverride = registry?.options?.allowOverride ?? false;
        if (registry && !allowOverride)
            throw new Error(`Dublicate token registration: ${token.name} (override disabled)`);
        let create;
        if ("useValue" in cfg) {
            create = (_resolve) => cfg.useValue;
        }
        else if ("useClass" in cfg) {
            const Ctor = cfg.useClass;
            const hasMeta = Reflect.hasMetadata(INJECT_META, Ctor);
            create = hasMeta
                ? (resolve) => {
                    const tokens = toArray(Reflect.getMetadata(INJECT_META, Ctor)) ?? [];
                    const args = tokens.map((t) => resolve(t));
                    return new Ctor(...args);
                }
                : (_resolve) => new Ctor();
        }
        else if ("useFactory" in cfg) {
            create = cfg.useFactory;
        }
        else
            throw new Error("No provider");
        this._regs.set(token.id, { create, lifetime, options: cfg.options });
    }
    resolve(token) {
        const prov = this._regs.get(token.id);
        if (!prov && this._parentResolve)
            return this._parentResolve(token);
        if (!prov)
            throw new Error(`Unable to resolve by token "${token.id.description}" not found in the DI container`);
        if (prov.lifetime === "singleton") {
            if (prov.instance)
                return prov.instance;
            prov.instance = prov.create((x) => this.resolve(x));
            return prov.instance;
        }
        return prov.create((x) => this.resolve(x));
    }
    clear() {
        this._regs.clear();
    }
}
