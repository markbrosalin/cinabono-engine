"use strict";
// // import {
// //     UCRemoveTab,
// //     UCCreateManyItems,
// //     UCLinkManyItems,
// //     UCUnlinkManyItems,
// //     UCSimulationRun,
// //     UCUpdatePinValue,
// //     UCCreateTab,
// // } from "../../use-cases/public";
// // import { UCRemoveManyItems } from "../../use-cases/public/RemoveItems";
// import { defineUseCase } from "../../use-cases/api-core";
// import { defineMiddleware } from "../../use-cases/api-core/helpers/defineMiddleware";
// import { Id } from "@repo/schema";
// export const DefaultApiTree = {
//     public: {
//         tab: {
//             create: defineUseCase("tabCreator")
//                 .withDeps({ key: "test" } as const)
//                 .runFn((_ctx) => {
//                     function createTab(payload: { ids: Id[] }): string[];
//                     function createTab(payload: { id: Id }): string;
//                     function createTab(payload: { ids: Id[] } | { id: Id }): string | string[] {
//                         // console.log(res);
//                         // const localRes = _ctx.tools.callApi(, "5454");
//                         if ("ids" in payload) return payload.ids.map((id) => id);
//                         return `${payload.id}`;
//                     }
//                     return createTab;
//                 })
//                 .wrappedWith(
//                     defineMiddleware("loggerInside", (_, next) => {
//                         return next();
//                     })
//                 ),
//         },
//     },
//     private: {
//         log: defineUseCase("log").runFn((_ctx) => {
//             function local(type: string): string {
//                 return "i am inside +" + type;
//             }
//             return local;
//         }),
//     },
//     // tab: {
//     //     create: UCCreateTab,
//     //     remove: UCRemoveTab,
//     // },
//     // item: {
//     //     create: UCCreateManyItems,
//     //     remove: UCRemoveManyItems,
//     //     link: UCLinkManyItems,
//     //     unlink: UCUnlinkManyItems,
//     // },
//     // simulation: {
//     //     run: UCSimulationRun,
//     //     updatePin: UCUpdatePinValue,
//     // },
// } as const;
