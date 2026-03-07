import type { Workspace } from "@gately/shared/infrastructure/ui-engine/model";
import type { UseCase, UseCaseResult } from "../../../model";
import { createUseCaseErrResult, createUseCaseOkResult } from "../../../model";
import { workspaceUseCaseIssues } from "./issues";
import type { WorkspaceUseCaseDeps } from "./types";

type WorkspaceUpdateTitleInput = {
    workspaceId: string;
    title: string;
};

type WorkspaceUpdateTitleResult = UseCaseResult<Workspace>;

export type WorkspaceUpdateTitleUseCase = UseCase<
    WorkspaceUpdateTitleInput,
    WorkspaceUpdateTitleResult
>;

export const createUpdateTitleUseCase = ({
    query,
    state,
}: Pick<WorkspaceUseCaseDeps, "query" | "state">): WorkspaceUpdateTitleUseCase => {
    return ({ workspaceId, title }) => {
        const trimmedTitle = title.trim();
        if (trimmedTitle.length === 0) {
            return createUseCaseErrResult(
                workspaceUseCaseIssues.workspaceTitleRequired(["title"]),
            );
        }

        const workspace = query.getWorkspace(workspaceId);
        if (!workspace) {
            return createUseCaseErrResult(
                workspaceUseCaseIssues.workspaceNotFound(["workspaceId"], workspaceId),
            );
        }

        state.setWorkspaceTitle(workspaceId, trimmedTitle);

        return createUseCaseOkResult(
            query.getWorkspace(workspaceId) ?? {
                ...workspace,
                title: trimmedTitle,
            },
        );
    };
};
