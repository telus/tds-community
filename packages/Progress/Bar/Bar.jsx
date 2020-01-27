import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colorAccessibleGreen, colorCardinal, colorGainsboro } from '@tds/core-colours'
import { safeRest } from '@tds/util-helpers'

import Negative from './textures/Negative'
import Disabled from './textures/Disabled'

const MIN_NON_ZERO_PROGRESS_PERCENTAGE = 5
const MAX_PROGRESS_PERCENTAGE = 100

const ProgressBar = styled.div(({ progress, zIndex, variant }) => ({
  width: `${progress}%`,
  height: '100%',
  zIndex,
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  overflow: 'hidden',
  boxShadow: 'inset 0 -1px 1px rgba(255,255,255,0.3)',

  ...(variant === 'positive' && { backgroundColor: colorAccessibleGreen }),
  ...(variant === 'negative' && { backgroundColor: colorCardinal }),
  ...(variant === 'disabled' && { backgroundColor: colorGainsboro }),
}))

const constrainNonZeroPercentage = (minNonZeroPercentage, maxPercentage, percentage) => {
  if (percentage <= 0) return 0
  else if (percentage < minNonZeroPercentage) return minNonZeroPercentage
  else if (percentage > maxPercentage) return maxPercentage
  return percentage
}

const Bar = ({ percentage, variant, a11yLabel, ...rest }) => {
  const percent = constrainNonZeroPercentage(
    MIN_NON_ZERO_PROGRESS_PERCENTAGE,
    MAX_PROGRESS_PERCENTAGE,
    percentage
  )
  const zIndex = 100 - percent // z-index order is inverse of percentage
  return (
    <ProgressBar
      {...safeRest(rest)}
      variant={variant}
      progress={percent}
      zIndex={zIndex}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuetext={a11yLabel}
    >
      {variant === 'negative' && <Negative />}
      {variant === 'disabled' && <Disabled />}
    </ProgressBar>
  )
}

Bar.propTypes = {
  /**
   * A number from 0 to 100 that specifies amount of progress.
   */
  percentage: PropTypes.number.isRequired,
  /**
   * The style of the `Progress.Bar`.
   */
  variant: PropTypes.oneOf(['positive', 'negative', 'disabled']),
  /**
   * A label to be read by assistive technology. Meant to give context about the `Progress.Bar`.
   */
  a11yLabel: PropTypes.string.isRequired,
}

Bar.defaultProps = {
  variant: 'positive',
}

export default Bar
