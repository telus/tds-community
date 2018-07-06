import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

import babel from 'rollup-plugin-babel'

// also requires node-sass since we use SCSS
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'

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
      { format: 'cjs', file: './dist/index.cjs.js', sourcemap: true, exports: 'named' },
      { format: 'es', file: './dist/index.es.js', sourcemap: true, exports: 'named' },
    ],

    external: ['react', 'react-dom', 'prop-types'].concat(tdsExternals),

    plugins: [
      nodeResolve({
        extensions: ['.js', '.jsx'],
      }),
      commonjs({
        include: '../../node_modules/**',
      }),
      options.css &&
        postcss({
          extract: './dist/index.css',
          sourceMap: true,
          plugins: [autoprefixer()],
          modules: {
            generateScopedName: 'TDS_[name]__[local]___[hash:base64:5]',
          },
        }),
      babel({
        plugins: ['external-helpers'],
        exclude: '../../node_modules/**',
      }),
    ],
  }
}
