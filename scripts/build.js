#!/usr/bin/env node

const { spawnSync } = require('child_process')

const getUpdatedPackageNames = require('./utils/getUpdatedPackageNames')
const arrayToGlob = require('./utils/arrayToGlob')

getUpdatedPackageNames(packageNames => {
  const scopeGlob = arrayToGlob(packageNames)

  spawnSync(
    './node_modules/.bin/lerna',
    [
      'exec',
      '--scope',
      scopeGlob,
      '--',
      '$LERNA_ROOT_PATH/scripts/build.sh',
    ],
    {
      stdio: 'inherit',
    }
  )
  spawnSync(
    './node_modules/.bin/lerna',
    ['run', '--scope', scopeGlob, 'build'],
    {
      stdio: 'inherit',
    }
  )
})
