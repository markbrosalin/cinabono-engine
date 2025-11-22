import { BuildersDepsCongis } from "@engine/deps/configs/builders";
import { CoreDepsConfigs } from "@engine/deps/configs/core";
import { FactoriesDepsCongis } from "@engine/deps/configs/factories";
import { ServicesDepsConfigs } from "@engine/deps/configs/services";
import { StoredDepsConfigs } from "@engine/deps/configs/stores";

export const DEPS_CONFIGS = [
    ...CoreDepsConfigs,
    ...StoredDepsConfigs,
    ...ServicesDepsConfigs,
    ...FactoriesDepsCongis,
    ...BuildersDepsCongis,
];
