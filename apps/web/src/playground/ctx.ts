import { SimulatorContext } from "@gately/domain-model/shared/simulation";
import { ItemOptions, ItemStore, ScopeStore } from "@repo/modules-runtime";
import { LinkStore } from "../../../../packages/modules-runtime/dist/link-store";
import { WithId, Entries } from "@repo/schema";
import { buildData } from "./data";
import { BakeStore, ComputeStore, ComputeTool } from "@gately/domain-model/modules/compute";
import { computesMap } from "@gately/infrastracture/di-container/configs/runtime/compute/computesMap";
import { bakesMap } from "@gately/infrastracture/di-container/configs/runtime/compute/bakesMap";

const toEntries = <T extends WithId>(data: T[]): Entries<T["id"], T> => {
    return data.map((v) => [v.id, v]);
};

const { items, scopes, links } = buildData;

const itemStore = new ItemStore(new Map(toEntries(items)));
const scopeStore = new ScopeStore(new Map(toEntries(scopes)));
const linkStore = new LinkStore(new Map(toEntries(links)));
const computeStore = new ComputeStore(computesMap);
const bakeStore = new BakeStore(bakesMap);
const compute = new ComputeTool();
const itemOptions = new ItemOptions();

export const ctx = {
    itemStore,
    scopeStore,
    linkStore,
    computeStore,
    bakeStore,
    compute,
    itemOptions,
} satisfies SimulatorContext;
