export const diConfig = (cfg) => cfg;
export const diToken = (name, extra) => Object.assign({ id: Symbol(name), name }, extra);
