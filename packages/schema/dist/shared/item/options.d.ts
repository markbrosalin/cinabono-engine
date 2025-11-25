import { WithOf } from "../shared";
import { KindKey, PinDelay } from "./types";
export type WithOptions<K extends KindKey> = {
    options?: WithOf<K, OptionsMap> & {
        delay?: PinDelay;
        isEnable?: boolean;
    };
};
export type OptionsMap = {
    base: {
        generator: {};
        logic: {};
        display: {};
    };
    circuit: {
        logic: {
            baked?: boolean;
        };
    };
};
//# sourceMappingURL=options.d.ts.map