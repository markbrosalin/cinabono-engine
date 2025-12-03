import { EnginePlugin } from "../../plugins/index.js";
import { EngineInfra } from "../../infra/index.js";
export type EngineDeps = ReturnType<typeof buildEngineDeps>;
export declare const buildEngineDeps: (EngineDeps: EngineInfra, plugins: EnginePlugin[]) => import("okee-di-container").BindTokensToInstances<import("../../deps/index.js").DepsSpec>;
//# sourceMappingURL=buildDeps.d.ts.map