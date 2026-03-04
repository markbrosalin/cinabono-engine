export type CatalogValidationPath = Array<string | number>;

export type CatalogValidationIssue = {
    code: string;
    message: string;
    path: CatalogValidationPath;
};

export type CatalogValidationResult<TSubject extends string = string> = {
    ok: boolean;
    subject: TSubject;
    issues: CatalogValidationIssue[];
};
