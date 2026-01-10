import { TabCreatorContract } from "./contracts";

export interface TabServiceToolsMap {
    CREATOR: TabCreatorContract;
}

export type TabStatus = "error" | "initting" | "finished" | "loading-elements" | "loading-design";
