#!/usr/bin/env node

// Usage: npm run scaffold <componentName>

/* eslint-disable no-console */

const { readFileSync, writeFileSync, mkdirSync } = require('fs')
const { resolve } = require('path')
const { camel, kebab } = require('case')
const readline = require('readline')

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let componentName = process.argv[2]

const getComponentName = async () => {
  return new Promise(res => {
    read.question(
      "What is the name of your component?\nPlease use PascalCase. (E.g. 'ToggleSwitch' will become `@tds/community-toggle-switch` when deployed to npm)\nName: ",
      answer => {
        componentName = answer
        res()
      }
    )
  })
}

const getJourney = async () => {
  return new Promise(res => {
    read.question(
      'Are you building a stable component, starting at version 1.0.0?\nEnter "no" to start building a beta component, starting at version 0.1.0\n(yes/no): ',
      answer => {
        const a = answer.toLowerCase()
        if (a === 'yes' || a === 'y') {
          res(true)
        }
        res(false)
      }
    )
  })
}

const startScaffold = async () => {
  if (!componentName) {
    await getComponentName()
  }

  const isStableJourney = await getJourney()
  const basePath = `packages/${componentName}`
  let visibleName = ''
  let version = ''
  let configPath = '../../'

  if (isStableJourney) {
    version = '1.0.0'
    configPath = '../../'
  } else {
    version = '0.1.0'
    visibleName = `\n * @visibleName ${componentName} (beta)`
  }

  const scaffold = (template, destination) => {
    const contents = readFileSync(resolve('scripts', 'scaffolding', template), 'utf8')
      .replace(/\$COMPONENT\$/g, componentName)
      .replace(/\$COMPONENT_CAMEL\$/g, camel(componentName))
      .replace(/\$COMPONENT_KEBAB\$/g, kebab(componentName))
      .replace(/\$VERSION_START\$/g, version)
      .replace(/\$CONFIG_PATH\$/g, configPath)
      .replace(/\$VISIBLE_NAME\$/g, visibleName)

    writeFileSync(resolve(basePath, destination), contents)

    console.log(`Created ${basePath}/${destination}`)
  }

  mkdirSync(resolve(basePath), { recursive: true })
  mkdirSync(resolve(basePath, '__tests__'), { recursive: true })

  scaffold('Component.jsx', `${componentName}.jsx`)
  scaffold('Component.md', `${componentName}.md`)
  scaffold('Component.spec.jsx', `__tests__/${componentName}.spec.jsx`)
  scaffold('index.cjs.js', 'index.cjs.js')
  scaffold('index.es.js', 'index.es.js')
  scaffold('package.json', 'package.json')
  scaffold('README.md', 'README.md')
  scaffold('rollup.config.js', 'rollup.config.js')

  read.close()
}

startScaffold()
