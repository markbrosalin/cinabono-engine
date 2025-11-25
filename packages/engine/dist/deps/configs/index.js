import { BuildersDepsCongis } from "../../deps/configs/builders";
import { CoreDepsConfigs } from "../../deps/configs/core";
import { FactoriesDepsCongis } from "../../deps/configs/factories";
import { ServicesDepsConfigs } from "../../deps/configs/services";
import { StoredDepsConfigs } from "../../deps/configs/stores";
export const DEPS_CONFIGS = [
    ...CoreDepsConfigs,
    ...StoredDepsConfigs,
    ...ServicesDepsConfigs,
    ...FactoriesDepsCongis,
    ...BuildersDepsCongis,
];
