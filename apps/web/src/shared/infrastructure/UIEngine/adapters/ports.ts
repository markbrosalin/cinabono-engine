import { SIGNAL_CLASSES, type SignalClass, toSignalClass } from "@gately/shared/lib/signal";
import type { LogicValue } from "@cnbn/schema";
import type { PinRef, PinSide, PortSide } from "../types";

export const encodePortId = (config: { side: PortSide; id: string }): string => {
    const sideCode = config.side === "left" ? "L" : "R";
    return `${sideCode}:${config.id}`;
};

export const decodePortId = (portId: string): { side: PortSide; id: string } => {
    const [sideCode, id] = portId.split(":");
    const side = sideCode === "R" ? "right" : "left";
    return { side, id: id ?? portId };
};

export const pinRefToPortId = (pinRef: PinRef): string =>
    encodePortId({
        side: pinRef.side === "input" ? "left" : "right",
        id: pinRef.index,
    });

export const portIdToPinRef = (portId: string): PinRef => {
    const { side, id } = decodePortId(portId);
    return { side: side === "left" ? "input" : "output", index: id };
};

export const resolveSignalClass = (value?: LogicValue | null): SignalClass => toSignalClass(value);

export const buildPortClass = (side: PinSide, signalClass: SignalClass): string => {
    const base = side === "input" ? "port port-input" : "port port-output";
    return `${base} ${signalClass}`;
};

export const stripSignalClasses = (className?: string): string => {
    if (!className) return "";
    const tokens = className.split(/\s+/).filter(Boolean);
    const filtered = tokens.filter((token) => !SIGNAL_CLASSES.includes(token as SignalClass));
    return filtered.join(" ");
};
