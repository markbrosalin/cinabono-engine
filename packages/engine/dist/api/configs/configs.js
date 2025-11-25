import { createTabUC, removeItemsUC } from "../../use-cases";
import { _createSingleItemUC } from "../../use-cases/internal/create-single-item";
import { _linkSingleItemUC } from "../../use-cases/internal/link-single-item";
import { _removeScopeDeepUC } from "../../use-cases/internal/remove-scope-deep";
import { _removeSingleItemUC } from "../../use-cases/internal/remove-single-item";
import { _unlinkSingleItemUC } from "../../use-cases/internal/unlink-single-item";
import { createItemsUC } from "../../use-cases/public/CreateItems";
import { linkItemsUC } from "../../use-cases/public/LinkItems";
import { removeTabUC } from "../../use-cases/public/RemoveTab";
import { unlinkItemsUC } from "../../use-cases/public/UnlinkItems";
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
