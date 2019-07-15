import configure from '../../config/rollup.config'
import { dependencies, peerDependencies } from './package.json'

export default configure({
  input: './SkeletonProvider.jsx',
  dependencies: { ...dependencies, ...peerDependencies },
})
