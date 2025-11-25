"use strict";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { ApiUseCaseFn } from "../../use-cases/api-core";
// import { OverloadedArgs, OverloadedResult, OverloadsToUnion } from "@repo/schema/primitives";
// export type ApiTree = { [k: string]: ApiUseCaseFn<any, any, any> | ApiTree };
// export type ApiPath<Tree, Prefix extends string = ""> = {
//     /**
//      * if UCNode, return path
//      */
//     [K in keyof Tree & string]: Tree[K] extends ApiUseCaseFn<any, any, any>
//         ? `${Prefix}${K}`
//         : /**
//            * else go deeper
//            */
//           Tree[K] extends Record<string, unknown>
//           ? ApiPath<Tree[K], `${Prefix}${K}.`>
//           : never;
//     /**
//      * collect all paths as union
//      */
// }[Extract<keyof Tree, string>];
// export type ApiUseCaseAtPath<Tree, Path extends string> =
//     /**
//      * if path has dot, go deeper
//      */
//     Path extends `${infer K}.${infer Rest}`
//         ? K extends keyof Tree
//             ? ApiUseCaseAtPath<Tree[K], Rest>
//             : never
//         : /**
//            * else get Node at path
//            */
//           Path extends keyof Tree
//           ? Tree[Path] extends ApiUseCaseFn<infer D, infer Fn, infer T> // if Func, get returned function
//               ? ApiUseCaseFn<D, Fn, T>
//               : never
//           : never;
// export type ApiFnAtPath<Tree extends ApiTree, Path extends ApiPath<Tree>> = ReturnType<
//     ApiUseCaseAtPath<Tree, Path>
// >;
// export type ApiFlatMap<Tree extends ApiTree> = {
//     [Path in ApiPath<Tree>]: ApiUseCaseAtPath<Tree, Path>;
// };
// export type ApiFnUnionAtPath<Tree extends ApiTree, Path extends ApiPath<Tree>> = OverloadsToUnion<
//     ApiFnAtPath<Tree, Path>
// >;
// export type ApiFnPayloadUnionAtPath<
//     Tree extends ApiTree,
//     Path extends ApiPath<Tree>,
// > = OverloadedArgs<ApiFnAtPath<Tree, Path>>;
// export type ApiFnResultUnionAtPath<
//     Tree extends ApiTree,
//     Path extends ApiPath<Tree>,
//     A extends ApiFnPayloadUnionAtPath<Tree, Path>,
// > = OverloadedResult<ApiFnAtPath<Tree, Path>, A>;
