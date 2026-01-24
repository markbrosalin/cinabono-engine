import { decodePortId } from "@gately/shared/infrastructure/UIEngine/adapters/ports";
import { PinSide } from "@gately/shared/infrastructure/UIEngine/types";

export const getPortKind = (portId?: string | null, magnet?: Element | null): PinSide | null => {
    if (portId) return decodePortId(portId).side === "right" ? "output" : "input";
    if (!magnet) return null;
    if (magnet.classList.contains("port-output")) return "output";
    if (magnet.classList.contains("port-input")) return "input";
    return null;
};
