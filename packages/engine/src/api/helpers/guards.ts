import { ApiToken } from "@engine/api/types";
import { isDiToken } from "okee-di-container";
import { hasProps } from "@cnbn/schema";

export const isPublicApi = <T extends Pick<ApiToken, "visibility">>(entry: T): boolean => {
    return !!entry.visibility && entry.visibility === "public";
};

export const isApiToken = (data: unknown): data is ApiToken => {
    return isDiToken(data) && hasProps(data, "visibility");
};
