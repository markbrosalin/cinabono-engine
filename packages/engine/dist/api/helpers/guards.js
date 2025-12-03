import { isDiToken } from "okee-di-container";
import { hasProps } from "@cnbn/schema";
export const isPublicApi = (entry) => {
    return !!entry.visibility && entry.visibility === "public";
};
export const isApiToken = (data) => {
    return isDiToken(data) && hasProps(data, "visibility");
};
