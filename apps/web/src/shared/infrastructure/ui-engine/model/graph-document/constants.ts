import type { GraphDocumentSnapshot, GraphDocumentViewport } from "./types";

export const GRAPH_DOCUMENT_FORMAT_VERSION = 1;

export const DEFAULT_GRAPH_DOCUMENT_VIEWPORT: GraphDocumentViewport = {
    zoom: 1,
    tx: 0,
    ty: 0,
};

export const DEFAULT_GRAPH_DOCUMENT_SNAPSHOT: GraphDocumentSnapshot = {
    contentJson: "",
    viewport: { ...DEFAULT_GRAPH_DOCUMENT_VIEWPORT },
};
