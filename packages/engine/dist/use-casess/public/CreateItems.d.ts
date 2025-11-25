import { UCBaseExtended } from "../../use-casess/api-core";
import { UCCreateItemPayload, UCCreateItemResult } from "../../use-casess/private";
import { KindKey } from "@repo/schema";
export declare class UCCreateManyItems extends UCBaseExtended {
    name: string;
    run<K extends KindKey>(payload: UCCreateItemPayload<K>): UCCreateItemResult;
    run<K extends KindKey>(payload: UCCreateItemPayload<K>[]): UCCreateItemResult[];
}
//# sourceMappingURL=CreateItems.d.ts.map