import { TabContainerManagerContract } from "../contracts";

export interface TabCreatorContract {
    createTabStructure(): Promise<TabContainerManagerContract>;
}
