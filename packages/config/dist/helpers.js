import { globalConfig } from "./config.js";
export const getGlobalCfg = () => globalConfig;
export const updateGlobalCfg = (update) => Object.assign(globalConfig, update);
