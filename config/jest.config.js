const path = require('path')

module.exports = {
  rootDir: path.resolve('samples'),
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupTestFrameworkScriptFile: path.resolve('node_modules/jest-enzyme/lib/index.js'),
  testEnvironment: 'enzyme',
}
