import { SubUC_Fn } from "../api/__tests__/ApiRegistry.test";
import { AddUC_Fn } from "../api/playground";
export declare const CORE_API_SPEC: {
    readonly math: {
        readonly add: import("./types").UseCaseSpec<AddUC_Fn, "public">;
        readonly sub: import("./types").UseCaseSpec<SubUC_Fn, "internal">;
    };
};
//# sourceMappingURL=spec.d.ts.map