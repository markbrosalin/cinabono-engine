export class ResultAccumulator {
    _result = {
        items: [],
        scopes: [],
        linkIds: new Set(),
    };
    add(result) {
        this._result.items.push(...(result.items ?? []));
        this._result.scopes.push(...(result.scopes ?? []));
        if (result.linkIds)
            result.linkIds.forEach((v) => this._result.linkIds.add(v));
        return this;
    }
    get() {
        return this._result;
    }
}
