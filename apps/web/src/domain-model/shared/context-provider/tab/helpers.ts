import { TabContainerManagerContract } from "../../container-manager/tab";

export const createTabCtx = async (tab: TabContainerManagerContract) => {
    const ctxProvider = await tab.getCtxProvider();
    return await ctxProvider.get();
};
