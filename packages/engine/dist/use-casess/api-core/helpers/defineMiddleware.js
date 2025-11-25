export const defineMiddleware = (name = "", mw) => {
    mw.__meta__ = { mwName: name };
    return mw;
};
