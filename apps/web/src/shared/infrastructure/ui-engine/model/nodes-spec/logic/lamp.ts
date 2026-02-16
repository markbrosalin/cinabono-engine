import type { BaseLogicSpec } from ".";
import { LAMP_ICON_PATH } from "@gately/shared/infrastructure/ui-engine/lib/nodes";

export const LAMP_SPEC: BaseLogicSpec = {
    hash: "LAMP",
    nodeName: "lamp",
    iconPath: LAMP_ICON_PATH,
    minWidth: 34,
    minHeight: 66,
};
