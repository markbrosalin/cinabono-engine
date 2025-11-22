import { hasProps } from "../primitives/guards";
import { KindKey, TemplateOfKind } from "../shared";
import { getItemCategory } from "../shared/helpers";
import { BaseTemplate } from "./types";

export const isTemplate = (value: unknown): value is TemplateOfKind =>
    hasProps(value, "hash", "kind", "name");

export const isTemplateOf = <K extends KindKey>(
    value: unknown,
    kind: K
): value is Extract<TemplateOfKind, { kind: K }> => {
    return isTemplate(value) && value.kind === kind;
};

export const isLogicTemplate = (v: unknown) => isTemplateOf(v, "base:logic");

export const isGeneratorTemplate = (v: unknown) =>
    isTemplateOf(v, "base:generator");

export const isDisplayTemplate = (v: unknown) =>
    isTemplateOf(v, "base:display");

export const isCircuitLogicTemplate = (v: unknown) =>
    isTemplateOf(v, "circuit:logic");

export const isBaseTemplate = (i: unknown): i is BaseTemplate =>
    isTemplate(i) && getItemCategory(i.kind) === "base";
