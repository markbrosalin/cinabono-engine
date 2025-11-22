import { hasProps } from "../primitives/guards";
import { ItemOfKind } from "../shared";
import { getItemCategory } from "../shared/helpers";
import {
	KindKey,
	Pin,
	WithHash,
	WithInputItems,
	WithInputPins,
	WithOutputItem,
	WithOutputPins,
} from "../shared/item";
import { BaseItem } from "./types";

export const isItem = (value: unknown): value is ItemOfKind =>
	hasProps(value, "id", "hash", "path", "kind", "name");

export const isItemOf = <K extends KindKey>(value: unknown, kind: K): value is ItemOfKind<K> =>
	isItem(value) && value.kind === kind;

export const isLogicItem = (i: unknown) => isItemOf(i, "base:logic");

export const isGeneratorItem = (i: unknown) => isItemOf(i, "base:generator");

export const isDisplayItem = (i: unknown) => isItemOf(i, "base:display");

export const isCircuitItem = (i: unknown) => isItemOf(i, "circuit:logic");

export const isBaseItem = (i: unknown): i is BaseItem =>
	isItem(i) && getItemCategory(i.kind) === "base";

export const hasItemInputPins = <T extends Record<string, unknown>>(
	entity: T
): entity is T & WithInputPins<"item"> => {
	return hasProps(entity, "inputPins");
};

export const hasItemOutputPins = <T extends Record<string, unknown>>(
	entity: T
): entity is T & WithOutputPins<"item"> => {
	return hasProps(entity, "outputPins");
};

export const hasPinInputItems = <T extends Pin>(pin: T): pin is T & WithInputItems => {
	return hasProps(pin, "inputItems");
};

export const hasPinOutputItem = <T extends Pin>(pin: T): pin is T & WithOutputItem => {
	return hasProps(pin, "outputItem");
};

export const isOnePinBaseLogic = <T extends WithHash>(i: T): i is T & { hash: "BUFFER" } => {
	return ["BUFFER", "NOT"].includes(i.hash);
};
