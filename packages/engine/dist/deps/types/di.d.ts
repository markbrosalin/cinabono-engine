import { DepsSpec } from "../../deps/token-spec/index.js";
import { BindTokensToInstances, DiConfig, DiToken } from "okee-di-container";
export type DepsToken<Type = unknown> = DiToken<Type>;
export type DepsConfig<T extends DepsToken = DepsToken> = DiConfig<T>;
export type DepsConfigFactory<T extends DepsToken = DepsToken> = (tokens: DepsSpec) => DepsConfig<T>;
export type EngineDeps = BindTokensToInstances<DepsSpec>;
//# sourceMappingURL=di.d.ts.map