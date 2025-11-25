import { DEPS_CONFIGS } from "../di/configs";
import { DIContainer } from "@repo/di";
export async function buildEngineContainer() {
    const container = new DIContainer();
    for (const cfg of DEPS_CONFIGS) {
        container.register(cfg);
    }
    return container;
}
