import { ItemLink, MakeOptional, Id, CustomTemplateInnerItem } from "@repo/schema";

type ExternalRole = "input" | "output";

export type LinkNoId = Omit<ItemLink, "id">;
export type NormalizedLink = MakeOptional<LinkNoId, "toPin">;

export type PathsToOutputs = Record<number, string[][]>;
export type AssignedRoles = Record<Id, { externalRole: ExternalRole; externalPin: number }[]>;

export type BFSQueue = {
    id: string;
    outputPin: number;
    path: string[];
    externalPin: number;
}[];

export type NormalizedCustomTemplateInnerItem = Omit<
    CustomTemplateInnerItem,
    "inputLinks" | "outputLinks"
> & {
    inputLinks?: Record<number, string>;
    outputLinks?: Record<number, string[]>;
    external?: { externalRole: "input" | "output"; externalPin: number }[];
    pathsToOutputs?: PathsToOutputs;
};
