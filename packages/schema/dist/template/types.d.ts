import { WithOptions } from "../shared/index.js";
import { WithHash, WithState } from "../shared/item/aspects.js";
import { WithInnerItemsMap } from "../shared/item/inner-items.js";
import { WithInOutPins } from "../shared/item/inOutPins.js";
import { WithMeta } from "../shared/item/meta.js";
import { KindKey } from "../shared/item/types.js";
export type Template<K extends KindKey = KindKey> = WithHash & WithState<K> & WithMeta<K> & WithOptions<K> & WithInOutPins<K, "template"> & WithInnerItemsMap<K>;
export type GeneratorTemplate = Template<"base:generator">;
export type LogicTemplate = Template<"base:logic">;
export type DisplayTemplate = Template<"base:display">;
export type CircuitTemplate = Template<"circuit:logic">;
export type BaseTemplate = GeneratorTemplate | LogicTemplate | DisplayTemplate;
//# sourceMappingURL=types.d.ts.map