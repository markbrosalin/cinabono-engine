import { ItemLink } from "../link/index.js";
import { Id } from "./item/index.js";
import { ItemOfKind, ScopeOfKind, TemplateOfKind } from "./maps/index.js";
type Get<T> = (id: Id) => T | undefined;
export type Read<T extends "item" | "scope" | "template" | "link"> = T extends "item" ? Get<ItemOfKind> : T extends "scope" ? Get<ScopeOfKind> : T extends "link" ? Get<ItemLink> : T extends "template" ? Get<TemplateOfKind> : never;
export {};
//# sourceMappingURL=access.d.ts.map