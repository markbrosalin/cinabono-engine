import { createCatalogValidationIssue } from "../../helpers/createValidationIssue";

export const catalogValidationIssueDefs = {
    createdAtInvalid: {
        code: "catalog.timestamps.createdAt.invalid",
        message: "createdAt must be a positive finite number.",
    },
    updatedAtInvalid: {
        code: "catalog.timestamps.updatedAt.invalid",
        message: "updatedAt must be a positive finite number when provided.",
    },
    refLibraryIdRequired: {
        code: "catalog.ref.libraryId.required",
        message: "libraryId is required.",
    },
    refPathInvalid: {
        code: "catalog.ref.path.invalid",
        message: "path must be an array.",
    },
    refPathSegmentInvalid: {
        code: "catalog.ref.path.segment.invalid",
        message: "path segments must be non-empty strings.",
    },
    refItemNameRequired: {
        code: "catalog.ref.itemName.required",
        message: "itemName is required.",
    },
    itemNameRequired: {
        code: "catalog.item.meta.name.required",
        message: "Item name is required.",
    },
    itemLayoutWidthInvalid: {
        code: "catalog.item.layout.width.invalid",
        message: "layout.width must be a positive finite number.",
    },
    itemLayoutHeightInvalid: {
        code: "catalog.item.layout.height.invalid",
        message: "layout.height must be a positive finite number.",
    },
    itemLogicModuleMissing: {
        code: "catalog.item.module.logic.missing",
        message: 'Logic items must include a "logic" or "composition" module.',
    },
    itemModuleUnsupported: {
        code: "catalog.item.module.unsupported",
    },
    itemLogicExecutorRequired: {
        code: "catalog.item.module.logic.executor.required",
        message: "logic.executor is required.",
    },
    itemPortIdRequired: {
        code: "catalog.item.module.ports.item-id.required",
        message: "Port id is required.",
    },
    itemPortIdDuplicate: {
        code: "catalog.item.module.ports.item-id.duplicate",
    },
    itemInteractionHandlerRequired: {
        code: "catalog.item.module.interaction.handler.required",
        message: "interaction.handler is required.",
    },
    itemTimingRiseInvalid: {
        code: "catalog.item.module.timing.rise.invalid",
        message: "timing.rise must be a non-negative finite number.",
    },
    itemTimingFallInvalid: {
        code: "catalog.item.module.timing.fall.invalid",
        message: "timing.fall must be a non-negative finite number.",
    },
    itemCompositionInnerItemIdRequired: {
        code: "catalog.item.module.composition.inner-item.id.required",
        message: "composition inner item id is required.",
    },
    itemCompositionInnerItemIdDuplicate: {
        code: "catalog.item.module.composition.inner-item.id.duplicate",
    },
    itemCompositionOuterPortIdRequired: {
        code: "catalog.item.module.composition.outer-port-id.required",
        message: "composition outerPortId is required.",
    },
    itemCompositionTargetsRequired: {
        code: "catalog.item.module.composition.targets.required",
        message: "composition input binding must contain at least one target.",
    },
    itemCompositionBoundaryInputsInvalid: {
        code: "catalog.item.module.composition.boundary.inputs.invalid",
        message: "composition boundary.inputs must be an array.",
    },
    itemCompositionBoundaryOutputsInvalid: {
        code: "catalog.item.module.composition.boundary.outputs.invalid",
        message: "composition boundary.outputs must be an array.",
    },
    itemCompositionBoundaryPositionXInvalid: {
        code: "catalog.item.module.composition.boundary.position.x.invalid",
        message: "composition boundary position.x must be a finite number.",
    },
    itemCompositionBoundaryPositionYInvalid: {
        code: "catalog.item.module.composition.boundary.position.y.invalid",
        message: "composition boundary position.y must be a finite number.",
    },
    itemCompositionPinItemIdRequired: {
        code: "catalog.item.module.composition.pin-ref.item-id.required",
        message: "composition pin ref itemId is required.",
    },
    itemCompositionPinItemMissing: {
        code: "catalog.item.module.composition.pin-ref.item-id.missing",
    },
    itemCompositionPinPortIdRequired: {
        code: "catalog.item.module.composition.pin-ref.port-id.required",
        message: "composition pin ref portId is required.",
    },
    libraryFormatVersionInvalid: {
        code: "catalog.library.format-version.invalid",
    },
    libraryManifestIdRequired: {
        code: "catalog.library.manifest.id.required",
        message: "Library id is required.",
    },
    libraryManifestNameRequired: {
        code: "catalog.library.manifest.name.required",
        message: "Library name is required.",
    },
    libraryManifestVersionRequired: {
        code: "catalog.library.manifest.version.required",
        message: "Library version is required.",
    },
    libraryItemLibraryMismatch: {
        code: "catalog.library.item.library-mismatch",
    },
    libraryItemDuplicateRef: {
        code: "catalog.library.item.duplicate-ref",
        message: "Duplicate item reference within the library.",
    },
    documentFormatVersionInvalid: {
        code: "catalog.document.format-version.invalid",
    },
    documentLibraryDuplicate: {
        code: "catalog.document.library.duplicate",
    },
} as const;

export const catalogValidationIssues = {
    createdAtInvalid: (path: Array<string | number>) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.createdAtInvalid, [
            ...path,
            "createdAt",
        ]),
    updatedAtInvalid: (path: Array<string | number>) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.updatedAtInvalid, [
            ...path,
            "updatedAt",
        ]),
    refLibraryIdRequired: (path: Array<string | number> = []) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.refLibraryIdRequired, [
            ...path,
            "libraryId",
        ]),
    refPathInvalid: (path: Array<string | number> = []) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.refPathInvalid, [...path, "path"]),
    refPathSegmentInvalid: (path: Array<string | number>, index: number) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.refPathSegmentInvalid, [
            ...path,
            "path",
            index,
        ]),
    refItemNameRequired: (path: Array<string | number> = []) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.refItemNameRequired, [
            ...path,
            "itemName",
        ]),
    itemNameRequired: (path: Array<string | number> = []) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.itemNameRequired, [
            ...path,
            "meta",
            "name",
        ]),
    itemLayoutWidthInvalid: (path: Array<string | number> = []) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.itemLayoutWidthInvalid, [
            ...path,
            "layout",
            "width",
        ]),
    itemLayoutHeightInvalid: (path: Array<string | number> = []) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.itemLayoutHeightInvalid, [
            ...path,
            "layout",
            "height",
        ]),
    itemLogicModuleMissing: (path: Array<string | number> = []) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.itemLogicModuleMissing, [
            ...path,
            "modules",
        ]),
    itemModuleUnsupported: (path: Array<string | number>, moduleType: string, itemKind: string) =>
        createCatalogValidationIssue(
            {
                ...catalogValidationIssueDefs.itemModuleUnsupported,
                message: `Module "${moduleType}" is not supported for item kind "${itemKind}".`,
            },
            [...path, "type"],
        ),
    itemLogicExecutorRequired: (path: Array<string | number>) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.itemLogicExecutorRequired, [
            ...path,
            "config",
            "executor",
        ]),
    itemPortIdRequired: (path: Array<string | number>, index: number) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.itemPortIdRequired, [
            ...path,
            "config",
            "items",
            index,
            "id",
        ]),
    itemPortIdDuplicate: (path: Array<string | number>, index: number, portId: string) =>
        createCatalogValidationIssue(
            {
                ...catalogValidationIssueDefs.itemPortIdDuplicate,
                message: `Duplicate port id "${portId}".`,
            },
            [...path, "config", "items", index, "id"],
        ),
    itemInteractionHandlerRequired: (path: Array<string | number>) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.itemInteractionHandlerRequired, [
            ...path,
            "config",
            "handler",
        ]),
    itemTimingRiseInvalid: (path: Array<string | number>) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.itemTimingRiseInvalid, [
            ...path,
            "config",
            "rise",
        ]),
    itemTimingFallInvalid: (path: Array<string | number>) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.itemTimingFallInvalid, [
            ...path,
            "config",
            "fall",
        ]),
    itemCompositionInnerItemIdRequired: (path: Array<string | number>, index: number) =>
        createCatalogValidationIssue(
            catalogValidationIssueDefs.itemCompositionInnerItemIdRequired,
            [...path, "config", "items", index, "id"],
        ),
    itemCompositionInnerItemIdDuplicate: (
        path: Array<string | number>,
        index: number,
        itemId: string,
    ) =>
        createCatalogValidationIssue(
            {
                ...catalogValidationIssueDefs.itemCompositionInnerItemIdDuplicate,
                message: `Duplicate composition inner item id "${itemId}".`,
            },
            [...path, "config", "items", index, "id"],
        ),
    itemCompositionOuterPortIdRequired: (path: Array<string | number>) =>
        createCatalogValidationIssue(
            catalogValidationIssueDefs.itemCompositionOuterPortIdRequired,
            [...path, "outerPortId"],
        ),
    itemCompositionTargetsRequired: (path: Array<string | number>) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.itemCompositionTargetsRequired, [
            ...path,
            "targets",
        ]),
    itemCompositionBoundaryInputsInvalid: (path: Array<string | number>) =>
        createCatalogValidationIssue(
            catalogValidationIssueDefs.itemCompositionBoundaryInputsInvalid,
            [...path, "config", "boundary", "inputs"],
        ),
    itemCompositionBoundaryOutputsInvalid: (path: Array<string | number>) =>
        createCatalogValidationIssue(
            catalogValidationIssueDefs.itemCompositionBoundaryOutputsInvalid,
            [...path, "config", "boundary", "outputs"],
        ),
    itemCompositionBoundaryPositionXInvalid: (path: Array<string | number>) =>
        createCatalogValidationIssue(
            catalogValidationIssueDefs.itemCompositionBoundaryPositionXInvalid,
            [...path, "position", "x"],
        ),
    itemCompositionBoundaryPositionYInvalid: (path: Array<string | number>) =>
        createCatalogValidationIssue(
            catalogValidationIssueDefs.itemCompositionBoundaryPositionYInvalid,
            [...path, "position", "y"],
        ),
    itemCompositionPinItemIdRequired: (path: Array<string | number>) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.itemCompositionPinItemIdRequired, [
            ...path,
            "itemId",
        ]),
    itemCompositionPinItemMissing: (path: Array<string | number>, itemId: string) =>
        createCatalogValidationIssue(
            {
                ...catalogValidationIssueDefs.itemCompositionPinItemMissing,
                message: `Composition pin ref points to missing inner item "${itemId}".`,
            },
            [...path, "itemId"],
        ),
    itemCompositionPinPortIdRequired: (path: Array<string | number>) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.itemCompositionPinPortIdRequired, [
            ...path,
            "portId",
        ]),
    libraryFormatVersionInvalid: (path: Array<string | number> = [], value: unknown) =>
        createCatalogValidationIssue(
            {
                ...catalogValidationIssueDefs.libraryFormatVersionInvalid,
                message: `Unsupported library format version "${String(value)}".`,
            },
            [...path, "formatVersion"],
        ),
    libraryManifestIdRequired: (path: Array<string | number> = []) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.libraryManifestIdRequired, [
            ...path,
            "manifest",
            "id",
        ]),
    libraryManifestNameRequired: (path: Array<string | number> = []) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.libraryManifestNameRequired, [
            ...path,
            "manifest",
            "name",
        ]),
    libraryManifestVersionRequired: (path: Array<string | number> = []) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.libraryManifestVersionRequired, [
            ...path,
            "manifest",
            "version",
        ]),
    libraryItemLibraryMismatch: (
        path: Array<string | number>,
        expectedLibraryId: string,
        index: number,
    ) =>
        createCatalogValidationIssue(
            {
                ...catalogValidationIssueDefs.libraryItemLibraryMismatch,
                message: `Item must reference library "${expectedLibraryId}".`,
            },
            [...path, "items", index, "ref", "libraryId"],
        ),
    libraryItemDuplicateRef: (path: Array<string | number>, index: number) =>
        createCatalogValidationIssue(catalogValidationIssueDefs.libraryItemDuplicateRef, [
            ...path,
            "items",
            index,
            "ref",
        ]),
    documentFormatVersionInvalid: (path: Array<string | number> = [], value: unknown) =>
        createCatalogValidationIssue(
            {
                ...catalogValidationIssueDefs.documentFormatVersionInvalid,
                message: `Unsupported catalog format version "${String(value)}".`,
            },
            [...path, "formatVersion"],
        ),
    documentLibraryDuplicate: (path: Array<string | number>, index: number, libraryId: string) =>
        createCatalogValidationIssue(
            {
                ...catalogValidationIssueDefs.documentLibraryDuplicate,
                message: `Duplicate library id "${libraryId}".`,
            },
            [...path, "libraries", index, "manifest", "id"],
        ),
} as const;
