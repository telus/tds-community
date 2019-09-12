import React from 'react'
import PropTypes from 'prop-types'

import { safeRest } from '@tds/util-helpers'

import styles from '../Progress.scss'

const MIN_NON_ZERO_PROGRESS_PERCENTAGE = 5
const MAX_PROGRESS_PERCENTAGE = 100

const constrainNonZeroPercentage = (minNonZeroPercentage, maxPercentage, percentage) => {
  if (percentage <= 0) return 0
  else if (percentage < minNonZeroPercentage) return minNonZeroPercentage
  else if (percentage > maxPercentage) return maxPercentage
  return percentage
}

const Bar = ({ percentage, variant, ...rest }) => {
  const percent = constrainNonZeroPercentage(
    MIN_NON_ZERO_PROGRESS_PERCENTAGE,
    MAX_PROGRESS_PERCENTAGE,
    percentage
  )
  const zIndex = 100 - percent // z-index order is inverse of percentage
  return (
    <div
      {...safeRest(rest)}
      className={[styles.progressBar, styles[variant]].join(' ')}
      style={{ width: `${percent}%`, zIndex }}
    />
  )
}

Bar.propTypes = {
  /**
   * Specifies how much of the task has been completed
   */
  percentage: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'error', 'disabled']),
}

Bar.defaultProps = {
  variant: 'primary',
}

export default Bar
