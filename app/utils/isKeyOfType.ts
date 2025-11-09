export function isKeyOfType<T extends object>(
  object: T,
  key: string | number | symbol,
): key is keyof T {
  return key in object;
}
