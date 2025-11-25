/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../use-cases/api-core/api";
import { DefaultApiExecutor } from "../../use-cases/api-core/api-executor";
import { makeFakeBus } from "../../use-cases/api-core/playground";
const { bus } = makeFakeBus();
const deps = {
    core: { bus },
    factories: {},
    stores: {},
    infra: { makeFlow: (path) => ({ path }) },
    api: api,
    config: { maxDepth: 8 },
};
const executor = new DefaultApiExecutor(deps);
const _publicApi = executor.buildPublicApi();
_publicApi.math.add({});
