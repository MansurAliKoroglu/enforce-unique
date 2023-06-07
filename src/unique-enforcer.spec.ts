import { EnforceLimitError } from './errors/enforce-limit.error';
import { UniqueEnforcer } from './unique-enforcer';

describe('unique-enforcer', () => {
  describe('enforce(value)', () => {
    test('It should return the same value back', () => {
      const uniqueEnforcer = new UniqueEnforcer();

      expect(uniqueEnforcer.enforce(1)).toBe(1);
    });

    test('It should throw EnforceUniqueError when called with the same value twice', () => {
      const uniqueEnforcer = new UniqueEnforcer();

      uniqueEnforcer.enforce(1)

      expect(() => {
        uniqueEnforcer.enforce(1)
      }).toThrow();
    });
  });

  describe('enforce(generator)', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('It should return the generated value back', () => {
      const uniqueEnforcer = new UniqueEnforcer();

      expect(uniqueEnforcer.enforce(() => {
        return 2;
      })).toBe(2);
    });

    test('It should throw EnforceLimitError after some tries even if no option is provided', async () => {
      jest.setSystemTime(1);

      const uniqueEnforcer = new UniqueEnforcer();

      uniqueEnforcer.enforce(2);

      expect(() => {
        uniqueEnforcer.enforce(() => {
          return 2;
        });
      }).toThrowError(EnforceLimitError);
    });

    test('It should throw EnforceLimitError after 50 milliseconds even if no option is provided', () => {
      jest.setSystemTime(1000);

      const uniqueEnforcer = new UniqueEnforcer();

      uniqueEnforcer.enforce(2);

      expect(() => {
        uniqueEnforcer.enforce(() => {
          jest.setSystemTime(1051);

          return 2;
        });
      }).toThrowError(EnforceLimitError);
    });

    test('It should throw EnforceLimitError after maxRetries provided by options', () => {
      jest.setSystemTime(1);

      const uniqueEnforcer = new UniqueEnforcer();

      uniqueEnforcer.enforce(2);

      expect(() => {
        uniqueEnforcer.enforce(
          () => {
            return 2;
          },
          {
            maxRetries: 1
          },
        );
      }).toThrowError(EnforceLimitError);
    });

    test('It should throw EnforceLimitError after maxTime provided by options', () => {
      jest.setSystemTime(1000);

      const uniqueEnforcer = new UniqueEnforcer();

      uniqueEnforcer.enforce(2);

      expect(() => {
        uniqueEnforcer.enforce(
          () => {
            jest.setSystemTime(6001);

            return 2;
          },
          {
            maxTime: 5000,
          }
        );
      }).toThrowError(EnforceLimitError);
    });
  });
});
