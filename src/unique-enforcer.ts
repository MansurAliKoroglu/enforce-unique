import { EnforceOptions } from './definitions/enforce-options';
import { UniqueComparable } from './definitions/unique-comparable';
import { EnforceLimitError } from './errors/enforce-limit.error';
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
  private store = new Set<string>();

  /**
   * Function that can be used to enforce unique values.
   *
   * It accepts a value and returns it back if same value is not used before.
   * If the same value used before, it throws an {@link EnforceUniqueError}.
   *
   * @param value The value to enforce uniqueness.
   * @returns The same `value`
   * @throws `EnforceUniqueError` If the value used before.
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
  enforce<T extends UniqueComparable>(value: T): T;

  /**
   * Function that can be used to enforce unique values.
   *
   * It accepts a value generator function, runs it to generate the value and returns it back if same value is not used before.
   * If the same value used before, it tries again until limits are exceeded.
   * It throws an {@link EnforceLimitError} when limits are exceeded.
   *
   * Limits can be configured with options parameter.
   *
   * @param generator Function to generate a value
   * @param options {@link EnforceOptions}
   * @returns The generated value
   * @throws `EnforceLimitError` If limits are exceeded and no unique value generated from the generator.
   *
   * @example
   *
   * const uniqueEnforcer = new UniqueEnforcer();
   *
   * function generateRandomNumber(): number {
   *   return Math.floor(Math.random() * 5) + 1;
   * }
   *
   * // You can be sure that num1 and num2 will be unique
   * const num1 = uniqueEnforcer.enforce(generateRandomNumber);
   * const num2 = uniqueEnforcer.enforce(generateRandomNumber);
   */
  enforce<T extends UniqueComparable>(generator: () => T, options?: EnforceOptions): T;
  enforce<T extends UniqueComparable>(valueOrGenerator: T | (() => T), options: EnforceOptions = {
    maxRetries: 50,
    maxTime: 50,
  }) {
    const { maxTime = 50, maxRetries = 50 } = options;

    let value;

    if (typeof valueOrGenerator === 'function') {
      const startTime = new Date().getTime();
      let retries = 0;

      while (true) {
        if (new Date().getTime() - startTime > maxTime || retries > maxRetries) {
          throw new EnforceLimitError();
        }

        value = valueOrGenerator();

        const stringifiedValue = JSON.stringify(value);

        if (!this.store.has(stringifiedValue)) {
          break;
        }

        retries++;
      }
    } else {
      value = valueOrGenerator;

      const stringifiedValue = JSON.stringify(value);

      if (this.store.has(stringifiedValue)) {
        throw new EnforceUniqueError();
      }
    }

    this.store.add(JSON.stringify(value));

    return value;
  }
}
