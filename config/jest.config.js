const path = require('path')

module.exports = {
  rootDir: path.resolve('packages'),
  roots: ['<rootDir>', path.resolve('samples')],
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
