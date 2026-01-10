import { getTab } from "@gately/infrastracture/AppStorage";
import { WorkspaceContextProvider } from "@gately/infrastracture/UI/features/Workspace/model/context";
import { useSafeTabsManagerContext } from "@gately/infrastracture/UI/shared/context/tab-manager-context/hooks/useSafeTabsManagerContext";
import { Component, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import FakeGrid from "@gately/infrastracture/UI/features/Workspace/ui/FakeGrid";
import Workspace from "@gately/infrastracture/UI/features/Workspace/ui/Workspace";
import WorkspaceLoading from "@gately/infrastracture/UI/features/Workspace/ui/WorkspaceLoading";

const WorkspaceWrapper: Component<{ class?: string }> = (props) => {
    const tabsManagerCtx = useSafeTabsManagerContext();
    const { isTabLoaded, ActiveTabId } = tabsManagerCtx;

    const ActiveTab = () => getTab(ActiveTabId());
    const tabLoaded = () => isTabLoaded(ActiveTab());

    return (
        <div id="workspace-columns" class={`flex w-full h-full flex-col ${props.class}`}>
            <div id="workspace-rows" class="flex w-full h-full flex-row relative">
                <WorkspaceContextProvider tab={ActiveTab}>
                    <Transition name="fade" mode="outin">
                        <Show
                            when={tabLoaded()}
                            fallback={<WorkspaceLoading class="z-2" tab={ActiveTab} />}
                            keyed
                        >
                            <Workspace class="z-1" />
                        </Show>
                    </Transition>
                    <FakeGrid class="z-0" />
                </WorkspaceContextProvider>
            </div>
        </div>
    );
};

export default WorkspaceWrapper;
