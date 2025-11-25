import "reflect-metadata";
export const injectable = () => {
    return (target) => {
        Reflect.defineMetadata("di:injectable", true, target);
    };
};
export const inject = (token) => {
    return (target) => {
        const existingTokens = Reflect.getMetadata("di:inject-tokens", target) || [];
        Reflect.defineMetadata("di:inject-tokens", [token, ...existingTokens], target);
    };
};
