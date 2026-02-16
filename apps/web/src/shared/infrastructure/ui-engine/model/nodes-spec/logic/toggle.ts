import type { BaseLogicSpec } from ".";
import { TOGGLE_ICON_OFF_PATH } from "@gately/shared/infrastructure/ui-engine/lib/nodes";

export const TOGGLE_SPEC: BaseLogicSpec = {
    hash: "TOGGLE",
    nodeName: "toggle",
    iconPath: TOGGLE_ICON_OFF_PATH,
    minWidth: 34,
    minHeight: 34,
};
