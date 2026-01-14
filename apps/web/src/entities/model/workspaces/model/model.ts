import { createStore } from "solid-js/store";
import { IWorkspaceStore } from "../types";
import { createWorkspaceActions } from "./actions";

export type WorkspaceModel = ReturnType<typeof createWorkspaceModel>;

export const createWorkspaceModel = () => {
    const [store, setStore] = createStore<IWorkspaceStore>({
        containersByTab: {},
    });

    const actions = createWorkspaceActions(store, setStore);

    return { store, actions };
};
