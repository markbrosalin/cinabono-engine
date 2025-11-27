import { hasProps } from "../primitives/guards.js";
import { getItemCategory } from "../shared/helpers.js";
export const isTemplate = (value) => hasProps(value, "hash", "kind", "name");
export const isTemplateOf = (value, kind) => {
    return isTemplate(value) && value.kind === kind;
};
export const isLogicTemplate = (v) => isTemplateOf(v, "base:logic");
export const isGeneratorTemplate = (v) => isTemplateOf(v, "base:generator");
export const isDisplayTemplate = (v) => isTemplateOf(v, "base:display");
export const isCircuitLogicTemplate = (v) => isTemplateOf(v, "circuit:logic");
export const isBaseTemplate = (i) => isTemplate(i) && getItemCategory(i.kind) === "base";
