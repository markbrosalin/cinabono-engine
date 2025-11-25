export type AddUC_Fn = {
    (a: number, b: number): number;
    (a: string, b: string): string;
};
export declare const TreeWrapper: import("../types").UseCaseWrapper<{
    readonly math: {
        readonly add: import("../types").UseCaseSpec<import("../playground").AddUC_Fn, "public">;
        readonly sub: import("../types").UseCaseSpec<SubUC_Fn, "internal">;
    };
}>;
export type SubUC_Fn = {
    (a: number, b: number): number;
    (a: string, b: string): string;
};
//# sourceMappingURL=ApiRegistry.test.d.ts.map