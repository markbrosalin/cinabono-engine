import type { UIEnginePublicApi, UIEngineRuntimeCommandApi, UIEngineWorkspaceCommandApi } from "./types";

type UIEngineCommandFacadeDeps = {
    workspace?: UIEngineWorkspaceCommandApi;
    getRuntime: () => UIEngineRuntimeCommandApi;
};

export const createUIEngineCommandFacade = (
    deps: UIEngineCommandFacadeDeps,
): UIEnginePublicApi["commands"] => {
    return new Proxy({} as UIEnginePublicApi["commands"], {
        get(_target, prop) {
            if (deps.workspace && prop in deps.workspace) {
                return deps.workspace[prop as keyof UIEngineWorkspaceCommandApi];
            }

            const runtime = deps.getRuntime();
            return runtime[prop as keyof UIEngineRuntimeCommandApi];
        },
    });
};
