import { ApiTree, UC_Factory, UseCase } from "../../../use-cases/api-core/types/usecase-core";
import { BaseObj } from "@repo/schema";
export declare const defineUseCase: <T extends ApiTree = ApiTree>(name?: string) => {
    readonly withDeps: <Deps extends BaseObj>(deps: Deps) => {
        readonly public: <F>(factory: UC_Factory<Deps, F, T>) => UseCase<Deps, F, T, "public">;
        readonly internal: <F>(factory: UC_Factory<Deps, F, T>) => UseCase<Deps, F, T, "internal">;
    };
    readonly public: <F>(factory: UC_Factory<{}, F, T>) => UseCase<{}, F, T, "public">;
    readonly internal: <F>(factory: UC_Factory<{}, F, T>) => UseCase<{}, F, T, "internal">;
};
//# sourceMappingURL=defineUseCase.d.ts.map