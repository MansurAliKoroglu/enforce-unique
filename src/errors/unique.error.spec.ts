import { EnforceUniqueError } from './enforce-unique.error';

describe('enforce-unique.error', () => {
  test('It should be instance of comparable', () => {
    const error = new EnforceUniqueError();

    expect(error instanceof EnforceUniqueError).toBe(true);
  });

  test('It should be instance of error', () => {
    const error = new EnforceUniqueError();

    expect(error).toBeInstanceOf(Error);
  });
});
