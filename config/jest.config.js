/*
 * TODO: remove babel-core, babel-preset-env, babel-preset-react,
 * babel-preset-stage-2,and babelrc once jest no longer requires babel 6.
 */
const path = require('path')

module.exports = {
  rootDir: path.resolve('packages'),
  roots: ['<rootDir>', path.resolve('samples')],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupTestFrameworkScriptFile: path.resolve('node_modules/jest-enzyme/lib/index.js'),
  testEnvironment: 'enzyme',
}
