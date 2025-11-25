import { UseCaseFactory, UseCaseSpec, UseCaseWrapper, CoreApiSpec, Spec } from "../../api/types";
import { BaseFn } from "@repo/schema";
export declare const ucSpec: {
    public: <Fn extends BaseFn>(meta: {
        name: string;
    }) => UseCaseSpec<Fn, "public">;
    internal: <Fn extends BaseFn>(meta: {
        name: string;
    }) => UseCaseSpec<Fn, "internal">;
};
export declare function defineUseCase<S extends Spec = CoreApiSpec, Fctr extends UseCaseFactory<S> = UseCaseFactory<S>>({ factory, wrappedBy }: {
    factory: Fctr;
    wrappedBy?: UseCaseWrapper<S>[];
}): {
    readonly factory: Fctr;
    readonly wrappers: UseCaseWrapper<S>[] | undefined;
};
export declare function defineWrapper<S extends Spec = CoreApiSpec>(name: string, fn: UseCaseWrapper<S>): UseCaseWrapper<S>;
//# sourceMappingURL=factories.d.ts.map