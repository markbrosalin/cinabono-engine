import { TabStatus } from "@gately/domain-model/shared/container-manager/tab/tools/types";
import { UITabData } from "@gately/infrastracture/AppStorage";
import { useSafeTabsManagerContext } from "@gately/infrastracture/UI/shared/context/tab-manager-context/hooks/useSafeTabsManagerContext";
import { Accessor, Component } from "solid-js";

const WorkspaceLoading: Component<{
    tab: Accessor<UITabData | undefined>;
    class?: string;
}> = (props) => {
    const tabsManagerCtx = useSafeTabsManagerContext();
    const { getTabStatus } = tabsManagerCtx;

    const statusMap: Partial<Record<TabStatus, string>> = {
        initting: "Создание вкладки...",
        "loading-elements": "Добавление элементов...",
        "loading-design": "Добавление стилей...",
        error: "Загрузка...",
    } as const;

    return (
        <div class={`flex z-1 items-center justify-center w-full h-full ${props.class}`}>
            <span class="z-1 text-gray-50 font-normal text-2xl">
                {statusMap[getTabStatus(props.tab?.()) ?? "error"]}
            </span>
            <div class="z-0 absolute inset-0 w-full h-full bg-gray-900 opacity-70"></div>
        </div>
    );
};

export default WorkspaceLoading;
