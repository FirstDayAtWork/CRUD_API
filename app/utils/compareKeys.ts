import { isKeyOfType } from './isKeyOfType.ts';

export function isValidObject<T extends object, U extends object>(obj1: T, obj2: U) {
  const array1 = Object.keys(obj1);
  const array2 = Object.keys(obj2).filter((item) => item !== 'id');

  if (array1.length !== array2.length) return false;

  if (!obj1['username' as keyof T] || !(typeof obj1['username' as keyof T] === 'string')) {
    return false;
  }

  if (!obj1['age' as keyof T] || !(typeof obj1['age' as keyof T] === 'number')) {
    return false;
  }

  if (
    !obj1['hobbies' as keyof T] ||
    !Array.isArray(obj1['hobbies' as keyof T]) ||
    (Array.isArray(obj1['hobbies' as keyof T]) &&
      (obj1['hobbies' as keyof T] as []).length > 0 &&
      (obj1['hobbies' as keyof T] as []).some((item) => typeof item !== 'string'))
  ) {
    return false;
  }

  return true;
}

export function isValidKeys<T extends object, U extends object>(obj1: T, obj2: U) {
  return !Object.keys(obj1).some((item) => !isKeyOfType(obj2, item));
}
