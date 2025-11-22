import { DepsFactories } from "@engine/deps/api-factories";
import { ComputeSetup } from "@cnbn/modules-runtime";

export const ServicesDepsConfigs = [
    DepsFactories.config((tokens) => ({
        token: tokens.services.itemCompute,
        useFactory: () => ComputeSetup.init(),
        lifetime: "singleton",
    })),
];
