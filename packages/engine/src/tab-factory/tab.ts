import { Id } from "@cnbn/schema/shared";
import { TabCtx } from "./types";

export interface TabContract {
    get id(): Id;
    get ctx(): TabCtx;
    close(): void;
}

export class DefaultTab implements TabContract {
    constructor(
        public readonly ctx: TabCtx,
        public readonly id: Id
    ) {}

    public close(): void {
        this.ctx.itemStore.clear();
        this.ctx.linkStore.clear();
        this.ctx.scopeStore.clear();
        this.ctx.simulation.kill();
    }
}
