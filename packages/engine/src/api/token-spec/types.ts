import { ApiToken } from "@engine/api/types/di";
import { ApiCreateSingleItem_Fn } from "@engine/use-cases/internal/create-single-item";
import { ApiLinkSingleItem_Fn } from "@engine/use-cases/internal/link-single-item";
import { ApiRemoveScopeDeep_Fn } from "@engine/use-cases/internal/remove-scope-deep";
import { ApiRemoveSingleItem_Fn } from "@engine/use-cases/internal/remove-single-item";
import { ApiUnlinkSingleItem_Fn } from "@engine/use-cases/internal/unlink-single-item";
import { CreateTabUC_Fn } from "@engine/use-cases/public";
import { ApiCreateItems_Fn } from "@engine/use-cases/public/CreateItems";
import { ApiLinkItems_Fn } from "@engine/use-cases/public/LinkItems";
import { ApiRemoveItems_Fn } from "@engine/use-cases/public/RemoveItems";
import { RemoveTabUC_Fn } from "@engine/use-cases/public/RemoveTab";
import { ApiUnlinkItems_Fn } from "@engine/use-cases/public/UnlinkItems";
import { ApiUpdateItemInput_Fn } from "@engine/use-cases/public/UpdateItemInput";
import { ApiUpdateItemOutput_Fn } from "@engine/use-cases/public/UpdateItemOutput";
import { ApiSimulateTab_Fn } from "@engine/use-cases/public/SimulateTab";
import { ApiSimulationStatus_Fn } from "@engine/use-cases/public/GetSimulationStatus";

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

export interface PluginApiSpec {}
