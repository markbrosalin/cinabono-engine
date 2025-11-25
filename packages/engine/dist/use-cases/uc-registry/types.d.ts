import { ExecutorToolContract } from "../tools";
import { DefaultUseCasesTree } from "./public-uc-map";
export type DefaultEngineUCTree = typeof DefaultUseCasesTree;
export interface EngineUseCases extends InstantiateTree<DefaultEngineUCTree> {}
export type UCCtor = new (...args: any[]) => BaseUC;
export type BaseUC = {
    run: (...payload: any[]) => any;
    name: string;
    get runWithExecutor(): ExecutorToolContract["execute"];
};
type Bind<F> = F extends (...args: any[]) => any ? OmitThisParameter<F> : never;
type RunFunctionOfCtor<I> = I extends UCCtor
    ? InstanceType<I> extends {
          run: infer F;
      }
        ? Bind<F>
        : never
    : never;
export type InstantiateTree<T> = {
    [K in keyof T]: T[K] extends UCCtor
        ? RunFunctionOfCtor<T[K]>
        : T[K] extends object
          ? InstantiateTree<T[K]>
          : never;
};
export type UCTree = {
    [k: string]: UCCtor | UCTree;
};
export {};
//# sourceMappingURL=types.d.ts.map
