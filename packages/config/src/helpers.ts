import { globalConfig, GlobalConfig } from "./config";

export const getGlobalCfg = () => globalConfig;

export const updateGlobalCfg = (update: Partial<GlobalConfig>) =>
    Object.assign(globalConfig, update);
