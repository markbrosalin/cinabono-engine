import { DIContainerContract } from "@di/contracts";
import { DiLifeTime, DiResolve, DiConfig, DiToken, BaseDiConfig } from "@di/types";
import { toArray } from "@cnbn/utils";

const INJECT_META = "di:inject-tokens";

interface Provider<Type> {
    lifetime: DiLifeTime;
    create: (resolve: DiResolve) => Type;
    instance?: Type;
    options: BaseDiConfig["options"];
}

export class DIContainer implements DIContainerContract {
    private _regs = new Map<symbol, Provider<unknown>>();
    constructor(private readonly _parentResolve?: DiResolve) {}

    public register(cfg: DiConfig): void {
        const { token, lifetime = "singleton" } = cfg;

        const registry = this._regs.get(token.id);
        const allowOverride = registry?.options?.allowOverride ?? false;

        if (registry && !allowOverride)
            throw new Error(`Dublicate token registration: ${token.name} (override disabled)`);

        let create: Provider<DiConfig["token"]["__type__"]>["create"];

        if ("useValue" in cfg) {
            create = (_resolve) => cfg.useValue;
        } else if ("useClass" in cfg) {
            const Ctor = cfg.useClass;
            const hasMeta = Reflect.hasMetadata(INJECT_META, Ctor);

            create = hasMeta
                ? (resolve) => {
                      const tokens: DiToken<unknown>[] =
                          toArray(Reflect.getMetadata(INJECT_META, Ctor)) ?? [];

                      const args = tokens.map((t) => resolve(t)) as ConstructorParameters<
                          typeof Ctor
                      >;

                      return new Ctor(...args);
                  }
                : (_resolve) => new Ctor();
        } else if ("useFactory" in cfg) {
            create = cfg.useFactory;
        } else throw new Error("No provider");

        this._regs.set(token.id, { create, lifetime, options: cfg.options });
    }

    public resolve<T extends DiToken>(token: T): T["__type__"] {
        const prov = this._regs.get(token.id) as Provider<T["__type__"]> | undefined;

        if (!prov && this._parentResolve) return this._parentResolve(token);
        if (!prov)
            throw new Error(
                `Unable to resolve by token "${token.id.description}" not found in the DI container`
            );

        if (prov.lifetime === "singleton") {
            if (prov.instance) return prov.instance;

            prov.instance = prov.create((x) => this.resolve(x));

            return prov.instance;
        }

        return prov.create((x) => this.resolve(x));
    }

    public clear(): void {
        this._regs.clear();
    }
}
