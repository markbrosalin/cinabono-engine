// import { PublicApiByPath } from "@cnbn/engine";
// import { stub } from "@cnbn/utils";
// import { CnbnResponse } from "@worker/types";

// export type CinabonoRpcApi = typeof _rpcApi;

// export function Rpcify<U, V>(_fn: (input: U) => V): (args: U) => Promise<CnbnResponse<V>> {
//     return async (args) => {
//         try {
//             const result = _fn(args);
//             return { ok: true, result };
//         } catch (error) {
//             return { ok: false, error };
//         }
//     };
// }

// const _rpcApi = {
//     "/item/create": Rpcify(stub<PublicApiByPath["/item/create"]>()),
//     "/item/link": Rpcify(stub<PublicApiByPath["/item/link"]>()),
//     "/item/remove": Rpcify(stub<PublicApiByPath["/item/remove"]>()),
//     "/item/unlink": Rpcify(stub<PublicApiByPath["/item/unlink"]>()),
//     "/tab/create": Rpcify(stub<PublicApiByPath["/tab/create"]>()),
//     "/tab/remove": Rpcify(stub<PublicApiByPath["/tab/remove"]>()),
// } satisfies Record<keyof PublicApiByPath, unknown>;
