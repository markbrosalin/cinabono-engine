import { globalConfig } from "./config";
export const getGlobalCfg = () => globalConfig;
export const updateGlobalCfg = (update) => Object.assign(globalConfig, update);
