/**
 * Error thrown by `enforce-unique` when a unique check fails.
 */
export class EnforceUniqueError extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
