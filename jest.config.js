module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
  },
  reporters: ['default', 'bamboo-jest-reporter'],
  collectCoverage: true,
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     statements: 80,
  //     lines: 80,
  //   },
  // },
  collectCoverageFrom: [
    'src/**/*.{js,vue}',

    '!src/**/index.js', // No need to cover bootstrap file
    '!src/**/main.js', // No need to cover bootstrap file
  ],
  setupFiles: [
    // 'jest-canvas-mock',
    './tests/config/config.js',
    // './src/plugins/index.js',
  ],
  // setupFilesAfterEnv: ['./tests/config/jest.config.js'],
};
