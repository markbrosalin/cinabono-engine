import { DepsFactories } from "../../deps/api-factories.js";
import { ComputeSetup } from "@cnbn/modules-runtime";
export const ServicesDepsConfigs = [
    DepsFactories.config((tokens) => ({
        token: tokens.services.itemCompute,
        useFactory: () => ComputeSetup.init(),
        lifetime: "singleton",
    })),
];
