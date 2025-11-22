import { getGlobalCfg } from "@cnbn/config";
import { PinDelay, WithOptions, KindKey } from "@cnbn/schema";

export const getItemDelay = <T extends WithOptions<KindKey>>(item: T): PinDelay => {
    return item.options?.delay ?? makeItemDelay();
};

export const makeItemDelay = (delays?: PinDelay): PinDelay => {
    return { ...getGlobalCfg().itemDelay, ...delays };
};
