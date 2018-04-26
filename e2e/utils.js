const { resolve } = require('path')
const Case = require('case')
const { outputPath } = require('./config')

const getVisualRegressionFolders = componentName => {
  const componentOutputPath = resolve(outputPath, 'components', componentName)

  return {
    baseline: resolve(componentOutputPath, 'baseline'),
    results: resolve(componentOutputPath, 'results'),
    diffs: resolve(componentOutputPath, 'diffs'),
  }
}

const toComponentName = packageName => Case.pascal(packageName.replace('@tds/community-', ''))

module.exports = {
  getVisualRegressionFolders,
  toComponentName,
}
