import { Token } from "@repo/di";

export interface ContainerManagerContract {
    init(): Promise<void>;

    ready(): Promise<void>;

    resolve<T>(token: Token<T>): Promise<T>;
}
