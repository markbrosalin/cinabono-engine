export const isApiCtor = (x) => typeof x === "function" && Reflect.construct(String, [], x);
export const isApiFunc = (x) => typeof x === "function" && !Reflect.construct(String, [], x);
