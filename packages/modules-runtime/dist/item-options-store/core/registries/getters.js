"use strict";
// import { GetterMap, ItemOptionsCtx } from "../../model/types";
// import { defaultAutoTriggers } from "@cnbn/helpers/item";
// export const createGetters = (ctx: ItemOptionsCtx) => {
//     const getters: GetterMap = {
//         GENERATOR: (item) => ({
//             autoTriggers: ctx.autoTriggersMap.get(item.id) ?? defaultAutoTriggers(item),
//             isEnable: !ctx.disablesSet.has(item.id),
//         }),
//         LOGIC: (item) => ({
//             isEnable: !ctx.disablesSet.has(item.id),
//             isSymmetric: ctx.symmetricsSet.has(item.id),
//             autoTriggers: ctx.autoTriggersMap.get(item.id) ?? defaultAutoTriggers(item),
//         }),
//         DISPLAY: (item) => ({ isEnable: !ctx.disablesSet.has(item.id) }),
//         CIRCUIT: (item) => ({ isEnable: !ctx.disablesSet.has(item.id) }),
//         BAKED: (item) => ({ isEnable: !ctx.disablesSet.has(item.id) }),
//     };
//     return getters;
// };
