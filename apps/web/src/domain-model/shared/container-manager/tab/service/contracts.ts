import { Store } from "@repo/entities-runtime/store";
import { TabContainerManagerContract } from "../contracts";
import { TabCreatorContract } from "../tools/contracts";
import { Id } from "@repo/schema/shared";

export interface TabServiceContract {
    get creator(): TabCreatorContract;

    get store(): TabStoreContract;
}

export interface TabStoreContract extends Store<Id, TabContainerManagerContract> {}
