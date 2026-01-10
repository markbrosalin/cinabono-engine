import { CacheValueControls } from "@repo/entities-runtime/async-cache";
import { AppCtx } from "./types";

export interface AppCtxProviderContract extends CacheValueControls<AppCtx> {}
