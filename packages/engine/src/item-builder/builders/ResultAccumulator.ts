import { StructureBuilderResult } from "../types/StructureBuilder";

export class ResultAccumulator {
    private readonly _result: StructureBuilderResult = {
        items: [],
        scopes: [],
        linkIds: new Set(),
    };

    public add(result: Partial<StructureBuilderResult>) {
        this._result.items.push(...(result.items ?? []));
        this._result.scopes.push(...(result.scopes ?? []));

        if (result.linkIds) result.linkIds.forEach((v) => this._result.linkIds.add(v));

        return this;
    }

    public get(): StructureBuilderResult {
        return this._result;
    }
}
