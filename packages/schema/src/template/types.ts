import { WithOptions } from "../shared";
import { WithHash, WithState } from "../shared/item/aspects";
import { WithInnerItemsMap } from "../shared/item/inner-items";
import { WithInOutPins } from "../shared/item/inOutPins";
import { WithMeta } from "../shared/item/meta";
import { KindKey } from "../shared/item/types";

export type Template<K extends KindKey = KindKey> = WithHash &
    WithState<K> &
    WithMeta<K> &
    WithOptions<K> &
    WithInOutPins<K, "template"> &
    WithInnerItemsMap<K>;

export type GeneratorTemplate = Template<"base:generator">;
export type LogicTemplate = Template<"base:logic">;
export type DisplayTemplate = Template<"base:display">;
export type CircuitTemplate = Template<"circuit:logic">;

export type BaseTemplate = GeneratorTemplate | LogicTemplate | DisplayTemplate;
