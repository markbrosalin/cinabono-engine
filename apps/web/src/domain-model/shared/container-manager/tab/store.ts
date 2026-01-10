import { Store } from "@repo/entities-runtime/store";
import { TabStoreContract } from "./service/contracts";
import { TabContainerManagerContract } from "./contracts";
import { Id } from "@repo/schema/shared";

export class TabStore extends Store<Id, TabContainerManagerContract> implements TabStoreContract {}
