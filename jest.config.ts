import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.spec.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  displayName: 'enforce-unique',
  errorOnDeprecated: true,
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: [
    'ts',
    'js',
    'mjs',
    'cjs',
    'jsx',
    'tsx',
    'json',
    'node',
  ],
  preset: 'ts-jest',
  resetMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['jest-extended/all'],
  showSeed: true,
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
};

export default config;
