import {
    UCRemoveTab,
    UCCreateManyItems,
    UCLinkManyItems,
    UCUnlinkManyItems,
    UCSimulationRun,
    UCUpdatePinValue,
    UCCreateTab,
} from "../public";
import { UCRemoveManyItems } from "../public/RemoveItems";
export declare const DefaultUseCasesTree: {
    readonly tab: {
        readonly create: typeof UCCreateTab;
        readonly remove: typeof UCRemoveTab;
    };
    readonly item: {
        readonly create: typeof UCCreateManyItems;
        readonly remove: typeof UCRemoveManyItems;
        readonly link: typeof UCLinkManyItems;
        readonly unlink: typeof UCUnlinkManyItems;
    };
    readonly simulation: {
        readonly run: typeof UCSimulationRun;
        readonly updatePin: typeof UCUpdatePinValue;
    };
};
//# sourceMappingURL=public-uc-map.d.ts.map
