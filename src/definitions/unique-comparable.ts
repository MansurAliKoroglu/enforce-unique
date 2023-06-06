/**
 * Defines the types that are eligible for uniqueness checks.
 */
export type UniqueComparable = number | string | (UniqueComparable)[] | { [key: string]: UniqueComparable }
