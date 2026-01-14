import { produce, SetStoreFunction } from "solid-js/store";
import { IWorkspace, IWorkspaceStore } from "../types";
import { PartialExceptId } from "@gately/shared/types";
import { pathToId } from "@gately/shared/lib/path";
import { batch } from "solid-js";
import { HierarchyPath } from "@cnbn/schema";

export type WorkspaceActions = ReturnType<typeof createWorkspaceActions>;

export const createWorkspaceActions = (
    store: IWorkspaceStore,
    setStore: SetStoreFunction<IWorkspaceStore>
) => {
    function forTab(tabId: string) {
        const getContainer = () => store.containersByTab[tabId];

        const getWorkspaces = () => getContainer()?.workspaces ?? {};

        const getActiveWorkspace = () => getContainer()?.activeWorkspace;

        const getWorkspaceId = (pathOrId: HierarchyPath | string): string => {
            return Array.isArray(pathOrId) ? pathToId(pathOrId) : pathOrId;
        };

        function get(pathOrId: HierarchyPath | string): IWorkspace | undefined {
            return getWorkspaces()[getWorkspaceId(pathOrId)];
        }

        function create(
            path: HierarchyPath,
            options?: {
                data?: Omit<PartialExceptId<IWorkspace>, "id" | "path">;
                switchActive?: boolean;
            }
        ) {
            const ws: IWorkspace = {
                id: pathToId(path),
                panOffset: options?.data?.panOffset ?? { x: 0, y: 0 },
                scaleFactor: options?.data?.scaleFactor ?? 1,
                path,
            };

            batch(() => {
                if (!getContainer()) {
                    setStore("containersByTab", tabId, {
                        workspaces: {},
                        activeWorkspace: undefined,
                    });
                }
                setStore("containersByTab", tabId, "workspaces", ws.id, ws);

                if (options?.switchActive === true) {
                    setStore("containersByTab", tabId, "activeWorkspace", ws);
                }
            });

            return ws;
        }

        function getActive() {
            return getActiveWorkspace();
        }

        function remove(pathOrId: HierarchyPath | string): IWorkspace | undefined {
            let removedWs: IWorkspace | undefined;

            setStore(
                produce((s) => {
                    const workspaceId = getWorkspaceId(pathOrId);

                    delete s.containersByTab[tabId].workspaces[workspaceId];

                    if (getActiveWorkspace()?.id === workspaceId) {
                        setStore("containersByTab", tabId, "activeWorkspace", undefined);
                    }
                })
            );
            return removedWs;
        }

        function update(
            pathOrId: HierarchyPath | string,
            data: PartialExceptId<IWorkspace>
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

            if (getActive()?.id === getWorkspaceId(pathOrId)) return true;

            setStore("containersByTab", tabId, "activeWorkspace", ws);
            return true;
        }

        return { getActive, create, update, get, remove, switchActive, clearAll };
    }

    return { forTab };
};
