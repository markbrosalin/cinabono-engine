export const hasProps = <K extends PropertyKey>(
  obj: unknown,
  ...keys: K[]
): obj is Record<K, unknown> =>
  typeof obj === "object" && obj !== null && keys.every((key) => key in obj);
