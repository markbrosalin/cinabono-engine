export const isDiConfig = (obj) => {
    return (typeof obj === "object" &&
        obj !== null &&
        "token" in obj &&
        ("useValue" in obj || "useClass" in obj || "useFactory" in obj));
};
export const isDiToken = (data) => {
    return data !== null && typeof data === "object" && "name" in data && "id" in data;
};
