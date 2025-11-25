import { UCRemoveTab, UCCreateManyItems, UCLinkManyItems, UCUnlinkManyItems, UCSimulationRun, UCUpdatePinValue, UCCreateTab, } from "../../use-cases/public";
import { UCRemoveManyItems } from "../../use-cases/public/RemoveItems";
export const DefaultUseCasesTree = {
    tab: {
        create: UCCreateTab,
        remove: UCRemoveTab,
    },
    item: {
        create: UCCreateManyItems,
        remove: UCRemoveManyItems,
        link: UCLinkManyItems,
        unlink: UCUnlinkManyItems,
    },
    simulation: {
        run: UCSimulationRun,
        updatePin: UCUpdatePinValue,
    },
};
