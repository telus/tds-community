import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withContext } from 'recompose'
import AutoSkeletonizer from './AutoSkeletonizer'

const SkeletonProvider = withContext({ show: PropTypes.bool }, props => ({ show: props.show }))(
  props => <Fragment>{AutoSkeletonizer(props.children)}</Fragment>
)

SkeletonProvider.propTypes = {
  show: PropTypes.bool,
}
SkeletonProvider.defaultProps = {
  show: true,
}

export default SkeletonProvider
