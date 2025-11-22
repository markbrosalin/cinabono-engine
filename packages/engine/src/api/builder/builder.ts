import { buildApiTree } from "@engine/api/builder/helpers/buildApiTree";
import { ApiBuilderContract, ApiBuilderEnv } from "@engine/api/builder/types";
import { EngineApi } from "@engine/api/types";

export class ApiBuilder implements ApiBuilderContract {
    constructor(private readonly _env: ApiBuilderEnv) {}

    public buildApi(): EngineApi {
        return buildApiTree(this._env);
    }
}
