import React from 'react'
import PropTypes from 'prop-types'

import styles from './Skeleton.scss'

export const VARIANTS = {
  primary: 'primary',
  secondary: 'secondary',
}

export const SIZES = {
  xs: 18,
  sm: 24,
  md: 36,
  lg: 48,
  xl: 64,
}

/** Skeleton component for mocking content while it is loaded. */
const Skeleton = props => {
  const { characters, size, variant } = props

  const parsedCharacters = parseInt(characters, 10)
  const safeCharacters = parsedCharacters || 0
  const safeVariant = VARIANTS[variant] || 'default'
  const safeSize = SIZES[size] || SIZES.xs

  const isFixedCharacterWidth = safeCharacters > 0

  const baseClass = styles['skeleton-text']
  const colorClass = styles[`variant-${safeVariant}`]
  const sizeClass = styles[`size-${safeSize}`]
  const classNames = [baseClass, colorClass, sizeClass].join(' ')

  const calculatedWidthStyle = isFixedCharacterWidth
    ? { width: `${characters * safeSize}px` }
    : { width: '100%' }

  return <span {...props} className={classNames} style={calculatedWidthStyle} aria-busy="true" />
}

Skeleton.propTypes = {
  /** Number of "M" characters to emulate (full width & height per size) <br />
   <em>NOTE: default and overflow states both assume to 100% width instead</em> */
  characters: PropTypes.number,
  /** Size of text to emulate (line height in pixels) */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /** Colour variant */
  variant: PropTypes.oneOf(['primary', 'secondary']),
}

Skeleton.defaultProps = {
  characters: 0,
  size: 'xs',
  variant: undefined,
}

export default Skeleton
