import { ApiFactories } from "../../api/helpers/index.js";
export const API_SPEC = {
    tab: {
        create: ApiFactories.token("createTab", "public"),
        remove: ApiFactories.token("removeTab", "public"),
    },
    item: {
        _unlinkSingle: ApiFactories.token("unlinkSingleItem", "internal"),
        unlink: ApiFactories.token("unlinkItems", "public"),
        _linkSingle: ApiFactories.token("linkSingleItem", "internal"),
        link: ApiFactories.token("linkItems", "public"),
        _createSingle: ApiFactories.token("createSingleItem", "internal"),
        create: ApiFactories.token("createItems", "public"),
        _removeSingle: ApiFactories.token("removeSingleItem", "internal"),
        remove: ApiFactories.token("removeItems", "public"),
    },
    scope: {
        _removeDeep: ApiFactories.token("removeScopeDeep", "internal"),
    },
    plugins: {},
};
