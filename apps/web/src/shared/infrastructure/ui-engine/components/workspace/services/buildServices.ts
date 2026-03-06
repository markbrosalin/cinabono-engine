import { buildContextServiceRegistry } from "@gately/shared/infrastructure/ui-engine/lib/registry";
import type { ServiceDefinitionMap } from "@gately/shared/infrastructure/ui-engine/model/types";
import { createWorkspaceNavigationService } from "./navigation";
import { createWorkspaceSnapshotService } from "./snapshot";
import { createWorkspaceStateService } from "./state";
import { createWorkspaceTabService } from "./tab";
import type {
    WorkspaceServiceContext,
    WorkspaceServiceName,
    WorkspaceServices,
} from "./types";

type WorkspaceServiceDefinitions = ServiceDefinitionMap<
    WorkspaceServiceName,
    WorkspaceServices
>;

const createServiceDefinitions = (
    ctx: WorkspaceServiceContext,
): WorkspaceServiceDefinitions => ({
    state: {
        create: () => createWorkspaceStateService(),
    },
    snapshot: {
        create: () => createWorkspaceSnapshotService(ctx),
        createDeps: ["state"],
    },
    navigation: {
        create: () => createWorkspaceNavigationService(ctx),
        createDeps: ["state", "snapshot"],
    },
    tab: {
        create: () => createWorkspaceTabService(ctx),
        createDeps: ["state", "navigation"],
    },
});

export const buildWorkspaceServices = (
    ctx: WorkspaceServiceContext,
): WorkspaceServices => {
    const definitions = createServiceDefinitions(ctx);
    const { services } = buildContextServiceRegistry<
        WorkspaceServiceName,
        WorkspaceServices
    >(definitions, {
        label: "workspace service",
        ctx,
    });

    return services;
};

