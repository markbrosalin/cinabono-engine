import { ApiFactories } from "@engine/api";

export const WrapperExample = ApiFactories.wrapper("example-wrapper", (ctx, next) => {
    console.log("Before wrapper logic");
    const result = next();
    console.log("After wrapper logic");
    return result;
});
