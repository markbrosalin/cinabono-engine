import { ApiTree } from "../../../use-cases/api-registry/types";
import { ApiUseCaseMiddleware } from "../../../use-cases/api-core/types/usecase-core";
import { BaseObj } from "@repo/schema";
export declare const defineMiddleware: <Tree extends ApiTree, Deps extends BaseObj = BaseObj>(name: string | undefined, mw: ApiUseCaseMiddleware<Tree, Deps>) => ApiUseCaseMiddleware<Tree, Deps>;
//# sourceMappingURL=defineMiddleware.d.ts.map