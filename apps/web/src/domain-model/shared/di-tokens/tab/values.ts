import { createToken } from "@repo/di/helpers";
import { Id } from "@repo/schema/shared";

export const CurrentTabIdToken = createToken<Id>("CurrentTabId");
