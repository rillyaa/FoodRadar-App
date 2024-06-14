/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  testMatch: [
    '**/tests/**/*.test.[jt]s?(x)'
  ],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['fake-indexeddb/auto'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest'
  },

  transformIgnorePatterns: [
    '/node_modules/(?!node-fetch)/' // Ignore node_modules except node-fetch
  ],
  // moduleNameMapper: {
  //   '^@web/(test-runner-commands|.*)': '/node_modules/@web/$1/cjs'
  // }
  // Run this module after the test framework has been installed in the environment
  setupFilesAfterEnv: ['@testing-library/dom']
};

module.exports = config;
