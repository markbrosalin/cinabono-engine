import { ComputeService } from "@gately/domain-services/computeService";
import {
    BakeStore,
    ComputeServiceContract,
    ComputeStore,
} from "@gately/domain-model/modules/compute";
import { computesMap } from "./computesMap";
import { bakesMap } from "./bakesMap";
import { ComputeTool } from "@gately/domain-model/modules/compute/tools/computeTool";
import { DIConfig } from "@repo/di/types";
import { ComputeServiceToken } from "@gately/domain-model/shared/di-tokens/app/services";

export const computeServiceConfig = {
    token: ComputeServiceToken,
    useFactory: () =>
        new ComputeService({
            stores: {
                COMPUTE: new ComputeStore(computesMap),
                BAKE: new BakeStore(bakesMap),
            },
            tools: {
                COMPUTE: new ComputeTool(),
            },
        }),
} satisfies DIConfig<ComputeServiceContract>;
