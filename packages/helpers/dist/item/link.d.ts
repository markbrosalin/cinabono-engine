import { Id, ItemLink, PinIndex } from "@cnbn/schema";
export declare function buildLinkId(fromItemId: Id, fromPin: PinIndex, toItemId: Id, toPin: PinIndex): string;
export declare function buildLinkId(link: ItemLink): string;
export declare const parseLinkId: (id: string) => ItemLink;
export declare const buildLink: (fromItemId: Id, fromPin: PinIndex, toItemId: Id, toPin: PinIndex) => ItemLink;
//# sourceMappingURL=link.d.ts.map