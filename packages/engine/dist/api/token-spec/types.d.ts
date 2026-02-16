import { ApiToken } from "../../api/types/di.js";
import { ApiCreateSingleItem_Fn } from "../../use-cases/internal/create-single-item.js";
import { ApiLinkSingleItem_Fn } from "../../use-cases/internal/link-single-item.js";
import { ApiRemoveScopeDeep_Fn } from "../../use-cases/internal/remove-scope-deep.js";
import { ApiRemoveSingleItem_Fn } from "../../use-cases/internal/remove-single-item.js";
import { ApiUnlinkSingleItem_Fn } from "../../use-cases/internal/unlink-single-item.js";
import { CreateTabUC_Fn } from "../../use-cases/public/index.js";
import { ApiCreateItems_Fn } from "../../use-cases/public/CreateItems.js";
import { ApiLinkItems_Fn } from "../../use-cases/public/LinkItems.js";
import { ApiRemoveItems_Fn } from "../../use-cases/public/RemoveItems.js";
import { RemoveTabUC_Fn } from "../../use-cases/public/RemoveTab.js";
import { ApiUnlinkItems_Fn } from "../../use-cases/public/UnlinkItems.js";
import { ApiUpdateItemInput_Fn } from "../../use-cases/public/UpdateItemInput.js";
import { ApiUpdateItemOutput_Fn } from "../../use-cases/public/UpdateItemOutput.js";
import { ApiSimulateTab_Fn } from "../../use-cases/public/SimulateTab.js";
import { ApiSimulationStatus_Fn } from "../../use-cases/public/GetSimulationStatus.js";
export interface ApiSpec {
    tab: TabApiSpec;
    item: ItemApiSpec;
    scope: ScopeApiScec;
    simulation: SimulationApiSpec;
    plugins: PluginApiSpec;
}
export interface TabApiSpec {
    create: ApiToken<CreateTabUC_Fn, "public">;
    remove: ApiToken<RemoveTabUC_Fn, "public">;
}
export interface ItemApiSpec {
    _unlinkSingle: ApiToken<ApiUnlinkSingleItem_Fn, "internal">;
    unlink: ApiToken<ApiUnlinkItems_Fn, "public">;
    _linkSingle: ApiToken<ApiLinkSingleItem_Fn, "internal">;
    link: ApiToken<ApiLinkItems_Fn, "public">;
    _createSingle: ApiToken<ApiCreateSingleItem_Fn, "internal">;
    create: ApiToken<ApiCreateItems_Fn, "public">;
    _removeSingle: ApiToken<ApiRemoveSingleItem_Fn, "internal">;
    remove: ApiToken<ApiRemoveItems_Fn, "public">;
    updateInput: ApiToken<ApiUpdateItemInput_Fn, "public">;
    updateOutput: ApiToken<ApiUpdateItemOutput_Fn, "public">;
}
export interface ScopeApiScec {
    _removeDeep: ApiToken<ApiRemoveScopeDeep_Fn, "internal">;
}
export interface SimulationApiSpec {
    simulate: ApiToken<ApiSimulateTab_Fn, "public">;
    status: ApiToken<ApiSimulationStatus_Fn, "public">;
}
export interface PluginApiSpec {
}
//# sourceMappingURL=types.d.ts.map