import { defineUseCase } from "../../../api/helpers";
import { ApiRegLocalOpts, BuiltApi } from "../../../api/registry/types/entity";
import { Spec, SpecPaths, CoreApiSpec } from "../../../api/types";
import { ApiRegistryEvents } from "../../../eventBus";
import { EventBus } from "@repo/entities-runtime";
export interface ApiRegistryContract<S extends Spec = CoreApiSpec> {
    register<P extends SpecPaths<S>>(path: P, usecase: ReturnType<typeof defineUseCase<S>>, opts?: ApiRegLocalOpts): void;
    buildApi(): BuiltApi<S>;
}
export type ApiRegEventBus = EventBus<ApiRegistryEvents>;
//# sourceMappingURL=contracts.d.ts.map