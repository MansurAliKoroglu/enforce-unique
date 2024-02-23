import { UniqueComparable } from './unique-comparable';

/**
 * Defines the options that can be used in `enforce` function.
 */
export interface EnforceOptions {
  /**
   * The time in milliseconds this method may take before throwing an {@link EnforceLimitError}.
   *
   * @default 50
   */
  maxTime?: number;

  /**
   * The total number of attempts to try before throwing an {@link EnforceLimitError}.
   *
   * @default 50
   */
  maxRetries?: number;

  /**
   * Exclude specific value(s) from being returned.
   *
   * @default []
   */
  exclude?: UniqueComparable[];
};
