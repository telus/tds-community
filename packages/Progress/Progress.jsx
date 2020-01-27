import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colorGainsboro, colorWhite } from '@tds/core-colours'
import { safeRest } from '@tds/util-helpers'

import Bar from './Bar/Bar'

const ProgressBarContainer = styled.div(({ size }) => ({
  display: 'inline-block',
  position: 'relative',
  background: colorWhite,
  width: '100%',
  height: size === 'mini' ? '12px' : '24px',
  borderRadius: size === 'mini' ? '12px' : '24px',
  borderWidth: 'thin',
  borderStyle: 'solid',
  borderColor: colorGainsboro,
  overflow: 'hidden',
  transform: 'translateZ(-99999999px)', // Fix for safari overflow bug
}))

/**
 * @version ./package.json
 */

const Progress = ({ size, children, ...rest }) => (
  <ProgressBarContainer {...safeRest(rest)} size={size}>
    {children}
  </ProgressBarContainer>
)

Progress.propTypes = {
  /**
   * The size of the progress bar where the default is 24px tall and mini is 12px tall.
   */
  size: PropTypes.oneOf(['default', 'mini']),
  children: PropTypes.element.isRequired,
}

Progress.defaultProps = {
  size: 'default',
}

Progress.Bar = Bar
export default Progress
