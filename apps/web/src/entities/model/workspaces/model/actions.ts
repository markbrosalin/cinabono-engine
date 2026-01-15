import { produce, SetStoreFunction } from "solid-js/store";
import { IWorkspace, IWorkspaceStore } from "../types";
import { pathToId } from "@gately/shared/lib/path";
import { batch } from "solid-js";
import { HierarchyPath } from "@cnbn/schema";

export type WorkspaceActions = ReturnType<typeof createWorkspaceActions>;

const getWorkspaceId = (pathOrId: HierarchyPath | string): string => {
    return Array.isArray(pathOrId) ? pathToId(pathOrId) : pathOrId;
};

export const createWorkspaceActions = (
    store: IWorkspaceStore,
    setStore: SetStoreFunction<IWorkspaceStore>
) => {
    function forTab(tabId: string) {
        const getContainer = () => store.containersByTab[tabId];

        const getWorkspaces = () => getContainer()?.workspaces ?? {};

        const getActiveWorkspaceId = () => getContainer()?.activeWorkspaceId;

        function get(pathOrId: HierarchyPath | string): IWorkspace | undefined {
            return getWorkspaces()[getWorkspaceId(pathOrId)];
        }

        function create(
            path: HierarchyPath,
            options?: {
                data?: Omit<Partial<IWorkspace>, "id" | "path">;
                switchActive?: boolean;
            }
        ) {
            const ws: IWorkspace = {
                id: pathToId(path),
                offset: options?.data?.offset ?? { x: 0, y: 0 },
                scale: options?.data?.scale ?? 1,
                path,
            };

            batch(() => {
                if (!getContainer()) {
                    setStore("containersByTab", tabId, {
                        workspaces: {},
                        activeWorkspaceId: undefined,
                    });
                }
                setStore("containersByTab", tabId, "workspaces", ws.id, ws);

                if (options?.switchActive === true) {
                    setStore("containersByTab", tabId, "activeWorkspaceId", ws.id);
                }
            });

            return ws;
        }

        function remove(pathOrId: HierarchyPath | string): IWorkspace | undefined {
            let removedWs: IWorkspace | undefined;

            setStore(
                produce((s) => {
                    const workspaceId = getWorkspaceId(pathOrId);

                    delete s.containersByTab[tabId].workspaces[workspaceId];

                    if (getActiveWorkspaceId() === workspaceId) {
                        setStore("containersByTab", tabId, "activeWorkspaceId", undefined);
                    }
                })
            );
            return removedWs;
        }

        function update(
            pathOrId: HierarchyPath | string,
            data: Omit<Partial<IWorkspace>, "id" | "path">
        ): IWorkspace | undefined {
            const ws = get(pathOrId);
            if (!ws) return;

            setStore("containersByTab", tabId, "workspaces", getWorkspaceId(pathOrId), data);

            return get(pathOrId);
        }

        function clearAll(): void {
            setStore(
                produce((store) => {
                    delete store.containersByTab[tabId];
                })
            );
        }

        function switchActive(pathOrId: HierarchyPath | string): boolean {
            const ws = get(pathOrId);
            if (!ws) return false;

            if (getActiveWorkspaceId() === getWorkspaceId(pathOrId)) return true;

            setStore("containersByTab", tabId, "activeWorkspaceId", ws.id);
            return true;
        }

        return { create, update, get, remove, switchActive, clearAll };
    }

    return { forTab };
};
