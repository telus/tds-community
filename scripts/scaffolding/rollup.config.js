import configure from '$CONFIG_PATH$config/rollup.config'
import { dependencies } from './package.json'

export default configure({
  input: './$COMPONENT$.jsx',
  dependencies,
})
