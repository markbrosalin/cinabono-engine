import * as Schema from "@cnbn/schema";
import { BuiltItemsMap } from "../types/ItemBuilder";
export declare class CircuitIOBinder {
    private readonly _builtItems;
    constructor(_builtItems: BuiltItemsMap);
    bind(circuit: Schema.ItemOfKind<"circuit:logic">): void;
    private _assign;
    private _bindInputItem;
    private _bindOutputItem;
}
//# sourceMappingURL=CircuitIOBuilder.d.ts.map