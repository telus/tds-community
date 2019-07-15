import React from 'react'
import PropTypes from 'prop-types'
import Image from '@tds/core-image'
import withSkeleton from '../withSkeleton'
import styles from '../Skeleton.scss'

const ImageSkeleton = ({ skeleton, ...rest }) => {
  if (!skeleton) {
    return <Image {...rest} />
  }

  const baseClass = styles['skeleton-image']
  const circularClass = styles.circular

  const cssWidth = `${rest.width * 0.8}px`
  const cssHeight = `${rest.height * 0.8}px`

  const classes = [baseClass, circularClass].join(' ')

  return <div className={classes} style={{ width: cssWidth, height: cssHeight }} />
}

ImageSkeleton.propTypes = {
  skeleton: PropTypes.bool,
}

ImageSkeleton.defaultProps = {
  skeleton: false,
}

export default withSkeleton(ImageSkeleton)(Image)
