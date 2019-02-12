#!/bin/sh

# Strategy:
# Copy styleguidist into build/${ENV}

# 1
npm run ci:build-docs

mkdir -p build/staging
mkdir -p build/production

# 2
cp -R styleguide/staging/* build/staging
cp -R styleguide/production/* build/production
