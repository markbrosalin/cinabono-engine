import { createTabUC, removeItemsUC } from "../../use-cases/index.js";
import { _createSingleItemUC } from "../../use-cases/internal/create-single-item.js";
import { _linkSingleItemUC } from "../../use-cases/internal/link-single-item.js";
import { _removeScopeDeepUC } from "../../use-cases/internal/remove-scope-deep.js";
import { _removeSingleItemUC } from "../../use-cases/internal/remove-single-item.js";
import { _unlinkSingleItemUC } from "../../use-cases/internal/unlink-single-item.js";
import { createItemsUC } from "../../use-cases/public/CreateItems.js";
import { linkItemsUC } from "../../use-cases/public/LinkItems.js";
import { removeTabUC } from "../../use-cases/public/RemoveTab.js";
import { unlinkItemsUC } from "../../use-cases/public/UnlinkItems.js";
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
];
