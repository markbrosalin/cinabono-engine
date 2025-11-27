import { BuildersDepsCongis } from "../../deps/configs/builders.js";
import { CoreDepsConfigs } from "../../deps/configs/core.js";
import { FactoriesDepsCongis } from "../../deps/configs/factories.js";
import { ServicesDepsConfigs } from "../../deps/configs/services.js";
import { StoredDepsConfigs } from "../../deps/configs/stores.js";
export const DEPS_CONFIGS = [
    ...CoreDepsConfigs,
    ...StoredDepsConfigs,
    ...ServicesDepsConfigs,
    ...FactoriesDepsCongis,
    ...BuildersDepsCongis,
];
