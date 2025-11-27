import { ApiBuilderContract, ApiBuilderEnv } from "../../api/builder/types/index.js";
import { EngineApi } from "../../api/types/index.js";
export declare class ApiBuilder implements ApiBuilderContract {
    private readonly _env;
    constructor(_env: ApiBuilderEnv);
    buildApi(): EngineApi;
}
//# sourceMappingURL=builder.d.ts.map