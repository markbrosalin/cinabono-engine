import { useEngine } from "@gately/app/providers/EngineProvider";
import { ITab } from "@gately/entities/model/tabss";
import { useTabsActions } from "@gately/entities/model/tabss/hooks";
import { IWorkspace, useWorkspaceActions } from "@gately/entities/model/workspaces";
import { batch } from "solid-js";

type OpenNewTabProps = Partial<{
    tab?: Partial<Pick<ITab, "title">>;
    workspace?: Partial<Pick<IWorkspace, "panOffset" | "scaleFactor">>;
}>;

export const useOpenNewTab = () => {
    const tabActions = useTabsActions();
    const workspaceActions = useWorkspaceActions();
    const engine = useEngine();

    const openNewTab = async (props: OpenNewTabProps = {}) => {
        const { tabId } = await engine.call("/tab/create", {});

        let tab, workspace;

        batch(() => {
            // create and set active tab
            tab = tabActions.create(tabId, {
                data: props.tab,
                switchActive: true,
            });

            // create and set active workspace
            workspace = workspaceActions.forTab(tab.id).create([tab.id], {
                data: props.workspace,
                switchActive: true,
            });
        });

        return { tab, workspace };
    };

    return { openNewTab };
};
