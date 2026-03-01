import { resolveDependencyOrder } from "./resolveDependencyOrder";

export type OrderedDependencyDefinition<TName extends string, TRequirement extends string = never> = {
    name: TName;
    after?: readonly TName[];
    requiredDeps?: readonly TRequirement[];
};

type ApplyDependencyDefinitionsOptions<
    TName extends string,
    TRequirement extends string,
    TDefinition extends OrderedDependencyDefinition<TName, TRequirement>,
> = {
    definitions: readonly TDefinition[];
    apply: (definition: TDefinition) => void | (() => void);
    assertDependency?: (name: TRequirement) => void;
};

export const applyDependencyDefinitions = <
    TName extends string,
    TRequirement extends string,
    TDefinition extends OrderedDependencyDefinition<TName, TRequirement>,
>(
    options: ApplyDependencyDefinitionsOptions<TName, TRequirement, TDefinition>,
): Array<() => void> => {
    const ordered = resolveDependencyOrder(
        options.definitions.map((definition) => ({
            name: definition.name,
            deps: definition.after,
            value: definition,
        })),
    ).map((entry) => entry.value);

    const disposers: Array<() => void> = [];

    ordered.forEach((definition) => {
        definition.requiredDeps?.forEach((name) => {
            options.assertDependency?.(name);
        });

        const dispose = options.apply(definition);
        if (typeof dispose === "function") {
            disposers.push(dispose);
        }
    });

    return disposers;
};
