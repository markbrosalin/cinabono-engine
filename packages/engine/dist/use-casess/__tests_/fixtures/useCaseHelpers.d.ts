import { EngineCtx } from "../../../enginee";
import { makeUseCaseCtx } from "../../../use-casess/__tests_/fixtures/useCaseDeps";
import { UCBase } from "../../api-core/UCBase";
export declare function makeCtx(overrides?: Partial<ReturnType<typeof makeUseCaseCtx>>): EngineCtx;
export declare function execUC<T extends new (...args: any[]) => UCBase>(UCClass: T, args: Parameters<InstanceType<T>["run"]>[0], ctx?: ReturnType<typeof makeUseCaseCtx>): ReturnType<InstanceType<T>["run"]>;
//# sourceMappingURL=useCaseHelpers.d.ts.map