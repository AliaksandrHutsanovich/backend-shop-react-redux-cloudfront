const config = require('./jest.config');

config.testMatch = [
  '**/test/?(*)-test.js',
];
config.setupFilesAfterEnv = ['<rootDir>/config/jest.setup.js'];

console.log('RUNNING UNIT TESTS...');

module.exports = config;
