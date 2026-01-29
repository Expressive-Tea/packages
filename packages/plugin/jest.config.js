module.exports = {
  displayName: '@expressive-tea/plugin',
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__test__/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/__test__/**', '!src/index.ts'],
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testTimeout: 10000,
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json'
      }
    ]
  },
  moduleNameMapper: {
    '^@classes$': '<rootDir>/src/classes',
    '^@classes/(.*)$': '<rootDir>/src/classes/$1',
    '^@decorators$': '<rootDir>/src/decorators',
    '^@decorators/(.*)$': '<rootDir>/src/decorators/$1',
    '^@exceptions$': '<rootDir>/src/exceptions',
    '^@exceptions/(.*)$': '<rootDir>/src/exceptions/$1',
    '^@helpers$': '<rootDir>/src/helpers',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@interfaces$': '<rootDir>/src/interfaces',
    '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    '^@types$': '<rootDir>/src/types',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@libs$': '<rootDir>/src/libs',
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@constants$': '<rootDir>/src/constants',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1'
  }
};
