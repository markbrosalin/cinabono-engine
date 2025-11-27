import * as Schema from "@cnbn/schema";
import { E } from "@engine/errors";
import { saveChildToScope } from "@cnbn/helpers/scope";
import { ResultAccumulator } from "./ResultAccumulator";
import { getBuiltItem } from "../helpers";
export class StructureBuilder {
    _getTpl;
    _mkItem;
    _mkScope;
    _remap;
    _builtItems = new Map();
    constructor(deps, remapService) {
        this._getTpl = deps.getTemplate;
        this._mkItem = deps.itemFactory;
        this._mkScope = deps.scopeFactory;
        this._remap = remapService;
    }
    getBuiltItems() {
        return this._builtItems;
    }
    build(args, remap) {
        if (Schema.isBaseArgs(args))
            return this._buildBase(args);
        else if (Schema.isCircuitArgs(args))
            return this._buildCircuit(args, remap ?? this._remap.createRemap());
        throw E.item.UnknownArgsKind(args);
    }
    _buildBase(args) {
        const item = this._mkItem(args);
        this._builtItems.set(item.id, item);
        return new ResultAccumulator().add({ items: [item] }).get();
    }
    _buildCircuit(args, remap) {
        const circuit = this._mkItem(args);
        this._builtItems.set(circuit.id, circuit);
        const scope = this._mkScope({
            id: circuit.id,
            path: circuit.path,
            kind: "circuit",
        });
        const childrenResult = this._buildChildren({
            innerItems: args.items,
            circuitScope: scope,
            path: circuit.path,
            remap,
        });
        return new ResultAccumulator()
            .add({
            items: [circuit, ...childrenResult.items],
            scopes: [scope, ...childrenResult.scopes],
            linkIds: childrenResult.linkIds,
        })
            .get();
    }
    _buildChildren(ctx) {
        const { innerItems, circuitScope, path, remap } = ctx;
        const acc = new ResultAccumulator();
        for (const oldId in innerItems) {
            const innerItem = innerItems[oldId];
            const newId = this._remap.remapItemId(oldId, remap);
            const args = this._getItemArgsOfInnerItem(innerItem, newId, path);
            const built = this.build(args, remap);
            const remappedLinks = this._remap.remapLinks(innerItem, remap);
            saveChildToScope(circuitScope, { id: newId, kind: getBuiltItem(built).kind });
            acc.add({
                items: built.items,
                scopes: built.scopes,
                linkIds: remappedLinks,
            });
        }
        return acc.get();
    }
    _getItemArgsOfInnerItem(item, newId, path) {
        if (item.kind === "circuit:logic") {
            const tpl = this._getTpl(item.hash);
            if (!tpl)
                throw E.template.NotFound(item.hash);
            const { inputPins, outputPins, items } = tpl;
            return {
                ...item,
                id: newId,
                path,
                inputPins,
                outputPins,
                items,
            };
        }
        else {
            return { ...item, id: newId, path };
        }
    }
}
