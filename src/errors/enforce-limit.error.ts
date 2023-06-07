/**
 * Error thrown by `enforce` method when a time or retry limit exceeded.
 */
export class EnforceLimitError extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
