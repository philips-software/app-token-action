module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true,
  coverageThreshold: {
    global: {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": -10
    }
  }
}