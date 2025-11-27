import * as Schema from "@cnbn/schema";
import { RemapState } from "../types/ItemBuilder.js";
export declare class RemapService {
    createRemap(): RemapState;
    remapItemId(oldId: Schema.Id, remap: RemapState): Schema.Id;
    remapSingleLink(linkId: Schema.Id, remap: RemapState): Schema.Id;
    remapLinks(item: Partial<Schema.WithInnerItemInOutLinks>, remap: RemapState): Set<Schema.Id>;
    remapCircuitInOutPins(circuit: Schema.ItemOfKind<"circuit:logic">, remap: RemapState): void;
}
//# sourceMappingURL=RemapService.d.ts.map