export declare const api: {
    readonly math: {
        readonly add: import("./types").UseCase<{
            readonly label: "adder";
        }, (p: {
            a: number;
            b: number;
        }) => number, import("./types").ApiTree, "public">;
    };
    readonly ops: {
        readonly double: import("./types").UseCase<{}, (p: {
            x: number;
        }) => any, import("./types").ApiTree, "public">;
        readonly _secret: import("./types").UseCase<{}, () => "shh", import("./types").ApiTree, "internal">;
    };
};
export type Api = typeof api;
//# sourceMappingURL=api.d.ts.map