import { GeneratorItem, LogicItem, DisplayItem, CircuitItem } from "../../item/index.js";
import { GeneratorArgs, LogicArgs, DisplayArgs, CircuitArgs } from "../../item-args/index.js";
import { GeneratorTemplate, LogicTemplate, DisplayTemplate, CircuitTemplate } from "../../template/index.js";
import { KindKey } from "../item/index.js";
export interface ItemRoleMap {
    "base:generator": {
        Item: GeneratorItem;
        Args: GeneratorArgs;
        Template: GeneratorTemplate;
    };
    "base:logic": {
        Item: LogicItem;
        Args: LogicArgs;
        Template: LogicTemplate;
    };
    "base:display": {
        Item: DisplayItem;
        Args: DisplayArgs;
        Template: DisplayTemplate;
    };
    "circuit:logic": {
        Item: CircuitItem;
        Args: CircuitArgs;
        Template: CircuitTemplate;
    };
}
export type ItemOfKind<K extends KindKey = KindKey> = ItemRoleMap[K]["Item"];
export type ItemArgsOfKind<K extends KindKey = KindKey> = ItemRoleMap[K]["Args"];
export type TemplateOfKind<K extends KindKey = KindKey> = ItemRoleMap[K]["Template"];
//# sourceMappingURL=itemRoleMap.d.ts.map