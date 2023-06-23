import { EnforceLimitError } from './enforce-limit.error';

describe('enforce-limit.error', () => {
  test('It should be instance of comparable', () => {
    const error = new EnforceLimitError();

    expect(error instanceof EnforceLimitError).toBe(true);
  });

  test('It should be instance of error', () => {
    const error = new EnforceLimitError();

    expect(error).toBeInstanceOf(Error);
  });
});
