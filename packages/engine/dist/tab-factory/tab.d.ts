import { Id } from "@cnbn/schema/shared";
import { TabCtx } from "./types.js";
export interface TabContract {
    get id(): Id;
    get ctx(): TabCtx;
    close(): void;
}
export declare class DefaultTab implements TabContract {
    readonly ctx: TabCtx;
    readonly id: Id;
    constructor(ctx: TabCtx, id: Id);
    close(): void;
}
//# sourceMappingURL=tab.d.ts.map