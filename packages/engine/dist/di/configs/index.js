import { CORE_CONFIGS } from "../../di/configs/core";
import { STORES_CONFIGS } from "../../di/configs/stores";
export const DEPS_CONFIGS = [...CORE_CONFIGS, ...STORES_CONFIGS];
