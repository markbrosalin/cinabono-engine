/* eslint-disable @typescript-eslint/no-explicit-any */
export type Keys<T> = keyof T & string;

export type LeafPaths<Tree, Wanted, Prefix extends string = "/"> = {
    [K in Keys<Tree>]: Tree[K] extends Wanted
        ? `${Prefix}${K}`
        : Tree[K] extends Record<string, any>
          ? LeafPaths<Tree[K], Wanted, `${Prefix}${K}/`>
          : never;
}[keyof Tree & string];

export type NodeAt<Tree, Path extends string> = Path extends `/${infer Head}/${infer Tail}`
    ? Head extends Keys<Tree>
        ? NodeAt<Tree[Head], Tail>
        : never
    : Path extends Keys<Tree>
      ? Tree[Path]
      : never;

export type DeepMapReplace<T, Leaf, ReplaceWith> = T extends Leaf
    ? ReplaceWith
    : T extends Record<string, any>
      ? { [K in Keys<T>]: DeepMapReplace<T[K], Leaf, ReplaceWith> }
      : T;
