import { createTabUC } from "@engine/use-cases";
import { _createSingleItemUC } from "@engine/use-cases/internal/CreateSingleItem";
import { _linkSingleItemUC } from "@engine/use-cases/internal/LinkSingleItem";
import { _unlinkSingleItemUC } from "@engine/use-cases/internal/UnlinkSingleItem";
import { createItemsUC } from "@engine/use-cases/public/CreateItems";
import { linkItemsUC } from "@engine/use-cases/public/LinkItems";
import { removeTabUC } from "@engine/use-cases/public/RemoveTab";
import { unlinkItemsUC } from "@engine/use-cases/public/UnlinkItems";
export const API_CONFIGS = [
    createTabUC,
    removeTabUC,
    _createSingleItemUC,
    createItemsUC,
    _linkSingleItemUC,
    linkItemsUC,
    _unlinkSingleItemUC,
    unlinkItemsUC,
];
