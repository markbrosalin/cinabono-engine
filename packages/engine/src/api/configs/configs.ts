import { createTabUC, removeItemsUC } from "@engine/use-cases";
import { _createSingleItemUC } from "@engine/use-cases/internal/create-single-item";
import { _linkSingleItemUC } from "@engine/use-cases/internal/link-single-item";
import { _removeScopeDeepUC } from "@engine/use-cases/internal/remove-scope-deep";
import { _removeSingleItemUC } from "@engine/use-cases/internal/remove-single-item";
import { _unlinkSingleItemUC } from "@engine/use-cases/internal/unlink-single-item";
import { createItemsUC } from "@engine/use-cases/public/CreateItems";
import { linkItemsUC } from "@engine/use-cases/public/LinkItems";
import { removeTabUC } from "@engine/use-cases/public/RemoveTab";
import { unlinkItemsUC } from "@engine/use-cases/public/UnlinkItems";
import { updateItemInputUC } from "@engine/use-cases/public/UpdateItemInput";
import { updateItemOutputUC } from "@engine/use-cases/public/UpdateItemOutput";
import { simulateTabUC } from "@engine/use-cases/public/SimulateTab";
import { simulationStatusUC } from "@engine/use-cases/public/GetSimulationStatus";

export const API_CONFIGS = [
    createTabUC,
    removeTabUC,

    _createSingleItemUC,
    createItemsUC,

    _linkSingleItemUC,
    linkItemsUC,

    _unlinkSingleItemUC,
    unlinkItemsUC,

    _removeScopeDeepUC,

    _removeSingleItemUC,
    removeItemsUC,

    updateItemInputUC,
    updateItemOutputUC,

    simulateTabUC,
    simulationStatusUC,
];
