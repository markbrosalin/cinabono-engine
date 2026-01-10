import { ItemCreationToolContract } from "@repo/modules-runtime/item/tools";
import {
    ScopeCreationToolContract,
    ScopeMutationToolContract,
} from "@repo/modules-runtime/scope/tools";
import {
    BuildArgs,
    ItemBuildResult,
    ItemBuilderProps,
    RemapState,
    RemappedConnections,
} from "../../domain-model/shared/item-builder/types";
import { DomainServiceError } from "@gately/domain-model/shared/error-logger";
import { createRemapState, initialResult, mergeResults } from "./helpers/helpers";
import { v4 as uuidv4 } from "uuid";
import { ItemBuilderContract } from "@gately/domain-model/shared/item-builder";
import { LibraryStoreContract } from "@gately/domain-model/modules/library";
import { MakeReadonlyStore } from "@repo/entities-runtime/store";
import { getInitiallyActiveOutputPins, getPathTo, getOrCreateId, getMappedId } from "@repo/helpers";
import * as S from "@repo/schema";
import { flatValues, normalizeNested } from "@repo/utils";

export class ItemBuilder implements ItemBuilderContract {
    private readonly _libraryStore: MakeReadonlyStore<LibraryStoreContract>;
    private readonly _itemCreator: ItemCreationToolContract;
    private readonly _scopeCreator: ScopeCreationToolContract;
    private readonly _scopeMutator: ScopeMutationToolContract;

    private readonly _itemReadyMap = new Map<S.Id, S.Item>();

    constructor(props: ItemBuilderProps) {
        this._libraryStore = props.libraryStore;
        this._itemCreator = props.itemCreationTool;
        this._scopeCreator = props.scopeCreationTool;
        this._scopeMutator = props.scopeMutationTool;
    }

    public async build(args: BuildArgs): Promise<ItemBuildResult> {
        const template = this._libraryStore.getSafely(args.hash);
        const itemArgs: S.ItemArgs = { ...template, ...args };

        if (S.isBaseArgs(itemArgs)) {
            return this.buildBase(itemArgs);
        }

        if (S.isCustomArgs(itemArgs)) {
            return await this.buildCustom(itemArgs);
        }

        throw new DomainServiceError("Неизвестный тип аргументов создания элемента", {
            itemArgs,
        });
    }

    private buildBase(args: S.BaseItemArgs): ItemBuildResult {
        const item = this._itemCreator.buildItemStructure(args);
        const readyPins = getInitiallyActiveOutputPins(item);
        return initialResult({ items: [item], readyPins });
    }

    private async buildCustom(
        args: S.CustomItemArgs,
        remap: RemapState = createRemapState()
    ): Promise<ItemBuildResult> {
        const item = this._itemCreator.buildItemStructure(args);
        const scope = this._scopeCreator.buildScopeStructure({
            id: item.id,
            path: item.path,
            kind: "CIRCUIT",
        });

        const childrenResult = await this.buildChildren({
            templateItems: args.items,
            parentScope: scope,
            childPath: getPathTo(item),
            remap,
        });

        Object.assign(item, this.resolveNestedIO(args, remap.itemIdMap));

        const updatedChildrenResult = this.assignCircuitPins({
            childs: childrenResult.items,
            circuit: { ...item },
        });

        return {
            items: [item, ...updatedChildrenResult],
            scopes: [scope, ...childrenResult.scopes],
            links: [...new Set(childrenResult.links)],
            readyPins: childrenResult.readyPins,
        };
    }

    private async buildChildren(ctx: {
        templateItems: Record<S.Id, S.CustomTemplateInnerItem>;
        parentScope: S.Scope;
        childPath: S.Id[];
        remap: RemapState;
    }): Promise<ItemBuildResult> {
        const { remap, templateItems, childPath, parentScope } = ctx;
        const result = initialResult();

        for (const oldId in templateItems) {
            const childTemplate = templateItems[oldId];
            const newId = getOrCreateId(oldId, remap.itemIdMap, this._itemCreator.generateId);
            const template = this._libraryStore.getSafely(childTemplate.hash);

            const itemArgs: S.ItemArgs = {
                ...template,
                path: childPath,
                hash: childTemplate.hash,
                id: newId,
            };

            const childResult = await this.buildFromTemplate(template, itemArgs);

            const { full, ids } = this.remapConnections(childTemplate, remap);

            //register parent scope ownership
            const childItem = { ...ids, id: newId };
            this._scopeMutator.storeChildItem(childItem, parentScope);
            this._scopeMutator.storeScopeId(childResult.scopes, parentScope);

            mergeResults(result, {
                ...childResult,
                links: [
                    ...childResult.links,
                    ...flatValues(full.inputLinks),
                    ...flatValues(full.outputLinks),
                ],
            });
        }

        return result;
    }

    private resolveNestedIO(io: S.WithIOItems, itemIdMap: RemapState["itemIdMap"]): S.WithIOItems {
        const resolve = <T extends S.ItemLinkedToExternalPin>(items: T[][] | T[]): typeof items => {
            const { flat, isNested, restoreChunks } = normalizeNested(items);

            const resolvedIds = flat.flatMap(({ id, pin }) => {
                const mappedId = getMappedId(id, itemIdMap);
                const circuit = this._itemReadyMap.get(mappedId);

                if (!circuit || !S.isCircuitItem(circuit)) return { id: mappedId, pin } as T;

                const io = isNested ? circuit.inputItems[pin] : circuit.outputItems[pin];
                const replacements = Array.isArray(io) ? io : io ? [io] : [];

                return replacements.map(({ id, pin }) => ({
                    id: getMappedId(id, itemIdMap),
                    pin,
                })) as T[];
            });

            return restoreChunks(resolvedIds);
        };

        return {
            inputItems: resolve(io.inputItems) as S.InputItems,
            outputItems: resolve(io.outputItems) as S.OutputItems,
        };
    }

    private async buildFromTemplate(
        template: S.Template,
        args: S.ItemArgs
    ): Promise<ItemBuildResult> {
        let result: ItemBuildResult;

        if (S.isBaseTemplate(template)) {
            result = this.buildBase(args as S.BaseItemArgs);
        } else if (S.isCustomTemplate(template)) {
            result = await this.buildCustom(args as S.CustomItemArgs);
        } else {
            throw new DomainServiceError("Unknown type of template", { template });
        }

        const [item] = result.items;
        this._itemReadyMap.set(item.id, item);

        return result;
    }

    private remapConnections(
        item: Partial<S.WithInputLinks & S.WithOutputLinks>,
        remap: RemapState
    ): RemappedConnections {
        const fullInput: S.InputLinks = {};
        const idInput: S.inputLinkIds = {};

        const fullOutput: S.OutputLinks = {};
        const idOutput: S.outputLinkIds = {};

        const remapGroup = (
            conns: Record<number, S.ItemLink | S.ItemLink[]> | undefined,
            fullTarget: Record<number, S.ItemLink | S.ItemLink[]>,
            idTarget: Record<number, S.Id | S.Id[]>
        ) => {
            if (!conns) return;

            for (const [pin, value] of Object.entries(conns)) {
                const pinNum = +pin;
                if (Array.isArray(value)) {
                    const remapped = value.map((conn) => this.remapSignleConnections(conn, remap));
                    if (remapped.length) {
                        fullTarget[pinNum] = remapped;
                        idTarget[pinNum] = remapped.map((c) => c.id);
                    }
                } else {
                    const remapped = this.remapSignleConnections(value, remap);
                    fullTarget[pinNum] = remapped;
                    idTarget[pinNum] = remapped.id;
                }
            }
        };

        remapGroup(item.inputLinks, fullInput, idInput);
        remapGroup(item.outputLinks, fullOutput, idOutput);

        return {
            full: {
                inputLinks: fullInput,
                outputLinks: fullOutput,
            },
            ids: {
                inputLinks: idInput,
                outputLinks: idOutput,
            },
        };
    }

    private remapSignleConnections(conn: S.ItemLink, remap: RemapState): S.ItemLink {
        const { connIdMap, itemIdMap } = remap;
        const existing = connIdMap.get(conn.id);
        if (existing) return existing;

        const cloned = { ...conn };
        const creatorFn = this._itemCreator.generateId;

        cloned.fromItemId = getOrCreateId(conn.fromItemId, itemIdMap, creatorFn);
        cloned.toItemId = getOrCreateId(conn.toItemId, itemIdMap, creatorFn);
        cloned.id = uuidv4();

        remap.connIdMap.set(conn.id, cloned);
        return cloned;
    }

    private assignCircuitPins({
        childs,
        circuit,
    }: {
        childs: S.Item[];
        circuit: S.WithIOItems & S.WithId;
    }): S.Item[] {
        const getItemPins = (item: S.Item, isInput: boolean) => {
            if (isInput && S.hasInputPins(item)) return item.inputPins;
            if (!isInput && S.hasOutputPins(item)) return item.outputPins;
            return [];
        };

        const setPins = <T extends S.ItemLinkedToExternalPin>(links: T[][] | T[]) => {
            const { flat, isNested } = normalizeNested(links);

            return flat.reduce<S.Item[]>((acc, { id, pin }: T, circuitPin: number) => {
                const item = this._itemReadyMap.get(id);
                if (!item) return acc;

                const pins = getItemPins(item, isNested);
                if (!pins[pin]) return acc;

                const current = pins[pin].circuitPins ?? [];
                current.push({ circuitId: circuit.id, circuitPin });
                pins[pin].circuitPins = current;

                return acc;
            }, []);
        };

        setPins(circuit.inputItems);
        setPins(circuit.outputItems);
        return childs;
    }
}
