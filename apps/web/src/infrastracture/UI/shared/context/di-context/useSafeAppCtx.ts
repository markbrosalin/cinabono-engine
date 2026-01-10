import { useSafeAppDI } from "./useSafeAppDI";
import { AppCtx } from "@gately/domain-model/shared/context-provider/app/types";
import { createResource } from "solid-js";

let cachedCtx: AppCtx | undefined = undefined;

export const useSafeAppCtx = () => {
    const [ctx] = createResource<AppCtx>(
        async () => {
            try {
                const di = useSafeAppDI();
                const ctxProvider = await di.getCtxProvider();
                cachedCtx = cachedCtx ?? (await ctxProvider.get());
                return cachedCtx;
            } catch (err) {
                throw err;
            }
        },
        { initialValue: cachedCtx }
    );

    return ctx;
};
