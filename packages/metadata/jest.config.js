module.exports = {
  displayName: '@expressive-tea/metadata',
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__test__/**/*.spec.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/__test__/**',
    '!src/types/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.spec.json'
    }]
  },
  moduleNameMapper: {
    '^@classes$': '<rootDir>/src/classes',
    '^@classes/(.*)$': '<rootDir>/src/classes/$1',
    '^@decorators$': '<rootDir>/src/decorators',
    '^@decorators/(.*)$': '<rootDir>/src/decorators/$1',
    '^@helpers$': '<rootDir>/src/helpers',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@types$': '<rootDir>/src/types',
    '^@types/(.*)$': '<rootDir>/src/types/$1'
  }
};
