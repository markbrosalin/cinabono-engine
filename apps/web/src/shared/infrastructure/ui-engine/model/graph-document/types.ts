import { Timestamps } from "../core/entity";

export type GraphDocumentViewport = {
    zoom: number;
    tx: number;
    ty: number;
};

export type GraphDocumentExtensions = Record<string, unknown>;

export type GraphDocumentSnapshot = {
    contentJson: string;
    viewport: GraphDocumentViewport;
    extensions?: GraphDocumentExtensions;
};

export type GraphDocument = Timestamps & {
    formatVersion: number;
    workspaceId: string;
    snapshot: GraphDocumentSnapshot;
};

export type GraphDocumentPatch = Partial<GraphDocumentSnapshot>;
