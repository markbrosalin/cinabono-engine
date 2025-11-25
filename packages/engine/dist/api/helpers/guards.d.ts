import { ApiToken } from "../../api/types";
export declare const isPublicApi: <T extends Pick<ApiToken, "visibility">>(entry: T) => boolean;
export declare const isApiToken: (data: unknown) => data is ApiToken;
//# sourceMappingURL=guards.d.ts.map