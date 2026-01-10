import { ItemCreationToolContract } from "@repo/modules-runtime/item/tools";
import {
    ScopeCreationToolContract,
    ScopeMutationToolContract,
} from "@repo/modules-runtime/scope/tools";
import { LibraryStoreContract } from "@gately/domain-model/modules/library";
import { MakeReadonlyStore } from "@repo/entities-runtime/store";
import {
    CustomTemplateInnerItem,
    Scope,
    Item,
    ItemLink,
    inputLinkIds,
    outputLinkIds,
    Emitter,
} from "@repo/schema";
import { Id, WithPath, WithStructureData, InputLinks, OutputLinks } from "@repo/schema/shared";

export interface BuildChildContext {
    oldChildId: Id;
    child: CustomTemplateInnerItem;
    result: ItemBuildResult;
    parentScope: Scope;
}

export interface ItemBuildResult {
    items: Item[];
    scopes: Scope[];
    links: ItemLink[];
    readyPins: Emitter[];
}

export interface ItemBuilderProps {
    libraryStore: MakeReadonlyStore<LibraryStoreContract>;
    itemCreationTool: ItemCreationToolContract;
    scopeCreationTool: ScopeCreationToolContract;
    scopeMutationTool: ScopeMutationToolContract;
}

export type BuildArgs = WithPath & Pick<WithStructureData, "hash">;
export interface RemapState {
    itemIdMap: Map<Id, Id>;
    connIdMap: Map<Id, ItemLink>;
}

export interface RemappedConnections {
    full: {
        inputLinks: InputLinks;
        outputLinks: OutputLinks;
    };
    ids: {
        inputLinks: inputLinkIds;
        outputLinks: outputLinkIds;
    };
}
