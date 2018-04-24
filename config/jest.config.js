const path = require('path')

module.exports = {
  roots: [
    '<rootDir>',
    path.resolve('samples'),
    path.resolve('packages')
  ],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': path.resolve('config/jest/__mocks__/styleMock.js'),
    '^.+\\.(svg)$': path.resolve('config/jest/__mocks__/fileMock.js'),
  },
  setupFiles: [
    path.resolve('config/jest/setupEnzyme.js'),
  ],
  setupTestFrameworkScriptFile: path.resolve('node_modules/jest-enzyme/lib/index.js'),
  testEnvironment: 'enzyme',
}
