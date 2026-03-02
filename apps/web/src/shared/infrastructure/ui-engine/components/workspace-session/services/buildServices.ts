import { buildContextServiceRegistry } from "../../../lib/registry/buildServiceRegistry";
import type { ServiceDefinitionMap } from "../../../model/types";
import { createWorkspaceNavigationService } from "./navigation";
import { createWorkspaceSnapshotService } from "./snapshot";
import { createWorkspaceStateService } from "./state";
import { createWorkspaceTabService } from "./tab";
import type {
    WorkspaceSessionServiceContext,
    WorkspaceSessionServiceName,
    WorkspaceSessionServices,
} from "./types";

type WorkspaceSessionServiceDefinitions = ServiceDefinitionMap<
    WorkspaceSessionServiceName,
    WorkspaceSessionServices
>;

const createServiceDefinitions = (
    ctx: WorkspaceSessionServiceContext,
): WorkspaceSessionServiceDefinitions => ({
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
    ctx: WorkspaceSessionServiceContext,
): WorkspaceSessionServices => {
    const definitions = createServiceDefinitions(ctx);
    const { services } = buildContextServiceRegistry<
        WorkspaceSessionServiceName,
        WorkspaceSessionServices
    >(definitions, {
        label: "workspace service",
        ctx,
    });

    return services;
};
