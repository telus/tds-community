import postcss from 'rollup-plugin-postcss'

import configure from '../../config/rollup.config'
import { dependencies } from './package.json'

export default configure({
  input: './DatePicker.jsx',
  dependencies,
  css: false,
  plugins: [
    postcss({
      extract: './dist/index.css',
      sourceMap: false,
    }),
  ],
})
