import type {
    UIEngineComponentDeps,
    UIEngineContext,
    UIEngineErrorEvent,
} from "../../model/types";
import type { UIEngineSharedServiceGetter, UIEngineSharedServiceName } from "../../shared-services";

export const createComponentRegistry = (ctx: UIEngineContext) => {
    const reportError = (event: UIEngineErrorEvent): void => {
        ctx.external.hooks?.onError?.(event);
    };

    const createScopedSharedServiceGetter = (componentName: string): UIEngineSharedServiceGetter => {
        return ((name: UIEngineSharedServiceName) => {
            if (name === "eventBus") {
                return ctx.getSharedService("eventBus").scope(componentName);
            }

            return ctx.getSharedService(name);
        }) as UIEngineSharedServiceGetter;
    };

    const register = <TExternal extends object, T>(
        name: string,
        factory: (deps: UIEngineComponentDeps<TExternal>) => T,
    ): T => {
        try {
            const component = factory({
                external: ctx.external as UIEngineComponentDeps<TExternal>["external"],
                getSharedService: createScopedSharedServiceGetter(name),
            });
            ctx.external.hooks?.onLifecycle?.({
                type: "component:created",
                name,
            });

            return component;
        } catch (error) {
            reportError({
                label: "component",
                name,
                stage: "create",
                error,
            });
            throw error;
        }
    };

    return {
        register,
    };
};
