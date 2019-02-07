#!/usr/bin/env node

/*
Usage: npm run test:e2e [component name...] [options] [lerna options]

  By default, only updated packages will be tested.
  All lerna options will be forwarded onto lerna commands.

  Options:

    [component name...]       space separated list of package names to test
    -a, --all                 test all packages
    -u, --update-screenshots  update baseline images on failure
*/

const { spawnSync } = require('child_process')
const { tdsOptions } = require('./utils/parseArgs')
const getPackageNames = require('./utils/getPackageNames')

getPackageNames(packageNames => {
  const onlyCommunityPackages = packageNames
    .filter(
      name => name.startsWith('@tds/community-') && !name.startsWith('@tds/community-sample-')
    )
    .join(' ')

  const { status } = spawnSync(
    'npx',
    ['nightwatch', '-c', './config/nightwatch.conf.js', '--env', 'headless'],
    {
      env: Object.assign({}, process.env, {
        PACKAGES: onlyCommunityPackages,
        UPDATE_ALL_SCREENSHOTS: tdsOptions['update-screenshots'],
      }),
      stdio: 'inherit',
    }
  )

  if (status !== 0) {
    process.exit(status)
  }
})
