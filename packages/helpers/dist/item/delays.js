import { getGlobalCfg } from "@cnbn/config";
export const getItemDelay = (item) => {
    return item.options?.delay ?? makeItemDelay();
};
export const makeItemDelay = (delays) => {
    return { ...getGlobalCfg().itemDelay, ...delays };
};
