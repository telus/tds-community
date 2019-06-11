import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

import babel from 'rollup-plugin-babel'

// also requires node-sass since we use SCSS
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'

import cleaner from './rollup/rollup-plugin-cleaner'

export default opts => {
  const options = Object.assign(
    {
      css: true,
    },
    opts
  )

  const tdsExternals = Object.keys(options.dependencies).filter(dependency =>
    dependency.startsWith('@tds')
  )

  return {
    input: options.input,
    output: [
      { format: 'cjs', file: './dist/index.cjs.js', sourcemap: false, exports: 'named' },
      { format: 'es', file: './dist/index.es.js', sourcemap: false, exports: 'named' },
    ],

    external: ['react', 'react-dom', 'prop-types', 'styled-components'].concat(tdsExternals),

    plugins: [
      cleaner({
        targets: ['./dist/'],
      }),
      nodeResolve({
        extensions: ['.js', '.jsx'],
      }),
      commonjs({
        include: '../../node_modules/**',
      }),
      options.css &&
        postcss({
          extract: './dist/index.css',
          sourceMap: false,
          plugins: [autoprefixer()],
          modules: {
            generateScopedName: 'TDS_[name]__[local]___[hash:base64:5]',
          },
        }),
      babel({
        runtimeHelpers: true,
        exclude: '../../node_modules/**',
        configFile: '../../babel.config.js',
      }),
    ],
  }
}
