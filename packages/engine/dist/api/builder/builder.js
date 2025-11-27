import { buildApiTree } from "../../api/builder/helpers/buildApiTree";
export class ApiBuilder {
    _env;
    constructor(_env) {
        this._env = _env;
    }
    buildApi() {
        return buildApiTree(this._env);
    }
}
