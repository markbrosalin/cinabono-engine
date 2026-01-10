import { events } from "../constants/events";
import { ItemBuildResult } from "../../item-builder";
import { Id, WithPath, WithStructureData } from "@repo/schema/shared";

export interface EventPayloads {
    [events.ChangeActiveTab]: { tabId: Id };

    [events.CreateTab]: {};
    [events.TempTabCreated]: { tempId: Id };
    [events.RealTabCreated]: { readlId: Id; tempId: Id };

    [events.RemoveTab]: { tabId: Id };
    [events.TabRemoved]: {};

    [events.CreateItem]: Pick<WithStructureData, "hash"> & WithPath;
    [events.ItemCreated]: { result: ItemBuildResult };
    [events.RemoveItem]: { itemId: Id };
    [events.ItemRemoved]: {};

    [events.SimulateItem]: {};
    [events.SimulatedResult]: { updatedItems: UpdatedItem[] };
}
