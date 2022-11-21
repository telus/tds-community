import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { SkeletonContext } from './SkeletonProvider'

function SkeletonRenderer(props) {
  const skeleton = useContext(SkeletonContext)
  return skeleton.show ? props.skeleton() : props.render()
}

const getName = comp => comp.displayName || comp.name || 'Component'

const withSkeleton = SkeletonComponent => {
  return Component => {
    return function wrapper({ skeleton, ...props }) {
      wrapper.displayName = `withSkeleton(${getName(SkeletonComponent)})`
      wrapper.propTypes = {
        skeleton: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
      }
      wrapper.defaultProps = {
        skeleton: undefined,
      }
      return (
        <SkeletonRenderer
          skeleton={() => <SkeletonComponent skeleton={skeleton} {...props} />}
          render={() => <Component {...props} />}
        />
      )
    }
  }
}
export default withSkeleton
