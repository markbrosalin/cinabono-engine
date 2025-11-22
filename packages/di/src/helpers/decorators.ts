import { DiToken } from "@di/types";
import "reflect-metadata";

export const injectable = (): ClassDecorator => {
    return (target: object) => {
        Reflect.defineMetadata("di:injectable", true, target);
    };
};

export const inject = <T>(token: DiToken<T>): ParameterDecorator => {
    return (target) => {
        const existingTokens = Reflect.getMetadata("di:inject-tokens", target) || [];
        Reflect.defineMetadata("di:inject-tokens", [token, ...existingTokens], target);
    };
};
