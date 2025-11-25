import { createToken } from "@repo/di";
export const CORE_TOKENS = {
    bus: createToken("/core/bus"),
};
export const STORES_TOKENS = {
    tab: createToken("/stores/tab"),
    template: createToken("/stores/template"),
};
export const SERVICES_TOKENS = {};
export const FACTORIES_TOKENS = {};
