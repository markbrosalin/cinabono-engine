"use strict";
// import { ApiUseCaseFn } from "../../use-cases/api-core";
// import { ApiFlatMap, ApiTree, ApiPath, ApiUseCaseAtPath } from "./types";
// import { BaseFn } from "@repo/schema/primitives";
// export const isUseCase = (
//     x: unknown
// ): x is ApiUseCaseFn<ApiTree, Record<string, unknown>, BaseFn> =>
//     typeof x === "function" && "__meta__" in x && typeof x.__meta__ === "object";
// export const buildApiFromTree = <Tree extends ApiTree>(
//     tree: Tree,
//     prefix = ""
// ): ApiFlatMap<Tree> => {
//     const out = {} as ApiFlatMap<Tree>;
//     const set = <P extends ApiPath<Tree>>(path: P, uc: ApiUseCaseAtPath<Tree, P>) => {
//         out[path] = uc;
//     };
//     const walk = (node: ApiTree, pref: string) => {
//         for (const key in node) {
//             const child = node[key];
//             const fullPath = (pref ? `${pref}.${key}` : key) as ApiPath<Tree>;
//             if (isUseCase(child)) {
//                 set(fullPath, child as ApiUseCaseAtPath<Tree, typeof fullPath>);
//             } else {
//                 walk(child as ApiTree, fullPath);
//             }
//         }
//     };
//     walk(tree, prefix);
//     return out;
// };
