import { KindKey, TemplateOfKind } from "@cnbn/schema";

const makeBaseEntry = <K extends KindKey>(
    kind: K,
    name: string,
    args?: Partial<TemplateOfKind<K>>
): TemplateOfKind<K> => {
    return {
        hash: name,
        name,
        kind,
        ...args,
    } as TemplateOfKind<K>;
};

export const makeBaseLogicEntry = (
    name: string,
    args?: Partial<TemplateOfKind<"base:logic">>
): TemplateOfKind<"base:logic"> => {
    return makeBaseEntry("base:logic", name, args);
};

export const makeBaseGeneratorEntry = (
    name: string,
    args?: Partial<TemplateOfKind<"base:generator">>
): TemplateOfKind<"base:generator"> => {
    return makeBaseEntry("base:generator", name, args);
};

export const makeBaseDisplayEntry = (
    name: string,
    args?: Partial<TemplateOfKind<"base:display">>
): TemplateOfKind<"base:display"> => {
    return makeBaseEntry("base:display", name, args);
};
