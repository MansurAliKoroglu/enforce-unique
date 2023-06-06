import { UniqueComparable } from './definitions/unique-comparable';
import { EnforceUniqueError } from './errors/enforce-unique.error';

/**
 * Class that can be used to enforce unique values.
 *
 * @example
 *
 * const uniqueEnforcer = new UniqueEnforcer();
 *
 * const firstEmail = uniqueEnforcer.enforce(faker.internet.email())
 *
 * // You can be sure that secondEmail will always be different than firstEmail
 * const secondEmail = uniqueEnforcer.enforce(faker.internet.email())
 */
export class UniqueEnforcer {
  private store: string[] = [];

  /**
   * Function that can be used to enforce unique values.
   *
   * It accepts a value and returns it back if same value is not used before.
   * If the same value used before, it throws an {@link EnforceUniqueError}.
   *
   *
   * @param value The value to enforce uniqueness.
   * @returns The same `value`
   * @throws {EnforceUniqueError} If the value used before.
   *
   * @example
   *
   * const uniqueEnforcer = new UniqueEnforcer();
   *
   * const firstEmail = uniqueEnforcer.enforce(faker.internet.email())
   *
   * // You can be sure that secondEmail will always be different than firstEmail.
   * // If faker.internet.email() returns the same value, `EnforceUniqueError` will be thrown.
   * const secondEmail = uniqueEnforcer.enforce(faker.internet.email())
   */
  enforce<T extends UniqueComparable>(value: T) {
    const stringifiedValue = JSON.stringify(value)

    if (this.store.includes(stringifiedValue)) {
      throw new EnforceUniqueError();
    }

    this.store.push(stringifiedValue);

    return value;
  }
}
