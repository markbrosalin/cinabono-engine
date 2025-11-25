import { EnginePlugin } from "../../plugins";
import { EngineInfra } from "../../infra";
export type EngineDeps = ReturnType<typeof buildEngineDeps>;
export declare const buildEngineDeps: (EngineDeps: EngineInfra, plugins: EnginePlugin[]) => import("@cnbn/di").BindTokensToInstances<import("../../deps").DepsSpec>;
//# sourceMappingURL=buildDeps.d.ts.map