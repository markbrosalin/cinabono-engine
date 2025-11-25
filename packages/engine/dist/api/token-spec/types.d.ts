import { ApiToken } from "../../api/types/di";
import { ApiCreateSingleItem_Fn } from "../../use-cases/internal/create-single-item";
import { ApiLinkSingleItem_Fn } from "../../use-cases/internal/link-single-item";
import { ApiRemoveScopeDeep_Fn } from "../../use-cases/internal/remove-scope-deep";
import { ApiRemoveSingleItem_Fn } from "../../use-cases/internal/remove-single-item";
import { ApiUnlinkSingleItem_Fn } from "../../use-cases/internal/unlink-single-item";
import { CreateTabUC_Fn } from "../../use-cases/public";
import { ApiCreateItems_Fn } from "../../use-cases/public/CreateItems";
import { ApiLinkItems_Fn } from "../../use-cases/public/LinkItems";
import { ApiRemoveItems_Fn } from "../../use-cases/public/RemoveItems";
import { RemoveTabUC_Fn } from "../../use-cases/public/RemoveTab";
import { ApiUnlinkItems_Fn } from "../../use-cases/public/UnlinkItems";
export interface ApiSpec {
    tab: TabApiSpec;
    item: ItemApiSpec;
    scope: ScopeApiScec;
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
}
export interface ScopeApiScec {
    _removeDeep: ApiToken<ApiRemoveScopeDeep_Fn, "internal">;
}
export interface PluginApiSpec {
}
//# sourceMappingURL=types.d.ts.map