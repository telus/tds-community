#!/bin/sh

# Strategy:
# Step 1. Build gitbook and styleguidist in parallel for speed
# Step 2. Copy styleguidist into build/${ENV}

# 1
yarn ci:build-docs

mkdir -p build/staging
mkdir -p build/production

# 2
cp -R styleguide/staging/ build/staging/community
cp -R styleguide/production/ build/production/community
