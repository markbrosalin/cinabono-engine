// import { Id, ItemOptions, ItemOptionName, SubCategory } from "@cnbn/schema";
// import { ItemOptionsCtx, SetterMap } from "../../model/types";

// export type Updates = {
//     isEnable: (itemId: Id, isEnable?: ItemOptions["isEnable"]) => void;
//     autoTriggers: (itemId: Id, autoTriggers?: ItemOptions["autoTriggers"]) => void;
//     isSymmetric: (itemId: Id, isSymmetric?: ItemOptions["isSymmetric"]) => void;
// };

// export const createSetters = (ctx: ItemOptionsCtx) => {
//     const updates: Updates = {
//         isEnable: (itemId, isEnable) => {
//             if (isEnable === undefined) return;
//             if (isEnable) ctx.disablesSet.delete(itemId);
//             else ctx.disablesSet.add(itemId);
//         },
//         autoTriggers: (itemId, autoTriggers) => {
//             if (autoTriggers === undefined) return;
//             if (autoTriggers.every((i) => !i.isTrigger)) ctx.autoTriggersMap.delete(itemId);
//             else ctx.autoTriggersMap.set(itemId, autoTriggers);
//         },
//         isSymmetric: (itemId, isSymmetric) => {
//             if (isSymmetric === undefined) return;
//             if (!isSymmetric) ctx.symmetricsSet.delete(itemId);
//             else ctx.symmetricsSet.add(itemId);
//         },
//     };

//     const setterConfig: Record<SubCategory, ItemOptionName[]> = {
//         GENERATOR: ["autoTriggers", "isEnable"],
//         DISPLAY: ["isEnable"],
//         LOGIC: ["isEnable", "autoTriggers", "isSymmetric"],
//         CIRCUIT: ["isEnable"],
//         BAKED: ["isEnable"],
//     };

//     const setters = {} as SetterMap;
//     (Object.keys(setterConfig) as SubCategory[]).forEach((sub) => {
//         setters[sub] = (id, options) => {
//             for (const optName of setterConfig[sub]) {
//                 updates[optName](id, options[optName as never]);
//             }
//         };
//     });
//     return setters;
// };
