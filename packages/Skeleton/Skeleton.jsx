import React from 'react'
import PropTypes from 'prop-types'

import styles from './Skeleton.scss'

export const SIZES = { xs: 18, sm: 24, md: 36, lg: 48, xl: 64 }

/** Skeleton component for mocking content while it is loaded.
 * @version ./package.json
 */
const Skeleton = props => {
  const { characters, size } = props

  const parsedCharacters = parseInt(characters, 10)
  const safeCharacters = parsedCharacters || 0
  const safeSize = SIZES[size] || SIZES.xs

  const isFixedCharacterWidth = safeCharacters > 0

  const baseClass = styles['skeleton-text']
  const sizeClass = styles[`size-${safeSize}`]
  const classNames = [baseClass, sizeClass].join(' ')

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
}

Skeleton.defaultProps = {
  characters: 0,
  size: 'xs',
}

export default Skeleton
