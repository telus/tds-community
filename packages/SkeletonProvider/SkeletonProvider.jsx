import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import AutoSkeletonizer from './AutoSkeletonizer'

export const SkeletonContext = createContext({ show: true })
function SkeletonProvider({ show, children, ...rest }) {
  return (
    <SkeletonContext.Provider value={{ show }} {...rest}>
      {AutoSkeletonizer(children)}
    </SkeletonContext.Provider>
  )
}
SkeletonProvider.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
}
SkeletonProvider.defaultProps = {
  show: true,
  children: null,
}

export default SkeletonProvider
