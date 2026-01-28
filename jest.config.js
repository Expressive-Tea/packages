module.exports = {
  projects: ['<rootDir>/packages/commons', '<rootDir>/packages/plugin'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'packages/*/src/**/*.ts',
    '!packages/**/src/**/*.d.ts',
    '!packages/**/src/__test__/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
