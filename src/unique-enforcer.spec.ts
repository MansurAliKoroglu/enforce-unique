import { UniqueEnforcer } from './unique-enforcer';

describe('unique-enforcer', () => {
  describe('enforce', () => {
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
    })
  })
});
