import { ItemLink } from "../link";
import { Id } from "./item";
import { ItemOfKind, ScopeOfKind, TemplateOfKind } from "./maps";

type Get<T> = (id: Id) => T | undefined;

export type Read<T extends "item" | "scope" | "template" | "link"> =
	T extends "item"
		? Get<ItemOfKind>
		: T extends "scope"
			? Get<ScopeOfKind>
			: T extends "link"
				? Get<ItemLink>
				: T extends "template"
					? Get<TemplateOfKind>
					: never;
