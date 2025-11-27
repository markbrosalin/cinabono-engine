import { Id, ScopeChildItem, PinIndex } from "@cnbn/schema";
import { LinkIdsResult } from "./scopeLinks.js";
export declare const collectLinkIdsByType: (scopeItem: ScopeChildItem, linkType: keyof typeof scopeItem, pin?: PinIndex) => LinkIdsResult;
export declare const collectLinkIds: (scopeItem: ScopeChildItem) => Id[];
//# sourceMappingURL=collectLinks.d.ts.map