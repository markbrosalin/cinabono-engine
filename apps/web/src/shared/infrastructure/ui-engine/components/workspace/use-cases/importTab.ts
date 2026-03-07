import type { UseCase, UseCaseResult, WorkspaceTabDocument } from "../../../model";
import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import { workspaceUseCaseIssues } from "./issues";
import type { WorkspaceUseCaseDeps } from "./types";

type WorkspaceImportTabInput = {
    document: WorkspaceTabDocument;
};

type WorkspaceImportTabResult = UseCaseResult<WorkspaceTabDocument>;

export type WorkspaceImportTabUseCase = UseCase<WorkspaceImportTabInput, WorkspaceImportTabResult>;

export const createImportTabUseCase = ({
    query,
    state,
}: Pick<WorkspaceUseCaseDeps, "query" | "state">): WorkspaceImportTabUseCase => {
    return ({ document }) => {
        const rootWorkspaceId = document.session.rootWorkspaceId;
        const rootWorkspace = query.findWorkspace(document.workspaces, rootWorkspaceId);

        if (!rootWorkspace) {
            return createUseCaseErrResult(
                workspaceUseCaseIssues.importRootWorkspaceMissing(
                    ["document", "session", "rootWorkspaceId"],
                    rootWorkspaceId,
                ),
            );
        }

        if (rootWorkspace.kind !== "tab") {
            return createUseCaseErrResult(
                workspaceUseCaseIssues.importRootWorkspaceInvalid(
                    ["document", "session", "rootWorkspaceId"],
                    rootWorkspaceId,
                ),
            );
        }

        const ids = new Set<string>();
        for (const workspace of document.workspaces) {
            if (ids.has(workspace.id)) {
                return createUseCaseErrResult(
                    workspaceUseCaseIssues.importWorkspaceDuplicate(
                        ["document", "workspaces"],
                        workspace.id,
                    ),
                );
            }

            ids.add(workspace.id);
        }

        if (query.hasWorkspace(rootWorkspaceId) || query.hasTabSession(rootWorkspaceId)) {
            return createUseCaseErrResult(
                workspaceUseCaseIssues.tabAlreadyExists(
                    ["document", "session", "rootWorkspaceId"],
                    rootWorkspaceId,
                ),
            );
        }

        state.upsertTabSession(document.session, rootWorkspace);

        document.workspaces
            .filter((workspace) => workspace.id !== rootWorkspaceId)
            .forEach((workspace) => {
                state.upsertWorkspace(workspace);
            });

        return createUseCaseOkResult(document);
    };
};
