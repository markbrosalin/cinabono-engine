import { PathData, XYcoords } from "./types";
import { TabStatus } from "@gately/domain-model/shared/container-manager/tab/tools/types";

export const createTabItem = (tabId: string) => {
    return {
        tabId,
        title: "New Tab",
        ScopePath: [{ id: tabId, title: "GLOBAL" }] as PathData[],
        isPinned: false,
        isLoaded: false,
        status: "initting" as TabStatus,
        WORKSPACE: {
            zoomFactor: 1,
            gridOffset: { x: 0, y: 0 } as XYcoords,
        },
        STORE: {},
    };
};
